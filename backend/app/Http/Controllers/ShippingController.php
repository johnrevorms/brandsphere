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
            $response = Http::withoutVerifying()->timeout(10)->withHeaders([
                'key' => config('services.rajaongkir.key')
            ])->get('https://api.rajaongkir.com/starter/province');

            if ($response->successful()) {
                return response()->json($response['rajaongkir']['results'] ?? []);
            }
            
            if (app()->environment('local', 'testing')) {
                return $this->getMockProvinces();
            }
            return response()->json(['error' => 'Gagal mengambil data provinsi dari API.'], 500);
        } catch (\Exception $e) {
            Log::error('RajaOngkir Error: ' . $e->getMessage());
            if (app()->environment('local', 'testing')) {
                return $this->getMockProvinces();
            }
            return response()->json(['error' => 'Terjadi kesalahan sistem.'], 500);
        }
    }

    public function getCities($provinceId)
    {
        try {
            $response = Http::withoutVerifying()->timeout(10)->withHeaders([
                'key' => config('services.rajaongkir.key')
            ])->get('https://api.rajaongkir.com/starter/city', [
                'province' => $provinceId
            ]);

            if ($response->successful()) {
                return response()->json($response['rajaongkir']['results'] ?? []);
            }

            if (app()->environment('local', 'testing')) {
                return $this->getMockCities();
            }
            return response()->json(['error' => 'Gagal mengambil data kota dari API.'], 500);
        } catch (\Exception $e) {
            Log::error('RajaOngkir Error: ' . $e->getMessage());
            if (app()->environment('local', 'testing')) {
                return $this->getMockCities();
            }
            return response()->json(['error' => 'Terjadi kesalahan sistem.'], 500);
        }
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
            $response = Http::withoutVerifying()->timeout(10)->withHeaders([
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

            if (app()->environment('local', 'testing')) {
                return $this->getMockCost();
            }
            return response()->json(['error' => 'Gagal menghitung ongkos kirim.'], 500);
        } catch (\Exception $e) {
            Log::error('RajaOngkir Error: ' . $e->getMessage());
            if (app()->environment('local', 'testing')) {
                return $this->getMockCost();
            }
            return response()->json(['error' => 'Terjadi kesalahan sistem.'], 500);
        }
    }

    private function getMockProvinces()
    {
        return response()->json([
            ['province_id' => '1', 'province' => '[DEV] DKI Jakarta'],
            ['province_id' => '2', 'province' => '[DEV] Jawa Barat'],
            ['province_id' => '3', 'province' => '[DEV] Jawa Tengah']
        ]);
    }

    private function getMockCities()
    {
        return response()->json([
            ['city_id' => '1', 'type' => 'Kota', 'city_name' => '[DEV] Jakarta Pusat'],
            ['city_id' => '2', 'type' => 'Kota', 'city_name' => '[DEV] Bandung']
        ]);
    }

    private function getMockCost()
    {
        return response()->json([
            [
                'service' => 'REG (DEV)',
                'description' => 'Layanan Reguler (Dummy)',
                'cost' => [['value' => 15000, 'etd' => '2-3', 'note' => '']]
            ]
        ]);
    }
}
