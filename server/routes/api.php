<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BaratonBarController;
use App\Http\Controllers\API\BaratonController;
use App\Http\Controllers\API\BarController;
use App\Http\Controllers\API\BarOpinionController;
use App\Http\Controllers\API\FriendController;
use App\Http\Controllers\API\SocketTestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\LoginWithGoogleController;

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
    Route::put('update-profile', 'updateProfile');
});

Route::controller(BaratonController::class)->group(function () {
    Route::get('baratons', 'index');
    Route::get('baratons/{baraton}', 'show');
    Route::post('baratons', 'store');
    Route::delete('baratons/{baraton}', 'destroy');
    Route::put('baratons/{baraton}', 'update');
    Route::get('baratons/{baraton}/bars', 'getBaratonBars');
});

Route::controller(BarController::class)->group(function () {

    Route::get('bars/{userLatitude}&{userLongitude}&{radius}', 'index');
    Route::get('bars-search/{userLatitude}&{userLongitude}&{name}', 'search');
    Route::get('bars/{bar}', 'show');

});

Route::controller(BaratonBarController::class)->group(function () {
    Route::post('baraton-bars/', 'store');
    Route::get('baraton-bars/{baratonBar}', 'show');
    Route::put('baraton-bars/{baratonBar}', 'update');
    Route::delete('baraton-bars/{baratonBar}', 'destroy');
});

Route::controller(BarOpinionController::class)->group(function () {
    Route::get('bar-opinions/{barId}', 'index');
    Route::post('bar-opinions', 'store');
    Route::put('bar-opinions/{barOpinion}', 'update');
    Route::delete('bar-opinions/{barOpinion}', 'destroy');
});

Route::controller(FriendController::class)->group(function () {
    Route::get('friends', 'index');
    Route::get('friends/pending', 'pendingFriends');
    Route::post('friends', 'store');
    Route::put('friends/{id}', 'update');
    Route::delete('friends/{id}', 'destroy');
});

Route::controller(SocketTestController::class)->group(function () {
    Route::get('test', 'index');
});



Route::controller(LoginWithGoogleController::class)->group(function(){
    Route::get('authorized/google', 'redirectToGoogle')->name('auth.google');
    Route::get('authorized/google/callback', 'handleGoogleCallback');
});
