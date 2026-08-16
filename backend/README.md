# SmartPump Backend

A RESTful API backend for the SmartPump fuel management system built with Express.js and MongoDB. This application manages fuel stations, machines, inventory, transactions, and user authentication.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Development](#development)
- [Contributing](#contributing)


## Features

- 🔐 JWT-based Authentication
- 👤 User Management (Admin & Customer)
- ⛽ Fuel Type Management
- 🤖 Machine/Pump Management
- 📦 Stock Management & Refill Tracking
- 💰 Revenue Tracking & Reporting
- 🔒 Password Encryption with Bcrypt
- 🛡️ CORS Security
- ⚠️ Comprehensive Error Handling
- 📝 Transaction Logging

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14.0 or higher)
- **npm** (v6.0 or higher)
- **MongoDB** (Local or Atlas)
- A code editor (VS Code recommended)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hashir-zahid/SmartPump-MERN-STACK
   cd SmartPump/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   ```bash
   cp .env.example .env
   ```
   Configure your `.env` file with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | No |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `NODE_ENV` | Environment (development/production) | No |

### Database Setup

The application automatically initializes MongoDB collections based on the models defined in `/src/models/`. Ensure your MongoDB instance is running and accessible via the `MONGODB_URI`.

## Project Structure

```
backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── config/
│   │   └── db.js              # Database connection setup
│   ├── controllers/           # Request handlers
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── fuelType.controller.js
│   │   ├── machine.controller.js
│   │   ├── stock.controller.js
│   │   └── revenue.controller.js
│   ├── middlewares/           # Custom middleware
│   │   ├── auth.middleware.js # JWT verification
│   │   └── error.middleware.js
│   ├── models/                # MongoDB schemas
│   │   ├── admin.model.js
│   │   ├── user.model.js
│   │   ├── fuelType.model.js
│   │   ├── machine.model.js
│   │   ├── mainStock.model.js
│   │   └── transaction.model.js
│   ├── routes/                # API route definitions
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── fuelType.routes.js
│   │   ├── machine.routes.js
│   │   ├── stock.routes.js
│   │   └── revenue.routes.js
│   └── utils/                 # Utility functions
│       ├── apiError.js        # Error handling
│       ├── apiResponse.js     # Response formatting
│       └── asyncHandler.js    # Async wrapper
├── package.json
└── README.md
```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get current user profile (Protected)

### User Routes (`/api/users`)
- `GET /api/users` - Get all users (Protected)
- `GET /api/users/:id` - Get user by ID (Protected)
- `PUT /api/users/:id` - Update user (Protected)
- `DELETE /api/users/:id` - Delete user (Protected)

### Fuel Type Routes (`/api/fuelTypes`)
- `GET /api/fuelTypes` - Get all fuel types
- `POST /api/fuelTypes` - Create fuel type (Protected)
- `GET /api/fuelTypes/:id` - Get fuel type by ID
- `PUT /api/fuelTypes/:id` - Update fuel type (Protected)
- `DELETE /api/fuelTypes/:id` - Delete fuel type (Protected)

### Machine Routes (`/api/machines`)
- `GET /api/machines` - Get all machines
- `POST /api/machines` - Create machine (Protected)
- `GET /api/machines/:id` - Get machine by ID
- `PUT /api/machines/:id` - Update machine (Protected)
- `DELETE /api/machines/:id` - Delete machine (Protected)

### Stock Routes (`/api/stock`)
- `GET /api/stock` - Get stock information
- `POST /api/stock/refill` - Refill stock (Protected)
- `GET /api/stock/history` - Get refill history (Protected)

### Revenue Routes (`/api/revenue`)
- `GET /api/revenue` - Get revenue data
- `GET /api/revenue/reports` - Get revenue reports (Protected)


## Middleware

### Authentication Middleware (`auth.middleware.js`)
- Verifies JWT tokens
- Extracts user information from tokens
- Protects routes requiring authentication

### Error Middleware (`error.middleware.js`)
- Catches and processes errors
- Returns standardized error responses
- Logs error details for debugging

## Error Handling

The application uses a custom error handling system with the `ApiError` class:

```javascript
// Example
throw new ApiError(400, "Invalid credentials");
```

All errors are caught by the global error middleware and returned in a standardized format:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "data": null
}
```

## Development

### Running the Development Server

```bash
npm run dev
```

The server will start with hot-reload enabled using nodemon. By default, it runs on `http://localhost:5000`.

### Environment Variables for Development

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartpump
JWT_SECRET=your_dev_secret_key
NODE_ENV=development
```


## Contributing

Contributions are welcome! Please follow these steps:

1. Create a new branch for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them
   ```bash
   git commit -m "Add your feature description"
   ```

3. Push to your branch
   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a Pull Request with a clear description of your changes

