<?php

use App\Http\Controllers\Web\CarController;
use App\Http\Controllers\Web\OrderController;
use App\Http\Controllers\Web\PenaltyController;
use App\Http\Controllers\Web\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('orders', OrderController::class);
    Route::resource('cars', CarController::class);
    Route::resource('penalties', PenaltyController::class);
});

require __DIR__.'/auth.php';
