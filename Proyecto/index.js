// Se comienza con el arreglo para buscar los apellidos de los alumnos, consentrano nombres y apellidos que se pueden buscar en el HTML

const calseApellido = [
    {id: 1, apellido: "navarro", materno: "lopez", nombre: "marco"},
    {id: 2, apellido: "moreno", materno: "moreno", nombre: "luisa"},
    {id: 3, apellido: "mariscal", materno: "lomeli", nombre: "sara"},
    {id: 4, apellido: "sandoval", materno: "vazquez", nombre: "ana"},
    {id: 5, apellido: "chavez", materno: "romero", nombre: "luis"},
    {id: 6, apellido: "salazar", materno: "nieves", nombre: "edgar"},
];

//funciones y captura por parte del usuario
function buscar(){
let apellido = prompt("Ingrese el apellido a buscar");
var minusculas = apellido.toLocaleLowerCase();
    //filtrado de la informacion proporcionada por el usuario
    let respuesta = calseApellido.filter(item => item.apellido === minusculas);
    //salida de informacion en pantalla
    respuesta.forEach(item => alert("El nombre complero del Alumno es " + item.nombre + " " + item.apellido + " " + item.materno));
};