<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class CypressController extends Controller
{
    public string $testUser = '08es34+cy@gmail.com';

    public function cleanUp(): string
    {
        $user = User::whereEmail($this->testUser)->first();

        if (!$user) return 'User does not exist';

        $user->delete();
        return "User deleted";
    }
}
