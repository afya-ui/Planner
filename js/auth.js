const AUTH_KEY='planSemanalAuth_v2';
function getPassword(){return window.PLAN_SEMANAL_PASSWORD||'ruta2026'}
function isAuthed(){return sessionStorage.getItem(AUTH_KEY)==='ok'}
function requireAuth(){if(!isAuthed()) location.href='login.html'}
function logout(){sessionStorage.removeItem(AUTH_KEY);location.href='index.html'}
function loginSubmit(e){e.preventDefault();const pass=document.getElementById('password').value;const err=document.getElementById('loginError');if(pass===getPassword()){sessionStorage.setItem(AUTH_KEY,'ok');location.href='dashboard.html'}else{err.classList.add('show');err.textContent='Contraseña incorrecta.'}}
