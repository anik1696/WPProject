<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ServiceType;
use Illuminate\Http\Request;

class ServiceTypeController extends Controller
{

    public function index()
    {
        $serviceTypes = ServiceType::all();

        return response()->json([
            'success' => true,
            'service_types' => $serviceTypes
        ], 200);
    }

    public function show($id)
    {
        $serviceType = ServiceType::find($id);

        if (!$serviceType) {
            return response()->json([
                'success' => false,
                'message' => 'Service type not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'service_type' => $serviceType
        ], 200);
    }
}