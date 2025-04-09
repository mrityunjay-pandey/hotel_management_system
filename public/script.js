// API URL
const API_URL = 'http://localhost:3000/api';

// DOM Elements
// Forms
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

// Tab buttons
const tabButtons = document.querySelectorAll('.tab-btn');

// Event Listeners
// Form submissions
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
loadRooms();
loadGuests();
loadBookings();
populateBookingDropdowns();

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
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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

        // Create a form for editing
        const form = document.createElement('form');
        form.innerHTML = `
            <div class="edit-form">
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
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
            }
        });

        // Handle cancel
        form.querySelector('.cancel-btn').addEventListener('click', () => {
            modal.remove();
        });
    } catch (error) {
        console.error('Error fetching room details:', error);
        alert('Error fetching room details. Please try again.');
    }
}

async function handleDeleteRoom(id) {
    if (!confirm('Are you sure you want to delete this room?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/rooms/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
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
        const row = document.createElement('tr');
        
        // Determine status badge class
        let statusClass = '';
        switch (room.status) {
            case 'Available':
                statusClass = 'status-available';
                break;
            case 'Occupied':
                statusClass = 'status-occupied';
                break;
            case 'Maintenance':
                statusClass = 'status-maintenance';
                break;
        }
        
        row.innerHTML = `
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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

        // Create a form for editing
        const form = document.createElement('form');
        form.innerHTML = `
            <div class="edit-form">
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
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
            }
        });

        // Handle cancel
        form.querySelector('.cancel-btn').addEventListener('click', () => {
            modal.remove();
        });
    } catch (error) {
        console.error('Error fetching guest details:', error);
        alert('Error fetching guest details. Please try again.');
    }
}

async function handleDeleteGuest(id) {
    if (!confirm('Are you sure you want to delete this guest?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/guests/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
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
                break;
        }
        
        row.innerHTML = `
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

// Search Functions
async function handleSearch(type, searchTerm) {
    if (!searchTerm.trim()) {
        switch (type) {
            case 'rooms':
                loadRooms();
                break;
            case 'guests':
                loadGuests();
                break;
            case 'bookings':
                loadBookings();
                break;
        }
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${type}/search?q=${encodeURIComponent(searchTerm)}`);
        const results = await response.json();
        
        switch (type) {
            case 'rooms':
                renderRoomsTable(results);
                break;
            case 'guests':
                renderGuestsTable(results);
                break;
            case 'bookings':
                renderBookingsTable(results);
                break;
        }
    } catch (error) {
        console.error(`Error searching ${type}:`, error);
        alert(`Error searching ${type}. Please try again.`);
    }
} 