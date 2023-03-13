<?php

Route::get('/verify-email', function () {
    // Get a user for demo purposes
    $user = \App\Models\User::first();
    return (new \App\Mail\VerifyEmail())->toMail($user);
});
