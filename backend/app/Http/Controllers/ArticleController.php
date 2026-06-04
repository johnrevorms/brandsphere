<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function index()
    {
        return response()->json(Article::orderBy('id', 'desc')->get());
    }

    public function show($id)
    {
        return response()->json(Article::findOrFail($id));
    }

    public function store(Request $request)
    {
        \Illuminate\Support\Facades\Log::info("Article store called", $request->all());
        
        try {
            $data = $request->validate([
                'title'    => 'required|string|max:255',
                'subtitle' => 'nullable|string',
                'content'  => 'required|string',
                'image'    => 'nullable|image|max:4096',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Illuminate\Support\Facades\Log::error("Validation failed: " . json_encode($e->errors()));
            throw $e;
        }

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('articles', 'public');
        }
        unset($data['image']); // remove from data before create

        $data['published_at'] = now();
        $article = Article::create($data);
        return response()->json($article, 201);
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $data = $request->validate([
            'title'    => 'required|string|max:255',
            'subtitle' => 'nullable|string',
            'content'  => 'required|string',
            'image'    => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('image')) {
            if ($article->image_path) {
                Storage::disk('public')->delete($article->image_path);
            }
            $data['image_path'] = $request->file('image')->store('articles', 'public');
        }
        unset($data['image']);

        $article->update($data);
        return response()->json($article->fresh());
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        if ($article->image_path) {
            Storage::disk('public')->delete($article->image_path);
        }
        $article->delete();
        return response()->json(['message' => 'Article deleted']);
    }
}
