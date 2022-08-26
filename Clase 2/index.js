let numeroPrimo = parseInt(prompt("Ingrese un Numero"));

let esNumeroPrimo = true;

for (let i = 2; i < numeroPrimo/2; i++){

    if(numeroPrimo % i ===0){
        esNumeroPrimo = false;
    }
}

if (esNumeroPrimo){
    alert("Si es un Numero Primo", numeroPrimo);
} else {
    alert("No es Numero Pirmo", numeroPrimo);
}