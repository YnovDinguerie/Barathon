<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\StoreBarOpinionRequest;
use App\Http\Requests\UpdateBarOpinionRequest;
use App\Models\BarOpinion;
use Illuminate\Support\Facades\Auth;
use Validator;

class BarOpinionController extends BaseController
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    /**
     * Display a listing of the resource.
     */

    /**
     * @OA\Get(
     *     path="/api/bar-opinions/{barId}",
     *     operationId="getBarOpinions",
     *     tags={"Bar Opinions"},
     *     summary="Get Bar Opinions by Bar ID",
     *
     *     @OA\Parameter(
     *         name="barId",
     *         in="path",
     *         description="ID of the Bar to retrieve opinions for",
     *         required=true,
     *
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Bar Opinions retrieved successfully",
     *
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *     )
     * )
     */
    public function index($barId)
    {
        $barOpinions = BarOpinion::where('bar_id', $barId)->get();

        foreach ($barOpinions as $barOpinion) {
            $barOpinion['user'] = $barOpinion->user;
        }

        return $this->sendResponse($barOpinions, 'success.');
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
    /**
     * @OA\Post(
     *     path="/api/bar-opinions",
     *     operationId="storeBarOpinion",
     *     tags={"Bar Opinions"},
     *     summary="Create a new Bar Opinion",
     *
     *     @OA\RequestBody(
     *         required=true,
     *         description="Bar Opinion data",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="bar_id", type="integer", format="int64", description="ID of the Bar"),
     *             @OA\Property(property="opinion", type="string", description="Opinion text"),
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=201,
     *         description="BarOpinion created successfully",
     *
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Validation Error",
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *     ),
     *     security={{"sanctum": {}}}
     *
     * )
     */
    public function store(StoreBarOpinionRequest $request)
    {
        $validator = Validator::make($request->all(), [
            'bar_id' => 'required',
            'opinion' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = Auth::user();

        $input = $request->all();
        $input['user_id'] = $user['id'];

        $barOpinion = BarOpinion::create($input);

        return $this->sendResponse($barOpinion, 'BarOpinion created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BarOpinion $barOpinion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BarOpinion $barOpinion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *     path="/api/bar-opinions/{barOpinion}",
     *     operationId="updateBarOpinion",
     *     tags={"Bar Opinions"},
     *     summary="Update a Bar Opinion",
     *
     *     @OA\Parameter(
     *     name="barOpinion",
     *     in="path",
     *     description="ID of the Bar Opinion to update",
     *     required=true,
     *
     *     @OA\Schema(type="integer", format="int64")
     *     ),
     *
     *     @OA\RequestBody(
     *     required=true,
     *     description="Bar Opinion data",
     *
     *     @OA\JsonContent(
     *
     *         @OA\Property(property="opinion", type="string", description="Updated opinion text"),
     *     )
     *     ),
     *
     *     @OA\Response(
     *     response=200,
     *     description="BarOpinion updated successfully",
     *
     *     ),
     *     @OA\Response(
     *     response=400,
     *     description="Validation Error",
     *     ),
     *     @OA\Response(
     *     response=401,
     *     description="Unauthenticated",
     *     ),
     *     @OA\Response(
     *     response=403,
     *     description="Unauthorized",
     *     ),
     *     @OA\Response(
     *     response=404,
     *     description="Not Found",
     *     ),
     *     security={{"sanctum": {}}}
     *
     * )
     */
    public function update(UpdateBarOpinionRequest $request, BarOpinion $barOpinion)
    {

        $user = Auth::user();
        if ($barOpinion->user_id !== $user->id) {
            return $this->sendError('Unauthorized', ['error' => 'You are not authorized to update this resource.']);
        }
        $validator = Validator::make($request->all(), [
            'opinion' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $barOpinion->update([
            'opinion' => $request->input('opinion'),
        ]);

        return $this->sendResponse($barOpinion, 'BarOpinion updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */

    /**
     * @OA\Delete(
     *     path="/api/bar-opinions/{barOpinion}",
     *     operationId="deleteBarOpinion",
     *     tags={"Bar Opinions"},
     *     summary="Delete a Bar Opinion",
     *
     *     @OA\Parameter(
     *         name="barOpinion",
     *         in="path",
     *         description="ID of the Bar Opinion to delete",
     *         required=true,
     *
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="BarOpinion deleted successfully",
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated",
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *     ),
     *     security={{"sanctum": {}}}
     *
     * )
     */
    public function destroy(BarOpinion $barOpinion)
    {
        $user = Auth::user();
        if ($barOpinion['user_id'] !== $user['id']) {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
        try {

            $barOpinion->delete();

            return $this->sendResponse($barOpinion, 'BarOpinion supprimé avec succès');
        } catch (\Exception $e) {
            return $this->sendError('Error.', ['error' => 'Error']);
        }
    }
}
