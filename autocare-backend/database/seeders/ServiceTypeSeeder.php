<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceTypeSeeder extends Seeder
{
    public function run(): void
    {
        $serviceTypes = [
            [
                'name' => 'Oil Change',
                'description' => 'Complete engine oil change with filter replacement',
                'base_price' => 50.00,
                'estimated_duration' => 30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Car Washing',
                'description' => 'Exterior and interior cleaning service',
                'base_price' => 25.00,
                'estimated_duration' => 45,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Full Checkup',
                'description' => 'Comprehensive vehicle inspection and maintenance',
                'base_price' => 150.00,
                'estimated_duration' => 120,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Brake Service',
                'description' => 'Brake pad replacement and system check',
                'base_price' => 100.00,
                'estimated_duration' => 60,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tire Rotation',
                'description' => 'Tire rotation and balancing service',
                'base_price' => 40.00,
                'estimated_duration' => 30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'AC Service',
                'description' => 'Air conditioning system check and gas refill',
                'base_price' => 80.00,
                'estimated_duration' => 45,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('service_types')->insert($serviceTypes);
    }
}