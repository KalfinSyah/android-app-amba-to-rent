<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PenaltyController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // logout
    Route::post('/logout', [AuthController::class, 'logout']);
    // car
    Route::post('/cars/available', [CarController::class, 'available']);
    Route::apiResource('cars', CarController::class)->names('api.cars');
    // order
    Route::get('/orders/user/{userId}', [OrderController::class, 'showByUserId']);
    Route::apiResource('orders', OrderController::class)->names('api.orders');
    // penalty
    Route::get('/penalties/order/{orderId}', [PenaltyController::class, 'showByOrderId']);
    Route::apiResource('penalties', PenaltyController::class)->names('api.penalties');
    // user
    Route::apiResource('users', UserController::class)->names('api.users');
});

