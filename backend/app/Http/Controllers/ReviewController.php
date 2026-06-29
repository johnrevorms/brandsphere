<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        return response()->json(
            Review::with('user:id,name,email')
                ->orderBy('id', 'desc')
                ->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:5|max:1000',
        ]);

        $user = $request->user();

        $review = Review::create([
            'user_id' => $user->id,
            'customer_name' => $user->name,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'message' => 'Review submitted successfully',
            'review' => $review,
        ], 201);
    }

    public function reply(Request $request, $id)
    {
        $this->authorizeAdmin($request);

        $request->validate([
            'admin_reply' => 'required|string|min:2|max:1000',
        ]);

        $review = Review::findOrFail($id);
        $review->admin_reply = trim($request->admin_reply);
        $review->replied_at = now();
        $review->save();

        return response()->json([
            'message' => 'Reply saved successfully',
            'review' => $review,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        if (!$this->isAdmin($request) && $review->user_id !== $request->user()->id) {
            abort(403, 'You can only delete your own review.');
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully']);
    }

    private function authorizeAdmin(Request $request): void
    {
        if (!$this->isAdmin($request)) {
            abort(403, 'Only admin users can manage reviews.');
        }
    }

    private function isAdmin(Request $request): bool
    {
        $role = strtolower(trim((string) $request->user()->role));

        return in_array($role, ['admin', 'cms']);
    }
}
