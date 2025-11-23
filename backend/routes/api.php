<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PenaltyController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Tambahkan rute Anda di sini nanti
// Route::apiResource('cars', App\Http\Controllers\CarController::class);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// cars
Route::middleware('auth:sanctum')->get('/cars', [CarController::class, 'index']);
Route::middleware('auth:sanctum')->get('/cars/id/{car}', [CarController::class, 'showById']);
Route::middleware('auth:sanctum')->get('/cars/name/{nama_mobil}', [CarController::class, 'showByName']);
Route::middleware('auth:sanctum')->get('/cars/brand/{merk_mobil}', [CarController::class, 'showByBrand']);
Route::middleware('auth:sanctum')->get('/cars/available', [CarController::class, 'available']);

// user
Route::middleware('auth:sanctum')->get('/user/id/{user}', [UserController::class, 'show']);

// order
Route::middleware('auth:sanctum')->post('/order', [OrderController::class, 'store']);

// penalty
Route::middleware('auth:sanctum')->post('/penalty', [PenaltyController::class, 'store']);
