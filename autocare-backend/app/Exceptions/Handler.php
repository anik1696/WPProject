<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    public function report(Throwable $e): void
    {
        parent::report($e);
    }

    public function render($request, Throwable $e)
    {
        return parent::render($request, $e);
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {

        if ($request->is('api/*')) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        abort(401);
    }
}
