<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('car_id')->constrained()->onDelete('restrict');
            $table->foreignId('user_id')->constrained()->onDelete('restrict');
            $table->foreignId('method_id')->constrained('transaction_methods')->onDelete('restrict');
            $table->dateTime('tanggal_order');
            $table->integer('durasi_sewa');
            $table->date('tanggal_sewa');
            $table->date('tanggal_kembali_sewa');
            $table->dateTime('tanggal_transaksi')->nullable();
            $table->string('status_order', 50);
            $table->decimal('total_harga', 15, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
