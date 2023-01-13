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
    $product = Product::all();
    return $product;
}

public function create(Request $request){

$request->validate([
'name' => 'required',
'price' => 'required',
'qty' => 'required',
'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
]);

$product = new Product;
    $product->name = $request->input('name');
    $product->price = $request->input('price');
    $product->qty = $request->input('qty');

    if($request->hasFile('image'))
        {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() .' . '.$extension;
            $file->move('uploads/product/, $filename');
            $product->image = 'uploads/product/'.$fileName;
        }

        $product->save($request->all());
        //$product::create($request->all());
        return response()->json([
            'status'=>200,
            'messages'=>'Product Added successfully'
        ]);

}

public function update(Request $request){
// dd($request->all());
$request->validate([
'name' => 'required',
'price' => 'required',
'qty' => 'required',
'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
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