<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class CarsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Car::create([
            'tahun_mobil' => '2023',
            'merk_mobil' => 'Toyota',
            'nama_mobil' => 'Avanza G',
            'jenis_mobil' => 'MPV',
            'tipe_mesin' => '1.5L Petrol',
            'tipe_transmisi' => 'Matic',
            'harga_sewa' => 350000,
            'foto_mobil' => 'https://upload.wikimedia.org/wikipedia/commons/9/99/2018_Daihatsu_Sigra_1.0_D_wagon_%28B400RS%3B_01-12-2019%29%2C_South_Tangerang.jpg',
            'status_mobil' => true
        ]);

        Car::create([
            'tahun_mobil' => '2022',
            'merk_mobil' => 'Honda',
            'nama_mobil' => 'Brio RS',
            'jenis_mobil' => 'City Car',
            'tipe_mesin' => '1.2L Petrol',
            'tipe_transmisi' => 'Manual',
            'harga_sewa' => 280000,
            'foto_mobil' => 'https://upload.wikimedia.org/wikipedia/commons/9/99/2018_Daihatsu_Sigra_1.0_D_wagon_%28B400RS%3B_01-12-2019%29%2C_South_Tangerang.jpg',
            'status_mobil' => true
        ]);
    }
}
