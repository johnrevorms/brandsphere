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
            $response = Http::withoutVerifying()
                ->withOptions(['curl' => [CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4]])
                ->timeout(10)
                ->withHeaders([
                    'key' => config('services.rajaongkir.key')
                ])->get('https://rajaongkir.komerce.id/api/v1/destination/province');

            if ($response->successful() && isset($response['data'])) {
                $provinces = collect($response['data'])->map(function ($item) {
                    return [
                        'province_id' => (string) $item['id'],
                        'province' => $item['name']
                    ];
                });
                return response()->json($provinces);
            }

            Log::warning('RajaOngkir returned non-success for provinces, using mock data.');
            return $this->getMockProvinces();
        } catch (\Exception $e) {
            Log::error('RajaOngkir Error: ' . $e->getMessage());
            return $this->getMockProvinces();
        }
    }

    public function getCities($provinceId)
    {
        try {
            $response = Http::withoutVerifying()
                ->withOptions(['curl' => [CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4]])
                ->timeout(10)
                ->withHeaders([
                    'key' => config('services.rajaongkir.key')
                ])->get("https://rajaongkir.komerce.id/api/v1/destination/city/{$provinceId}");

            if ($response->successful() && isset($response['data'])) {
                $cities = collect($response['data'])->map(function ($item) {
                    return [
                        'city_id' => (string) $item['id'],
                        'type' => 'Kota',
                        'city_name' => $item['name']
                    ];
                });
                return response()->json($cities);
            }

            Log::warning('RajaOngkir returned non-success for cities, using mock data.');
            return $this->getMockCities();
        } catch (\Exception $e) {
            Log::error('RajaOngkir Error: ' . $e->getMessage());
            return $this->getMockCities();
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
            $response = Http::withoutVerifying()->asForm()
                ->withOptions(['curl' => [CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4]])
                ->timeout(10)
                ->withHeaders([
                    'key' => config('services.rajaongkir.key')
                ])->post('https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost', [
                        'origin' => $request->origin,
                        'destination' => $request->destination,
                        'weight' => $request->weight,
                        'courier' => $request->courier
                    ]);

            if ($response->successful() && isset($response['data'])) {
                $costs = collect($response['data'])->map(function ($item) {
                    return [
                        'service' => $item['service'] ?? '',
                        'description' => $item['description'] ?? '',
                        'cost' => [
                            [
                                'value' => $item['cost'] ?? 0,
                                'etd' => $item['etd'] ?? '',
                                'note' => ''
                            ]
                        ]
                    ];
                });
                return response()->json($costs);
            }

            Log::warning('RajaOngkir returned non-success for cost, using mock data.');
            return $this->getMockCost();
        } catch (\Exception $e) {
            Log::error('RajaOngkir Error: ' . $e->getMessage());
            return $this->getMockCost();
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
