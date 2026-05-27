<?php

namespace App\Http\Controllers;

use App\Models\Career;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    public function index()
    {
        return response()->json(Career::orderBy('id', 'desc')->get());
    }

    public function show($id)
    {
        return response()->json(Career::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'position'    => 'required|string|max:255',
            'type'        => 'required|string',
            'location'    => 'required|string',
            'city'        => 'required|string',
            'description' => 'required|string',
        ]);

        $data['is_active'] = true;
        $career = Career::create($data);
        return response()->json($career, 201);
    }

    public function update(Request $request, $id)
    {
        $career = Career::findOrFail($id);

        $data = $request->validate([
            'position'    => 'required|string|max:255',
            'type'        => 'required|string',
            'location'    => 'required|string',
            'city'        => 'required|string',
            'description' => 'nullable|string',
            'is_active'   => 'nullable|boolean',
        ]);

        $career->update($data);
        return response()->json($career->fresh());
    }

    public function destroy($id)
    {
        $career = Career::findOrFail($id);
        $career->delete();
        return response()->json(['message' => 'Career deleted successfully']);
    }
}
