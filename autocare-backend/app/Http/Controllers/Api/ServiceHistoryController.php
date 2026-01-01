<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;

class ServiceHistoryController extends Controller
{

    public function index(Request $request)
    {
        $serviceHistory = Booking::where('user_id', $request->user()->id)
            ->where('status', 'completed')
            ->with(['vehicle', 'serviceType'])
            ->orderBy('completed_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'service_history' => $serviceHistory
        ]);
    }

    public function byVehicle(Request $request, $vehicleId)
    {
        $serviceHistory = Booking::where('user_id', $request->user()->id)
            ->where('vehicle_id', $vehicleId)
            ->where('status', 'completed')
            ->with(['vehicle', 'serviceType'])
            ->orderBy('completed_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'service_history' => $serviceHistory
        ]);
    }
}
