<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Bar;

class BarController extends BaseController
{
    /**
     * Display a listing of the resource.
     */

    /**
     * @OA\Get(
     *     path="/api/bars/{latitude}&{longitude}&{radius}",
     *     operationId="getBars",
     *     tags={"Bars"},
     *     summary="Get a list of bars within a certain radius.",
     *
     *     @OA\Parameter(
     *         name="latitude",
     *         in="path",
     *         description="Latitude",
     *         required=true,
     *
     *         @OA\Schema(type="number", format="float")
     *     ),
     *
     *     @OA\Parameter(
     *         name="longitude",
     *         in="path",
     *         description="Longitude",
     *         required=true,
     *
     *         @OA\Schema(type="number", format="float")
     *     ),
     *
     *     @OA\Parameter(
     *         name="radius",
     *         in="path",
     *         description="Search radius in kilometers",
     *         required=true,
     *
     *         @OA\Schema(type="number", format="float")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Invalid input",
     *     )
     * )
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
}
