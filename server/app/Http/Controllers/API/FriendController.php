<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Requests\StoreFriendRequest;
use App\Http\Requests\UpdateFriendRequest;
use App\Models\Friend;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class FriendController extends BaseController
{
    /**
     * @OA\Tag(
     *     name="Friends",
     *     description="Gestion des amis"
     * )
     * */
    /**
     * @OA\SecurityScheme(
     *     securityScheme="sanctum",
     *     type="http",
     *     scheme="bearer",
     *     bearerFormat="JWT"
     * )
     * * */
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     */
    /**
     * @OA\Get(
     *     path="/api/friends",
     *     operationId="getFriends",
     *     tags={"Friends"},
     *     summary="Récupérer la liste des amis de l'utilisateur actuel",
     *     security={{"sanctum":{}}},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Liste des amis de l'utilisateur actuel"
     *     )
     * )
     *
     * */
    public function index()
    {
        $friends = Auth::user()->friends;

        return $this->sendResponse($friends, 'success.');
    }

    /**
     * @OA\Get(
     *     path="/api/friends/pending",
     *     operationId="getPendingFriends",
     *     tags={"Friends"},
     *     summary="Récupérer la liste des amis en attente de confirmation",
     *     security={{"sanctum":{}}},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Liste des amis en attente de confirmation"
     *     )
     * )
     * **/
    public function pendingFriends()
    {

        $friends = Auth::user()->pendingFriends;

        return $this->sendResponse($friends, 'success.');

    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     *     path="/api/friends",
     *     operationId="addFriend",
     *     tags={"Friends"},
     *     summary="Ajouter un ami",
     *     security={{"sanctum":{}}},
     *
     *     @OA\RequestBody(
     *
     *         @OA\JsonContent(
     *             type="object",
     *
     *             @OA\Property(
     *                 property="friend_code",
     *                 type="string",
     *                 description="Code ami de l'ami à ajouter",
     *                 example="ABC12345"
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Ami ajouté avec succès"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Erreur de validation ou ami déjà ajouté"
     *     )
     * )
     * **/
    public function store(StoreFriendRequest $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'friend_code' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $friend = User::where('friend_code', $request['friend_code']
        )->first();

        $checkIfAlreadyExist = Friend::where([
            ['user_id', $user['id']],
            ['friend_id', $friend['id']],
        ])->count();

        if ($checkIfAlreadyExist === 0) {

            $friend = Friend::Create([
                'user_id' => $user['id'],
                'friend_id' => $friend['id'],
                'accepted' => 0,
            ]);

            // broadcast(new RefreshFriends($friend['friend_id']));
            return $this->sendResponse($friend, 'Demande d amis envoyée.');

        } else {
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

    /**
     * @OA\Put(
     *     path="/api/friends/{friend}",
     *     operationId="updateFriend",
     *     tags={"Friends"},
     *     summary="Mettre à jour l'état de l'ami (accepté ou non)",
     *     security={{"sanctum":{}}},
     *
     *     @OA\Parameter(
     *         name="friend",
     *         in="path",
     *         description="ID de l'ami à mettre à jour",
     *         required=true,
     *
     *         @OA\Schema(type="integer")
     *     ),
     *
     *     @OA\RequestBody(
     *
     *         @OA\JsonContent(
     *             type="object",
     *
     *             @OA\Property(
     *                 property="accepted",
     *                 type="integer",
     *                 description="État de l'ami (0 pour non accepté, 1 pour accepté)",
     *                 example=1
     *             )
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Ami mis à jour avec succès"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Erreur de validation ou droits insuffisants"
     *     )
     * )
     * */
    public function update(UpdateFriendRequest $request, $id)
    {
        $user = Auth::user();
        $user2 = User::find($id);

        $friend = Friend::where([
            ['user_id', '=', $user2['id']],
            ['friend_id', '=', $user['id']],
        ])->first();

        if ($user['id'] !== $friend['friend_id']) {
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
    /**
     * @OA\Delete(
     *     path="/api/friends/{friend}",
     *     operationId="deleteFriend",
     *     tags={"Friends"},
     *     summary="Supprimer un ami",
     *     security={{"sanctum":{}}},
     *
     *     @OA\Parameter(
     *         name="friend",
     *         in="path",
     *         description="ID de l'ami à supprimer",
     *         required=true,
     *
     *         @OA\Schema(type="integer")
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Ami supprimé avec succès"
     *     )
     * )
     */
    public function destroy($id)
    {
        $user = Auth::user();

        $friend = Friend::where([
            ['user_id', '=', $user['id']],
            ['friend_id', '=', $id],
        ])
            ->orWhere([
                ['user_id', '=', $id],
                ['friend_id', '=', $user['id']],
            ])
            ->first();

        $friend->delete();

        return $this->sendResponse($friend, 'Suppression réussi.');
    }
}
