document.getElementById("btn__inico-sesion").addEventListener("click",iniciarSesion);
document.getElementById("btn__register").addEventListener("click",register);
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