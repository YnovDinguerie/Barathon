<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Mail\VerifyEmail;

use App\Events\UpdateWaitingRoom;
use App\Events\MyEvent;

class AuthController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'c_password' => 'required|same:password',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['name'] =  $user->name;



        Mail::to($input['email'])->send(new VerifyEmail($success['token']));

        return $this->sendResponse($success, 'User register successfully.');
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $success['name'] =  $user->name;
            $success['id'] =  $user->id;

            return $this->sendResponse($success, 'User login successfully.');
        }
        else{
            return $this->sendError('Email ou mot de passe incorrect.', ['error'=>'Unauthorised']);
        }
    }


    public function verify($token) {
        $user = Auth::guard('sanctum')->user();
        // return $user;
        if($user){
            if ($user->email_verified_at) {
                return $this->sendResponse($user, 'User already verified');
            }

            if ($user->markEmailAsVerified($token)) {
                return $this->sendResponse($user, 'User verified !');
            }
        }
        else{
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }


    }

    public function test(){
        broadcast(new UpdateWaitingRoom('dialogs'));
    }



    public function aled($params){
        echo $params;
        $test = broadcast(new MyEvent($params));

        // event(new MyEvent('hello world'));
    }
}
