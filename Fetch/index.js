function inicio(){

    const listausuarios = document.getElementById("usuarios");
    
    function crearUsuario(datos) {
        let usuario = document.createElement("li");
        usuario.classList.add("usuario");
        usuario.innerHTML = `
            <h2 class="nombre">${datos.name} </h2>
            <p class="correo">${datos.email} </p>
            <p class="tel">${datos.phone} </p>
        `
        listausuarios.appendChild(usuario);
    }
    
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(json => {
            json.forEach(usuario => {
                crearUsuario(usuario);
            });
        })
        .catch(err => alert("Error"));
}

inicio();