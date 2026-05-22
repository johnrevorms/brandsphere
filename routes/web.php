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

    Route::get('/cms/dashboard', function () {
        return view('cms.dashboard');
    });

});


Route::get('/', function () {
    return view('user.dashboard');
})->name('user.dashboard');

Route::get('/products', function () {
    return view('user.products');
})->name('products');

Route::get('/about', function () {
    return view('user.about');
})->name('about');

Route::get('/blog', function () {
    return view('user.blog');
})->name('blog');

Route::get('/career', function () {
    return view('user.career');
})->name('career');

Route::get('/orders', function () {
    return view('user.orders');
})->name('orders');

Route::get('/cart', function () {
    return view('user.cart');
})->name('cart');

Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/register', function () {
    return view('auth.register');
})->name('register');