<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\StoreFavoriteBarRequest;
use App\Models\FavoriteBar;
use Illuminate\Support\Facades\Auth;
use Validator;

/**
 * @OA\Tag(
 *     name="FavoriteBars",
 *     description="Operations about FavoriteBars"
 * )
 */
class FavoriteBarController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    /**
     * Display a listing of the resource.
     */

    /**
     * Display a listing of the resource.
     *
     * @OA\Get(
     *     path="/api/favorite-bars",
     *     tags={"FavoriteBars"},
     *     summary="Get a list of FavoriteBars",
     *     operationId="getFavoriteBars",
     *
     *     @OA\Response(
     *         response=200,
     *         description="List of FavoriteBars"
     *     ),
     *     security={{"sanctum": {}}}
     * )
     */
    public function index()
    {
        //
        $user = Auth::user();

        $favoriteBars = FavoriteBar::where('user_id', $user->id)->get();

        foreach ($favoriteBars as $favoriteBar) {
            $favoriteBar['bar'] = $favoriteBar->bar;
        }

        return $this->sendResponse($favoriteBars, 'success.');

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

     *
     * @OA\Post(
     *     path="/api/favorite-bars",
     *     tags={"FavoriteBars"},
     *     summary="Store a new FavoriteBar",
     *     operationId="storeFavoriteBar",
     *
     *     @OA\RequestBody(
     *         required=true,
     *         description="FavoriteBar data",
     *
     *         @OA\JsonContent(
     *             required={"bar_id"},
     *
     *             @OA\Property(property="bar_id", type="integer", example=1),
     *         ),
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="FavoriteBar created successfully",
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation Error",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Validation Error"),
     *             @OA\Property(property="errors", type="object"),
     *         ),
     *     ),
     *     security={{"sanctum": {}}}
     * )
     */
    public function store(StoreFavoriteBarRequest $request)
    {
        $validator = Validator::make($request->all(), [
            'bar_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = Auth::user();

        $input = $request->all();
        $input['user_id'] = $user['id'];

        $checkIfAlreadyExist = FavoriteBar::where([
            ['user_id', $user['id']],
            ['bar_id', $request['bar_id']],
        ])->count();

        if ($checkIfAlreadyExist === 1) {
            return $this->sendError('Vous avez déjà ce bar en favoris', ['error' => 'Unauthorised']);
        }

        $favoriteBar = FavoriteBar::create($input);
        $favoriteBar['bar'] = $favoriteBar->bar;

        return $this->sendResponse($favoriteBar, 'favoriteBar created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(FavoriteBar $favoriteBar)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FavoriteBar $favoriteBar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @OA\Delete(
     *     path="/api/favorite-bars/{favoriteBar}",
     *     tags={"FavoriteBars"},
     *     summary="Delete a FavoriteBar",
     *     operationId="destroyFavoriteBar",
     *
     *     @OA\Parameter(
     *         name="favoriteBar",
     *         in="path",
     *         description="ID of the FavoriteBar to be deleted",
     *         required=true,
     *
     *         @OA\Schema(
     *             type="integer",
     *             format="int64",
     *             example=1,
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="FavoriteBar deleted successfully",
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="Unauthorised"),
     *             @OA\Property(property="errors", type="object"),
     *         ),
     *     ),
     *
     *     @OA\Response(
     *         response=404,
     *         description="FavoriteBar not found",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="message", type="string", example="FavoriteBar not found"),
     *             @OA\Property(property="errors", type="object"),
     *         ),
     *     ),
     *     security={{"sanctum": {}}}
     * )
     */
    public function destroy(FavoriteBar $favoriteBar)
    {
        $user = Auth::user();
        if ($favoriteBar['user_id'] == $user['id']) {
            try {
                $favoriteBar->delete();

                return $this->sendResponse($favoriteBar, 'favoriteBar supprimé avec succès');
            } catch (\Exception $e) {
                return $this->sendError('Error.', ['error' => 'Error']);
            }
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }
}
