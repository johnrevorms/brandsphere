<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::orderBy('id', 'desc')->get());
    }

    public function show($id)
    {
        return response()->json(Product::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'         => 'required|string|max:255',
            'category'     => 'required|string',
            'price'        => 'required|numeric',
            'stock_status' => 'required|string',
            'stock'        => 'nullable|integer|min:0',
            'description'  => 'nullable|string',
            'image'        => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('products', 'public');
        }
        unset($data['image']);

        $product = Product::create($data);
        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validate([
            'name'         => 'required|string|max:255',
            'category'     => 'required|string',
            'price'        => 'required|numeric',
            'stock_status' => 'required|string',
            'stock'        => 'nullable|integer|min:0',
            'description'  => 'nullable|string',
            'image'        => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }
            $data['image_path'] = $request->file('image')->store('products', 'public');
        }
        unset($data['image']);

        $product->update($data);
        return response()->json($product->fresh());
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    /**
     * Get list of buyers for a specific product (for admin stock tracking)
     */
    public function buyers($id)
    {
        $product = Product::findOrFail($id);

        $buyers = \App\Models\OrderItem::with(['order.user'])
            ->where('product_id', $id)
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($item) {
                return [
                    'order_id'   => $item->order_id,
                    'user_name'  => $item->order->user->name ?? 'Unknown',
                    'user_email' => $item->order->user->email ?? '-',
                    'quantity'   => $item->quantity,
                    'size'       => $item->size,
                    'price'      => $item->price,
                    'status'     => $item->order->status,
                    'date'       => $item->created_at->format('d M Y H:i'),
                ];
            });

        return response()->json([
            'product' => $product,
            'buyers'  => $buyers,
            'total_sold' => $buyers->sum('quantity'),
        ]);
    }
}
