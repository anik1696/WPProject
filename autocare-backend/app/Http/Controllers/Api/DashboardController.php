<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function stats(Request $request)
    {
        $totalBookings = Booking::count();
        $pendingBookings = Booking::where('status', 'pending')->count();
        $confirmedBookings = Booking::where('status', 'confirmed')->count();
        $inProgressBookings = Booking::where('status', 'in_progress')->count();
        $completedBookings = Booking::where('status', 'completed')->count();
        $cancelledBookings = Booking::where('status', 'cancelled')->count();

        $totalCustomers = User::where('role', 'customer')->count();
        $totalVehicles = Vehicle::count();

        $recentBookings = Booking::with(['user', 'vehicle', 'serviceType'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        $todayBookings = Booking::whereDate('booking_date', today())
            ->with(['user', 'vehicle', 'serviceType'])
            ->get();

        $totalRevenue = Booking::where('status', 'completed')
            ->sum('final_cost');

        return response()->json([
            'success' => true,
            'stats' => [
                'total_bookings' => $totalBookings,
                'pending_bookings' => $pendingBookings,
                'confirmed_bookings' => $confirmedBookings,
                'in_progress_bookings' => $inProgressBookings,
                'completed_bookings' => $completedBookings,
                'cancelled_bookings' => $cancelledBookings,
                'total_customers' => $totalCustomers,
                'total_vehicles' => $totalVehicles,
                'total_revenue' => $totalRevenue ?? 0,
            ],
            'recent_bookings' => $recentBookings,
            'today_bookings' => $todayBookings,
        ], 200);
    }

    public function customerDashboard(Request $request)
    {
        $user = $request->user();

        $totalBookings = $user->bookings()->count();
        $pendingBookings = $user->bookings()->where('status', 'pending')->count();
        $completedBookings = $user->bookings()->where('status', 'completed')->count();
        $totalVehicles = $user->vehicles()->count();

        $recentBookings = $user->bookings()
            ->with(['vehicle', 'serviceType'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return response()->json([
            'success' => true,
            'stats' => [
                'total_bookings' => $totalBookings,
                'pending_bookings' => $pendingBookings,
                'completed_bookings' => $completedBookings,
                'total_vehicles' => $totalVehicles,
            ],
            'recent_bookings' => $recentBookings,
        ], 200);
    }

    public function customers(Request $request)
    {
        $customers = User::where('role', 'customer')
            ->withCount(['bookings', 'vehicles'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'customers' => $customers
        ], 200);
    }
}