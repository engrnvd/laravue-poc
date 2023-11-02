<?php

Route::get('/verify-email', function () {
    // Get a user for demo purposes
    $user = \App\Models\User::first();
    return (new \App\Mail\VerifyEmail())->toMail($user);
});

Route::get('/encrypt-test', function () {
    $enc = encrypt(request('q', 'naveed'));
    pr($enc, 'encrypted');
    pr(decrypt($enc), 'decrypted');
});

Route::any('/test-redis', function () {
    $types = ['unknown', 'string', 'set', 'list', 'zset', 'hash', 'stream'];
    $redis = app('redis');
    $redis->set('test', 'test val');
    $redis->hmset('hash_test', ['k' => 'test val']);
    // show form to delete a key
    echo '<form method="post"><input name="key-to-del"><button>Delete</button></form>';
    if ($keyToDel = request('key-to-del')) {
        $keys = $redis->keys($keyToDel);
        $redis->del($keys);
        return redirect()->back();
    }

    $query = "*";
    if (request('keys')) {
        $query = request('keys');
    }
    $keys = $redis->keys($query);
    foreach ($keys as $key) {
        $type = $redis->type($key);
        echo "<b>" . $key . "</b> (" . $types[app('redis')->type($key)] . "): ";

        switch ($type) {
            case Redis::REDIS_HASH:
                pr($redis->hgetall($key), $key);
                break;
            case Redis::REDIS_SET:
                echo "<br>" . join(', ', $redis->smembers($key));
                break;
            case Redis::REDIS_ZSET:
                pr($redis->zrange($key, 0, 0), $key);
                break;
            case Redis::REDIS_LIST:
                pr($redis->lrange($key, 0, 0), $key);
                break;
            default:
                echo $redis->get($key);
        }
        echo "<br>ttl: " . $redis->ttl($key) . "<br><hr>";
    }
    exit;
});
