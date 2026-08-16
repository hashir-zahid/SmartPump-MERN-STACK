# ⛽ SmartPump

**SmartPump** is a full-stack fuel station management system. It gives station admins a live dashboard to manage pump machines, fuel types, central stock, and revenue — with secure authentication — while customers get a self-service kiosk to buy fuel and print a receipt.

---

## 🧭 What the project does

SmartPump models a real fuel station's day-to-day operations end to end:

- A station has one **admin account** that registers the station (name, location, description) and logs in to manage it.
- The station has a **main reserve stock** of fuel per type (e.g. Petrol, Diesel), which the admin replenishes in bulk.
- The station has several **pump machines**, each assigned a fuel type, a maximum capacity, and a current fuel level. Fuel is transferred from the main reserve stock into a machine via a "refill" action, which deducts from the reserve and tops up the machine.
- Each **fuel type** has its own price per liter, managed independently from the machines.
- Customers use a **kiosk view** to select a machine/fuel and complete a purchase, which deducts fuel from that machine and generates a transaction.
- Every transaction produces a **printable receipt** showing fuel amount, price, a small slip fee, and the total paid.
- The admin has a **revenue analytics** view that aggregates all transactions — filterable by machine, fuel type, and date range — split into fuel revenue, slip-fee revenue, and total collected.

---

## ✨ Features

**Admin (authenticated)**
- Register/login as a station admin, with JWT-based session handling and protected routes on the frontend
- Dashboard with live station stats: total machines, low-fuel count, total capacity, fuel on hand
- Add, edit, and monitor pump machines, each with a live fuel-level gauge and low-fuel warning
- Manage fuel types and their price per liter
- View and replenish main reserve stock per fuel type
- Refill individual machines from the main reserve stock
- Revenue analytics dashboard with filters and machine/fuel-type breakdowns
- Update admin/station profile (name, pump name, location, description)

**Customer (public)**
- Kiosk interface to make a fuel purchase against a selected machine
- Receipt slip generated per transaction, with print/download support

---

## 🛠️ Tech Stack

**Frontend**
- React (JavaScript)
- React Router — client-side routing and protected routes
- Tailwind CSS — utility-first styling across the whole app
- shadcn/ui — accessible, composable UI primitives
- Aceternity UI — animated/decorative components for richer visual flourishes
- Axios — API client layer, organized by endpoint modules (machines, fuel types, stock, revenue, auth)

**Backend**
- Node.js + Express — REST API
- MongoDB Atlas + Mongoose — data storage and modeling
- **JWT (JSON Web Tokens)** — access tokens issued on login/register, used to authenticate and protect admin-only routes
- **bcrypt** — hashes admin passwords before storing them; passwords are never stored in plain text
- Nodemon — auto-restarting dev server
- dotenv — environment variable management via `.env`

---

## 🔐 Authentication Flow

1. Admin registers with name, email, password, and station details.
2. The backend hashes the password with **bcrypt** before saving the admin document.
3. On login, the submitted password is compared against the stored hash using bcrypt; on success, the backend signs a **JWT access token** containing the admin's identity.
4. The frontend stores the token/admin info and attaches the token to subsequent API requests (via an auth context / `useAuth` hook).
5. Protected frontend routes (Dashboard, Main Stock, Fuel Types, Revenue, Update Profile) check authentication state and redirect unauthenticated users to Login.
6. Protected backend routes verify the JWT on each request before allowing access to admin-only operations (creating/updating machines, fuel types, stock, revenue data).

---

## 💧 Core Data Flow

```
Main Stock (per fuel type)
      │  Refill machine (transfer amount)
      ▼
Pump Machine (fuel type, capacity, current quantity)
      │  Customer purchase (kiosk)
      ▼
Transaction (fuel amount + slip fee = total paid)
      │
      ├──► Receipt Slip (printable)
      └──► Revenue Analytics (aggregated, filterable)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- A MongoDB Atlas cluster (or local MongoDB instance)

### Backend
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

Run in dev mode:
```bash
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Update the frontend's API base URL to point at wherever the backend is running.

---

## 🔑 Environment Variables

| Variable      | Description                                      |
|---------------|---------------------------------------------------|
| `PORT`        | Port the backend server runs on                    |
| `MONGO_URI`   | MongoDB Atlas connection string                    |
| `JWT_SECRET`  | Secret key used to sign/verify JWT access tokens   |

---
