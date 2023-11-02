<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminDashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('admin/online-users-ids', [AdminDashboardController::class, 'onlineUsersIds']);
    Route::get('dashboard/cards', [AdminDashboardController::class, 'cards']);
    Route::get('dashboard/daily-chart', [AdminDashboardController::class, 'dailyChart']);
    Route::get('dashboard/activities', [AdminDashboardController::class, 'activities']);
    Route::get('dashboard/canvas-activities', [AdminDashboardController::class, 'canvasActivities']);

    Route::post('admin/login-as-token', [AdminController::class, 'loginAsToken']);

    Route::resource('users', App\Http\Controllers\UserController::class);
    Route::post('/users/bulk-edit', [App\Http\Controllers\UserController::class, 'bulkEdit']);
    Route::post('/users/bulk-delete', [App\Http\Controllers\UserController::class, 'bulkDelete']);
});


