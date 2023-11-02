<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\StoreBaratonRequest;
use App\Http\Requests\UpdateBaratonRequest;
use App\Models\Baraton;
use Illuminate\Support\Facades\Auth;
use Validator;

/**
 * @OA\Tag(
 *     name="Baratons",
 *     description="Operations about Baratons"
 * )
 */
class BaratonController extends BaseController
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
     *     path="/api/baratons",
     *     tags={"Baratons"},
     *     summary="Get a list of baratons",
     *     operationId="getBaratons",
     *
     *     @OA\Response(
     *         response=200,
     *         description="List of baratons"
     *     ),
     *     security={{"sanctum": {}}}
     * )
     */
    public function index()
    {
        $user = Auth::user();
        $baratons = Baraton::where('user_id', $user['id'])->get();

        return $this->sendResponse($baratons, 'success.');
    }

    /**
     * @OA\Get(
     *     path="/api/baratons/{baraton}/bars",
     *     operationId="getBaratonBars",
     *     tags={"Baratons"},
     *     summary="Get Baraton Bars",
     *
     *     @OA\Parameter(
     *         name="baraton",
     *         in="path",
     *         description="ID of the Baraton",
     *         required=true,
     *
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Baraton Bars retrieved successfully",
     *
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
     *     )
     * )
     */
    public function getBaratonBars(Baraton $baraton)
    {
        $user = Auth::user();
        if ($baraton->user_id !== $user->id) {
            return $this->sendError('Unauthorized', ['error' => 'You are not authorized to access this resource.']);
        }
        $baratonBars = $baraton->baratonBars;
        foreach ($baratonBars as $baratonBar) {
            $baratonBar['bar'] = $baratonBar->bar;
        }

        return $this->sendResponse($baratonBars, 'success.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created Baraton.
     *
     * @OA\Post(
     *     path="/api/baratons",
     *     summary="Create a new Baraton",
     *     description="Create a new Baraton with name, time, radius, and city",
     *     tags={"Baratons"},
     *
     *     @OA\RequestBody(
     *         required=true,
     *         description="Baraton data",
     *
     *         @OA\JsonContent(
     *             required={"name", "time", "radius", "city"},
     *
     *             @OA\Property(property="name", type="string", example="Baraton Name"),
     *             @OA\Property(property="time", type="string", example="Event Time"),
     *             @OA\Property(property="radius", type="string", example="Event Radius"),
     *             @OA\Property(property="city", type="string", example="Event City"),
     *         ),
     *     ),
     *
     *     @OA\Response(
     *         response=201,
     *         description="Baraton created successfully",
     *
     *         @OA\JsonContent(
     *         ),
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation errors",
     *
     *         @OA\JsonContent(
     *
     *             @OA\Property(property="success", type="boolean", example="false"),
     *             @OA\Property(property="message", type="string", example="Validation Errors"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="name", type="array", collectionFormat="multi",
     *
     *                     @OA\Items(type="string", example={"The name field is required"}),
     *                 ),
     *
     *                 @OA\Property(property="time", type="array", collectionFormat="multi",
     *
     *                     @OA\Items(type="string", example={"The time field is required"}),
     *                 ),
     *
     *                 @OA\Property(property="radius", type="array", collectionFormat="multi",
     *
     *                     @OA\Items(type="string", example={"The radius field is required"}),
     *                 ),
     *
     *                 @OA\Property(property="city", type="array", collectionFormat="multi",
     *
     *                     @OA\Items(type="string", example={"The city field is required"}),
     *                 ),
     *             ),
     *         ),
     *     ),
     *     security={{"sanctum": {}}}
     *
     * )
     */
    public function store(StoreBaratonRequest $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'time' => 'required',
            'radius' => 'required',
            'city' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = Auth::user();

        $input = $request->all();
        $input['user_id'] = $user['id'];

        $baraton = Baraton::create($input);

        return $this->sendResponse($baraton, 'Baraton created successfully.');

    }

    /**
     * Show the specified resource.
     *
     * @OA\Get(
     *     path="/api/baratons/{baraton}",
     *     tags={"Baratons"},
     *     summary="Get a specific baraton",
     *     operationId="getBaraton",
     *
     *     @OA\Parameter(
     *         name="baraton",
     *         in="path",
     *         description="ID of the baraton to retrieve",
     *         required=true,
     *
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Baraton details"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     security={{"sanctum": {}}}
     * )
     */
    public function show(Baraton $baraton)
    {
        $user = Auth::user();
        if ($baraton->user_id !== $user->id) {
            return $this->sendError('Unauthorized', ['error' => 'You are not authorized to update this resource.']);
        }

        return $this->sendResponse($baraton, 'success.');

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Baraton $baraton)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @OA\Put(
     *     path="/api/baratons/{baraton}",
     *     tags={"Baratons"},
     *     summary="Update a specific baraton",
     *     operationId="updateBaraton",
     *
     *     @OA\Parameter(
     *         name="baraton",
     *         in="path",
     *         description="ID of the baraton to update",
     *         required=true,
     *
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *
     * @OA\RequestBody(
     *         required=true,
     *         description="Baraton data",
     *
     *         @OA\JsonContent(
     *             required={"name", "time", "radius", "city"},
     *
     *             @OA\Property(property="name", type="string", example="Baraton Name"),
     *             @OA\Property(property="time", type="string", example="Event Time"),
     *             @OA\Property(property="radius", type="string", example="Event Radius"),
     *             @OA\Property(property="city", type="string", example="Event City"),
     *         ),
     *     ),
     *
     *     @OA\RequestBody(
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Baraton updated successfully"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     ),
     *     security={{"sanctum": {}}}
     * )
     */
    public function update(UpdateBaratonRequest $request, Baraton $baraton)
    {
        $user = Auth::user();

        if ($baraton->user_id !== $user->id) {
            return $this->sendError('Unauthorized', ['error' => 'You are not authorized to update this resource.']);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'time' => 'required',
            'radius' => 'required',
            'city' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $baraton->update([
            'name' => $request->input('name'),
            'time' => $request->input('time'),
            'radius' => $request->input('radius'),
            'city' => $request->input('city'),
        ]);

        return $this->sendResponse($baraton, 'Baraton updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @OA\Delete(
     *     path="/api/baratons/{baraton}",
     *     tags={"Baratons"},
     *     summary="Delete a specific baraton",
     *     operationId="deleteBaraton",
     *
     *     @OA\Parameter(
     *         name="baraton",
     *         in="path",
     *         description="ID of the baraton to delete",
     *         required=true,
     *
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Baraton deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     security={{"sanctum": {}}}
     * )
     */
    public function destroy(Baraton $baraton)
    {

        $user = Auth::user();
        if ($baraton['user_id'] == $user['id']) {
            try {
                $baraton->delete();

                return $this->sendResponse($baraton, 'Baraton supprimé avec succès');
            } catch (\Exception $e) {
                return $this->sendError('Error.', ['error' => 'Error']);
            }
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }

    }
}
