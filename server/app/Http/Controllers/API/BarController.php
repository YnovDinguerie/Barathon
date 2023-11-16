<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Bar;
use Illuminate\Support\Facades\Auth;

class BarController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }
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

    /**
     * @OA\Get(
     *     path="/api/bars/{bar}",
     *     operationId="getBar",
     *     tags={"Bars"},
     *     summary="Get details of a specific bar.",
     *
     *     @OA\Parameter(
     *         name="bar",
     *         in="path",
     *         description="Bar ID",
     *         required=true,
     *
     *         @OA\Schema(type="integer")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Bar not found",
     *     )
     * )
     */
    public function show(Bar $bar)
    {
        return $this->sendResponse($bar, 'success.');
    }

    /**
     * @OA\Get(
     *     path="/api/bars-search/{latitude}&{longitude}&{name}",
     *     operationId="searchBars",
     *     tags={"Bars"},
     *     summary="Search bars by name within a certain radius.",
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
     *         name="name",
     *         in="path",
     *         description="Name to search for",
     *         required=true,
     *
     *         @OA\Schema(type="string")
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
    public function search($latitude, $longitude, $name)
    {
        $user = Auth::user();
        if (strlen($name) < 3) {
            return $this->sendError('Unauthorized', ['error' => 'Merci rentrer au moins 3 caractères']);
        }
        $latitude = deg2rad($latitude);
        $longitude = deg2rad($longitude);
        $bars = Bar::with(['favoriteBars' => function ($query) use ($user) {
            $query->where('user_id', $user->id);
        }])
            ->select('bars.*')
            ->selectRaw('(
            6371 * 2 * asin(
                sqrt(
                    power(sin((radians(latitude) - ?) / 2), 2) +
                    cos(?) * cos(radians(latitude)) *
                    power(sin((radians(longitude) - ?) / 2), 2)
                )
            )
        ) AS distance', [$latitude, $latitude, $longitude])
            ->where('name', 'like', '%'.$name.'%')
            ->get()
            ->map(function ($bar) {
                $bar->isFavorite = $bar->favoriteBars->isNotEmpty();

                return $bar;
            });

        return $this->sendResponse($bars, 'success.');

    }
}
