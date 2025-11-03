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
        Schema::create('penalties', function (Blueprint $table) {
            $table->bigIncrements('penalty_id');
            $table->unsignedBigInteger('order_id')->nullable();

            $table->string('jenis_penalty', 100);
            $table->float('biaya_penalty');
            $table->string('foto_penalty', 100);
            $table->string('status_penalty', 50)->default('Pending');

            // Foreign Key
            $table->foreign('order_id')->references('order_id')->on('orders')
                ->onDelete('restrict')->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penalties');
    }
};
