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
}

function entrar(){
    var usuraio = document.getElementById("usuario").value;
    var ucontra = document.getElementById("contra1").value;
    var user = localStorage.getItem("user");
    var contra = localStorage.getItem("contra");

    if (ucontra === contra){
        alert("Bienvenido a esta prueba");
        window.location("index.html");
    }else{ alert("No existe el usuario");
        document.getElementById("usuario").focus();
    }
}