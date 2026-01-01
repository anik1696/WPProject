<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\ServiceTypeController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ServiceHistoryController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/service-types', [ServiceTypeController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('vehicles', VehicleController::class);

    Route::apiResource('bookings', BookingController::class);
    Route::patch('/bookings/{id}/status', [BookingController::class, 'updateStatus']);
    Route::patch('/bookings/{id}/cancel', [BookingController::class, 'cancel']);

    Route::get('/dashboard/customer', [DashboardController::class, 'customerDashboard']);
    Route::get('/dashboard/admin', [DashboardController::class, 'stats']);

    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);

    Route::get('/service-history', [ServiceHistoryController::class, 'index']);
    Route::get('/service-history/vehicle/{vehicleId}', [ServiceHistoryController::class, 'byVehicle']);

    Route::middleware('admin')->group(function () {
        Route::get('/admin/bookings', [BookingController::class, 'adminIndex']);
        Route::get('/admin/customers', [DashboardController::class, 'customers']);
    });
});
