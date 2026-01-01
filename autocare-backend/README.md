# AutoCare Hub - Backend

This is the backend API for my AutoCare Hub project. It handles all the database operations and provides REST API endpoints for the frontend.

## Tech Stack

- Laravel 11 (PHP framework)
- MySQL database
- Laravel Sanctum for authentication

## Setup Instructions

1. Install dependencies:
```bash
composer install
```

2. Copy the environment file:
```bash
copy .env.example .env
```

3. Generate application key:
```bash
php artisan key:generate
```

4. Configure your database in `.env` file:
```
DB_DATABASE=autocare_hub
DB_USERNAME=root
DB_PASSWORD=
```

5. Run migrations to create tables:
```bash
php artisan migrate
```

6. Seed the database with sample data:
```bash
php artisan db:seed
```

7. Start the server:
```bash
php artisan serve
```

The API will be available at http://127.0.0.1:8000

## Database Tables

- users - Customer and admin accounts
- vehicles - User vehicles
- service_types - Available services (oil change, car wash, etc.)
- bookings - Service bookings
- service_history - Completed services

## API Endpoints

Main routes are in `routes/api.php`:
- POST /api/login - User login
- POST /api/register - New user registration
- GET /api/bookings - Get user bookings
- POST /api/bookings - Create new booking
- GET /api/vehicles - Get user vehicles

## Default Login

After seeding, you can login with:
- Admin: admin@autocare.com / password
- Customer: customer@autocare.com / password

## Notes

Make sure XAMPP MySQL is running before starting the server.
