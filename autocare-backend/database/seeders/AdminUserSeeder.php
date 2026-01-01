<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {

        $adminExists = User::where('email', 'admin@autocare.com')->first();

        if (!$adminExists) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@autocare.com',
                'password' => Hash::make('password123'),
                'phone' => '01800000000',
                'address' => 'AutoCare Hub Office, Sylhet',
                'role' => 'admin',
            ]);

            echo "Admin user created successfully!\n";
            echo "Email: admin@autocare.com\n";
            echo "Password: password123\n";
        } else {
            echo "Admin user already exists.\n";
        }
    }
}