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
            $table->bigIncrements('order_id');
            $table->unsignedBigInteger('car_id')->nullable();
            $table->unsignedBigInteger('method_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();

            $table->dateTime('tanggal_order');
            $table->integer('jenis_sewa')->default(0);
            $table->integer('durasi_sewa');
            $table->date('tanggal_sewa');
            $table->date('tanggal_kembali_sewa');
            $table->dateTime('tanggal_transaksi')->nullable();
            $table->string('status_order', 50)->nullable();
            $table->float('total_harga');

            // Foreign Keys
            $table->foreign('car_id')->references('car_id')->on('cars')
                ->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('method_id')->references('method_id')->on('transaction_methods')
                ->onDelete('restrict')->onUpdate('restrict');
            $table->foreign('user_id')->references('user_id')->on('users')
                ->onDelete('restrict')->onUpdate('restrict');
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
