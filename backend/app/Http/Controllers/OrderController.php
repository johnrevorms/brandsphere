<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::with(['user', 'items.product'])->orderBy('id', 'desc')->get());
    }

    public function userOrders(Request $request)
    {
        return response()->json(
            Order::with('items.product')
                ->where('user_id', $request->user()->id)
                ->orderBy('id', 'desc')
                ->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'items'                => 'required|array',
            'items.*.product_id'  => 'required|exists:products,id',
            'items.*.quantity'    => 'required|integer|min:1',
            'items.*.price'       => 'required|integer',
            'items.*.size'        => 'nullable|string',
            'total_price'         => 'required|integer',
            'shipping_address'    => 'required|string',
            'shipping_city_id'    => 'required|string',
            'shipping_province_id'=> 'required|string',
            'shipping_courier'    => 'required|string',
            'shipping_service'    => 'required|string',
            'shipping_cost'       => 'required|integer',
        ]);

        // Validate and decrement stock
        foreach ($request->items as $item) {
            $product = Product::find($item['product_id']);
            if ($product && $product->stock > 0) {
                // Decrement stock (min 0)
                $product->decrement('stock', min($item['quantity'], $product->stock));
                // Auto set Out of Stock if stock reaches 0
                if ($product->stock <= 0) {
                    $product->stock_status = 'Out of Stock';
                    $product->save();
                }
            }
        }

        $order = Order::create([
            'user_id'     => $request->user()->id,
            'total_price' => $request->total_price, // including shipping_cost
            'status'      => 'Pending Payment',
            'shipping_address'    => $request->shipping_address,
            'shipping_city_id'    => $request->shipping_city_id,
            'shipping_province_id'=> $request->shipping_province_id,
            'shipping_courier'    => $request->shipping_courier,
            'shipping_service'    => $request->shipping_service,
            'shipping_cost'       => $request->shipping_cost,
        ]);

        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id'   => $order->id,
                'product_id' => $item['product_id'],
                'quantity'   => $item['quantity'],
                'price'      => $item['price'],
                'size'       => $item['size'] ?? null,
            ]);
        }

        // Configure Midtrans
        \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
        \Midtrans\Config::$isProduction = config('services.midtrans.is_production');
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;

        $user = $request->user();

        $params = [
            'transaction_details' => [
                'order_id' => $order->id . '-' . time(),
                'gross_amount' => $order->total_price,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? '08123456789',
            ],
        ];

        try {
            $snapToken = \Midtrans\Snap::getSnapToken($params);
            return response()->json([
                'order' => $order,
                'snap_token' => $snapToken
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|string']);
        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();
        return response()->json(['message' => 'Status updated', 'order' => $order]);
    }

    public function midtransWebhook(Request $request)
    {
        $payload = $request->getContent();
        $notification = json_decode($payload);

        if (!$notification) {
            return response()->json(['message' => 'Invalid JSON'], 400);
        }

        $orderIdParts = explode('-', $notification->order_id);
        $orderId = $orderIdParts[0];
        
        $order = Order::find($orderId);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $transactionStatus = $notification->transaction_status;

        if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
            $order->status = 'Proses Packing';
            $order->save();
        } else if ($transactionStatus == 'cancel' || $transactionStatus == 'deny' || $transactionStatus == 'expire') {
            $order->status = 'Dibatalkan';
            // Bisa tambahkan logika kembalikan stok disini jika diinginkan
            $order->save();
        }

        return response()->json(['message' => 'Ok']);
    }
}
