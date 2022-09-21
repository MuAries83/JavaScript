//Creacion de variable para afectar el cuerpo del HTML
let cuerpo = document.getElementById("cuerpo");
//Arreglo para trabajo de HTML
const lista = [
    {id: 1, apellido: "navarro", nombre: "marco"},
    {id: 2, apellido: "moreno", nombre: "luisa"},
    {id: 3, apellido: "mariscal", nombre: "sara"},
    {id: 4, apellido: "sandoval", nombre: "ana"},
    {id: 5, apellido: "chavez", nombre: "luis"},
    {id: 6, apellido: "salazar", nombre: "edgar"},
];
//captura por parte del usuario
let apellido = prompt("Ingrese nuevo apellido").toLocaleLowerCase();
let nombre = prompt("Ingrese el nombre").toLocaleLowerCase();
//Impresion de datos en pantalla
let obj = {
    id: lista.length + 1,
    apellido: apellido,
    nombre: nombre
};
lista.push(obj);

for (const list of lista){
    let div = document.createElement("div");
    div.innerHTML = `
    <h3>ID: ${list.id}</h3>
    <p>Apellido: ${list.apellido}</p>
    <b>Nombre: ${list.nombre}</b>
    `;
    cuerpo.append(div);
}