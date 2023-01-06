<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());       
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
         ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['data' => $user,'access_token' => $token, 'token_type' => 'Bearer', ]);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password')))
        {
            return response()
                ->json(['message' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()
            ->json(['message' => 'Hi '.$user->name.', welcome to home','access_token' => $token, 'token_type' => 'Bearer', ]);
    }

    // method for user logout and delete token
    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'You have successfully logged out and the token was successfully deleted'
        ];
    }

    // get user
    public function get_users(){
        $users = User::all();
        return response()->json(['users' => $users]);
    }

    public function get_users_by_id($id){
        $users = User::where('id',$id)->get();
        return response()->json(['users' => $users]);
    }

    // delete user
    public function delete_users($id){
        $del = User::where('id',$id)->delete();
        if($del){
            return response()->json(['msg' => 'delete data successfully']);
        }
    } 

    public function update_users(Request $request){  
    $where = array('id' => $request->id);
        $data = array('name' => $request->name, 'email' => $request->email);
        $update = User::where($where)->update($data);
        if($update){
            return response()
            ->json(['message' => 'Update Data Success ', 'code' => 200, 'update data ' => $data, ]);
        }else{
            return response()
            ->json(['message' => 'Update Data Failed ', 'code' => 401, 'update data ' =>null, ]);
        }
    }
    
}
