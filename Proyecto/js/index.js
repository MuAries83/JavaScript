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
//Metiendo el arreglo de los datos pre-existentes a Json

localStorage.setItem("base", JSON.stringify(lista));

//captura por parte del usuario
let apellido = prompt("Ingrese nuevo apellido").toLocaleLowerCase();
let nombre = prompt("Ingrese el nombre").toLocaleLowerCase();

// LLamando al JSON para utilizarlo
let base = JSON.parse(localStorage.getItem("base"));

//Impresion de datos en pantalla
let obj = {
    id: base.length + 1,
    apellido: apellido,
    nombre: nombre
};

//lista.push(obj);

//for (const list of lista){
//    let div = document.createElement("div");
//    div.innerHTML = `
//    <h3>ID: ${list.id}</h3>
//    <p>Apellido: ${list.apellido}</p>
//    <b>Nombre: ${list.nombre}</b>
//    `;
//    cuerpo.append(div);
//};

// Creacion de elementos dentro de la pagibna
function formatosDatos () {
    base.forEach((alumno) => {
        let alumnos = `
            <div class="master">
                <div class="individual">
                    <h3 class ="sub_titulo">Numero: ${alumno.id}</h3>
                    <p> Primer Apellido: ${alumno.apellido} </p>
                    <p> Nombre: ${alumno.nombre} </p>
                    <button class="asistencia"> Asistencia </button>
                    <button class="falta"> Falta </button>
                </div>
            </div>
        `;
    cuerpo.innerHTML += alumnos;
    });
};

//function boton1 () {
//    let boton = `
//        <button class="boton"> Regresar </button>
//    `;
//    cuerpo.innerHTML += boton;
//};
//encabezado();
formatosDatos();
//boton1();




