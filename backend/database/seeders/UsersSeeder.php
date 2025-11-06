<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'nama_user' => 'Admin Rental',
                'email_user' => 'admin@rental.com',
                'password' => Hash::make('password123'),
                'no_telp_user' => '081234567890',
                'is_admin' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nama_user' => 'Budi Setiawan',
                'email_user' => 'budi@example.com',
                'password' => Hash::make('password123'),
                'no_telp_user' => '089876543210',
                'is_admin' => 0,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
