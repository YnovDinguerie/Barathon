<?php

namespace Tests\Feature\Middleware;

use Illuminate\Http\Request;
use Tests\TestCase;

class TrustHostsTest extends TestCase
{
    public function test_hosts_method_does_not_add_security_headers()
    {
        $request = Request::create('http://example.com');

        $response = $this->call('GET', '/', [], [], [], ['HTTP_HOST' => 'example.com']);

        $this->assertFalse($response->headers->has('X-Frame-Options'));
    }
}
