## Bakery Store – MERN project

Full‑stack bakery shop demo with **MongoDB, Express, React, Node**.  
Customers can browse cakes and place orders; employees manage orders; admins manage products, reports, and staff.

---

## 1. Features (per role)

- **Customer**
  - Register / login with email + password (JWT).
  - Browse cakes on home page and menu.
  - Filter cakes by category and search by name.
  - Add items to cart (frontend state).
  - Place orders with contact / address info and payment method (stored as text, e.g. COD).
  - Track order status by Order ID.

- **Employee**
  - Login with email + password (`role: "employee"`).
  - View all orders (newest first).
  - Update order status: Pending → Confirmed → Delivering → Delivered / Cancelled.
  - Optionally assign orders to themselves.
  - Update their own profile (name, phone, password).

- **Admin (shop manager)**
  - Login with email + password (`role: "admin"`).
  - CRUD cake products (name, price, category, image).
  - View simple sales report (total revenue/orders, group by day or week).
  - Manage staff accounts (create / delete employees).
  - View performance of each employee (orders handled, total revenue, excluding cancelled orders).

For backend details see `docs/BACKEND_USECASES.md`.

---

## 2. Tech stack

- **Frontend**
  - React + React Router
  - Vite
  - Custom CSS (cream / red theme)
  - Context: `AuthContext` for JWT auth, `CartContext` (not detailed here) for cart

- **Backend**
  - Node.js + Express
  - MongoDB + Mongoose
  - JWT auth (`/api/auth`) with roles: `customer`, `employee`, `admin`

---

## 3. Project structure (high‑level)

- `backend/`
  - `index.js` – Express app & router wiring.
  - `config/db.js` – Mongo connection.
  - `models/`
    - `User.js` – accounts (customer/employee/admin).
    - `Cake.js` – cake products.
    - `Order.js` – orders + status.
  - `middleware/auth.js` – `verifyJWT`, `requireRole`.
  - `routes/`
    - `auth.js` – register/login/me.
    - `cakes.js` – public cake catalogue & search.
    - `orders.js` – create + fetch single order.
    - `users.js` – customer profile.
    - `employees.js` – employee profile & order management.
    - `admin.js` – admin cakes CRUD, reports, staff management.
  - `scripts/seedAdmin.js` – create the first admin user.
  - `scripts/migrateOrderStatusShippingToDelivering.js` – one‑off status migration script.

- `frontend/`
  - `src/App.jsx` – root layout (Navbar/HomeBar/Footer vs admin/employee areas).
  - `src/context/AuthContext.jsx` – JWT auth (stores token in `localStorage`).
  - `src/routers/router.jsx` – app routes (customer, employee, admin).
  - `src/pages/` – customer pages, employee pages, admin pages.
  - `src/services/api.js` – API helpers (not listed in detail here).

---

## 4. Getting started

### 4.1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_super_secret_key_min_32_chars_long
JWT_EXPIRES=7d

# Optional: seed first admin
ADMIN_EMAIL=admin@bakery.com
ADMIN_PASSWORD=your_admin_password
```

Run the backend:

```bash
npm run dev        # dev mode (node --watch)
# or
npm start          # plain node index.js
```

Seed the first admin (run once, after DB is configured):

```bash
npm run seed:admin
```

Backend will be available at `http://localhost:5000`.

### 4.2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will start on Vite’s dev port (usually `http://localhost:5173`).

---

## 5. Environment & security notes

- **Do not commit `.env` files.** Only `.env.example` is tracked.
- JWT secret must be at least 32 characters and kept private.
- For production, configure:
  - CORS origins in `backend/index.js` if needed.
  - Secure MongoDB (strong user/password, IP allow‑list, etc.).

---

## 6. Useful API endpoints (summary)

- Public:
  - `GET /api/cakes` – list all cakes.
  - `GET /api/cakes/by-category?category=...`
  - `GET /api/cakes/category/:category`
  - `GET /api/cakes/search?q=...`
  - `POST /api/orders` – create new order.
  - `GET /api/orders/:id` – get order by ID (for tracking).

- Auth:
  - `POST /api/auth/register` – customer register.
  - `POST /api/auth/login` – login for all roles.
  - `GET /api/auth/me` – current user (JWT).

- Customer:
  - `GET /api/users/me`
  - `PATCH /api/users/me`

- Employee:
  - `GET /api/employees/me`
  - `PATCH /api/employees/me`
  - `GET /api/employees/orders`
  - `PATCH /api/employees/orders/:id/status`

- Admin:
  - `GET /api/admin/cakes`
  - `POST /api/admin/cakes`
  - `GET /api/admin/cakes/:id`
  - `PUT /api/admin/cakes/:id`
  - `DELETE /api/admin/cakes/:id`
  - `GET /api/admin/reports/sales`
  - `GET /api/admin/staff`
  - `POST /api/admin/staff`
  - `DELETE /api/admin/staff/:id`
  - `GET /api/admin/staff/:id/performance`



