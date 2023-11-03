<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Mail\ResetPasswordEmail;
use App\Mail\VerifyEmail;
use App\Models\User;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Validator;

class AuthController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @OA\Post(
     * path="/api/register",
     * summary = "Register an user",
     * description = "Register with email and password",
     * tags={"Auth"},
     *
     * @OA\RequestBody(
     *    required=true,
     *    description="pass user credentials",
     *
     *    @OA\JsonContent(
     *        required={"email", "name", "birthdate","password", "c_password"},
     *
     *    @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
     *    @OA\Property(property="name", type="string", example="user1"),
     *    @OA\Property(property="birthdate", type="date", example="2000-10-11"),

     *    @OA\Property(property="password", type="string", format="password", example="MotdePasse"),
     *  *    @OA\Property(property="c_password", type="string", format="password", example="MotdePasse"),
     * ),
     * ),
     *
     * @OA\Response(
     *    response=422,
     *    description="Wrong credentials response",
     *
     *    @OA\JsonContent(
     *
     *      @OA\Property(property="success", type="boolean", example="false"),
     *      @OA\Property(property="message", type="string", example="Validation Errors"),
     *      @OA\Property(property="data", type="array", collectionFormat="multi",
     *
     *         @OA\Items(
     *          type="string",
     *          example={"The email field is required", "The email must be a valid email address"},
     * )
     *
     * ),
     *    ),
     * ),
     * )
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'birthdate' => 'required|date',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $input['friend_code'] = User::generateUniqueFriendCode();

        $user = User::create($input);
        $success['token'] = $user->createToken('MyApp')->plainTextToken;
        $success['name'] = $user->name;

        Mail::to($input['email'])->send(new VerifyEmail($success['token']));

        return $this->sendResponse($success, 'User register successfully.');
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * Login api
     *
     * @OA\Post(
     *     path="/api/login",
     *     summary="Connexion de l'utilisateur",
     *     description="Connectez-vous en tant qu'utilisateur",
     *     tags={"Auth"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         description="Saisissez les informations de connexion de l'utilisateur",
     *
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *
     *             @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="MotDePasse"),
     *         ),
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Utilisateur connecté avec succès",
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="E-mail ou mot de passe incorrect",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="error", type="string", example="Non autorisé"),
     *         ),
     *     ),
     * )
     */
    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('MyApp')->plainTextToken;
            $success['email'] = $user->email;
            $success['name'] = $user->name;
            $success['birthdate'] = $user->birthdate;
            $success['id'] = $user->id;

            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Email ou mot de passe incorrect.', ['error' => 'Unauthorised']);
        }
    }

    /**
     * Vérifier l'e-mail de l'utilisateur
     *
     * @OA\Post(
     *     path="/api/verify-email/{token}",
     *     summary="Vérification de l'e-mail",
     *     description="Vérifiez l'e-mail de l'utilisateur en utilisant un jeton",
     *     tags={"Auth"},
     *
     *     @OA\Response(
     *         response=200,
     *         description="E-mail vérifié avec succès",
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Non autorisé",
     *         ),
     *     ),
     */
    public function verify($token)
    {
        $user = Auth::guard('sanctum')->user();
        if ($user) {
            if ($user->email_verified_at) {
                return $this->sendResponse($user, 'User already verified');
            }

            if ($user->markEmailAsVerified($token)) {
                return $this->sendResponse($user, 'User verified !');
            }
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/send-password-reset-email",
     *     summary="Send Password Reset Email",
     *     description="Send a password reset email to the user",
     *     tags={"Auth"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         description="Provide user email for password reset",
     *
     *         @OA\JsonContent(
     *             required={"email"},
     *
     *             @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
     *         ),
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Password reset email sent successfully",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Password reset email sent successfully"),
     *         ),
     *     ),
     *
     *     @OA\Response(
     *         response=422,
     *         description="Validation errors",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Validation Error"),
     *             @OA\Property(property="errors", type="object",
     *                 @OA\Property(property="field_name", type="array",
     *
     *                     @OA\Items(
     *                         type="string",
     *                         example={"The field is required", "The field must be a valid email address"}
     *                     ),
     *                 ),
     *             ),
     *         ),
     *     ),
     * )
     */
    public function sendPasswordResetEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $token = bin2hex(random_bytes(32));
        DB::table('password_reset_tokens')
            ->where('email', $input['email'])
            ->delete();
        $password_resets_record = DB::table('password_reset_tokens')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => Carbon::now(),
        ]);

        Mail::to($input['email'])->send(new ResetPasswordEmail($token));

        return $this->sendResponse($input, 'Email envoyé avec succès');

    }

    /**
     * @OA\Post(
     *     path="/api/reset-password",
     *     summary="Reset Password",
     *     description="Reset user password using a token",
     *     tags={"Auth"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         description="Provide user token, email, and new password",
     *
     *         @OA\JsonContent(
     *             required={"token", "email", "password", "c_password"},
     *
     *             @OA\Property(property="token", type="string", example="reset_token"),
     *             @OA\Property(property="email", type="string", format="email", example="user1@mail.com"),
     *             @OA\Property(property="password", type="string", format="password", example="NewPassword"),
     *             @OA\Property(property="c_password", type="string", format="password", example="NewPassword"),
     *         ),
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Password reset successfully",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Password reset successfully"),
     *         ),
     *     ),
     *
     *     @OA\Response(
     *         response=422,
     *         description="Validation errors",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Validation Error"),
     *             @OA\Property(property="errors", type="object",
     *                 @OA\Property(property="field_name", type="array",
     *
     *                     @OA\Items(
     *                         type="string",
     *                         example={"The field is required", "The field must be at least 8 characters", "The field must match the password field"}
     *                     ),
     *                 ),
     *             ),
     *         ),
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="User not found",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="User not found"),
     *         ),
     *     ),
     *
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Internal Server Error"),
     *         ),
     *     ),
     * )
     */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        try {
            $user = User::where('email', $request->input('email'))->first();

            if ($user) {
                $user->update([
                    'password' => bcrypt($request->input('password')),
                ]);

                // La mise à jour du mot de passe a réussi
                return $this->sendResponse($user, 'Mot de passe mis à jour avec succès');

            } else {
                // L'utilisateur avec cette adresse e-mail n'a pas été trouvé
                return response()->json(['message' => 'Utilisateur non trouvé'], 404);
            }
        } catch (\Exception $e) {
            // Une exception s'est produite lors de la mise à jour du mot de passe
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }
}
