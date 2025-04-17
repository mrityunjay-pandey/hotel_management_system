# Hotel Management System

A modern web-based hotel management system built with Node.js, Express, MongoDB, and vanilla JavaScript. This system provides a comprehensive solution for managing hotel operations including room management, guest tracking, and booking management.

## Features

### Dashboard
- Real-time overview of hotel statistics
- Total rooms, available rooms, and occupied rooms count
- Current bookings and guest information
- Revenue tracking

### Room Management
- Add, edit, and delete rooms
- Room status tracking (Available, Occupied, Maintenance)
- Room type categorization (Standard, Deluxe, Suite, Presidential)
- Room amenities management
- Floor-wise room organization

### Guest Management
- Comprehensive guest information storage
- Guest search functionality
- ID proof and contact information tracking
- Guest history management

### Booking Management
- Create and manage bookings
- Check-in and check-out tracking
- Payment status monitoring
- Special requests handling
- Booking search functionality

## Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Additional Libraries**: 
  - mongoose (MongoDB ODM)
  - cors (Cross-Origin Resource Sharing)
  - dotenv (Environment Variables Management)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mrityunjay-pandey/hotel_management_system.git
   cd hotel_management_system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/hotel-management
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Access the application:
   Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Rooms
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create a new room
- `PUT /api/rooms/:id` - Update a room
- `DELETE /api/rooms/:id` - Delete a room
- `GET /api/rooms/search` - Search rooms

### Guests
- `GET /api/guests` - Get all guests
- `POST /api/guests` - Create a new guest
- `PUT /api/guests/:id` - Update a guest
- `DELETE /api/guests/:id` - Delete a guest
- `GET /api/guests/search` - Search guests

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/:id` - Update a booking
- `DELETE /api/bookings/:id` - Delete a booking
- `GET /api/bookings/search` - Search bookings

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## Project Structure

```
hotel-management-system/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server.js
├── package.json
├── .env
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- MongoDB for the database
- Express.js for the web framework
- Node.js for the runtime environment 