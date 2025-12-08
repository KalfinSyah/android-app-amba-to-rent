<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PenaltyController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Tambahkan rute Anda di sini nanti

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// cars
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cars/available', [CarController::class, 'available']);
    Route::apiResource('cars', CarController::class);
});

// user
Route::middleware('auth:sanctum')->get('/user/id/{user}', [UserController::class, 'show']);

// order
Route::middleware('auth:sanctum')->post('/order', [OrderController::class, 'store']);
Route::middleware('auth:sanctum')->get('/order/id/{order}', [OrderController::class, 'show']);
Route::middleware('auth:sanctum')->get('/order/user/id/{id}', [OrderController::class, 'showByUserId']);

// penalty
Route::middleware('auth:sanctum')->post('/penalty', [PenaltyController::class, 'store']);
