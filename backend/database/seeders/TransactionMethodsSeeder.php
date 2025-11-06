<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\TransactionMethod;

class TransactionMethodsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $methods = [
            ['nama_method' => 'Transfer Bank (BCA)'],
            ['nama_method' => 'E-Wallet (OVO)'],
            ['nama_method' => 'E-Wallet (GoPay)'],
            ['nama_method' => 'Bayar di Tempat']
        ];

        foreach ($methods as $method) {
            TransactionMethod::create($method);
        }
    }
}
