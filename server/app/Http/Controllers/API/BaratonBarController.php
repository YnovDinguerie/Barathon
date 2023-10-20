<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\StoreBaratonBarRequest;
use App\Http\Requests\UpdateBaratonBarRequest;
use App\Models\BaratonBar;

class BaratonBarController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBaratonBarRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(BaratonBar $baratonBar)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BaratonBar $baratonBar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBaratonBarRequest $request, BaratonBar $baratonBar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BaratonBar $baratonBar)
    {
        //
    }
}
