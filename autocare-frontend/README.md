# AutoCare Hub - Frontend

This is the frontend part of my AutoCare Hub project. It's a web app for booking vehicle services built with React.

## What I Used

- React for the UI
- React Router for navigation between pages
- Tailwind CSS for styling
- Axios for API calls to the backend

## How to Run

First, install the dependencies:
```bash
npm install
```

Then start the development server:
```bash
npm start
```

The app will open at http://localhost:3000 (or 3001 if 3000 is busy).

## Project Structure

- `src/pages/` - All the different pages (Home, Login, Dashboard, etc.)
- `src/components/` - Reusable components like Navbar
- `src/api/` - API configuration for connecting to backend

## Features

- User registration and login
- Book vehicle services
- View booking history
- Manage vehicles
- Admin dashboard for managing all bookings

## Notes

Make sure the backend is running on port 8000 before using the app, otherwise the API calls won't work.
