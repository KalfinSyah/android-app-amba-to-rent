<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Perintah ini akan menambahkan kolom 'deleted_at' ke semua tabel.
     */
    public function up(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('transaction_methods', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('penalties', function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * Perintah ini akan menghapus kolom 'deleted_at' jika migrasi di-rollback.
     */
    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('transaction_methods', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('penalties', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
