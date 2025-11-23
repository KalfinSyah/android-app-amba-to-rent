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
            'foto_penalty' => 'https://lirp.cdn-website.com/5db48381c8ae431eb5324cc0c2e7772a/dms3rep/multi/opt/1531822-blog103-640w.jpg',
            'status_penalty' => 'Unpaid'
        ]);
    }
}
