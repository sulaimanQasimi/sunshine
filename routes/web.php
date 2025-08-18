<?php

use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ServiceRequestController;

// Guest routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/services', [HomeController::class, 'services'])->name('services');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
Route::post('/contact', [HomeController::class, 'submitContact'])->name('contact.submit');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', function () {
        return Inertia::render('profile');
    })->name('profile');
    Route::get('/settings', function () {
        return Inertia::render('settings');
    })->name('settings');
    
    // Service Request routes
    Route::get('/service-requests/create/{service}', [ServiceRequestController::class, 'create'])->name('service-requests.create');
    Route::post('/service-requests', [ServiceRequestController::class, 'store'])->name('service-requests.store');
    Route::get('/service-requests/{serviceRequest}', [ServiceRequestController::class, 'show'])->name('service-requests.show');
    Route::post('/service-requests/{serviceRequest}/confirm', [ServiceRequestController::class, 'confirm'])->name('service-requests.confirm');
    Route::get('/my-service-requests', [ServiceRequestController::class, 'myRequests'])->name('service-requests.my');
    
    // Admin routes
    Route::middleware(['admin'])->group(function () {
        Route::get('/admin/service-requests', [ServiceRequestController::class, 'index'])->name('admin.service-requests.index');
        Route::patch('/admin/service-requests/{serviceRequest}/status', [ServiceRequestController::class, 'updateStatus'])->name('admin.service-requests.update-status');
    });
});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
