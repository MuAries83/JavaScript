window.addEventListener("load", function(){
    const canvas = document.getElementById("marco 1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1280;
    canvas.height = 720;

    class InputHandler {
        constructor(juego){
            this.juego = juego;
            window.addEventListener("keydown", e => {
                this.juego.lastkey = "P" + e.key;
                console.log(this.juego.lastkey);
            });
            window.addEventListener("keyup", e => {
                this.juego.lastkey = "R" + e.key;
                console.log(this.juego.lastkey);
            });
        }
    }

    class Osolechusa {
        constructor(juego){
            this.juego = juego;
            this.spriteWidth = 200;
            this.spriteHeight = 200;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.marcoX = 0;
            this.marcoY = 3;
            this.macroMaximo = 30;
            this.x = 200;
            this.y = 200;
            this.movimientoX = 0;
            this.movimientoY = 0;
            this.velMovimiento = 5;
            this.imagen = document.getElementById("osolechusa");
        }
        draw(context){
            //Se dibujo un cuadro negro para ubicar al principio del desarrollo
            //context.fillRect(this.x, this.y, this.width, this.height);
            //Dibujar Imagen tiene tres variantes, 3 valores, 5 valores y 9 valores en este ejemplo utilizaremos la de 9 valores los cuales son:
            //La plantilla que queremos utilizar, fuente X, fuente y, fuente ancho, fuente alto, seguido de las posiciones de nuestra plantilla
            context.drawImage(this.imagen, this.marcoX * this.spriteWidth, this.marcoY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        setMovimiento(movimientoX,movimientoY){
            this.movimientoX = movimientoX;
            this.movimientoY = movimientoY;
        }
        update(){
            if (this.juego.lastkey == "PArrowLeft"){
                this.setMovimiento(-this.velMovimiento, 0);
                this.marcoY = 3;
            } else if (this.juego.lastkey == "RArrowLeft" && this.movimientoX < 0){
                this.setMovimiento(0, 0);
                this.marcoY = 2;
            } else if (this.juego.lastkey == "PArrowRight"){
                this.setMovimiento(this.velMovimiento, 0);
                this.marcoY = 5;
            } else if (this.juego.lastkey == "RArrowRight" && this.movimientoX > 0){
                this.setMovimiento(0, 0);
                this.marcoY = 4;
            } else if (this.juego.lastkey == "PArrowUp"){
                this.setMovimiento(0, -this.velMovimiento * 0.6);
                this.marcoY = 7;
            } else if (this.juego.lastkey == "RArrowUp" && this.movimientoY < 0){
                this.setMovimiento (0, 0);
                this.marcoY = 6;
            } else if (this.juego.lastkey == "PArrowDown"){
                this.setMovimiento(0, this.velMovimiento * 0.6);
                this.marcoY = 1;
            } else if (this.juego.lastkey = "RArrowDown" && this.movimientoY > 0){
                this.setMovimiento(0, 0);
                this.marcoY = 0;
            }
            this.x += this.movimientoX;
            this.y += this.movimientoY;
            // Limites horizontales de juego
            if(this.x < 0) {
                this.x = 0;
            } else if (this.x > this.juego.width - this.width){
                this.x = this.juego.width - this.width;
            }
            //Limites verticales del juego
            if (this.y < this.juego.Margenvertical){
                this.y = this.juego.Margenvertical;
            }else if (this.y > this.juego.height - this.height){
                this.y = this.juego.height - this.height
            }
            //Animar el dibujo
            if (this.marcoX < this.macroMaximo){
                this.marcoX++;
            } else {
                this.marcoX = 0;
            }
        }

    }

    class objetos {

    }

    class Juego {
        //Constructor creara instancias basadas en los planos que definiremos dentro
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.Margenvertical = 200;
            this.lastkey = undefined;
            this.input = new InputHandler(this);
            this.osolechusa = new Osolechusa(this);
        }
        render(context){
            this.osolechusa.draw(context);
            this.osolechusa.update();
        }
    }

    // la palabra clave "new" en JS es utilizada crear una nueva instancia de un objeto que contiene una funcion "constructor"
    // Dentro del objeto construido con "new" definimos el tamaño contra la totalidad del objeto anterior para que sea del mismo tamaño
    const juego = new Juego(canvas.width, canvas.height);
    
    function animar(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        juego.render(ctx);
        requestAnimationFrame(animar);
    }
    animar();
});