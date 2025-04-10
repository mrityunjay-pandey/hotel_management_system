// API URL
const API_URL = 'http://localhost:3000/api';

// DOM Elements
// Forms
const addCustomerForm = document.getElementById('addCustomerForm');
const addTransactionForm = document.getElementById('addTransactionForm');
const addLoanForm = document.getElementById('addLoanForm');

// Search inputs and buttons
const customerSearchInput = document.getElementById('customerSearchInput');
const customerSearchBtn = document.getElementById('customerSearchBtn');
const transactionSearchInput = document.getElementById('transactionSearchInput');
const transactionSearchBtn = document.getElementById('transactionSearchBtn');
const loanSearchInput = document.getElementById('loanSearchInput');
const loanSearchBtn = document.getElementById('loanSearchBtn');

// Table bodies
const customersBody = document.getElementById('customersBody');
const transactionsBody = document.getElementById('transactionsBody');
const loansBody = document.getElementById('loansBody');

// Dashboard elements
const totalCustomersEl = document.getElementById('totalCustomers');
const activeCustomersEl = document.getElementById('activeCustomers');
const totalBalanceEl = document.getElementById('totalBalance');
const activeLoansEl = document.getElementById('activeLoans');

// Tab buttons
const tabButtons = document.querySelectorAll('.tab-btn');

// Event Listeners
// Form submissions
addCustomerForm.addEventListener('submit', handleAddCustomer);
addTransactionForm.addEventListener('submit', handleAddTransaction);
addLoanForm.addEventListener('submit', handleAddLoan);

// Search buttons
customerSearchBtn.addEventListener('click', () => handleSearch('customers', customerSearchInput.value));
transactionSearchBtn.addEventListener('click', () => handleSearch('transactions', transactionSearchInput.value));
loanSearchBtn.addEventListener('click', () => handleSearch('loans', loanSearchInput.value));

// Search inputs (Enter key)
customerSearchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch('customers', customerSearchInput.value);
});
transactionSearchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch('transactions', transactionSearchInput.value);
});
loanSearchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch('loans', loanSearchInput.value);
});

// Tab switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        switchTab(tabName);
    });
});

// Initialize the application
loadDashboard();
loadCustomers();
loadTransactions();
loadLoans();

// Tab Switching
function switchTab(tabName) {
    // Update active tab button
    tabButtons.forEach(button => {
        if (button.getAttribute('data-tab') === tabName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Show active tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        if (content.id === `${tabName}-tab`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Dashboard Functions
async function loadDashboard() {
    try {
        const response = await fetch(`${API_URL}/dashboard`);
        const data = await response.json();
        
        // Update customer stats
        totalCustomersEl.textContent = data.customers.total;
        activeCustomersEl.textContent = data.customers.active;
        
        // Update loan stats
        activeLoansEl.textContent = data.loans.active;
        
        // Update total balance
        totalBalanceEl.textContent = `₹${data.totalBalance.toFixed(2)}`;
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Customer Functions
async function loadCustomers() {
    try {
        const response = await fetch(`${API_URL}/customers`);
        const customers = await response.json();
        renderCustomersTable(customers);
    } catch (error) {
        console.error('Error loading customers:', error);
        alert('Error loading customers. Please try again.');
    }
}

async function handleAddCustomer(e) {
    e.preventDefault();
    
    const customerData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        idProof: document.getElementById('idProof').value,
        idNumber: document.getElementById('idNumber').value,
        accountType: document.getElementById('accountType').value
    };

    try {
        // Check email availability first
        const emailCheckResponse = await fetch(`${API_URL}/customers/check-email/${encodeURIComponent(customerData.email)}`);
        const emailCheck = await emailCheckResponse.json();
        
        if (!emailCheck.available) {
            alert('This email address is already registered. Please use a different email.');
            return;
        }

        const response = await fetch(`${API_URL}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add customer');
        }

        const result = await response.json();
        alert(`Customer added successfully! Account Number: ${result.accountNumber}`);
        addCustomerForm.reset();
        loadCustomers();
        loadDashboard();
    } catch (error) {
        console.error('Error adding customer:', error);
        alert(error.message || 'Error adding customer. Please try again.');
    }
}

async function handleEditCustomer(id) {
    try {
        const response = await fetch(`${API_URL}/customers/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch customer details');
        }
        const customer = await response.json();

        // Create a form for editing
        const form = document.createElement('form');
        form.innerHTML = `
            <div class="edit-form">
                <h3>Edit Customer</h3>
                <div class="form-group">
                    <label for="editAccountNumber">Account Number:</label>
                    <input type="text" id="editAccountNumber" value="${customer.accountNumber}" required>
                </div>
                <div class="form-group">
                    <label for="editFirstName">First Name:</label>
                    <input type="text" id="editFirstName" value="${customer.firstName}" required>
                </div>
                <div class="form-group">
                    <label for="editLastName">Last Name:</label>
                    <input type="text" id="editLastName" value="${customer.lastName}" required>
                </div>
                <div class="form-group">
                    <label for="editEmail">Email:</label>
                    <input type="email" id="editEmail" value="${customer.email}" required>
                </div>
                <div class="form-group">
                    <label for="editPhone">Phone:</label>
                    <input type="tel" id="editPhone" value="${customer.phone}" required>
                </div>
                <div class="form-group">
                    <label for="editAddress">Address:</label>
                    <textarea id="editAddress" required>${customer.address}</textarea>
                </div>
                <div class="form-group">
                    <label for="editAccountType">Account Type:</label>
                    <select id="editAccountType" required>
                        <option value="Savings" ${customer.accountType === 'Savings' ? 'selected' : ''}>Savings</option>
                        <option value="Current" ${customer.accountType === 'Current' ? 'selected' : ''}>Current</option>
                        <option value="Fixed" ${customer.accountType === 'Fixed' ? 'selected' : ''}>Fixed</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editStatus">Status:</label>
                    <select id="editStatus" required>
                        <option value="Active" ${customer.status === 'Active' ? 'selected' : ''}>Active</option>
                        <option value="Inactive" ${customer.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                        <option value="Frozen" ${customer.status === 'Frozen' ? 'selected' : ''}>Frozen</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="save-btn">Save Changes</button>
                    <button type="button" class="cancel-btn">Cancel</button>
                </div>
            </div>
        `;

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.appendChild(form);
        document.body.appendChild(modal);

        // Handle form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const updatedCustomer = {
                accountNumber: document.getElementById('editAccountNumber').value,
                firstName: document.getElementById('editFirstName').value,
                lastName: document.getElementById('editLastName').value,
                email: document.getElementById('editEmail').value,
                phone: document.getElementById('editPhone').value,
                address: document.getElementById('editAddress').value,
                accountType: document.getElementById('editAccountType').value,
                status: document.getElementById('editStatus').value
            };

            try {
                const updateResponse = await fetch(`${API_URL}/customers/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedCustomer)
                });

                if (!updateResponse.ok) {
                    throw new Error('Failed to update customer');
                }

                modal.remove();
                loadCustomers();
                loadDashboard();
            } catch (error) {
                console.error('Error updating customer:', error);
                alert('Error updating customer. Please try again.');
            }
        });

        // Handle cancel
        form.querySelector('.cancel-btn').addEventListener('click', () => {
            modal.remove();
        });
    } catch (error) {
        console.error('Error fetching customer details:', error);
        alert('Error fetching customer details. Please try again.');
    }
}

async function handleDeleteCustomer(id) {
    if (!confirm('Are you sure you want to delete this customer?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/customers/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete customer');
        }

        loadCustomers();
        loadDashboard();
    } catch (error) {
        console.error('Error deleting customer:', error);
        alert('Error deleting customer. Please try again.');
    }
}

function renderCustomersTable(customers) {
    customersBody.innerHTML = '';
    
    customers.forEach(customer => {
        const row = document.createElement('tr');
        
        // Determine status badge class
        let statusClass = '';
        switch (customer.status) {
            case 'Active':
                statusClass = 'status-active';
                break;
            case 'Inactive':
                statusClass = 'status-inactive';
                break;
            case 'Frozen':
                statusClass = 'status-frozen';
                break;
        }
        
        row.innerHTML = `
            <td>${customer.accountNumber}</td>
            <td>${customer.firstName} ${customer.lastName}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.accountType}</td>
            <td>₹${customer.balance.toFixed(2)}</td>
            <td><span class="status-badge ${statusClass}">${customer.status}</span></td>
            <td>
                <button  class="action-btn edit-btn" onclick="handleEditCustomer('${customer._id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="handleDeleteCustomer('${customer._id}')">Delete</button>
            </td>
        `;
        customersBody.appendChild(row);
    });
}

// Transaction Functions
async function loadTransactions() {
    try {
        const response = await fetch(`${API_URL}/transactions`);
        const transactions = await response.json();
        renderTransactionsTable(transactions);
    } catch (error) {
        console.error('Error loading transactions:', error);
        alert('Error loading transactions. Please try again.');
    }
}

async function handleAddTransaction(e) {
    e.preventDefault();
    
    const transactionData = {
        accountNumber: document.getElementById('transactionAccount').value,
        type: document.getElementById('transactionType').value,
        amount: parseFloat(document.getElementById('amount').value),
        description: document.getElementById('description').value
    };

    try {
        // Validate amount
        if (isNaN(transactionData.amount) || transactionData.amount <= 0) {
            alert('Amount must be a positive number');
            return;
        }

        const response = await fetch(`${API_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to process transaction');
        }

        const result = await response.json();
        alert(`Transaction processed successfully! New balance: ₹${result.balance.toFixed(2)}`);
        addTransactionForm.reset();
        loadTransactions();
        loadDashboard();
    } catch (error) {
        console.error('Error processing transaction:', error);
        alert(error.message || 'Error processing transaction. Please try again.');
    }
}

function renderTransactionsTable(transactions) {
    transactionsBody.innerHTML = '';
    
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        // Format date
        const date = new Date(transaction.date).toLocaleDateString();
        
        // Determine status badge class
        let statusClass = '';
        switch (transaction.status) {
            case 'Completed':
                statusClass = 'status-completed';
                break;
            case 'Pending':
                statusClass = 'status-pending';
                break;
            case 'Failed':
                statusClass = 'status-failed';
                break;
        }
        
        row.innerHTML = `
            <td>${date}</td>
            <td>${transaction.accountNumber}</td>
            <td>${transaction.type}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
            <td>${transaction.description}</td>
            <td>$${transaction.balance.toFixed(2)}</td>
            <td><span class="status-badge ${statusClass}">${transaction.status}</span></td>
        `;
        transactionsBody.appendChild(row);
    });
}

// Loan Functions
async function loadLoans() {
    try {
        const response = await fetch(`${API_URL}/loans`);
        const loans = await response.json();
        renderLoansTable(loans);
    } catch (error) {
        console.error('Error loading loans:', error);
        alert('Error loading loans. Please try again.');
    }
}

async function handleAddLoan(e) {
    e.preventDefault();
    
    const loanData = {
        accountNumber: document.getElementById('loanAccount').value,
        loanType: document.getElementById('loanType').value,
        amount: parseFloat(document.getElementById('loanAmount').value),
        interestRate: parseFloat(document.getElementById('interestRate').value),
        term: parseInt(document.getElementById('term').value)
    };

    try {
        // Validate amount
        if (isNaN(loanData.amount) || loanData.amount <= 0) {
            alert('Amount must be a positive number');
            return;
        }

        // Validate interest rate
        if (isNaN(loanData.interestRate) || loanData.interestRate <= 0) {
            alert('Interest rate must be a positive number');
            return;
        }

        // Validate term
        if (isNaN(loanData.term) || loanData.term <= 0) {
            alert('Term must be a positive number');
            return;
        }

        const response = await fetch(`${API_URL}/loans`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loanData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create loan');
        }

        const result = await response.json();
        alert(`Loan created successfully! Monthly Payment: $${result.monthlyPayment.toFixed(2)}`);
        addLoanForm.reset();
        loadLoans();
        loadDashboard();
    } catch (error) {
        console.error('Error creating loan:', error);
        alert(error.message || 'Error creating loan. Please try again.');
    }
}

// Add function to handle editing a loan
async function handleEditLoan(id) {
    try {
        const response = await fetch(`${API_URL}/loans/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch loan details');
        }
        const loan = await response.json();

        // Create a form for editing
        const form = document.createElement('form');
        form.innerHTML = `
            <div class="edit-form">
                <h3>Edit Loan</h3>
                <div class="form-group">
                    <label for="editLoanAccount">Account Number:</label>
                    <input type="text" id="editLoanAccount" value="${loan.accountNumber}" required>
                </div>
                <div class="form-group">
                    <label for="editLoanType">Loan Type:</label>
                    <select id="editLoanType" required>
                        <option value="Personal" ${loan.loanType === 'Personal' ? 'selected' : ''}>Personal</option>
                        <option value="Home" ${loan.loanType === 'Home' ? 'selected' : ''}>Home</option>
                        <option value="Education" ${loan.loanType === 'Education' ? 'selected' : ''}>Education</option>
                        <option value="Business" ${loan.loanType === 'Business' ? 'selected' : ''}>Business</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editLoanAmount">Amount:</label>
                    <input type="number" id="editLoanAmount" value="${loan.amount}" required>
                </div>
                <div class="form-group">
                    <label for="editInterestRate">Interest Rate (%):</label>
                    <input type="number" id="editInterestRate" value="${loan.interestRate}" required>
                </div>
                <div class="form-group">
                    <label for="editTerm">Term (months):</label>
                    <input type="number" id="editTerm" value="${loan.term}" required>
                </div>
                <div class="form-group">
                    <label for="editLoanStatus">Status:</label>
                    <select id="editLoanStatus" required>
                        <option value="Pending" ${loan.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Approved" ${loan.status === 'Approved' ? 'selected' : ''}>Approved</option>
                        <option value="Rejected" ${loan.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                        <option value="Active" ${loan.status === 'Active' ? 'selected' : ''}>Active</option>
                        <option value="Closed" ${loan.status === 'Closed' ? 'selected' : ''}>Closed</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="save-btn">Save Changes</button>
                    <button type="button" class="cancel-btn">Cancel</button>
                </div>
            </div>
        `;

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.appendChild(form);
        document.body.appendChild(modal);

        // Handle form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const updatedLoan = {
                accountNumber: document.getElementById('editLoanAccount').value,
                loanType: document.getElementById('editLoanType').value,
                amount: parseFloat(document.getElementById('editLoanAmount').value),
                interestRate: parseFloat(document.getElementById('editInterestRate').value),
                term: parseInt(document.getElementById('editTerm').value),
                status: document.getElementById('editLoanStatus').value
            };

            try {
                const updateResponse = await fetch(`${API_URL}/loans/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedLoan)
                });

                if (!updateResponse.ok) {
                    const errorData = await updateResponse.json();
                    throw new Error(errorData.message || 'Failed to update loan');
                }

                const result = await updateResponse.json();
                alert(`Loan updated successfully! Monthly Payment: $${result.monthlyPayment.toFixed(2)}`);
                modal.remove();
                loadLoans();
                loadDashboard();
            } catch (error) {
                console.error('Error updating loan:', error);
                alert(error.message || 'Error updating loan. Please try again.');
            }
        });

        // Handle cancel
        form.querySelector('.cancel-btn').addEventListener('click', () => {
            modal.remove();
        });
    } catch (error) {
        console.error('Error fetching loan details:', error);
        alert('Error fetching loan details. Please try again.');
    }
}

// Add function to handle deleting a loan
async function handleDeleteLoan(id) {
    if (!confirm('Are you sure you want to delete this loan?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/loans/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete loan');
        }

        alert('Loan deleted successfully');
        loadLoans();
        loadDashboard();
    } catch (error) {
        console.error('Error deleting loan:', error);
        alert(error.message || 'Error deleting loan. Please try again.');
    }
}

function renderLoansTable(loans) {
    loansBody.innerHTML = '';
    
    loans.forEach(loan => {
        const row = document.createElement('tr');
        
        // Determine status badge class
        let statusClass = '';
        switch (loan.status) {
            case 'Pending':
                statusClass = 'status-pending';
                break;
            case 'Approved':
                statusClass = 'status-approved';
                break;
            case 'Rejected':
                statusClass = 'status-rejected';
                break;
            case 'Active':
                statusClass = 'status-active';
                break;
            case 'Closed':
                statusClass = 'status-inactive';
                break;
        }
        
        row.innerHTML = `
            <td>${loan.accountNumber}</td>
            <td>${loan.loanType}</td>
            <td>$${loan.amount.toFixed(2)}</td>
            <td>${loan.interestRate}%</td>
            <td>${loan.term} months</td>
            <td>$${loan.monthlyPayment?.toFixed(2) || '0.00'}</td>
            <td><span class="status-badge ${statusClass}">${loan.status}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="handleEditLoan('${loan._id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="handleDeleteLoan('${loan._id}')">Delete</button>
            </td>
        `;
        loansBody.appendChild(row);
    });
}

// Search Functions
async function handleSearch(type, searchTerm) {
    if (!searchTerm.trim()) {
        switch (type) {
            case 'customers':
                loadCustomers();
                break;
            case 'transactions':
                loadTransactions();
                break;
            case 'loans':
                loadLoans();
                break;
        }
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${type}/search?q=${encodeURIComponent(searchTerm)}`);
        const results = await response.json();
        
        switch (type) {
            case 'customers':
                renderCustomersTable(results);
                break;
            case 'transactions':
                renderTransactionsTable(results);
                break;
            case 'loans':
                renderLoansTable(results);
                break;
        }
    } catch (error) {
        console.error(`Error searching ${type}:`, error);
        alert(`Error searching ${type}. Please try again.`);
    }
} 