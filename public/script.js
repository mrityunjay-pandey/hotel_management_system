// API URL
const API_URL = 'http://localhost:3000/api';

// DOM Elements
// Forms
<<<<<<< HEAD
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
=======
const addRoomForm = document.getElementById('addRoomForm');
const addGuestForm = document.getElementById('addGuestForm');
const addBookingForm = document.getElementById('addBookingForm');

// Search inputs and buttons
const roomSearchInput = document.getElementById('roomSearchInput');
const roomSearchBtn = document.getElementById('roomSearchBtn');
const guestSearchInput = document.getElementById('guestSearchInput');
const guestSearchBtn = document.getElementById('guestSearchBtn');
const bookingSearchInput = document.getElementById('bookingSearchInput');
const bookingSearchBtn = document.getElementById('bookingSearchBtn');

// Table bodies
const roomsBody = document.getElementById('roomsBody');
const guestsBody = document.getElementById('guestsBody');
const bookingsBody = document.getElementById('bookingsBody');

// Dashboard elements
const totalRoomsEl = document.getElementById('totalRooms');
const availableRoomsEl = document.getElementById('availableRooms');
const occupiedRoomsEl = document.getElementById('occupiedRooms');
const totalBookingsEl = document.getElementById('totalBookings');
const checkedInBookingsEl = document.getElementById('checkedInBookings');
const todayBookingsEl = document.getElementById('todayBookings');
const totalGuestsEl = document.getElementById('totalGuests');
const currentGuestsEl = document.getElementById('currentGuests');
const totalRevenueEl = document.getElementById('totalRevenue');
const monthRevenueEl = document.getElementById('monthRevenue');
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af

// Tab buttons
const tabButtons = document.querySelectorAll('.tab-btn');

// Event Listeners
// Form submissions
<<<<<<< HEAD
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
=======
addRoomForm.addEventListener('submit', handleAddRoom);
addGuestForm.addEventListener('submit', handleAddGuest);
addBookingForm.addEventListener('submit', handleAddBooking);

// Search buttons
roomSearchBtn.addEventListener('click', () => handleSearch('rooms', roomSearchInput.value));
guestSearchBtn.addEventListener('click', () => handleSearch('guests', guestSearchInput.value));
bookingSearchBtn.addEventListener('click', () => handleSearch('bookings', bookingSearchInput.value));

// Search inputs (Enter key)
roomSearchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch('rooms', roomSearchInput.value);
});
guestSearchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch('guests', guestSearchInput.value);
});
bookingSearchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch('bookings', bookingSearchInput.value);
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
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
<<<<<<< HEAD
loadCustomers();
loadTransactions();
loadLoans();
=======
loadRooms();
loadGuests();
loadBookings();
populateBookingDropdowns();
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af

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
        
<<<<<<< HEAD
        // Update customer stats
        totalCustomersEl.textContent = data.customers.total;
        activeCustomersEl.textContent = data.customers.active;
        
        // Update loan stats
        activeLoansEl.textContent = data.loans.active;
        
        // Update total balance
        totalBalanceEl.textContent = `₹${data.totalBalance.toFixed(2)}`;
=======
        // Update room stats
        totalRoomsEl.textContent = data.rooms.total;
        availableRoomsEl.textContent = data.rooms.available;
        occupiedRoomsEl.textContent = data.rooms.occupied;
        
        // Update booking stats
        totalBookingsEl.textContent = data.bookings.total;
        checkedInBookingsEl.textContent = data.bookings.checkedIn;
        
        // Update guest stats
        totalGuestsEl.textContent = data.guests.total;
        currentGuestsEl.textContent = data.bookings.checkedIn;
        
        // Update revenue
        totalRevenueEl.textContent = `$${data.revenue.toFixed(2)}`;
        monthRevenueEl.textContent = `$${data.revenue.toFixed(2)}`; // Simplified for demo
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

<<<<<<< HEAD
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
=======
// Room Functions
async function loadRooms() {
    try {
        const response = await fetch(`${API_URL}/rooms`);
        const rooms = await response.json();
        renderRoomsTable(rooms);
    } catch (error) {
        console.error('Error loading rooms:', error);
        alert('Error loading rooms. Please try again.');
    }
}

async function handleAddRoom(e) {
    e.preventDefault();
    
    const roomNumber = document.getElementById('roomNumber').value;
    const roomType = document.getElementById('roomType').value;
    const price = document.getElementById('price').value;
    const floor = document.getElementById('floor').value;
    const amenities = document.getElementById('amenities').value.split(',').map(item => item.trim());

    try {
        const response = await fetch(`${API_URL}/rooms`, {
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
<<<<<<< HEAD
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
=======
            body: JSON.stringify({ 
                roomNumber, 
                roomType, 
                price: parseFloat(price), 
                floor: parseInt(floor),
                amenities
            })
        });

        if (!response.ok) {
            throw new Error('Failed to add room');
        }

        addRoomForm.reset();
        loadRooms();
        loadDashboard();
        populateBookingDropdowns();
    } catch (error) {
        console.error('Error adding room:', error);
        alert('Error adding room. Please try again.');
    }
}

async function handleEditRoom(id) {
    try {
        const response = await fetch(`${API_URL}/rooms/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch room details');
        }
        const room = await response.json();
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af

        // Create a form for editing
        const form = document.createElement('form');
        form.innerHTML = `
            <div class="edit-form">
<<<<<<< HEAD
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
=======
                <h3>Edit Room</h3>
                <div class="form-group">
                    <label for="editRoomNumber">Room Number:</label>
                    <input type="text" id="editRoomNumber" value="${room.roomNumber}" required>
                </div>
                <div class="form-group">
                    <label for="editRoomType">Room Type:</label>
                    <select id="editRoomType" required>
                        <option value="Standard" ${room.roomType === 'Standard' ? 'selected' : ''}>Standard</option>
                        <option value="Deluxe" ${room.roomType === 'Deluxe' ? 'selected' : ''}>Deluxe</option>
                        <option value="Suite" ${room.roomType === 'Suite' ? 'selected' : ''}>Suite</option>
                        <option value="Presidential" ${room.roomType === 'Presidential' ? 'selected' : ''}>Presidential</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editPrice">Price:</label>
                    <input type="number" id="editPrice" value="${room.price}" required>
                </div>
                <div class="form-group">
                    <label for="editFloor">Floor:</label>
                    <input type="number" id="editFloor" value="${room.floor}" required>
                </div>
                <div class="form-group">
                    <label for="editStatus">Status:</label>
                    <select id="editStatus" required>
                        <option value="Available" ${room.status === 'Available' ? 'selected' : ''}>Available</option>
                        <option value="Occupied" ${room.status === 'Occupied' ? 'selected' : ''}>Occupied</option>
                        <option value="Maintenance" ${room.status === 'Maintenance' ? 'selected' : ''}>Maintenance</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editAmenities">Amenities (comma separated):</label>
                    <input type="text" id="editAmenities" value="${room.amenities.join(', ')}">
                </div>
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
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
            
<<<<<<< HEAD
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
=======
            const updatedRoom = {
                roomNumber: document.getElementById('editRoomNumber').value,
                roomType: document.getElementById('editRoomType').value,
                price: parseFloat(document.getElementById('editPrice').value),
                floor: parseInt(document.getElementById('editFloor').value),
                status: document.getElementById('editStatus').value,
                amenities: document.getElementById('editAmenities').value.split(',').map(item => item.trim())
            };

            try {
                const updateResponse = await fetch(`${API_URL}/rooms/${id}`, {
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
<<<<<<< HEAD
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
=======
                    body: JSON.stringify(updatedRoom)
                });

                if (!updateResponse.ok) {
                    throw new Error('Failed to update room');
                }

                modal.remove();
                loadRooms();
                loadDashboard();
                populateBookingDropdowns();
            } catch (error) {
                console.error('Error updating room:', error);
                alert('Error updating room. Please try again.');
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
            }
        });

        // Handle cancel
        form.querySelector('.cancel-btn').addEventListener('click', () => {
            modal.remove();
        });
    } catch (error) {
<<<<<<< HEAD
        console.error('Error fetching customer details:', error);
        alert('Error fetching customer details. Please try again.');
    }
}

async function handleDeleteCustomer(id) {
    if (!confirm('Are you sure you want to delete this customer?')) {
=======
        console.error('Error fetching room details:', error);
        alert('Error fetching room details. Please try again.');
    }
}

async function handleDeleteRoom(id) {
    if (!confirm('Are you sure you want to delete this room?')) {
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
        return;
    }

    try {
<<<<<<< HEAD
        const response = await fetch(`${API_URL}/customers/${id}`, {
=======
        const response = await fetch(`${API_URL}/rooms/${id}`, {
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
            method: 'DELETE'
        });

        if (!response.ok) {
<<<<<<< HEAD
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
=======
            throw new Error('Failed to delete room');
        }

        loadRooms();
        loadDashboard();
        populateBookingDropdowns();
    } catch (error) {
        console.error('Error deleting room:', error);
        alert('Error deleting room. Please try again.');
    }
}

function renderRoomsTable(rooms) {
    roomsBody.innerHTML = '';
    
    rooms.forEach(room => {
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
        const row = document.createElement('tr');
        
        // Determine status badge class
        let statusClass = '';
<<<<<<< HEAD
        switch (customer.status) {
            case 'Active':
                statusClass = 'status-active';
                break;
            case 'Inactive':
                statusClass = 'status-inactive';
                break;
            case 'Frozen':
                statusClass = 'status-frozen';
=======
        switch (room.status) {
            case 'Available':
                statusClass = 'status-available';
                break;
            case 'Occupied':
                statusClass = 'status-occupied';
                break;
            case 'Maintenance':
                statusClass = 'status-maintenance';
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
                break;
        }
        
        row.innerHTML = `
<<<<<<< HEAD
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
=======
            <td>${room.roomNumber}</td>
            <td>${room.roomType}</td>
            <td>${room.floor}</td>
            <td>$${room.price.toFixed(2)}</td>
            <td><span class="status-badge ${statusClass}">${room.status}</span></td>
            <td>${room.amenities ? room.amenities.join(', ') : ''}</td>
            <td>
                <button class="action-btn edit-btn" onclick="handleEditRoom('${room._id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="handleDeleteRoom('${room._id}')">Delete</button>
            </td>
        `;
        roomsBody.appendChild(row);
    });
}

// Guest Functions
async function loadGuests() {
    try {
        const response = await fetch(`${API_URL}/guests`);
        const guests = await response.json();
        renderGuestsTable(guests);
        populateBookingDropdowns();
    } catch (error) {
        console.error('Error loading guests:', error);
        alert('Error loading guests. Please try again.');
    }
}

async function handleAddGuest(e) {
    e.preventDefault();
    
    const name = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    const phone = document.getElementById('guestPhone').value;
    const address = document.getElementById('guestAddress').value;
    const idProof = document.getElementById('idProof').value;
    const idNumber = document.getElementById('idNumber').value;

    try {
        const response = await fetch(`${API_URL}/guests`, {
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
<<<<<<< HEAD
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
=======
            body: JSON.stringify({ 
                name, 
                email, 
                phone, 
                address, 
                idProof, 
                idNumber 
            })
        });

        if (!response.ok) {
            throw new Error('Failed to add guest');
        }

        addGuestForm.reset();
        loadGuests();
        loadDashboard();
    } catch (error) {
        console.error('Error adding guest:', error);
        alert('Error adding guest. Please try again.');
    }
}

async function handleEditGuest(id) {
    try {
        const response = await fetch(`${API_URL}/guests/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch guest details');
        }
        const guest = await response.json();
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af

        // Create a form for editing
        const form = document.createElement('form');
        form.innerHTML = `
            <div class="edit-form">
<<<<<<< HEAD
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
=======
                <h3>Edit Guest</h3>
                <div class="form-group">
                    <label for="editGuestName">Name:</label>
                    <input type="text" id="editGuestName" value="${guest.name}" required>
                </div>
                <div class="form-group">
                    <label for="editGuestEmail">Email:</label>
                    <input type="email" id="editGuestEmail" value="${guest.email}" required>
                </div>
                <div class="form-group">
                    <label for="editGuestPhone">Phone:</label>
                    <input type="tel" id="editGuestPhone" value="${guest.phone}" required>
                </div>
                <div class="form-group">
                    <label for="editGuestAddress">Address:</label>
                    <textarea id="editGuestAddress" required>${guest.address}</textarea>
                </div>
                <div class="form-group">
                    <label for="editIdProof">ID Proof Type:</label>
                    <input type="text" id="editIdProof" value="${guest.idProof}" required>
                </div>
                <div class="form-group">
                    <label for="editIdNumber">ID Number:</label>
                    <input type="text" id="editIdNumber" value="${guest.idNumber}" required>
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
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
            
<<<<<<< HEAD
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
=======
            const updatedGuest = {
                name: document.getElementById('editGuestName').value,
                email: document.getElementById('editGuestEmail').value,
                phone: document.getElementById('editGuestPhone').value,
                address: document.getElementById('editGuestAddress').value,
                idProof: document.getElementById('editIdProof').value,
                idNumber: document.getElementById('editIdNumber').value
            };

            try {
                const updateResponse = await fetch(`${API_URL}/guests/${id}`, {
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
<<<<<<< HEAD
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
=======
                    body: JSON.stringify(updatedGuest)
                });

                if (!updateResponse.ok) {
                    throw new Error('Failed to update guest');
                }

                modal.remove();
                loadGuests();
                loadDashboard();
                populateBookingDropdowns();
            } catch (error) {
                console.error('Error updating guest:', error);
                alert('Error updating guest. Please try again.');
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
            }
        });

        // Handle cancel
        form.querySelector('.cancel-btn').addEventListener('click', () => {
            modal.remove();
        });
    } catch (error) {
<<<<<<< HEAD
        console.error('Error fetching loan details:', error);
        alert('Error fetching loan details. Please try again.');
    }
}

// Add function to handle deleting a loan
async function handleDeleteLoan(id) {
    if (!confirm('Are you sure you want to delete this loan?')) {
=======
        console.error('Error fetching guest details:', error);
        alert('Error fetching guest details. Please try again.');
    }
}

async function handleDeleteGuest(id) {
    if (!confirm('Are you sure you want to delete this guest?')) {
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
        return;
    }

    try {
<<<<<<< HEAD
        const response = await fetch(`${API_URL}/loans/${id}`, {
=======
        const response = await fetch(`${API_URL}/guests/${id}`, {
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
            method: 'DELETE'
        });

        if (!response.ok) {
<<<<<<< HEAD
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
=======
            throw new Error('Failed to delete guest');
        }

        loadGuests();
        loadDashboard();
        populateBookingDropdowns();
    } catch (error) {
        console.error('Error deleting guest:', error);
        alert('Error deleting guest. Please try again.');
    }
}

function renderGuestsTable(guests) {
    guestsBody.innerHTML = '';
    
    guests.forEach(guest => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${guest.name}</td>
            <td>${guest.email}</td>
            <td>${guest.phone}</td>
            <td>${guest.address}</td>
            <td>${guest.idProof}</td>
            <td>${guest.idNumber}</td>
            <td>
                <button class="action-btn edit-btn" onclick="handleEditGuest('${guest._id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="handleDeleteGuest('${guest._id}')">Delete</button>
            </td>
        `;
        guestsBody.appendChild(row);
    });
}

// Booking Functions
async function loadBookings() {
    try {
        const response = await fetch(`${API_URL}/bookings`);
        const bookings = await response.json();
        renderBookingsTable(bookings);
    } catch (error) {
        console.error('Error loading bookings:', error);
        alert('Error loading bookings. Please try again.');
    }
}

async function handleAddBooking(e) {
    e.preventDefault();
    
    const guest = document.getElementById('bookingGuest').value;
    const room = document.getElementById('bookingRoom').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const totalAmount = document.getElementById('totalAmount').value;
    const paymentStatus = document.getElementById('paymentStatus').value;
    const specialRequests = document.getElementById('specialRequests').value;

    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                guest, 
                room, 
                checkIn, 
                checkOut, 
                totalAmount: parseFloat(totalAmount), 
                paymentStatus,
                specialRequests
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create booking');
        }

        addBookingForm.reset();
        loadBookings();
        loadDashboard();
    } catch (error) {
        console.error('Error creating booking:', error);
        alert('Error creating booking. Please try again.');
    }
}

async function handleEditBooking(id) {
    try {
        const response = await fetch(`${API_URL}/bookings/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch booking details');
        }
        const booking = await response.json();

        // Create a form for editing
        const form = document.createElement('form');
        form.innerHTML = `
            <div class="edit-form">
                <h3>Edit Booking</h3>
                <div class="form-group">
                    <label for="editBookingStatus">Status:</label>
                    <select id="editBookingStatus" required>
                        <option value="Confirmed" ${booking.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Checked In" ${booking.status === 'Checked In' ? 'selected' : ''}>Checked In</option>
                        <option value="Checked Out" ${booking.status === 'Checked Out' ? 'selected' : ''}>Checked Out</option>
                        <option value="Cancelled" ${booking.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editPaymentStatus">Payment Status:</label>
                    <select id="editPaymentStatus" required>
                        <option value="Pending" ${booking.paymentStatus === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Paid" ${booking.paymentStatus === 'Paid' ? 'selected' : ''}>Paid</option>
                        <option value="Refunded" ${booking.paymentStatus === 'Refunded' ? 'selected' : ''}>Refunded</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editSpecialRequests">Special Requests:</label>
                    <textarea id="editSpecialRequests">${booking.specialRequests || ''}</textarea>
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
            
            const updatedBooking = {
                status: document.getElementById('editBookingStatus').value,
                paymentStatus: document.getElementById('editPaymentStatus').value,
                specialRequests: document.getElementById('editSpecialRequests').value
            };

            try {
                const updateResponse = await fetch(`${API_URL}/bookings/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedBooking)
                });

                if (!updateResponse.ok) {
                    throw new Error('Failed to update booking');
                }

                modal.remove();
                loadBookings();
                loadDashboard();
            } catch (error) {
                console.error('Error updating booking:', error);
                alert('Error updating booking. Please try again.');
            }
        });

        // Handle cancel
        form.querySelector('.cancel-btn').addEventListener('click', () => {
            modal.remove();
        });
    } catch (error) {
        console.error('Error fetching booking details:', error);
        alert('Error fetching booking details. Please try again.');
    }
}

async function handleDeleteBooking(id) {
    if (!confirm('Are you sure you want to delete this booking?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/bookings/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete booking');
        }

        loadBookings();
        loadDashboard();
    } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Error deleting booking. Please try again.');
    }
}

function renderBookingsTable(bookings) {
    bookingsBody.innerHTML = '';
    
    bookings.forEach(booking => {
        const row = document.createElement('tr');
        
        // Format dates
        const checkInDate = new Date(booking.checkIn).toLocaleDateString();
        const checkOutDate = new Date(booking.checkOut).toLocaleDateString();
        
        // Determine status badge classes
        let statusClass = '';
        let paymentClass = '';
        
        switch (booking.status) {
            case 'Confirmed':
                statusClass = 'status-confirmed';
                break;
            case 'Checked In':
                statusClass = 'status-checked-in';
                break;
            case 'Checked Out':
                statusClass = 'status-checked-out';
                break;
            case 'Cancelled':
                statusClass = 'status-cancelled';
                break;
        }
        
        switch (booking.paymentStatus) {
            case 'Pending':
                paymentClass = 'status-pending';
                break;
            case 'Paid':
                paymentClass = 'status-paid';
                break;
            case 'Refunded':
                paymentClass = 'status-refunded';
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
                break;
        }
        
        row.innerHTML = `
<<<<<<< HEAD
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

=======
            <td>${booking.guest ? booking.guest.name : 'N/A'}</td>
            <td>${booking.room ? booking.room.roomNumber : 'N/A'}</td>
            <td>${checkInDate}</td>
            <td>${checkOutDate}</td>
            <td><span class="status-badge ${statusClass}">${booking.status}</span></td>
            <td>$${booking.totalAmount.toFixed(2)}</td>
            <td><span class="status-badge ${paymentClass}">${booking.paymentStatus}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="handleEditBooking('${booking._id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="handleDeleteBooking('${booking._id}')">Delete</button>
            </td>
        `;
        bookingsBody.appendChild(row);
    });
}

// Populate dropdowns for booking form
async function populateBookingDropdowns() {
    try {
        // Get guests
        const guestsResponse = await fetch(`${API_URL}/guests`);
        const guests = await guestsResponse.json();
        
        // Get available rooms
        const roomsResponse = await fetch(`${API_URL}/rooms`);
        const rooms = await roomsResponse.json();
        const availableRooms = rooms.filter(room => room.status === 'Available');
        
        // Populate guest dropdown
        const guestDropdown = document.getElementById('bookingGuest');
        guestDropdown.innerHTML = '<option value="">Select Guest</option>';
        guests.forEach(guest => {
            guestDropdown.innerHTML += `<option value="${guest._id}">${guest.name} (${guest.email})</option>`;
        });
        
        // Populate room dropdown
        const roomDropdown = document.getElementById('bookingRoom');
        roomDropdown.innerHTML = '<option value="">Select Room</option>';
        availableRooms.forEach(room => {
            roomDropdown.innerHTML += `<option value="${room._id}">${room.roomNumber} - ${room.roomType} ($${room.price})</option>`;
        });
    } catch (error) {
        console.error('Error populating dropdowns:', error);
    }
}

>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
// Search Functions
async function handleSearch(type, searchTerm) {
    if (!searchTerm.trim()) {
        switch (type) {
<<<<<<< HEAD
            case 'customers':
                loadCustomers();
                break;
            case 'transactions':
                loadTransactions();
                break;
            case 'loans':
                loadLoans();
=======
            case 'rooms':
                loadRooms();
                break;
            case 'guests':
                loadGuests();
                break;
            case 'bookings':
                loadBookings();
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
                break;
        }
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${type}/search?q=${encodeURIComponent(searchTerm)}`);
        const results = await response.json();
        
        switch (type) {
<<<<<<< HEAD
            case 'customers':
                renderCustomersTable(results);
                break;
            case 'transactions':
                renderTransactionsTable(results);
                break;
            case 'loans':
                renderLoansTable(results);
=======
            case 'rooms':
                renderRoomsTable(results);
                break;
            case 'guests':
                renderGuestsTable(results);
                break;
            case 'bookings':
                renderBookingsTable(results);
>>>>>>> 65fe9be3b724494e6f05b1a055bf7c3c4d3984af
                break;
        }
    } catch (error) {
        console.error(`Error searching ${type}:`, error);
        alert(`Error searching ${type}. Please try again.`);
    }
} 