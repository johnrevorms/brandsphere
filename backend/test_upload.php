
<?php
require "vendor/autoload.php";
$app = require_once "bootstrap/app.php";
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$request = Illuminate\Http\Request::create("/api/settings/upload", "POST", [
    "key" => "hero_image"
], [], [
    "image" => new Illuminate\Http\UploadedFile(
        __DIR__ . "/public/favicon.ico", "favicon.ico", "image/x-icon", null, true
    )
]);

$response = $kernel->handle($request);
echo $response->getStatusCode() . PHP_EOL;
echo $response->getContent() . PHP_EOL;

