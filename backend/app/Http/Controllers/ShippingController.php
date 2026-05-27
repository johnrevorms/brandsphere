<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ShippingController extends Controller
{
    public function getProvinces()
    {
        try {
            $response = Http::timeout(5)->withHeaders([
                'key' => config('services.rajaongkir.key')
            ])->get('https://api.rajaongkir.com/starter/province');

            if ($response->successful()) {
                return response()->json($response['rajaongkir']['results'] ?? []);
            }
        } catch (\Exception $e) {
            Log::error('RajaOngkir Error: ' . $e->getMessage());
        }

        // Fallback mock data
        return response()->json([
            ['province_id' => '1', 'province' => 'DKI Jakarta'],
            ['province_id' => '2', 'province' => 'Jawa Barat'],
            ['province_id' => '3', 'province' => 'Jawa Tengah'],
            ['province_id' => '4', 'province' => 'DI Yogyakarta'],
            ['province_id' => '5', 'province' => 'Jawa Timur']
        ]);
    }

    public function getCities($provinceId)
    {
        try {
            $response = Http::timeout(5)->withHeaders([
                'key' => config('services.rajaongkir.key')
            ])->get('https://api.rajaongkir.com/starter/city', [
                'province' => $provinceId
            ]);

            if ($response->successful()) {
                return response()->json($response['rajaongkir']['results'] ?? []);
            }
        } catch (\Exception $e) {
            Log::error('RajaOngkir Error: ' . $e->getMessage());
        }

        // Fallback mock data
        return response()->json([
            ['city_id' => '1', 'type' => 'Kota', 'city_name' => 'Jakarta Pusat'],
            ['city_id' => '2', 'type' => 'Kota', 'city_name' => 'Bandung'],
            ['city_id' => '3', 'type' => 'Kota', 'city_name' => 'Semarang'],
            ['city_id' => '4', 'type' => 'Kota', 'city_name' => 'Yogyakarta'],
            ['city_id' => '5', 'type' => 'Kota', 'city_name' => 'Surabaya']
        ]);
    }

    public function getCost(Request $request)
    {
        $request->validate([
            'origin' => 'required',
            'destination' => 'required',
            'weight' => 'required|numeric',
            'courier' => 'required'
        ]);

        try {
            $response = Http::timeout(5)->withHeaders([
                'key' => config('services.rajaongkir.key')
            ])->post('https://api.rajaongkir.com/starter/cost', [
                'origin' => $request->origin,
                'destination' => $request->destination,
                'weight' => $request->weight,
                'courier' => $request->courier
            ]);

            if ($response->successful()) {
                return response()->json($response['rajaongkir']['results'][0]['costs'] ?? []);
            }
        } catch (\Exception $e) {
            Log::error('RajaOngkir Error: ' . $e->getMessage());
        }

        // Fallback mock data
        return response()->json([
            [
                'service' => 'REG',
                'description' => 'Layanan Reguler',
                'cost' => [
                    [
                        'value' => 15000,
                        'etd' => '2-3',
                        'note' => ''
                    ]
                ]
            ],
            [
                'service' => 'YES',
                'description' => 'Yakin Esok Sampai',
                'cost' => [
                    [
                        'value' => 25000,
                        'etd' => '1-1',
                        'note' => ''
                    ]
                ]
            ]
        ]);
    }
}
