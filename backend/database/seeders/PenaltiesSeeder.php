<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Penalty;

class PenaltiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data ini hanya akan berhasil jika ada order_id = 1
        Penalty::create([
            'order_id' => 1,
            'jenis_penalty' => 'Body Damage',
            'biaya_penalty' => 1000000,
            'foto_penalty' => 'https://images-ext-1.discordapp.net/external/iuDcx4jsBbuVY3oDRkMiyOky1zl2ejbPcHxxDUxH4xM/https/www.gardaoto.com/wp-content/uploads/2024/05/car-file-insurance-claim-after-bumper-damage-featured.png?format=webp&quality=lossless&width=1526&height=859',
            'status_penalty' => 'Unpaid'
        ]);
    }
}
