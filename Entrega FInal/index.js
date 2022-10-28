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
                } else if (e.key === " "){
                    this.juego.jugador.shootTop();
                }
            });
            window.addEventListener("keyup", e => {
                if(this.juego.keys.indexOf(e.key) > -1){
                    this.juego.keys.splice(this.juego.keys.indexOf(e.key), 1);
                }
            });
        }
    }
    class Proyectil {
        constructor(juego, x, y){
            this.juego = juego;
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 3;
            this.vel = 3;
            this.marcaEliminacio = false;
        }
        update(){
            this.x += this.vel;
            if (this.x > this.juego.width * 0.8) this.marcaEliminacio = true;
        }
        draw(context){
            context.fillStyle = "yellow";
            context.fillRect(this.x, this.y, this.width, this.height);
        }
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
            this.proyectiles = [];
        }
        update(){
            if(this.juego.keys.includes("ArrowUp")) this.movimientoY = -this.velMaxima;
                else if (this.juego.keys.includes("ArrowDown")) this.movimientoY = this.velMaxima;
                    else this.movimientoY = 0;
            this.y += this.movimientoY;
            // Manejo de proyectiles
            this.proyectiles.forEach(proyectiles =>{
                proyectiles.update();
            });
            this.proyectiles = this.proyectiles.filter(proyectiles => !proyectiles.marcaEliminacio);
        }
        draw(context){
            context.fillStyle = "black";
            context.fillRect(this.x, this.y, this.width, this.height);
            this.proyectiles.forEach(proyectiles =>{
                proyectiles.draw(context);
            });
        }
        shootTop(){
            if (this.juego.municion > 0){
                this.proyectiles.push(new Proyectil(this.juego, this.x + 80, this.y + 30));
                this.juego.municion --;
            }
        }
    }
    class Enemigo {
        constructor(juego){
            this.juego = juego;
            this.x = this.juego.width;
            this.movimientoX = Math.random() * -1.5 - 0.5;
            this.marcaEliminacio = false;
        }
        update(){
            this.x += this.movimientoX;
            if (this.x + this.width < 0) this.marcaEliminacio = true;
        }
        draw(context){
            context.fillStyle = "red";
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    class Pez1 extends Enemigo {
        constructor(juego){
            super(juego);
            this.width = 228 * 0.2;
            this.height = 169 * 0.2;
            this.y = Math.random() * (this.juego.height * 0.9 - this.height);
        }
    }
    class capa {

    }
    class Fondo {

    }
    class Interfaz {
        constructor(juego){
            this.juego = juego;
            this.fontSize = 25;
            this.fontFamily = "Helvetica";
            this.color = "white";
        }
        draw(context){
            //Municion
            context.fillStyle = this.color;
            for (let i = 0; i < this.juego.municion; i++){
                context.fillRect(20 + 5 * i, 50, 3, 20);
            }
        }
    }
    class Juego {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.jugador = new Jugador(this);
            this.entrada = new ManejadorEntradas(this);
            this.ui = new Interfaz(this);
            this.keys = [];
            this.enemigo = [];
            this.tiempoEne = 0;
            this.aparicion = 1000;
            this.municion = 20;
            this.municionMax = 50;
            this.recarga = 0;
            this.iterReca = 500;
            this.perdiste = false;
        }
        update(timepodelta){
            this.jugador.update();
            if (this.recarga > this.iterReca){
                if(this.municion < this.municionMax) this.municion ++;
                this.recarga = 0;
            } else {
                this.recarga += timepodelta;
            }
            this.enemigo.forEach(enemigo => {
                enemigo.update();
            });
            this.enemigo = this.enemigo.filter(enemigo => !enemigo.marcaEliminacio);
            if (this.tiempoEne > this.aparicion && !this.perdiste){
                this.nuevoEnemigo();
                this.tiempoEne = 0;
            } else {
                this.tiempoEne += timepodelta;
            }
        }
        draw(context){
            this.jugador.draw(context);
            this.ui.draw(context);
            this.enemigo.forEach(enemigo => {
                enemigo.draw(context);
            });
        }
        nuevoEnemigo (){
            this.enemigo.push(new Pez1(this));
        };
    }
    const juego = new Juego(marco.width, marco.height);
    let momento = 0;
    //construccion de animacion
    function animar(marcaTiempo){
        const timepodelta = marcaTiempo - momento;
        momento = marcaTiempo;
        ctx.clearRect(0, 0, marco.width, marco.height);
        juego.update(timepodelta);
        juego.draw(ctx);
        requestAnimationFrame(animar);
    }
    animar(0);
})