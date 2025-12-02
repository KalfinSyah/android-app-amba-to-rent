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
            'foto_mobil' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/2022_Toyota_Avanza_1.5_G_Toyota_Safety_Sense_W101RE_%2820220403%29.jpg/1200px-2022_Toyota_Avanza_1.5_G_Toyota_Safety_Sense_W101RE_%2820220403%29.jpg',
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
            'foto_mobil' => 'https://upload.wikimedia.org/wikipedia/commons/2/2e/2020_Honda_Brio_Satya_S_1.2_DD1_%2820211001%29_01.jpg',
            'status_mobil' => true
        ]);
    }
}
