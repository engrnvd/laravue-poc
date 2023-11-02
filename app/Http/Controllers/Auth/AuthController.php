<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\ForgotPasswordNotification;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    /**
     * @throws ValidationException
     */
    public function login(Request $request): array
    {
        $user = User::where('email', $request->email)->first();
        /* @var $user User */

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return $this->loginResponse($user);
    }

    function loginWithGoogle(Request $request)
    {
        if (!$request->credential) abort(400, "Could not login");

        try {
            $data = parseJwt($request->credential);
            \Log::info(to_str($data));
            $email = \Arr::get($data, 'email');
            $name = \Arr::get($data, 'name');
            $pic = \Arr::get($data, 'picture');

            if (!$name || !$email) abort(400, 'Could not login');

            $existingUser = true;
            $user = User::withTrashed()->where('email', $email)->first();
            if (!$user) {
                $user = new User();
                $existingUser = false;
                $user->email_verified_at = Carbon::now();
            }
            if ($user->deleted_at) $user->deleted_at = null;

            $user->email = $email;
            $user->name = $name;
            $user->avatar = $pic;
            $user->password = $user->password ?? 'google';
            $user->save();

            return $existingUser ? $this->loginResponse($user) : $this->signupResponse($user);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            abort(400, "Could not login");
        }
    }

    private function loginResponse(User $user): array
    {
        return [
            'token' => $user->createToken($user->email)->plainTextToken,
            'user' => $user,
        ];
    }

    public function register(Request $request): array
    {
        $user = new User();

        // check if the user was deleted before
        $deleted = User::onlyTrashed()->whereEmail($request->email)->first();

        $rules = ['password', 'name'];
        if (!$deleted) $rules[] = 'email';
        $request->validate($user->getValidationRules($rules));

        if ($deleted) {
            $user = $deleted;
            $user->restore();
        }

        $user = $user->fill([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->save();

        if ($id = $request->get('inviteId')) {
            $invite = SitemapInvite::find(intval($id));
            if ($invite) $user->acceptInvite($invite);
            // invited user already has a verified email
            $user->email_verified_at = Carbon::now();
            $user->save();
        } else {
            $user->sendEmailVerificationNotification();
        }

        return $this->signupResponse($user);
    }

    public function forgotPassword(Request $request): string
    {
        $user = User::where('email', $request->email)->first();
        /* @var $user User */

        if (!$user) {
            abort(400, 'This email is not registered.');
        }

        $user->generateOtp();
        $user->notify(new ForgotPasswordNotification());

        return 'Email sent';
    }

    public function resetPassword(Request $request): string
    {
        $user = User::where('email', $request->email)->first();
        /* @var $user User */

        if (!$user) {
            abort(400, 'This email is not registered.');
        }

        if ($user->otp !== $request->otp) {
            abort(400, 'Invalid OTP.');
        }

        $request->validate($user->getValidationRules('password'));

        $user->otp = '';
        $user->password = Hash::make($request->password);
        $user->save();

        return 'Password has been reset';
    }

    public function changePassword(Request $request): string
    {
        $user = User::current();

        if (!Hash::check($request->password, $user->password)) {
            abort(401, 'Invalid password.');
        }

        $request->validate($user->getValidationRules('password'));

        $user->password = Hash::make($request->new_password);
        $user->save();

        return 'Password has been changed';
    }

    public function update(): string
    {
        $user = User::current();

        request()->validate($user->getValidationRules(['email', 'name']));

        $user->email = \request('email');
        $user->name = \request('name');
        $user->company = \request('company');
        $user->save();

        return '';
    }

    public function deleteAccount(): string
    {
        $user = User::current();

        if (!Hash::check(request('password'), $user->password)) {
            abort(401, 'Invalid password.');
        }

        $user->delete();

        return '';
    }

    public function logout(Request $request): Response
    {
        $request->user()->currentAccessToken()->delete();
        return response('Logged out');
    }
}
