<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BaratonBarController;
use App\Http\Controllers\API\BaratonController;
use App\Http\Controllers\API\BarController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

use App\Models\User;

Route::get('users', function () {
    $users = User::all();

    return response()->json(['users' => $users], 200);
});

Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::post('verify-email/{token}', 'verify');
    Route::post('send-password-reset-email', 'sendPasswordResetEmail');
    Route::post('reset-password', 'resetPassword');
});

Route::controller(BaratonController::class)->group(function () {
    Route::get('baratons', 'index');
    Route::get('baratons/{baraton}', 'show');
    Route::post('baratons', 'store');
    Route::delete('baratons/{baraton}', 'destroy');
    Route::put('baratons/{baraton}', 'update');
    Route::get('baratons/bars/{baraton}', 'getBaratonBars');
});

Route::controller(BarController::class)->group(function () {

    Route::get('bars/{userLatitude}&{userLongitude}&{radius}', 'index');
});

Route::controller(BaratonBarController::class)->group(function () {

    Route::post('baraton-bars/', 'store');
    Route::get('baraton-bars/{baratonBar}', 'show');
    Route::delete('baraton-bars/{baratonBar}', 'destroy');
});
