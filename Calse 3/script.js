var personaje = document.getElementById("personaje");
var cosa = document.getElementById("cosa");

function brinca(){
    if(personaje.classList != "animar"){
    personaje.classList.add("animar");
    }
    setTimeout(function(){
        personaje.classList.remove("animar")
    },500);
}
var muere = setInterval(function(){
    var personajetop =
        parseInt(window.getComputedStyle(personaje).getPropertyValue("top"));
    var cosaleft =
        parseInt(window.getComputedStyle(cosa).getPropertyValue("left"))
    if(cosaleft<20 && cosaleft>0 && personajetop>=130){
        cosa.style.animation = "none";
        cosa.style.display = "none";
        alert("La manqueaste")
    }
}, 10);