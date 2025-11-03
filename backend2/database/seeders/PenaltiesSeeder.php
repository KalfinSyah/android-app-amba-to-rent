<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PenaltiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data ini hanya akan berhasil jika ada order_id = 1
        DB::table('penalties')->insert([
            [
                'order_id' => 1,
                'jenis_penalty' => 'Keterlambatan Pengembalian 1 Hari',
                'biaya_penalty' => 100000,
                'foto_penalty' => 'images/penalty/telat.jpg',
                'status_penalty' => 'Lunas'
            ]
        ]);
    }
}
