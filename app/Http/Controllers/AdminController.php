<?php

namespace App\Http\Controllers;

use App\Mail\AdminFeedbackMailable;

class AdminController extends Controller
{
    public function userOffline()
    {
        $user = User::current();
        if (!$user) return '-';

        $user->removeFromOnlineUsers();

        dispatch(function () use ($user) {
            $sharedProjectId = SitemapMember::whereUserId($user->id)->pluck('sitemap_id');
            $sitemaps = Sitemap::whereIn('id', $sharedProjectId)
                ->orWhere('owner_id', $user->id)
                ->get();
            foreach ($sitemaps as $sitemap) {
                /* @var $sitemap Sitemap */
                $sitemap->removeActiveUser($user);
            }
        });

        logContent("user offline: {$user->email}");
        return $user->id;
    }

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
