<?php

namespace App\Http\Controllers\API;

use App\Events\TestEvent;
use App\Http\Controllers\API\BaseController as BaseController;

class SocketTestController extends BaseController
{
    public function index()
    {
        broadcast(new TestEvent());
    }
}
