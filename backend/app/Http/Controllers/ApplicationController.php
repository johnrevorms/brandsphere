<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{
    public function index()
    {
        $apps = Application::with('career')->orderBy('id', 'desc')->get();
        return response()->json($apps);
    }

    public function store(Request $request)
    {
        $request->validate([
            'career_id'    => 'required|exists:careers,id',
            'name'         => 'required|string|max:255',
            'email'        => 'required|email|max:255',
            'phone'        => 'required|string|max:50',
            'cv'           => 'required|file|mimes:pdf|max:5120', // PDF max 5MB
            'cover_letter' => 'nullable|string',
        ]);

        // Upload the PDF CV file to storage
        $cvPath = $request->file('cv')->store('cvs', 'public');

        $application = Application::create([
            'career_id'    => $request->career_id,
            'user_id'      => auth()->id(),
            'name'         => $request->name,
            'email'        => $request->email,
            'phone'        => $request->phone,
            'cv_path'      => $cvPath,
            'cover_letter' => $request->cover_letter,
            'status'       => 'submitted',
        ]);

        return response()->json($application, 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:submitted,rejected',
        ]);

        $app = Application::findOrFail($id);
        $app->update([
            'status' => $request->status,
        ]);

        return response()->json($app);
    }

    public function destroy($id)
    {
        $app = Application::findOrFail($id);
        
        // Delete CV file from disk
        if ($app->cv_path) {
            Storage::disk('public')->delete($app->cv_path);
        }

        $app->delete();

        return response()->json(['message' => 'Application deleted successfully']);
    }

    public function getUserApplicationStatus($careerId)
    {
        $app = Application::where('career_id', $careerId)
            ->where('user_id', auth()->id())
            ->first();

        return response()->json([
            'applied' => $app !== null,
            'status'  => $app ? $app->status : null,
        ]);
    }
}
