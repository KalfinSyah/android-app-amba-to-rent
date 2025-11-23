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
            'foto_mobil' => 'https://images-ext-1.discordapp.net/external/rpX_9nHiNzMyogva9l72bMdtJkEPkec5Eq_asdtvGPI/https/upload.wikimedia.org/wikipedia/commons/1/1a/2019_Toyota_Calya_1.2_G_B401RA_%252820200222%2529.jpg?format=webp&width=1410&height=859',
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
            'foto_mobil' => 'https://images-ext-1.discordapp.net/external/rpX_9nHiNzMyogva9l72bMdtJkEPkec5Eq_asdtvGPI/https/upload.wikimedia.org/wikipedia/commons/1/1a/2019_Toyota_Calya_1.2_G_B401RA_%252820200222%2529.jpg?format=webp&width=1410&height=859',
            'status_mobil' => true
        ]);
    }
}
