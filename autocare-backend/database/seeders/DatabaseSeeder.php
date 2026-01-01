<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\Booking;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    
    public function run(): void
    {

        $this->call(ServiceTypeSeeder::class);

        $this->call(AdminUserSeeder::class);

        $customer = User::create([
            'name' => 'Test Customer',
            'email' => 'customer@test.com',
            'password' => Hash::make('password123'),
            'phone' => '01700000000',
            'address' => 'Dhaka, Bangladesh',
            'role' => 'customer',
        ]);

        $vehicle1 = Vehicle::create([
            'user_id' => $customer->id,
            'vehicle_type' => 'car',
            'brand' => 'Toyota',
            'model' => 'Corolla',
            'year' => 2020,
            'registration_number' => 'DHK-1234',
            'color' => 'Silver',
        ]);
        
        $vehicle2 = Vehicle::create([
            'user_id' => $customer->id,
            'vehicle_type' => 'bike',
            'brand' => 'Honda',
            'model' => 'CBR 150R',
            'year' => 2021,
            'registration_number' => 'DHK-5678',
            'color' => 'Red',
        ]);

        Booking::create([
            'user_id' => $customer->id,
            'vehicle_id' => $vehicle1->id,
            'service_type_id' => 1, // Oil Change
            'booking_date' => now()->addDays(2),
            'booking_time' => '10:00:00',
            'status' => 'pending',
            'notes' => 'Please check engine oil level',
        ]);
        
        Booking::create([
            'user_id' => $customer->id,
            'vehicle_id' => $vehicle2->id,
            'service_type_id' => 2, // Car Washing
            'booking_date' => now()->addDays(1),
            'booking_time' => '14:00:00',
            'status' => 'confirmed',
            'notes' => 'Full exterior and interior cleaning',
        ]);
        
        Booking::create([
            'user_id' => $customer->id,
            'vehicle_id' => $vehicle1->id,
            'service_type_id' => 3, // Full Checkup
            'booking_date' => now(),
            'booking_time' => '09:00:00',
            'status' => 'in_progress',
            'notes' => 'Complete vehicle inspection needed',
        ]);
        
        Booking::create([
            'user_id' => $customer->id,
            'vehicle_id' => $vehicle2->id,
            'service_type_id' => 1, // Oil Change
            'booking_date' => now()->subDays(5),
            'booking_time' => '11:00:00',
            'status' => 'completed',
            'final_cost' => 50.00,
            'admin_notes' => 'Service completed successfully',
            'completed_at' => now()->subDays(5),
        ]);
        
        echo "Database seeded successfully!\n";
        echo "Admin: admin@autocarehub.com / admin123\n";
        echo "Customer: customer@test.com / password123\n";
    }
}
