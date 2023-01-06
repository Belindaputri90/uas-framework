<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/register', [App\Http\Controllers\API\AuthController::class, 'register']);
//API route for login user
Route::post('/login', [App\Http\Controllers\API\AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/get_users', [App\Http\Controllers\API\AuthController::class, 'get_users']);
    Route::get('/get_users_by_id/{id}', [App\Http\Controllers\API\AuthController::class, 'get_users_by_id']);
    Route::post('/create',[App\Http\Controllers\API\AuthController::class,'create']);
    Route::get('/delete_user/{id}', [App\Http\Controllers\API\AuthController::class, 'delete_users']);
    Route::post('/update_user/', [App\Http\Controllers\API\AuthController::class, 'update_users']);
    Route::post('/logout', [App\Http\Controllers\API\AuthController::class, 'logout']);

    // API route for logout user
    
    Route::get('/get_prd', [App\Http\Controllers\API\ProductController::class, 'index']);
    Route::post('/create_prd', [App\Http\Controllers\API\ProductController::class, 'create']);
    Route::post('/update_prd', [App\Http\Controllers\API\ProductController::class, 'update']);
    Route::get('/delete_prd/{id}', [App\Http\Controllers\API\ProductController::class, 'destroy']);
});