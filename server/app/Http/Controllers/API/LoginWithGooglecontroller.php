<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;
use App\Http\Controllers\API\BaseController as BaseController;
use Validator;
use GuzzleHttp\Client;

class LoginWithGoogleController extends BaseController
{
    public function redirectToGoogle()
    {
        return response()->json([
            'redirect_url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }

    public function handleGoogleCallback(Request $request)
    {

        try {

            $user = Socialite::driver('google')->stateless()->user();
            $findUser = User::where('google_id', $user->id)->first();
            if ($findUser) {
                Auth::login($findUser);
                $token = $findUser->createToken('API Token')->plainTextToken;
                return redirect(env('FRONT_URL').'auth/google-auth/?token='.$token);


            } else {
                $newUser = User::create([
                    'name' => $user->name,
                    'birthdate' => '2000-10-11',
                    'email' => $user->email,
                    'google_id' => $user->id,
                    'password' => bcrypt('123456dummy'),
                ]);

                Auth::login($newUser);
                $token = $newUser->createToken('API Token')->plainTextToken;
                return redirect(env('FRONT_URL').'auth/google-auth/?token='.$token);



            }
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], 500);
        }
    }
}
