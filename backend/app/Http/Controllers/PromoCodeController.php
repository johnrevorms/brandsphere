<?php

namespace App\Http\Controllers;

use App\Models\PromoCode;
use Illuminate\Http\Request;

class PromoCodeController extends Controller
{
    public function index()
    {
        return response()->json(PromoCode::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|unique:promo_codes,code',
            'discount_percentage' => 'required|integer|min:1|max:100',
            'min_quantity' => 'nullable|integer|min:1',
        ]);

        $promo = PromoCode::create([
            'code' => strtoupper($request->code),
            'discount_percentage' => $request->discount_percentage,
            'min_quantity' => $request->min_quantity ?? 1,
            'is_active' => true,
        ]);

        return response()->json($promo, 201);
    }

    public function destroy($id)
    {
        $promo = PromoCode::findOrFail($id);
        $promo->delete();

        return response()->json(['message' => 'Promo code deleted successfully']);
    }

    public function validatePromo(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'quantity' => 'required|integer|min:1',
        ]);

        $promo = PromoCode::where('code', strtoupper($request->code))->first();

        if (!$promo) {
            return response()->json(['error' => 'Kode promo tidak valid'], 404);
        }

        if (!$promo->is_active) {
            return response()->json(['error' => 'Kode promo sudah tidak aktif'], 400);
        }

        if ($request->quantity < $promo->min_quantity) {
            return response()->json(['error' => 'Gagal! Syarat minimum pembelian ' . $promo->min_quantity . ' item tidak terpenuhi'], 400);
        }

        return response()->json([
            'message' => 'Promo berhasil digunakan',
            'discount_percentage' => $promo->discount_percentage,
            'code' => $promo->code,
        ]);
    }
}
