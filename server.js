const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
<<<<<<< HEAD
require('dotenv').config();
=======
const dotenv = require('dotenv');

dotenv.config();
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI, {
=======
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-management', {
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

<<<<<<< HEAD
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
=======
// Room Schema
const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    roomType: { type: String, required: true, enum: ['Standard', 'Deluxe', 'Suite', 'Presidential'] },
    price: { type: Number, required: true },
    status: { type: String, required: true, enum: ['Available', 'Occupied', 'Maintenance'], default: 'Available' },
    amenities: [String],
    floor: { type: Number, required: true }
}, { timestamps: true });

// Guest Schema
const guestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    idProof: { type: String, required: true },
    idNumber: { type: String, required: true }
}, { timestamps: true });

// Booking Schema
const bookingSchema = new mongoose.Schema({
    guest: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    status: { type: String, required: true, enum: ['Confirmed', 'Checked In', 'Checked Out', 'Cancelled'], default: 'Confirmed' },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, required: true, enum: ['Pending', 'Paid', 'Refunded'], default: 'Pending' },
    specialRequests: String
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
const Guest = mongoose.model('Guest', guestSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// Routes

// Room Routes
app.get('/api/rooms', async (req, res) => {
    try {
        const rooms = await Room.find().sort({ roomNumber: 1 });
        res.json(rooms);
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

<<<<<<< HEAD
// Add route to get a single customer by ID
app.get('/api/customers/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
=======
// Add route to get a single room by ID
app.get('/api/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

<<<<<<< HEAD
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
=======
app.post('/api/rooms', async (req, res) => {
    try {
        const room = new Room(req.body);
        const savedRoom = await room.save();
        res.status(201).json(savedRoom);
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

<<<<<<< HEAD
app.delete('/api/customers/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Customer deleted successfully' });
=======
app.put('/api/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room deleted' });
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

<<<<<<< HEAD
// Transaction Routes
app.get('/api/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
=======
// Guest Routes
app.get('/api/guests', async (req, res) => {
    try {
        const guests = await Guest.find().sort({ name: 1 });
        res.json(guests);
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

<<<<<<< HEAD
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
=======
app.post('/api/guests', async (req, res) => {
    try {
        const guest = new Guest(req.body);
        const savedGuest = await guest.save();
        res.status(201).json(savedGuest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/guests/:id', async (req, res) => {
    try {
        const guest = await Guest.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found' });
        }
        res.json(guest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/guests/:id', async (req, res) => {
    try {
        const guest = await Guest.findByIdAndDelete(req.params.id);
        if (!guest) {
            return res.status(404).json({ message: 'Guest not found' });
        }
        res.json({ message: 'Guest deleted' });
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

<<<<<<< HEAD
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
=======
// Booking Routes
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('guest')
            .populate('room')
            .sort({ checkIn: -1 });
        res.json(bookings);
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

<<<<<<< HEAD
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
=======
app.post('/api/bookings', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        const savedBooking = await booking.save();
        
        // Update room status to Occupied
        await Room.findByIdAndUpdate(req.body.room, { status: 'Occupied' });
        
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('guest').populate('room');
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        // Update room status based on booking status
        if (booking.status === 'Checked Out') {
            await Room.findByIdAndUpdate(booking.room._id, { status: 'Available' });
        } else if (booking.status === 'Checked In') {
            await Room.findByIdAndUpdate(booking.room._id, { status: 'Occupied' });
        }
        
        res.json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        // Update room status to Available
        await Room.findByIdAndUpdate(booking.room, { status: 'Available' });
        
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking deleted' });
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search Routes
<<<<<<< HEAD
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
=======
app.get('/api/rooms/search', async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const rooms = await Room.find({
            $or: [
                { roomNumber: { $regex: searchTerm, $options: 'i' } },
                { roomType: { $regex: searchTerm, $options: 'i' } },
                { status: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        res.json(rooms);
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

<<<<<<< HEAD
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
=======
app.get('/api/guests/search', async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const guests = await Guest.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { email: { $regex: searchTerm, $options: 'i' } },
                { phone: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        res.json(guests);
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

<<<<<<< HEAD
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
=======
app.get('/api/bookings/search', async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const bookings = await Booking.find({
            $or: [
                { status: { $regex: searchTerm, $options: 'i' } },
                { paymentStatus: { $regex: searchTerm, $options: 'i' } }
            ]
        }).populate('guest').populate('room');
        res.json(bookings);
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

<<<<<<< HEAD
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
=======
// Dashboard Stats
app.get('/api/dashboard', async (req, res) => {
    try {
        const totalRooms = await Room.countDocuments();
        const availableRooms = await Room.countDocuments({ status: 'Available' });
        const occupiedRooms = await Room.countDocuments({ status: 'Occupied' });
        const maintenanceRooms = await Room.countDocuments({ status: 'Maintenance' });
        
        const totalBookings = await Booking.countDocuments();
        const confirmedBookings = await Booking.countDocuments({ status: 'Confirmed' });
        const checkedInBookings = await Booking.countDocuments({ status: 'Checked In' });
        const checkedOutBookings = await Booking.countDocuments({ status: 'Checked Out' });
        
        const totalGuests = await Guest.countDocuments();
        
        const revenue = await Booking.aggregate([
            { $match: { paymentStatus: 'Paid' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);
        
        res.json({
            rooms: {
                total: totalRooms,
                available: availableRooms,
                occupied: occupiedRooms,
                maintenance: maintenanceRooms
            },
            bookings: {
                total: totalBookings,
                confirmed: confirmedBookings,
                checkedIn: checkedInBookings,
                checkedOut: checkedOutBookings
            },
            guests: {
                total: totalGuests
            },
            revenue: revenue.length > 0 ? revenue[0].total : 0
        });
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 