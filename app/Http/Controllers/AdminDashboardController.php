<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserActivity;

class AdminDashboardController extends Controller
{
    public function onlineUsersIds()
    {
        return User::onlineUserIds();
    }

    public function cards()
    {
        $payingUsers = \DB::select("SELECT count(*) as count, DATE_FORMAT(now(), '%a %Y-%m-%d') as date  from users where plan_id <> 1 AND NOT isnull(stripe_sub_id)");
        return [
            'Signups' => $this->cardData('users'),
            'Sitemaps' => $this->cardData('sitemaps'),
            'Activities' => $this->cardData('user_activities'),
            'Total Active Subs' => $payingUsers,
            'Online Users' => [['count' => count(User::onlineUserIds()), 'date' => now()->format('D Y-m-d')]]
        ];
    }

    private function cardData($table)
    {
        $metaWhereStart = $table === 'sitemaps' ? ' ISNULL(meta) AND (' : '';
        $metaWhereEnd = $table === 'sitemaps' ? ') ' : '';
        $query = "SELECT DATE_FORMAT(created_at, '%a %Y-%m-%d') as date, count(*) as count
            FROM {$table}
            WHERE {$metaWhereStart} DATE(created_at) = CURDATE()
            OR (DATE(created_at) = DATE(now() - INTERVAL 7 DAY) AND created_at < now() - INTERVAL 7 DAY)
            {$metaWhereEnd}
            GROUP BY date;";
        return \DB::select($query);
    }

    public function dailyChart()
    {
        $query = "SELECT DATE_FORMAT(created_at, '%a %Y-%m-%d') as date, count(*) as count
            FROM users
            WHERE created_at > now() - INTERVAL 4 WEEK
            GROUP BY date;";
        $users = \DB::select($query);
        $query = "SELECT DATE_FORMAT(created_at, '%a %Y-%m-%d') as date, count(*) as count
            FROM sitemaps
            WHERE created_at > now() - INTERVAL 4 WEEK
            AND ISNULL(meta)
            GROUP BY date;";
        $sitemaps = \DB::select($query);
        $query = "SELECT DATE_FORMAT(created_at, '%a %Y-%m-%d') as date, count(*) / 35 as count
            FROM user_activities
            WHERE created_at > now() - INTERVAL 4 WEEK
            GROUP BY date;";
        $activities = \DB::select($query);
        return [
            ['label' => 'Signups', 'data' => $users, 'backgroundColor' => '#3fb15e'],
            ['label' => 'Sitemaps', 'data' => $sitemaps, 'backgroundColor' => '#03a9f4'],
//            ['label' => 'Activities', 'data' => $activities],
        ];
    }

    public function activities()
    {
        $query = UserActivity::query()
            ->select([\DB::raw("COUNT(*) as count"), \DB::raw("CONCAT(category,': ', title) as action")])
            ->where('category', '<>', 'Canvas')
            ->groupBy('action')
            ->orderBy('count', 'desc');

        $recent = clone $query;
        $recent->where('created_at', '>', now()->subWeeks(2));
        return [
            'all' => $query->get(),
            'recent' => $recent->get(),
        ];
    }

    public function canvasActivities()
    {
        $query = UserActivity::query()
            ->select([\DB::raw("COUNT(*) as count"), \DB::raw("title as action")])
            ->where('category', 'Canvas')
            ->groupBy('action')
            ->orderBy('count', 'desc');

        $recent = clone $query;
        $recent->where('created_at', '>', now()->subWeeks(2));
        return [
            'all' => $query->get(),
            'recent' => $recent->get(),
        ];
    }
}
