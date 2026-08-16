# SmartPump Frontend

A modern React web application for the SmartPump fuel management system. Built with Vite, React 19, Tailwind CSS, and shadcn/ui components, providing an intuitive interface for customers and administrators to manage fuel transactions, inventory, and revenue.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Components](#components)
- [Pages](#pages)
- [Context & State Management](#context--state-management)
- [API Integration](#api-integration)
- [Styling](#styling)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Contributing](#contributing)

## Features

- 🔐 User Authentication (Login/Register)
- 👤 Admin Dashboard with comprehensive statistics
- ⛽ Fuel Type Management
- 🤖 Machine/Pump Management Interface
- 📦 Stock Management & Refill Tracking
- 💰 Revenue Analytics & Reporting
- 🧾 Digital Receipt Generation
- 👥 User Management Interface
- 🎨 Modern UI with Tailwind CSS & shadcn/ui
- 📱 Responsive Design
- ⚡ Fast Development with Vite
- 🔒 Protected Routes with JWT Authentication

## Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4, PostCSS
- **UI Components:** shadcn/ui, Base UI, Aceternity UI
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Linting:** ESLint
- **Code Quality:** Tailwind CSS utilities, Class Variance Authority

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18.0 or higher)
- **npm** (v9.0 or higher)
- A code editor (VS Code recommended)
- SmartPump Backend running (see backend README)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hashir-zahid/SmartPump-MERN-STACK.git
   cd SmartPump/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment configuration**
   ```bash
   cp .env.example .env.local
   ```
   Configure your `.env.local` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_API_TIMEOUT=10000
   ```

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API base URL | Yes |
| `VITE_API_TIMEOUT` | API request timeout in ms | No |

### Axios Configuration

The API client is configured in [src/api/axios.js](src/api/axios.js). It automatically includes:
- Base URL from environment variables
- Request timeout handling
- JWT token in Authorization headers
- Error interceptors

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx                # Main application component
│   ├── App.css                # App-level styles
│   ├── main.jsx               # Entry point
│   ├── index.css              # Global styles
│   ├── api/                   # API integration
│   │   ├── axios.js           # Axios instance configuration
│   │   └── endpoints/         # API endpoint definitions
│   │       ├── auth.api.js
│   │       ├── fuelTypes.api.js
│   │       ├── machines.api.js
│   │       ├── revenue.api.js
│   │       └── stock.api.js
│   ├── assets/                # Static assets
│   ├── components/            # Reusable components
│   │   ├── common/            # Shared components
│   │   │   ├── Loader.jsx
│   │   │   └── Navbar.jsx
│   │   ├── modals/            # Modal components
│   │   │   ├── FuelTypeModal.jsx
│   │   │   ├── MachineModal.jsx
│   │   │   └── StockRefillModal.jsx
│   │   └── ui/                # UI components (shadcn)
│   │       └── button.jsx
│   ├── context/               # Context API
│   │   └── AuthContext.jsx    # Authentication context
│   ├── features/              # Feature-specific components
│   │   ├── machines/
│   │   │   └── MachineCard.jsx
│   │   └── receipts/
│   │       └── ReceiptSlip.jsx
│   ├── hooks/                 # Custom React hooks
│   │   └── useAuth.js         # Authentication hook
│   ├── lib/                   # Utility libraries
│   │   └── utils.js
│   ├── pages/                 # Page components
│   │   ├── CustomerKiosk.jsx  # Customer interface
│   │   ├── Dashboard.jsx      # Admin dashboard
│   │   ├── FuelTypes.jsx      # Fuel type management
│   │   ├── MainStock.jsx      # Stock management
│   │   ├── ReceiptPage.jsx    # Receipt display
│   │   ├── Revenue.jsx        # Revenue reports
│   │   ├── UpdateAdmin.jsx    # Admin settings
│   │   └── auth/
│   │       ├── Login.jsx      # Login page
│   │       └── Register.jsx   # Registration page
│   ├── routes/                # Routing configuration
│   │   ├── AppRoutes.jsx      # Route definitions
│   │   └── ProtectedRoute.jsx # Route protection wrapper
│   ├── store/                 # State management
│   │   └── store.js           # Redux/Zustand configuration
│   └── utils/                 # Utility functions
│       └── formatCurrency.js  # Currency formatting
├── public/                    # Static files
├── components.json            # shadcn/ui components config
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.cjs         # PostCSS configuration
├── eslint.config.js           # ESLint configuration
└── package.json
```

## Getting Started

### Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173` (default Vite port) with hot module replacement enabled.

### Access Different User Roles

**Admin Login:**
- Access dashboard with full management capabilities
- Manage fuel types, machines, stock, and view revenue

**Customer Login:**
- Access fuel kiosk for fuel purchases
- View transaction history
- Download receipts

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

## Components

### Common Components

#### Navbar
- Navigation bar with user menu
- Responsive design
- Authentication state display

#### Loader
- Loading spinner component
- Used during API calls

### Modal Components

#### FuelTypeModal
- Create/Edit fuel types
- Form validation
- API integration

#### MachineModal
- Create/Edit machines
- Location and capacity management
- Fuel type assignment

#### StockRefillModal
- Refill inventory
- Quantity input
- Confirmation

### Feature Components

#### MachineCard
- Display machine information
- Status indicator
- Quick actions

#### ReceiptSlip
- Transaction receipt display
- Print functionality
- QR code support (optional)

## Pages

### Authentication Pages
- **Login.jsx** - User login with email/password
- **Register.jsx** - New user registration

### Admin Pages
- **Dashboard.jsx** - Overview with statistics and charts
- **FuelTypes.jsx** - Manage fuel types and pricing
- **MainStock.jsx** - Track and refill inventory
- **Revenue.jsx** - View revenue reports and analytics
- **UpdateAdmin.jsx** - Admin profile and settings

### Customer Pages
- **CustomerKiosk.jsx** - Fuel purchase interface
- **ReceiptPage.jsx** - View and print receipts

## Context & State Management

### AuthContext
Manages global authentication state:
- User information
- Authentication token
- Login/Logout functions
- Protected route validation

Usage:
```javascript
import { useAuth } from '@/hooks/useAuth';

const { user, token, login, logout } = useAuth();
```

## API Integration

The frontend communicates with the backend through Axios instances configured in `/src/api/endpoints/`.

### Example: Authentication
```javascript
// src/api/endpoints/auth.api.js
export const loginUser = async (email, password) => {
  const response = await apiClient.post('/auth/login', {
    email,
    password
  });
  return response.data;
};
```

### Example: Usage in Component
```javascript
import { loginUser } from '@/api/endpoints/auth.api.js';

const handleLogin = async (credentials) => {
  try {
    const data = await loginUser(credentials.email, credentials.password);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

## Styling

### Tailwind CSS
- Utility-first CSS framework
- Configured with v4 and PostCSS
- Custom theme extensions in `tailwind.config.js`

### shadcn/ui
- Pre-built accessible UI components
- Customizable with Tailwind CSS
- Component registry in `components.json`

### Custom Styles
- Global styles in `index.css`
- App-specific styles in `App.css`
- Component-scoped styling with Tailwind utility classes

## Development

### Code Quality
```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Best Practices
- Use functional components with hooks
- Leverage Context API for state management
- Create reusable components in `/components`
- Keep API calls in separate endpoint files
- Use TypeScript types where applicable
- Follow Tailwind CSS naming conventions

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/routes/AppRoutes.jsx`
3. Wrap with `ProtectedRoute` if authentication required
4. Import and link in navigation

### Adding New API Endpoints
1. Create endpoint file in `src/api/endpoints/`
2. Define functions using axios instance
3. Export and import in components as needed
4. Add error handling and loading states

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## Environment Setup for Production

Create `.env.production` or update deployment environment variables:
```env
VITE_API_URL=https://api.smartpump.com/api
VITE_API_TIMEOUT=15000
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

3. Run linting to ensure code quality
   ```bash
   npm run lint
   ```

4. Push to your branch
   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a Pull Request with a clear description

## Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

### CORS Issues
Ensure the backend `VITE_API_URL` matches your backend server URL and CORS is properly configured.

### Build Errors
Clear cache and reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Connection Failed
- Verify backend server is running
- Check `VITE_API_URL` in `.env.local`
- Verify network connectivity
- Check browser console for detailed error messages


