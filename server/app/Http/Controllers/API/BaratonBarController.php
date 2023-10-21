<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\StoreBaratonBarRequest;
use App\Http\Requests\UpdateBaratonBarRequest;
use App\Models\BaratonBar;
use App\Models\Baraton;
use Validator;
use Illuminate\Support\Facades\Auth;



class BaratonBarController extends BaseController
{


    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
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
    /**
 * @OA\Post(
 *     path="/api/baraton-bars",
 *     operationId="storeBaratonBar",
 *     tags={"BaratonBars"},
 *     summary="Create a new Baraton Bar",
 *     @OA\RequestBody(
 *         required=true,
 *         description="Baraton Bar data",
 *         @OA\JsonContent(
 *             @OA\Property(property="baraton_id", type="integer", format="int64", description="ID of the Baraton"),
 *             @OA\Property(property="bar_id", type="integer", format="int64", description="ID of the Bar"),
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Baraton Bar created successfully",
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Validation Error",
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Unauthenticated",
 *     ),
 *     @OA\Response(
 *         response=403,
 *         description="Unauthorized",
 *     ),
 *  security={{"sanctum": {}}}
 * )
 */
    public function store(StoreBaratonBarRequest $request)
    {
        $validator = Validator::make($request->all(), [
            'baraton_id' => 'required',
            'bar_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = Auth::user();

        $input = $request->all();
        $baraton = Baraton::find($input['baraton_id']);

        if($baraton->user['id'] != $user['id']){
            return $this->sendError('Unauthorised.', ['error' => 'not your resource']);
        }

        $baraton_bar = BaratonBar::create($input);

        return $this->sendResponse($baraton_bar, 'Baraton bar created successfully.');
    }

    /**
     * Display the specified resource.
     */
    /**
 * @OA\Get(
 *     path="/api/baraton-bars/{baratonBar}",
 *     operationId="showBaratonBar",
 *     tags={"BaratonBars"},
 *     summary="Get details of a Baraton Bar",
 *     @OA\Parameter(
 *         name="baratonBar",
 *         in="path",
 *         description="ID of the Baraton Bar to retrieve",
 *         required=true,
 *         @OA\Schema(type="integer", format="int64")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Baraton Bar details retrieved successfully",
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
 *  security={{"sanctum": {}}}
 *
 * )
 */
    public function show(BaratonBar $baratonBar)
    {
        $user = Auth::user();

        $baraton = Baraton::findOrFail($baratonBar['baraton_id']);

        if($baraton->user['id'] != $user['id']){
            return $this->sendError('Unauthorised.', ['error' => 'not your resource']);
        }


        $baratonBar['bar'] = $baratonBar->bar;
        $baratonBar['baraton'] = $baratonBar->baraton;
        return $this->sendResponse($baratonBar, 'success.');

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

     /**
 * @OA\Delete(
 *     path="/api/baraton-bars/{baratonBar}",
 *     operationId="destroyBaratonBar",
 *     tags={"BaratonBars"},
 *     summary="Delete a Baraton Bar",
 *     @OA\Parameter(
 *         name="baratonBar",
 *         in="path",
 *         description="ID of the Baraton Bar to delete",
 *         required=true,
 *         @OA\Schema(type="integer", format="int64")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Baraton Bar deleted successfully",
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
 *  security={{"sanctum": {}}}
 * )
 */
    public function destroy(BaratonBar $baratonBar)
    {

        $user = Auth::user();
        $baraton = Baraton::find($baratonBar['baraton_id']);
        if($baraton->user['id'] == $user['id']){
            try {
                $baratonBar->delete();

                return $this->sendResponse($baratonBar, 'Baraton bar supprimé avec succès');
            } catch (\Exception $e) {
                return $this->sendError('Error.', ['error' => 'Error']);
            }
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }
}
