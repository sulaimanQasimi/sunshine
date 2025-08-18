<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ServiceRequestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:api')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/profile', [AuthController::class, 'profile']);

    // Service routes
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{service}', [ServiceController::class, 'show']);
    
    // Admin-only service routes
    Route::middleware('admin')->group(function () {
        Route::post('/services', [ServiceController::class, 'store']);
        Route::put('/services/{service}', [ServiceController::class, 'update']);
        Route::delete('/services/{service}', [ServiceController::class, 'destroy']);
    });

    // Service request routes
    Route::get('/requests', [ServiceRequestController::class, 'index']);
    Route::post('/requests', [ServiceRequestController::class, 'store']);
    Route::get('/requests/{serviceRequest}', [ServiceRequestController::class, 'show']);
    Route::put('/requests/{serviceRequest}', [ServiceRequestController::class, 'update']);
    Route::delete('/requests/{serviceRequest}', [ServiceRequestController::class, 'destroy']);
    
    // Additional request actions
    Route::post('/requests/{serviceRequest}/cancel', [ServiceRequestController::class, 'cancel']);
    
    // Admin-only request actions
    Route::middleware('admin')->group(function () {
        Route::post('/requests/{serviceRequest}/approve', [ServiceRequestController::class, 'approve']);
        Route::post('/requests/{serviceRequest}/complete', [ServiceRequestController::class, 'complete']);
    });
});
