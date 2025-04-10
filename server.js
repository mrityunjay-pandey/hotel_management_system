const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Schemas
const customerSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    idProof: { type: String, required: true },
    idNumber: { type: String, required: true },
    accountType: { type: String, required: true, enum: ['Savings', 'Current', 'Fixed'] },
    balance: { type: Number, default: 0 },
    status: { type: String, default: 'Active', enum: ['Active', 'Inactive', 'Frozen'] },
    createdAt: { type: Date, default: Date.now }
});

const transactionSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true },
    type: { type: String, required: true, enum: ['Credit', 'Debit'] },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    balance: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'Completed', enum: ['Completed', 'Pending', 'Failed'] }
});

const loanSchema = new mongoose.Schema({
    accountNumber: { type: String, required: true },
    loanType: { type: String, required: true, enum: ['Personal', 'Home', 'Education', 'Business'] },
    amount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    term: { type: Number, required: true }, // in months
    status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected', 'Active', 'Closed'] },
    startDate: { type: Date },
    endDate: { type: Date },
    monthlyPayment: { type: Number },
    remainingAmount: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

// Models
const Customer = mongoose.model('Customer', customerSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const Loan = mongoose.model('Loan', loanSchema);

// Routes
// Customer Routes
app.get('/api/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add route to get a single customer by ID
app.get('/api/customers/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/customers', async (req, res) => {
    try {
        console.log('Received customer data:', req.body);
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'dateOfBirth', 'idProof', 'idNumber', 'accountType'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: 'Missing required fields', 
                missingFields 
            });
        }

        // Generate account number
        const accountNumber = 'ACC' + Date.now().toString().slice(-8);
        const customerData = { ...req.body, accountNumber };

        const customer = new Customer(customerData);
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        console.error('Error creating customer:', error);
        if (error.code === 11000) {
            res.status(400).json({ 
                message: 'Duplicate entry found', 
                field: Object.keys(error.keyPattern)[0] 
            });
        } else {
            res.status(400).json({ 
                message: error.message,
                name: error.name,
                code: error.code
            });
        }
    }
});

app.put('/api/customers/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/customers/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Transaction Routes
app.get('/api/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/transactions', async (req, res) => {
    try {
        console.log('Received transaction data:', req.body);
        
        // Validate required fields
        const requiredFields = ['accountNumber', 'type', 'amount', 'description'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: 'Missing required fields', 
                missingFields 
            });
        }
        
        // Validate transaction type
        if (!['Credit', 'Debit'].includes(req.body.type)) {
            return res.status(400).json({ 
                message: 'Invalid transaction type. Must be Credit or Debit' 
            });
        }
        
        // Validate amount
        if (isNaN(req.body.amount) || req.body.amount <= 0) {
            return res.status(400).json({ 
                message: 'Amount must be a positive number' 
            });
        }

        const transaction = new Transaction(req.body);
        const customer = await Customer.findOne({ accountNumber: transaction.accountNumber });
        
        if (!customer) {
            return res.status(404).json({ 
                message: 'Account not found',
                accountNumber: transaction.accountNumber
            });
        }

        // Update customer balance
        if (transaction.type === 'Credit') {
            customer.balance += transaction.amount;
        } else {
            if (customer.balance < transaction.amount) {
                return res.status(400).json({ 
                    message: 'Insufficient funds',
                    currentBalance: customer.balance,
                    requestedAmount: transaction.amount
                });
            }
            customer.balance -= transaction.amount;
        }

        transaction.balance = customer.balance;
        await transaction.save();
        await customer.save();

        res.status(201).json(transaction);
    } catch (error) {
        console.error('Error processing transaction:', error);
        res.status(400).json({ 
            message: error.message,
            name: error.name,
            code: error.code
        });
    }
});

// Loan Routes
app.get('/api/loans', async (req, res) => {
    try {
        const loans = await Loan.find();
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/loans', async (req, res) => {
    try {
        console.log('Received loan data:', req.body);
        
        // Validate required fields
        const requiredFields = ['accountNumber', 'loanType', 'amount', 'interestRate', 'term'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: 'Missing required fields', 
                missingFields 
            });
        }

        const customer = await Customer.findOne({ accountNumber: req.body.accountNumber });
        
        if (!customer) {
            return res.status(404).json({ 
                message: 'Account not found',
                accountNumber: req.body.accountNumber 
            });
        }

        const loan = new Loan(req.body);

        // Calculate monthly payment
        const monthlyRate = loan.interestRate / 12 / 100;
        const numberOfPayments = loan.term;
        loan.monthlyPayment = (loan.amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                             (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        loan.remainingAmount = loan.amount;

        await loan.save();
        res.status(201).json(loan);
    } catch (error) {
        console.error('Error creating loan:', error);
        res.status(400).json({ 
            message: error.message,
            name: error.name,
            code: error.code
        });
    }
});

// Add route to get a single loan by ID
app.get('/api/loans/:id', async (req, res) => {
    try {
        const loan = await Loan.findById(req.params.id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add route to update a loan
app.put('/api/loans/:id', async (req, res) => {
    try {
        console.log('Updating loan with data:', req.body);
        
        // Validate required fields
        const requiredFields = ['accountNumber', 'loanType', 'amount', 'interestRate', 'term'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: 'Missing required fields', 
                missingFields 
            });
        }

        const customer = await Customer.findOne({ accountNumber: req.body.accountNumber });
        
        if (!customer) {
            return res.status(404).json({ 
                message: 'Account not found',
                accountNumber: req.body.accountNumber 
            });
        }

        // Calculate monthly payment
        const monthlyRate = req.body.interestRate / 12 / 100;
        const numberOfPayments = req.body.term;
        req.body.monthlyPayment = (req.body.amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                                 (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        req.body.remainingAmount = req.body.amount;

        const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.json(loan);
    } catch (error) {
        console.error('Error updating loan:', error);
        res.status(400).json({ 
            message: error.message,
            name: error.name,
            code: error.code
        });
    }
});

// Add route to delete a loan
app.delete('/api/loans/:id', async (req, res) => {
    try {
        const loan = await Loan.findByIdAndDelete(req.params.id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.json({ message: 'Loan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Dashboard Route
app.get('/api/dashboard', async (req, res) => {
    try {
        const totalCustomers = await Customer.countDocuments();
        const activeCustomers = await Customer.countDocuments({ status: 'Active' });
        const totalLoans = await Loan.countDocuments();
        const activeLoans = await Loan.countDocuments({ status: 'Active' });
        
        const totalBalance = await Customer.aggregate([
            { $group: { _id: null, total: { $sum: '$balance' } } }
        ]);

        const recentTransactions = await Transaction.find()
            .sort({ date: -1 })
            .limit(5);

        res.json({
            customers: {
                total: totalCustomers,
                active: activeCustomers
            },
            loans: {
                total: totalLoans,
                active: activeLoans
            },
            totalBalance: totalBalance[0]?.total || 0,
            recentTransactions
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search Routes
app.get('/api/customers/search', async (req, res) => {
    try {
        const query = req.query.q;
        const customers = await Customer.find({
            $or: [
                { accountNumber: { $regex: query, $options: 'i' } },
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add email verification endpoint
app.get('/api/customers/check-email/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            res.json({ available: false, message: 'Email is already in use' });
        } else {
            res.json({ available: true, message: 'Email is available' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/transactions/search', async (req, res) => {
    try {
        const query = req.query.q;
        const transactions = await Transaction.find({
            $or: [
                { accountNumber: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/loans/search', async (req, res) => {
    try {
        const query = req.query.q;
        const loans = await Loan.find({
            $or: [
                { accountNumber: { $regex: query, $options: 'i' } },
                { loanType: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 