<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $userRole = strtolower(trim((string) $request->user()?->role));
        $allowedRoles = array_map(
            fn ($role) => strtolower(trim((string) $role)),
            $roles
        );

        if (!$request->user() || !in_array($userRole, $allowedRoles)) {
            abort(403, 'You do not have permission to access this resource.');
        }

        return $next($request);
    }
}
