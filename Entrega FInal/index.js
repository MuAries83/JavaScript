window.addEventListener("load", function(){
    //Propiedades el marco
    const marco = this.document.getElementById("marco 1");
    const ctx = marco.getContext("2d");
    marco.width = 500;
    marco.height = 500;

    class ManejadorEntradas {
        constructor(juego){
            this.juego = juego;
            window.addEventListener("keydown", e => {
                if ((   (e.key === "ArrowUp") ||
                        (e.key === "ArrowDown")
                ) && this.juego.keys.indexOf(e.key) === -1){
                    this.juego.keys.push(e.key);
                }
                console.log(this.juego.keys);
            });
            window.addEventListener("keyup", e => {
                if(this.juego.keys.indexOf(e.key) > -1){
                    this.juego.keys.splice(this.juego.keys.indexOf(e.key), 1);
                }
                console.log(this.juego.keys);
            });
        }
    }
    class Proyectil {

    }

    class Particula {

    }

    class Jugador {
        constructor(juego){
            this.juego = juego;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 100;
            this.movimientoY = 0;
            this.velMaxima = 2;
        }
        update(){
            if(this.juego.keys.includes("ArrowUp")) this.movimientoY = -this.velMaxima;
                else if (this.juego.keys.includes("ArrowDown")) this.movimientoY = this.velMaxima;
                    else this.movimientoY = 0;
            this.y += this.movimientoY;
        }
        draw(context){
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    class Enemigo {

    }
    class Fondo {

    }
    class Interfaz {

    }
    class Juego {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.jugador = new Jugador(this);
            this.entrada = new ManejadorEntradas(this);
            this.keys = [];
        }
        update(){
            this.jugador.update();
        }
        draw(context){
            this.jugador.draw(context);
        }
    }
    const juego = new Juego(marco.width, marco.height);
    //construccion de animacion
    function animar(){
        ctx.clearRect(0, 0, marco.width, marco.height);
        juego.update();
        juego.draw(ctx);
        requestAnimationFrame(animar);
    }
    animar();
})