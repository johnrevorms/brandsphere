<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\ApplicationController;

// Public routes
Route::get('/test', function () {
    $user = \App\Models\User::first();
    return \Illuminate\Support\Facades\Hash::check('password', $user->password) ? 'YES' : 'NO';
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Webhook
Route::post('/webhook/midtrans', [OrderController::class, 'midtransWebhook']);

// Public reads
Route::get('/products', [ProductController::class, 'index']);
Route::get('/shipping/provinces', [ShippingController::class, 'getProvinces']);
Route::get('/shipping/cities/{province}', [ShippingController::class, 'getCities']);
Route::post('/shipping/cost', [ShippingController::class, 'getCost']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/careers', [CareerController::class, 'index']);
Route::get('/careers/{id}', [CareerController::class, 'show']);
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{id}', [ArticleController::class, 'show']);
Route::get('/pages', [PageController::class, 'index']);
Route::get('/settings', [SettingController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);
    Route::put('/user', [AuthController::class, 'updateProfile']);

    // User Orders
    Route::get('/orders/user', [OrderController::class, 'userOrders']);
    Route::post('/orders', [OrderController::class, 'store']);

    // Admin Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);

    // Products (Admin)
    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/products/{id}', [ProductController::class, 'update']); // multipart update
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::get('/products/{id}/buyers', [ProductController::class, 'buyers']); // stock tracking

    // Careers (CMS)
    Route::post('/careers', [CareerController::class, 'store']);
    Route::put('/careers/{id}', [CareerController::class, 'update']);
    Route::delete('/careers/{id}', [CareerController::class, 'destroy']);

    // Articles (CMS)
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::post('/articles/{id}', [ArticleController::class, 'update']); // multipart update
    Route::put('/articles/{id}', [ArticleController::class, 'update']);
    Route::delete('/articles/{id}', [ArticleController::class, 'destroy']);

    // CMS Pages
    Route::put('/pages/{slug}', [PageController::class, 'update']);
    Route::post('/pages/{slug}', [PageController::class, 'update']); // alias

    // Settings (CMS)
    Route::post('/settings', [SettingController::class, 'set']);
    Route::post('/settings/upload', [SettingController::class, 'uploadImage']);

    // Job Applications
    Route::post('/applications', [ApplicationController::class, 'store']);
    Route::get('/careers/{id}/application-status', [ApplicationController::class, 'getUserApplicationStatus']);
    Route::get('/applications', [ApplicationController::class, 'index']);
    Route::put('/applications/{id}/status', [ApplicationController::class, 'updateStatus']);
    Route::delete('/applications/{id}', [ApplicationController::class, 'destroy']);
});
