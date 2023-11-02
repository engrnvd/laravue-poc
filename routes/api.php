<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/auth.php';

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::middleware('throttle:6,1')->post('send-verification-email', [AuthController::class, 'sendVerificationEmail']);

    Route::post('/profile/update', [AuthController::class, 'update']);
    Route::post('/profile/change-password', [AuthController::class, 'changePassword']);
    Route::post('/profile/delete-account', [AuthController::class, 'deleteAccount']);

    require_once __DIR__ . "/crud-routes.php";
});

Route::post('trigger-socket-event', function () {
    $forUser = \request('forUser');
    $data = \Illuminate\Foundation\Inspiring::quote();
    $event = $forUser ? "user-event" : "public-event";
    $forUser ? \App\Helpers\SocketIo::forCurrentUser($event, $data) : \App\Helpers\SocketIo::trigger($event, $data);
});

Route::post('/admin/feedback', [\App\Http\Controllers\AdminController::class, 'feedback']);

Route::post('cypress/cleanup', [\App\Http\Controllers\CypressController::class, 'cleanUp']);

if (env('APP_ENV') !== 'production') {
    require_once __DIR__ . "/test-routes.php";
};
