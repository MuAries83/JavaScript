const cali = [
    {id: 1, nombre: "raul", calificacion: 95},
    {id: 2, nombre: "blanca", calificacion: 97},
    {id: 3, nombre: "alejandro", calificacion: 88},
    {id: 4, nombre: "ana", calificacion: 100},
    {id: 5, nombre: "betsabe", calificacion: 75},
];

let nombre = prompt("Ingrese el nombre del alumno");
let resultado = cali.filter(item => item.nombre === nombre);

resultado.forEach(item => alert(item.calificacion));