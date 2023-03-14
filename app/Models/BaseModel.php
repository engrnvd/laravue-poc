<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BaseModel
 *
 * @method static \Illuminate\Database\Eloquent\Builder|SitemapInvite newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SitemapInvite newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SitemapInvite query()
 * @mixin \Eloquent
 * @property int $id
 * @property-read string encrypted_id
 */
class BaseModel extends Model
{
    public function getEncryptedIdAttribute()
    {
        return encrypt($this->id);
    }
}
