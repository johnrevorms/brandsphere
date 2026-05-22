<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Login — BrandSphere</title>

<link rel="stylesheet" href="{{ asset('css/style.css') }}">

<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>

.login-page{
  background:#0a0a0f;
  font-family:'Outfit', sans-serif;
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#ffffff;
}

.login-container{
  width:100%;
  max-width:420px;
  padding:20px;
}

.login-card{
  background:#16161f;
  padding:40px;
  border-radius:12px;
  box-shadow:0 10px 30px rgba(0,0,0,0.4);
}

.login-title{
  font-family:'Playfair Display', serif;
  font-size:32px;
  text-align:center;
  margin-bottom:4px;
}

.login-subtitle{
  text-align:center;
  margin-bottom:30px;
  opacity:0.7;
}

.login-form{
  display:flex;
  flex-direction:column;
  gap:16px;
}

.input-group{
  display:flex;
  flex-direction:column;
}

.input-group label{
  font-size:14px;
  margin-bottom:6px;
}

.input-group input{
  padding:10px;
  border-radius:6px;
  border:none;
  background:#0f0f18;
  color:white;
}

.input-group input:focus{
  outline:2px solid #6a5cff;
}

.btn-login{
  margin-top:10px;
  padding:12px;
  border:none;
  border-radius:6px;
  background:#6a5cff;
  color:white;
  font-weight:500;
  cursor:pointer;
  transition:0.2s;
}

.btn-login:hover{
  background:#5748e0;
}

.login-register{
  margin-top:20px;
  text-align:center;
  font-size:14px;
}

.login-register a{
  color:#6a5cff;
  text-decoration:none;
}

</style>
</head>

<body class="login-page">

<div class="login-container">

    <div class="login-card">

        <h1 class="login-title">BrandSphere</h1>
        <p class="login-subtitle">Platform Digital Brand</p>

        <form method="POST" action="/login" class="login-form">
        @csrf

            <div class="input-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="Masukkan email" required>
            </div>

            <div class="input-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="Masukkan password" required>
            </div>

            <button type="submit" class="btn-login">Login</button>

        </form>

        <p class="login-register">
            Belum punya akun?
            <a href="/register">Register</a>
        </p>

    </div>

</div>

</body>
</html>

<!-- <!DOCTYPE html>
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
</html> -->
