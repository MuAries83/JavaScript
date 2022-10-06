document.getElementById("btn__inico-sesion").addEventListener("click",iniciarSesion);
document.getElementById("btn__register").addEventListener("click",register);
document.getElementById("entrar").addEventListener("click",entrar);
document.getElementById("btn_registrarse").addEventListener("click",registrarse);
window.addEventListener("resize",anchopagina);

/*declaracion de variables*/
var contedor__formularios = document.querySelector(".contedor__formularios");
var formulario_login = document.querySelector(".formulario_login");
var formulario_register = document.querySelector(".formulario_register");
var caja_login = document.querySelector(".caja-login");
var caja_register = document.querySelector (".caja-register");


/*Funcioenes para movimiento*/
function anchopagina(){
    if(window.innerWidth > 850){
        caja_register.style.display = "block";
        caja_login.style.display = "block";
    }else{
        caja_register.style.display = "block";
        caja_register.style.opacity = "1";
        caja_login.style.display = "none";
        formulario_login.style.display = "block";
        formulario_register.style.display = "none";
        contedor__formularios.style.left = "0px";
    }
}

anchopagina();

function iniciarSesion() {
    if(window.innerWidth > 850){
    formulario_register.style.display = "none";
    contedor__formularios.style.left = "10px";
    formulario_login.style.display = "block";
    caja_register.style.opacity = "1";
    caja_login.style.opacity = "0";
    }else{
        formulario_register.style.display = "none";
        contedor__formularios.style.left = "0px";
        formulario_login.style.display = "block";
        caja_register.style.display = "block";
        caja_login.style.display = "none";
    }
    
}
function register() {
    if(window.innerWidth > 850){
        formulario_register.style.display = "block";
        contedor__formularios.style.left = "410px";
        formulario_login.style.display = "none";
        caja_register.style.opacity = "0";
        caja_login.style.opacity = "1";
    }else{
        formulario_register.style.display = "block";
        contedor__formularios.style.left = "0px";
        formulario_login.style.display = "none";
        caja_register.style.display = "none";
        caja_login.style.display = "block";
        caja_login.style.opacity = "1";
    }
    
}
/*Registro de usuairos*/
function registrarse(){
    let nombre = localStorage.setItem("nombre", document.getElementById("nombre").value);
    let correo = localStorage.setItem("correo", document.getElementById("correo").value);
    let user = localStorage.setItem("user", document.getElementById("user").value);
    let contra = localStorage.setItem("contra", document.getElementById("contra").value);

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tus datos han sido guardados',
        showConfirmButton: false,
        timer: 1500
    })
}

function entrar(){
    let usuraio = document.getElementById("usuario").value;
    let ucontra = document.getElementById("contra1").value;
    let user = localStorage.getItem("user");
    let contra = localStorage.getItem("contra");

    if (ucontra === contra && usuraio === user){
        Swal.fire({
            title: 'Sweet!',
            text: 'Bienvenido volvamos a trabajar',
            imageUrl: 'https://unsplash.it/400/200',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
    }else{ 
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrecta',
            footer: '<a href="">¿contactar con soporte?</a>',
            timer: 3500,
        });
    };
}