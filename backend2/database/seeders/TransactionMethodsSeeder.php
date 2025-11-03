<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransactionMethodsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('transaction_methods')->insert([
            ['nama_method' => 'Transfer Bank (BCA)'],
            ['nama_method' => 'E-Wallet (OVO)'],
            ['nama_method' => 'E-Wallet (GoPay)'],
            ['nama_method' => 'Bayar di Tempat']
        ]);
    }
}
