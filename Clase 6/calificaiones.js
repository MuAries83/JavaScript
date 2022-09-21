let main = document.getElementById("main");

const cali = [
    {id: 1, nombre: "raul", calificacion: 95},
    {id: 2, nombre: "blanca", calificacion: 97},
    {id: 3, nombre: "alejandro", calificacion: 88},
    {id: 4, nombre: "ana", calificacion: 100},
    {id: 5, nombre: "betsabe", calificacion: 75},
];

let nombre = prompt("Ingrese el nombre del alumno").toLocaleLowerCase();

let resultado = cali.filter(item => item.nombre === nombre);
resultado.forEach(item => alert(item.calificacion));
    
// intente formar una impresion por medio de DOM de las calificaciones, pero por mas que lo intente no logro imprimirlo
    //let div = document.createElement("div");
    //  div.innerHTML = `
    //  <h3>ID: ${resultado.id}<h3>
    //  <p>Nombre: ${cali.nombre}<p>
    //  <b>Calificaion: ${cali.calificacion}<b>
    //  `;
    //  main.append("div");
