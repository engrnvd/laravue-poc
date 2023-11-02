<?php

namespace App\Http\Controllers;

use App\Mail\AdminFeedbackMailable;

class AdminController extends Controller
{
    public function feedback()
    {
        $message = request('message');
        if (!$message) return;
        \Mail::to('08es34@gmail.com')->queue(new AdminFeedbackMailable($message, [
            'ip' => \Request::ip(),
            'user-agent' => \Request::userAgent(),
        ]));
    }
}
