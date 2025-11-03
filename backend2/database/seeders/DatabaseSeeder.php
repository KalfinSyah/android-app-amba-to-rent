<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Panggil seeder dalam urutan yang benar
        $this->call([
            UsersSeeder::class,
            CarsSeeder::class,
            TransactionMethodsSeeder::class,
            OrdersSeeder::class,
            PenaltiesSeeder::class, // Terakhir, karena butuh order_id
        ]);
    }
}
