<?php

namespace App\Traits;

use App\Models\User;

/**
 * App\Traits\OnlineUsers
 *
 * @mixin User
 */
trait OnlineUsersTrait
{
    private static string $setName = 'online_users';

    public function addToOnlineUsers(): void
    {
        app('redis')->sadd(static::$setName, $this->id);
    }

    public function removeFromOnlineUsers(): void
    {
        app('redis')->srem(static::$setName, $this->id);
    }

    public static function onlineUserIds()
    {
        return app('redis')->smembers(static::$setName);
    }

    public function isOnline()
    {
        return app('redis')->sismember(static::$setName, $this->id);
    }
}
