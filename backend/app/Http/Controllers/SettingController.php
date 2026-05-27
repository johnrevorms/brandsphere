<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all();
        $result = [];
        foreach ($settings as $s) {
            $result[$s->key] = $s->value;
        }
        return response()->json($result);
    }

    public function set(Request $request)
    {
        $request->validate([
            'key'   => 'required|string',
            'value' => 'nullable|string', // nullable — allow empty string
        ]);

        $setting = Setting::updateOrCreate(
            ['key' => $request->key],
            ['value' => $request->value ?? '']
        );

        return response()->json($setting);
    }

    public function uploadImage(Request $request)
    {
        \Log::info("uploadImage called for key: " . $request->key);
        $request->validate([
            'key'   => 'required|string',
            'image' => 'required',
        ]);
        \Log::info("validation passed for key: " . $request->key);

        $key = $request->key;
        $old = Setting::where('key', $key)->first();
        if ($old && $old->value && !str_starts_with($old->value, 'http')) {
            Storage::disk('public')->delete($old->value);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('settings', 'public');
        } else {
            $imageData = $request->image;
            if (preg_match('/^data:image\/(\w+);base64,/', $imageData, $type)) {
                $imageData = substr($imageData, strpos($imageData, ',') + 1);
                $type = strtolower($type[1]);
                $imageData = base64_decode($imageData);
                $filename = 'settings/' . uniqid() . '.' . $type;
                Storage::disk('public')->put($filename, $imageData);
                $path = $filename;
            } else {
                return response()->json(['error' => 'Invalid image format'], 422);
            }
        }

        $setting = Setting::updateOrCreate(
            ['key' => $key],
            ['value' => $path]
        );

        return response()->json([
            'key'   => $setting->key,
            'value' => $setting->value,
            'url'   => asset('storage/' . $path),
        ]);
    }
}
