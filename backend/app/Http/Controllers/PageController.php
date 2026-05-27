<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index()
    {
        // Return all pages as key=>value by slug
        $pages = Page::all();
        $result = [];
        foreach ($pages as $page) {
            $result[$page->slug] = $page;
        }
        return response()->json($result);
    }

    public function update(Request $request, $slug)
    {
        $request->validate([
            'content' => 'required|string',
            'title' => 'nullable|string',
        ]);

        $page = Page::updateOrCreate(
            ['slug' => $slug],
            [
                'title' => $request->title ?? ucfirst($slug),
                'content' => $request->content
            ]
        );

        return response()->json($page);
    }
}
