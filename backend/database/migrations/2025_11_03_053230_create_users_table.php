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
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('user_id');
            $table->string('nama_user', 100);
            $table->string('email_user', 100)->unique();
            $table->string('password', 100);
            // Menyimpan nomor telepon sebagai string lebih aman
            // untuk menangani angka '0' di depan atau kode negara
            $table->string('no_telp_user', 20);
            $table->tinyInteger('is_admin')->nullable()->default(null);
            // $table->timestamps(); // Opsional, jika Anda ingin created_at/updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
