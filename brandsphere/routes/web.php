<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('auth.login');
});

Route::get('/register', function () {
    return view('auth.register');
});

// Authentication routes
Route::get('/register', [AuthController::class, 'showRegister']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');

Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', function () {
        return view('user.dashboard');
    });

    Route::get('/admin/dashboard', function () {
        return view('admin.dashboard');
    });

    Route::get('/content/dashboard', function () {
        return view('content.dashboard');
    });

});
