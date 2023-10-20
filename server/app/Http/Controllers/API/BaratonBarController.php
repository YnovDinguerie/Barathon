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
