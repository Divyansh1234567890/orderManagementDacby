# Order Management System

A Full Stack Order Management System built using **React, Node.js, Express.js, and MongoDB**. The application allows users to create and manage orders, update order statuses, track status history, and execute automated scheduled status updates using **node-cron**.

This project was developed as part of the DACBY Full Stack Developer assignment.

---

# Features

## Backend

- Create new orders
- Fetch all orders
- Filter orders by status
- Update order status
- Maintain complete order status history
- Secure scheduler endpoint using secret key authentication
- Automatic order status updates using node-cron
- Scheduler execution logging
- RESTful API architecture
- Layered architecture (Controller → Service → Model)

---

## Frontend

- React Dashboard
- Display all orders
- Filter orders by status
- Orders table
- Loading state
- Empty state
- Error handling
- Manual refresh support

---

# Tech Stack

## Frontend

- React.js
- Vite
- JavaScript
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- node-cron

---

# Database Design

MongoDB was selected because:

- Flexible schema
- Easy document-based storage
- Fast development with Mongoose
- Easy scalability
- Excellent support for REST APIs

---

# Collections

## 1. Orders

Stores the complete order information.

Fields:

- Order ID
- Customer Name
- Phone Number
- Product Name
- Amount
- Payment Status
- Order Status
- Created Time
- Updated Time

---

## 2. OrderStatusHistory

Maintains every status transition.

Each document stores:

- Order Reference
- Old Status
- New Status
- Changed By (USER / SCHEDULER)
- Changed Time

This provides a complete audit trail of all order status changes.

---

## 3. SchedulerLog

Stores every scheduler execution.

Each execution records:

- Scheduler Start Time
- Scheduler Finish Time
- Total Orders Checked
- Total Orders Updated
- Execution Status
- Error Message (if any)

This makes scheduler monitoring easier.

---

# Order Status Flow

```
PLACED
   ↓
PROCESSING
   ↓
READY_TO_SHIP
   ↓
SHIPPED
   ↓
DELIVERED
```

Orders can also move to:

```
CANCELLED
```

---

# Scheduler Design

The scheduler is implemented using **node-cron**.

Responsibilities:

- Runs automatically every 5 minutes
- Fetches pending orders
- Updates order status based on time conditions
- Creates status history records
- Stores scheduler execution logs

The scheduler endpoint is protected using a secret key.

Required Header:

```
x-secret-key
```

---

# Duplicate Order Prevention

Each order contains a unique `orderId`.

MongoDB unique indexing is used to prevent duplicate order IDs.

---

# Race Condition Handling

For this assignment, the scheduler executes as a single scheduled process.

In a production environment, race conditions can be further minimized using:

- Distributed locking (Redis)
- MongoDB Transactions
- Optimistic Locking
- Atomic Update Operations

---

# Project Structure

```
Dacby_Assignment
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── cron
│   └── server.js
│
├── frontend
│
├── DACBY_Order_Management.postman_collection.json
│
└── README.md
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGODB_URI=<your_mongodb_connection_string>

SCHEDULER_SECRET=<your_secret_key>
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Divyansh1234567890/orderManagementDacby.git

cd Dacby_Assignment
```

---

# Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# API Documentation

## Create Order

```
POST /api/orders
```

Sample Body

```json
{
  "customerName": "Divyansh Sharma",
  "phoneNumber": "9876543210",
  "productName": "Wireless Mouse",
  "amount": 1200
}
```

---

## Get All Orders

```
GET /api/orders
```

---

## Filter Orders

```
GET /api/orders?status=PLACED
```

Example:

```
GET /api/orders?status=SHIPPED
```

---

## Update Order Status

```
PATCH /api/orders/:id
```

Body

```json
{
  "orderStatus": "SHIPPED"
}
```

---

## Run Scheduler

```
POST /api/scheduler/run
```

Required Header

```
x-secret-key: <SCHEDULER_SECRET>
```

---

# Scheduler Setup

This project uses **node-cron** for scheduling background jobs.

The scheduler:

- Runs every 5 minutes
- Updates eligible orders
- Stores execution logs
- Maintains order status history

For testing, the scheduler endpoint can also be triggered manually using the secure API.

---

# Postman Collection

The project includes a Postman collection.

```
DACBY_Order_Management.postman_collection.json
```

Import this file into Postman to test all APIs.

---

# Commit History

The project was developed with multiple meaningful Git commits following a feature-based workflow.

---

# Future Improvements

- JWT Authentication
- Role-Based Authorization
- Search by Customer Name
- Search by Order ID
- Pagination
- Dashboard Analytics
- Email Notifications
- Docker Support
- Unit Testing
- Deployment using Render/Vercel
- Redis-based distributed locking for scheduler

---

# Author

**Divyansh Sharma**

Developed as part of the DACBY Full Stack Developer Assignment.