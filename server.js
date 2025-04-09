const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add route to get a single room by ID
app.get('/api/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/rooms', async (req, res) => {
    try {
        const room = new Room(req.body);
        const savedRoom = await room.save();
        res.status(201).json(savedRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Guest Routes
app.get('/api/guests', async (req, res) => {
    try {
        const guests = await Guest.find().sort({ name: 1 });
        res.json(guests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Booking Routes
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('guest')
            .populate('room')
            .sort({ checkIn: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search Routes
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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 