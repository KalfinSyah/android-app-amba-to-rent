<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cars')->insert([
            [
                'tahun_mobil' => '2023',
                'merk_mobil' => 'Toyota',
                'nama_mobil' => 'Avanza G',
                'jenis_mobil' => 'MPV',
                'tipe_mesin' => '1.5L Petrol',
                'tipe_transmisi' => 'Matic',
                'harga_sewa' => 350000,
                'foto_mobil' => 'images/avanza.jpg',
                'status_mobil' => true
            ],
            [
                'tahun_mobil' => '2022',
                'merk_mobil' => 'Honda',
                'nama_mobil' => 'Brio RS',
                'jenis_mobil' => 'City Car',
                'tipe_mesin' => '1.2L Petrol',
                'tipe_transmisi' => 'Manual',
                'harga_sewa' => 280000,
                'foto_mobil' => 'images/brio.jpg',
                'status_mobil' => true
            ]
        ]);
    }
}
