<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{

    public function index()
    {
        return Booking::where('user_id', auth()->id())
            ->with(['vehicle', 'serviceType', 'user'])
            ->orderBy('booking_date', 'desc')
            ->get();
    }

    public function adminIndex()
    {
        return Booking::with(['vehicle', 'serviceType', 'user'])
            ->orderBy('booking_date', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'service_type_id' => 'required|exists:service_types,id',
            'booking_date' => 'required|date',
            'booking_time' => 'required',
            'notes' => 'nullable|string'
        ]);

        $booking = Booking::create([
            'user_id' => auth()->id(),
            'vehicle_id' => $validated['vehicle_id'],
            'service_type_id' => $validated['service_type_id'],
            'booking_date' => $validated['booking_date'],
            'booking_time' => $validated['booking_time'],
            'notes' => $validated['notes'] ?? null,
            'status' => 'pending'
        ]);

        $booking->load(['vehicle', 'serviceType', 'user']);

        return response()->json([
            'success' => true,
            'message' => 'Booking created successfully',
            'booking' => $booking
        ], 201);
    }

    public function show($id)
    {
        $booking = Booking::with(['vehicle', 'serviceType', 'user'])
            ->where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'booking' => $booking
        ]);
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|in:pending,confirmed,in_progress,completed,cancelled',
            'final_cost' => 'nullable|numeric|min:0',
            'admin_notes' => 'nullable|string'
        ]);

        if (isset($validated['status']) && $validated['status'] === 'completed') {
            $validated['completed_at'] = now();
        }

        $booking->update($validated);
        $booking->load(['vehicle', 'serviceType', 'user']);

        return response()->json([
            'success' => true,
            'message' => 'Booking updated successfully',
            'booking' => $booking
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,in_progress,completed,cancelled',
            'final_cost' => 'nullable|numeric|min:0',
            'admin_notes' => 'nullable|string'
        ]);

        if ($validated['status'] === 'completed') {
            $validated['completed_at'] = now();
        }

        $booking->update($validated);
        $booking->load(['vehicle', 'serviceType', 'user']);

        return response()->json([
            'success' => true,
            'message' => 'Booking status updated successfully',
            'booking' => $booking
        ]);
    }

    public function cancel($id)
    {
        $booking = Booking::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        if (in_array($booking->status, ['completed', 'cancelled'])) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot cancel a completed or already cancelled booking'
            ], 400);
        }

        $booking->update(['status' => 'cancelled']);

        return response()->json([
            'success' => true,
            'message' => 'Booking cancelled successfully',
            'booking' => $booking
        ]);
    }

    public function destroy($id)
    {
        Booking::where('id', $id)
            ->where('user_id', auth()->id())
            ->delete();

        return response()->json([
            'success' => true,
            'message' => 'Booking deleted successfully'
        ]);
    }
}
