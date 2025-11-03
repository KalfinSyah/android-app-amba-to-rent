<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// user authentication routes
$router->post('/register', 'UserController@store');



// --- Tambahkan Rute Resource Mobil Di Sini ---
// $router->group(['prefix' => 'cars'], function () use ($router) {
//     $router->get('/', 'CarController@index');         // GET /cars
//     $router->post('/', 'CarController@store');        // POST /cars
//     $router->get('/{id}', 'CarController@show');      // GET /cars/1
//     $router->put('/{id}', 'CarController@update');    // PUT /cars/1
//     $router->delete('/{id}', 'CarController@destroy'); // DELETE /cars/1
// });
