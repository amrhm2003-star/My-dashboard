# Opo Support Dashboard

Back office and support dashboard for Opofinance. Week 2: real backend with PostgreSQL.

## Stack

- **Frontend:** HTML / CSS / JS (vanilla)
- **Backend:** Node.js + Express
- **ORM:** Prisma
- **Database:** PostgreSQL

## How to Run Locally

### 1. Set up PostgreSQL

```bash
psql postgres
CREATE DATABASE dashboard_db;
CREATE USER dashboard_user WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE dashboard_db TO dashboard_user;
\q
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npx prisma migrate dev --name init
node index.js
```

### 3. Open the frontend

Open `dashboard.html` in a browser (or use Live Server on port 5500).

## API Endpoints

### Auth
- `POST /api/auth/register` — create account
- `POST /api/auth/login` — log in

### Transactions
- `GET /api/transactions` — list all (filter: `?type=Deposit&status=pending`)
- `POST /api/transactions` — create
- `PUT /api/transactions/:id` — update
- `DELETE /api/transactions/:id` — delete
