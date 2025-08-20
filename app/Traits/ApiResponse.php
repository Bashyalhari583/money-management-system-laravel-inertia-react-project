<?php

namespace App\Traits;

trait ApiResponse
{
    protected function ok($data = [], $message = 'OK') {
        return response()->json(['message'=>$message,'data'=>$data], 200);
    }
    protected function fail($message = 'Failed', $code = 422) {
        return response()->json(['message'=>$message], $code);
    }
}
