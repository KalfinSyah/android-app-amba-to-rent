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
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('tahun_mobil', 10);
            $table->string('merk_mobil', 50);
            $table->string('nama_mobil', 100);
            $table->string('jenis_mobil', 30);
            $table->string('tipe_mesin', 20);
            $table->string('tipe_transmisi', 10);
            $table->float('harga_sewa');
            $table->string('foto_mobil', 100);
            $table->boolean('status_mobil');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
