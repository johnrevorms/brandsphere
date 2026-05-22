<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Register</title>
<link rel="stylesheet" href="{{ asset('css/style.css') }}">
<style>
  body{
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: #0f0f11;
    color: white;
}

.page{
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
}

.auth-wrap{
    width: 100%;
    display: flex;
    justify-content: center;
}

.auth-card{
    width: 100%;
    max-width: 430px;
    background: #18181b;
    border: 1px solid #2a2a2f;
    border-radius: 22px;
    padding: 40px;
    box-shadow: 0 20px 50px rgba(0,0,0,.35);
}

.auth-title{
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 10px;
}

.auth-sub{
    font-size: 14px;
    color: #a1a1aa;
    margin-bottom: 30px;
    line-height: 1.6;
}

.form-group{
    margin-bottom: 18px;
}

.form-label{
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #d4d4d8;
}

.form-input{
    width: 100%;
    height: 52px;
    padding: 0 16px;
    border-radius: 14px;
    border: 1px solid #2f2f35;
    background: #232326;
    color: white;
    font-size: 14px;
    outline: none;
    transition: .25s;
    box-sizing: border-box;
}

.form-input:focus{
    border-color: #d4af37;
    box-shadow: 0 0 0 3px rgba(212,175,55,.15);
}

.btn{
    border: none;
    cursor: pointer;
    transition: .25s;
    font-weight: 600;
}

.btn-gold{
    background: #d4af37;
    color: #111;
}

.btn-gold:hover{
    opacity: .9;
}

.btn-wide{
    width: 100%;
    height: 54px;
    border-radius: 14px;
    font-size: 15px;
}

.auth-switch{
    margin-top: 22px;
    text-align: center;
    font-size: 14px;
    color: #a1a1aa;
}

.auth-switch a{
    color: #d4af37;
    text-decoration: none;
    font-weight: 600;
}

.auth-switch a:hover{
    opacity: .8;
}

@media(max-width: 600px){

    .auth-card{
        padding: 28px;
    }

    .auth-title{
        font-size: 26px;
    }

}
</style>
</head>

<body>

<div class="page" id="page-register">
  <div class="auth-wrap">
    <div class="auth-card">

      <div class="auth-title">Buat Akun</div>
      <div class="auth-sub">Bergabung dengan komunitas BrandSphere</div>

      <form method="POST" action="/register">
      @csrf

      <div class="form-group">
        <label class="form-label">Nama</label>
        <input
            class="form-input"
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            required
        >
      </div>

      <div class="form-group">
        <label class="form-label">Email</label>
        <input
            class="form-input"
            type="email"
            name="email"
            placeholder="budi@email.com"
            required
        >
      </div>

      <div class="form-group">
        <label class="form-label">Password</label>
        <input
            class="form-input"
            type="password"
            name="password"
            placeholder="Min. 8 karakter"
            required
        >
      </div>

      <button type="submit" class="btn btn-gold btn-wide" style="margin-top:4px">
        Buat Akun →
      </button>

      </form>

      <div class="auth-switch">
        Sudah punya akun?
        <a href="/login">Masuk di sini</a>
      </div>

    </div>
  </div>
</div>

</body>
</html>
