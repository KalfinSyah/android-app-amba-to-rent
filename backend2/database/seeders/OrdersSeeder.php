<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan Anda memiliki user_id=2 dan car_id=1
        DB::table('orders')->insert([
            [
                'car_id' => 1, // Avanza
                'method_id' => 1, // Transfer Bank
                'user_id' => 2, // Budi Setiawan
                'tanggal_order' => Carbon::now()->subDays(2),
                'durasi_sewa' => 3,
                'tanggal_sewa' => Carbon::now()->addDay(),
                'tanggal_kembali_sewa' => Carbon::now()->addDays(4),
                'tanggal_transaksi' => Carbon::now()->subDays(2),
                'status_order' => 'Ongoing',
                'total_harga' => 1050000 // 3 x 350000
            ],
            [
                'car_id' => 2, // Brio
                'method_id' => 3, // GoPay
                'user_id' => 2, // Budi Setiawan
                'tanggal_order' => Carbon::now(),
                'durasi_sewa' => 2,
                'tanggal_sewa' => Carbon::now()->addDays(5),
                'tanggal_kembali_sewa' => Carbon::now()->addDays(7),
                'tanggal_transaksi' => Carbon::now()->subDays(2),
                'status_order' => 'Declined',
                'total_harga' => 560000 // 2 x 280000
            ]
        ]);
    }
}
