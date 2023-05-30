<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BaseModel
 *
 * @property int $id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|SitemapInvite newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SitemapInvite newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SitemapInvite query()
 * @mixin \Eloquent
 * @property-read mixed $encrypted_id
 */
class BaseModel extends Model
{
    protected $guarded = ["id", "created_at", "updated_at"];

    public function getEncryptedIdAttribute()
    {
        return encrypt($this->id);
    }
}
