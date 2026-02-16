# Employee CRUD Application

A simple Employee Management System built with React, using session storage for data persistence.

## Features

- ✅ Add new employees
- ✅ Edit existing employees
- ✅ Delete employees
- ✅ View all employees in a table
- ✅ Data persists in browser session storage
- ✅ Responsive design with React Bootstrap
- ✅ Icons from React Icons

## Technologies Used

- React 18
- Vite
- React Bootstrap
- React Icons
- UUID (for generating unique IDs)
- Session Storage API

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## How It Works

- All employee data is stored in the browser's session storage
- Data persists only during the browser session
- When you close the browser, all data is cleared
- Uses React hooks: `useState` and `useEffect`
- Single file application (no separate components)

## Employee Fields

- Name
- Email
- Phone
- Department (HR, IT, Finance, Marketing, Sales)
- Salary

## Note

This is a beginner-level project demonstrating basic CRUD operations with React and session storage.
