<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Auth;
use Validator;
use App\Models\Product;

class ProductController extends Controller

{
public function index(){
$data = Product::get();
return $data;
}

public function create(Request $request){
// dd($request->all());
 $request->validate([
'name' => 'required',
'price' => 'required',
'qty' => 'required',
]);

Product::create($request->all());
return response()->json(['product' => Product::all()]);
 
}
public function update(Request $request){
// dd($request->all());
$request->validate([
'name' => 'required',
'price' => 'required',
'qty' => 'required',
]);

$update = Product::where('id',$request->id)->update($request->all());
    if($update){
    return response()->json(['msg' =>'update data successfully']);
    }
}
public function destroy($id){
    $del = Product::where('id',$id)->delete();
        if($del){
        return response()->json(['msg' => 'delete data successfully']);
        }
    }   
}