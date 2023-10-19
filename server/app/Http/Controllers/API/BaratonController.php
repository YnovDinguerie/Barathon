<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\StoreBaratonRequest;
use App\Http\Requests\UpdateBaratonRequest;
use App\Models\Baraton;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\API\BaseController as BaseController;
use Validator;

class BaratonController extends BaseController
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
        $user = Auth::user();
        $baratons = Baraton::where('user_id',$user['id'])->get();
        return $baratons;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
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
     * Display the specified resource.
     */
    public function show(Baraton $baraton)
    {
        //
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
     */
    public function update(UpdateBaratonRequest $request, Baraton $baraton)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Baraton $baraton)
    {

        $user = Auth::user();
        if($baraton['user_id'] == $user['id']){
            try{
                $baraton->delete();
                return $this->sendResponse($baraton, 'Baraton supprimé avec succès');
            } catch (\Exception $e) {
                return $this->sendError('Error.', ['error' => 'Error']);
            }
        }
        else{
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }

    }
}
