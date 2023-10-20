<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\StoreBarRequest;
use App\Http\Requests\UpdateBarRequest;
use App\Models\Bar;

class BarController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index($latitude, $longitude, $radius)
    {
        $latitude = deg2rad($latitude);
        $longitude = deg2rad($longitude);
        $bars = Bar::select('bars.*')
            ->selectRaw('(
            6371 * 2 * asin(
                sqrt(
                    power(sin((radians(latitude) - ?) / 2), 2) +
                    cos(?) * cos(radians(latitude)) *
                    power(sin((radians(longitude) - ?) / 2), 2)
                )
            )
        ) AS distance', [$latitude, $latitude, $longitude])
            ->havingRaw('distance < ?', [$radius])
            ->get();

        return $this->sendResponse($bars, 'success.');

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
    public function store(StoreBarRequest $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(Bar $bar)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bar $bar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBarRequest $request, Bar $bar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bar $bar)
    {
        //
    }
}
