window.addEventListener("load", function(){
    //Propiedades el marco
    const marco = this.document.getElementById("marco 1");
    const ctx = marco.getContext("2d");
    marco.width = 900;
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
                } else if (e.key === "d"){
                    this.juego.debug = !this.juego.debug;
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
            this.image = document.getElementById("projectile");
        }
        update(){
            this.x += this.vel;
            if (this.x > this.juego.width * 0.8) this.marcaEliminacio = true;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y);
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
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
            this.movimientoY = 0;
            this.velMaxima = 2;
            this.proyectiles = [];
            this.image = document.getElementById("jugador");
            this.powerUp = false;
            this.powerUpTimer = 0;
            this.powerUpLimit = 10000;
        }
        update(timepodelta){
            if(this.juego.keys.includes("ArrowUp")) this.movimientoY = -this.velMaxima;
                else if (this.juego.keys.includes("ArrowDown")) this.movimientoY = this.velMaxima;
                    else this.movimientoY = 0;
            this.y += this.movimientoY;
            //Limites de movimiento
            if (this.y > this.juego.height - this.height * 0.5) this.y = this.juego.height - this.height * 0.5;
                else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5;
            // Manejo de proyectiles
            this.proyectiles.forEach(proyectiles =>{
                proyectiles.update();
            });
            this.proyectiles = this.proyectiles.filter(proyectiles => !proyectiles.marcaEliminacio);
            // Animacion del Sprite
            if (this.frameX < this.maxFrame){
                this.frameX++;
            } else {
                this.frameX = 0;
            }
            //Power Up
            if (this.powerUp){
                if (this.powerUpTimer > this.powerUpLimit){
                    this.powerUpTimer = 0;
                    this.powerUp = false;
                    this.frameY = 0;
                } else {
                    this.powerUpTimer += timepodelta;
                    this.frameY = 1;
                    this.juego.municion += 0.1;
                }
            }
        }
        draw(context){
            if (this.juego.debug) context.strokeRect(this.x, this.y, this.width, this.height);
            this.proyectiles.forEach(proyectiles =>{
                proyectiles.draw(context);
            });
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        shootTop(){
            if (this.juego.municion > 0){
                this.proyectiles.push(new Proyectil(this.juego, this.x + 80, this.y + 30));
                this.juego.municion --;
            }
            if (this.powerUp) this.shootBottom();
        }
        shootBottom(){
            if (this.juego.municion > 0){
                this.proyectiles.push(new Proyectil(this.juego, this.x + 80, this.y + 175));
            }
        }
        enterPowerUp(){
            this.powerUpTimer = 0;
            this.powerUp = true;
            this.juego.municion = this.juego.municionMax;
        }
    }
    class Enemigo {
        constructor(juego){
            this.juego = juego;
            this.x = this.juego.width;
            this.movimientoX = Math.random() * -1.5 - 0.5;
            this.marcaEliminacio = false;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
        }
        update(){
            this.x += this.movimientoX - this.juego.speed;
            if (this.x + this.width < 0) this.marcaEliminacio = true;
            //Animacion enemiga
            if (this.frameX < this.maxFrame){
                this.frameX++;
            } else this.frameX = 0;
        }
        draw(context){
            if(this.juego.debug) context.strokeRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            if (this.juego.debug){
            context.font = "20px Helvetica";
            context.fillText(this.vidas, this.x, this.y);
            }
        }
    }
    class Angler1 extends Enemigo {
        constructor(juego){
            super(juego);
            this.width = 228;
            this.height = 169;
            this.y = Math.random() * (this.juego.height * 0.9 - this.height);
            this.image = document.getElementById("angler1");
            this.frameY = Math.floor(Math.random() *3);
            this.vidas = 2;
            this.score = this.vidas;
        }
    }
    class Angler2 extends Enemigo {
        constructor(juego){
            super(juego);
            this.width = 213;
            this.height = 165;
            this.y = Math.random() * (this.juego.height * 0.9 - this.height);
            this.image = document.getElementById("angler2");
            this.frameY = Math.floor(Math.random() *2);
            this.vidas = 3;
            this.score = this.vidas;
        }
    }
    class LuckyFish extends Enemigo {
        constructor(juego){
            super(juego);
            this.width = 99;
            this.height = 95;
            this.y = Math.random() * (this.juego.height * 0.9 - this.height);
            this.image = document.getElementById("lucky");
            this.frameY = Math.floor(Math.random() *2);
            this.vidas = 3;
            this.score = 15;
            this.tipo = "lucky";
        }
    }
    class Layer {
        constructor(juego, image, speedModifier) {
            this.juego = juego;
            this.image = image;
            this.speedModifier = speedModifier;
            this.width = 1768;
            this.height = 500;
            this.x = 0;
            this.y = 0;
        }
        update(){
            if (this.x <= -this.width) this.x = 0;
            this.x -= this.juego.speed * this.speedModifier;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y);
            context.drawImage(this.image, this.x + this.width, this.y);
        }
    }
    class Fondo {
        constructor(juego){
            this.juego = juego;
            this.image1 = document.getElementById("ambiente1");
            this.image2 = document.getElementById("ambiente2");
            this.image3 = document.getElementById("ambiente3");
            this.image4 = document.getElementById("ambiente4");
            this.layer1 = new Layer(this.juego, this.image1, 0.2);
            this.layer2 = new Layer(this.juego, this.image2, 0.4);
            this.layer3 = new Layer(this.juego, this.image3, 1);
            this.layer4 = new Layer(this.juego, this.image4, 1.5);
            this.layers = [this.layer1, this.layer2, this.layer3];
        }
        update(){
            this.layers.forEach(layer => layer.update());
        }
        draw(context){
            this.layers.forEach(layer => layer.draw(context));
        }
    }
    class Interfaz {
        constructor(juego){
            this.juego = juego;
            this.fontSize = 25;
            this.fontFamily = "Helvetica";
            this.color = "white";
        }
        draw(context){
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor = "black";
            context.font = this.fontSize + "px" + this.fontFamily;
            // Puntaje
            context.fillText("Puntaje" + this.juego.score, 20, 40);
            // Contador de tiempo
            const formatoTiempo = (this.juego.tiempoJue * 0.001).toFixed(1);
            context.fillText("Tiempo " + formatoTiempo, 20, 100);
            // condiciones de derrota
            if (this.juego.perdiste){
                context.textAling = "center";
                let mensaje1;
                let mensaje2;
                if (this.juego.score > this.juego.victoria){
                    mensaje1 = "Ganaste";
                    mensaje2 = "Felicidades";
                } else {
                    mensaje1 = "Perdiste";
                    mensaje2 = "Intentalo nuevamente";
                }
                context.font = "50px" + this.fontFamily;
                context.fillText(mensaje1, this.juego.width * 0.5, this.juego.height * 0.5);
                context.font = "25px" + this.fontFamily;
                context.fillText(mensaje2, this.juego.width * 0.5, this.juego.height * 0.5- 40);
            }
            //Municion
            if (this.juego.jugador.powerUp) context.fillStyle = "#ffffbd";
            for (let i = 0; i < this.juego.municion; i++){
                context.fillRect(20 + 5 * i, 50, 3, 20);
            }
            context.restore();
        }
    }
    class Juego {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.jugador = new Jugador(this);
            this.entrada = new ManejadorEntradas(this);
            this.ui = new Interfaz(this);
            this.fondo = new Fondo(this);
            this.keys = [];
            this.enemigo = [];
            this.tiempoEne = 0;
            this.aparicion = 1000;
            this.municion = 20;
            this.municionMax = 50;
            this.recarga = 0;
            this.iterReca = 500;
            this.perdiste = false;
            this.score = 0;
            this.victoria = 10;
            this.tiempoJue = 0;
            this.limiteTie = 15000;
            this.speed = 1;
            this.debug = true;
        }
        update(timepodelta){
            if (!this.perdiste) this.tiempoJue += timepodelta;
            if (this.tiempoJue > this.limiteTie) this.perdiste = true;
            this.fondo.update();
            this.fondo.layer4.update();
            this.jugador.update(timepodelta);
            if (this.recarga > this.iterReca){
                if(this.municion < this.municionMax) this.municion ++;
                this.recarga = 0;
            } else {
                this.recarga += timepodelta;
            }
            this.enemigo.forEach(enemigo => {
                enemigo.update();
                if (this.checkCollision(this.jugador, enemigo)){
                    enemigo.marcaEliminacio = true;
                    if (enemigo.tipo = "lucky") this.jugador.enterPowerUp();
                    else this.score--;
                }
                this.jugador.proyectiles.forEach(proyectiles => {
                    if (this.checkCollision(proyectiles, enemigo)){
                        enemigo.vidas --;
                        proyectiles.marcaEliminacio = true;
                        if (enemigo.vidas <= 0){
                            enemigo.marcaEliminacio = true;
                            if (!this.perdiste) this.score += enemigo.score;
                            if (this.score > this.victoria) this.perdiste =true;
                        }
                    }
                    })
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
            this.fondo.draw(context);
            this.jugador.draw(context);
            this.ui.draw(context);
            this.enemigo.forEach(enemigo => {
                enemigo.draw(context);
            });
            this.fondo.layer4.draw(context);
        }
        nuevoEnemigo (){
            const azar = Math.random();
            if (azar < 0.3) this.enemigo.push(new Angler1(this));
                else if (azar < 0.6) this.enemigo.push(new Angler2(this));
                else this.enemigo.push(new LuckyFish(this));
        };
        checkCollision(rect1, rect2){
            return (    rect1.x < rect2.x + rect2.width && 
                        rect1.x + rect1.width > rect2.x &&
                        rect1.y < rect2.y + rect2.height &&
                        rect1.height + rect1.y > rect2.y)
        }
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