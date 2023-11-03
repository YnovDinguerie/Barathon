<?php
namespace App\Http\Controllers\API;


use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Friend;
use App\Http\Requests\StoreFriendRequest;
use App\Http\Requests\UpdateFriendRequest;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use Validator;

class FriendController extends BaseController
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
        $friends = Auth::user()->friends;
        return $this->sendResponse($friends, 'success.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function pendingFriends()
    {

        $friends = Auth::user()->pendingFriends;
        return $this->sendResponse($friends, 'success.');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFriendRequest $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'friend_code' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $friend = User::where('friend_code',$request['friend_code']
        )->first();

        $checkIfAlreadyExist = Friend::where([
            ['user_id', $user['id']],
            ['friend_id', $friend['id']]
        ])->count();


        if($checkIfAlreadyExist === 0){

            $friend = Friend::Create([
                'user_id'=> $user['id'],
                'friend_id'=> $friend['id'],
                'accepted' => 0
            ]);


            // broadcast(new RefreshFriends($friend['friend_id']));
            return $this->sendResponse($friend, 'success.');

        }

        else{
            return $this->sendError('Tu as déjà cette personne en ami', ['error' => 'Unauthorised']);
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(Friend $friend)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Friend $friend)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFriendRequest $request, $id)
    {
        $user = Auth::user();
        $user2 = User::find($id);

        $friend = Friend::where([
            ['user_id' , '=', $user2['id']],
            ['friend_id' , '=', $user['id']],
        ])->first();

        if($user['id'] !== $friend['friend_id']){
            return $this->sendError("Tu n'as pas les droits nécessaires", ['error' => 'Unauthorised']);
        }


        $validator = Validator::make($request->all(), [
            'accepted' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();


        $friend->update(
            $input
        );

        return $this->sendResponse($friend, 'success.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = Auth::user();

        $friend = Friend::where([
            ['user_id' , '=', $user['id']],
            ['friend_id' , '=', $id],
        ])
        ->orWhere([
            ['user_id' , '=', $id],
            ['friend_id' , '=', $user['id']],
        ])
        ->first();

        $friend->delete();
        return $this->sendResponse($friend, 'Suppression réussi.');
    }
}
