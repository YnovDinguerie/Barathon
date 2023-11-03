<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Validator;

use App\Events\TestEvent;
class SocketTestController extends BaseController
{
    public function index(){
        broadcast(new TestEvent());
    }
}
