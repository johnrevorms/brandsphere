<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <form method="POST" action="/login">
    @csrf
        <input type="email" name="email" placeholder="Email">
        <input type="password" name="password" placeholder="Password">
        <button type="submit">Login</button>
        <a href="/register">
            <button type="button">Ke Halaman Register</button>
        </a>
    </form>
</body>
</html>
