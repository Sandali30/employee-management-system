# Employee Management System

![React](https://img.shields.io/badge/React-19-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-success) ![JWT](https://img.shields.io/badge/Auth-JWT-orange) ![License](https://img.shields.io/badge/License-MIT-blue)

## Demo Credentials 
Super Admin 
Email: admin@gmail.com 
Password: Admin@123

Employee
Email: amit@gmail.com
Password:123456

A full-stack Employee Management System built with React, Node.js, Express, MongoDB, JWT authentication, and role-based access control. The application supports employee CRUD operations, attendance tracking, leave management, payroll records, dashboard statistics, and organizational hierarchy management.

## Features

- Secure login with JWT and bcrypt password hashing
- Protected frontend routes
- Role-based access control for Super Admin, HR Manager, and Employee
- Employee create, read, update, and soft delete
- Search and filtering by employee name, email, employee ID, department, role, and status
- Reporting manager assignment
- Organization hierarchy tree
- Circular reporting prevention
- Direct report lookup
- Attendance check-in and check-out
- Personal and admin attendance views
- Leave application, approval, and rejection
- Payroll generation and payment status management
- Dashboard statistics for admin and HR users
- Profile view
- Backend validation with express-validator
- Centralized API client on the frontend

## Tech Stack

### Frontend

- React.js
- React Router
- Axios
- React Icons
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- multer
- express-validator

## Project Structure

```text
Employee_Management_System/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    seed/
    uploads/
    validators/
    server.js
    seedAdmin.js
    resetPassword.js
  frontend/
    public/
    src/
      components/
      context/
      pages/
      routes/
      services/
      App.js
      index.js
  DOCUMENTATION.md
  README.md
```

## Prerequisites

- Node.js
- npm
- MongoDB Atlas or local MongoDB

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create a `.env` file inside `frontend/`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Installation

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

## Seed Admin User

From the `backend/` folder:

```bash
node seedAdmin.js
```

Seeded admin account:

```text
Email: admin@gmail.com
Password: Admin@123
```

If the admin already exists and the password needs to be reset:

```bash
node resetPassword.js
```

## Running the Project

Start the backend:

```bash
cd backend
npm start
```

Backend runs on:

```text
http://localhost:5000
```

Start the frontend:

```bash
cd frontend
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

## Build

Create a production frontend build:

```bash
cd frontend
npm run build
```

## Main Routes

### Frontend

screenshots/login.png

- `/` - Login
- `/dashboard` - Dashboard
- `/employees` - Employee management
- `/attendance` - Attendance
- `/leave` - Leave management
- `/payroll` - Payroll
- `/profile` - User profile
- `/organization` - Organization hierarchy

### Backend API Base URL

```text
http://localhost:5000/api
```

Main API modules:

- `/auth`
- `/employees`
- `/dashboard`
- `/leaves`
- `/attendance`
- `/payroll`
- `/organization`

See [DOCUMENTATION.md](./DOCUMENTATION.md) for full API and feature documentation.

## Role-Based Access

### Super Admin
screenshots/employeeDashboard.png

- Full access to employee management
screenshots/addEmployee.png
- Can delete employees
screenshots/manageEmployee.png
- Can assign managers
- Can view dashboard statistics
- Can approve or reject leaves
screenshots/leaveManagement.png
- Can generate payroll
screenshots/payroll.png
- Can view organization hierarchy
screenshots/organisationHierarchy.png

### HR Manager

- Can create, edit, and view employees
- Can soft-delete employees except restricted Super Admin operations
- Can view dashboard statistics
- Can approve or reject leaves
- Can generate payroll
- Can view organization hierarchy

### Employee

- Can login and view protected pages
screenshots/viewEmployees.png
- Can view and update own profile where allowed
- Can check in and check out attendance
screenshots/attendance/png
- Can apply for leave
screenshots/leave.png
- Can view own attendance, leave, and payroll records
screenshots/profileView.png

## Assignment Coverage

Implemented:

- Authentication
- Logout
- Protected routes
- Password hashing
- RBAC
- Dashboard statistics
- Employee CRUD
- Search and filters
- Soft delete
- Organization hierarchy
- Reporting manager assignment
- Circular reporting prevention
- Direct reports
- Backend validation
- Pagination support in backend APIs
- API documentation

Partially implemented or extensible:

- Profile image upload API exists on backend
- Dashboard charts can be added using installed chart libraries
- Payroll module exists, with generation and payment status APIs

## Notes

- Passwords are hashed automatically by the User model before saving.
- Employee delete is implemented as soft delete using `isDeleted`.
- Protected backend routes require an Authorization header:

```text
Authorization: Bearer <token>
```

## Attendance Rules

- Office Start Time: 9:30 AM
- Late check-in is automatically marked as "Late".
- Working hours are calculated automatically.
- Working hours below 4.5 hours are marked as "Half Day".
- One attendance record is allowed per employee per day.


## Leave Rules
 - Past date leave requests are not allowed. 
- End date cannot be before start date.
 - Overlapping leave requests are prevented. 
- Leave requests require approval from HR Manager or Super Admin.


## Employee Search & Filters

Search by:

- Employee Name
- Employee ID
- Email

Filter by:

- Department
- Role
- Status

Sort by:

- Name
- Joining Date
## API Testing 
The APIs can be tested using: 
- Postman
 - Thunder Client 
- Insomnia


## Security 
- Passwords hashed using bcrypt 
- JWT authentication 
- Protected routes 
- Role-based authorization 
- Soft delete 
- Circular reporting prevention


