import options from "../share/options.js";

class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }

    preload() {
        this.load.html('inputText', './assets/text/inputText.html');
    }

    init() {
        this.audioWin = this.sound.add('win');
        this.audioFlipCard = this.sound.add('flipcard');
        this.audioDraw = this.sound.add('draw');

        this.centroCanvas = {
            width: this.sys.game.config.width / 2,
            height: this.sys.game.config.height / 2
        };

        this.puntuacion = 0;
        this.milisegundos = 0;
        this.segundos = 0;
        this.segundero = 0;

        this.intento = 0;
        this.valorIntentos = [];
        this.cartasIntentos = [];
        this.tiempo = 0;
        this.parejas = 0;
        this.parejasEncontradas = 0;

        this.minCarta = 1;
        this.baraja = [];

        this.tablero = [];
        this.reparteCartas();
        this.actualizaSegundos();
    }

    create() {
        this.logo = this.add.image(50, 50, 'logo');
        this.menu = this.add.image(388, 50, 'menu').setInteractive();
        this.puntuacionText = this.add.text(100, 25, 'PUNTOS: 0', {fontSize: '20px'});
        this.segundosText = this.add.text(100, 50, 'SEGUNDOS: 0', {fontSize: '20px'});
        const cabecera = this.add.container(0, 0);
        cabecera.add([
            this.logo,
            this.puntuacionText,
            this.segundosText,
            this.menu
        ]);

        this.menu.on(Phaser.Input.Events.POINTER_UP, () => {
            clearInterval(this.segundero);
            this.scene.start('Menu');
        });

        this.inputText = this.add.dom(0, 0).createFromCache('inputText');
        this.tablero_win = this.add.image(0, 0, 'tablero_win');
        this.tablero_text = this.add.bitmapText(0, 0, 'futilePro', 'PUNTUACION\nFINAL: ' + this.puntuacion, 20, 1);
        this.tablero_button_replay = this.add.image(0, 0, 'reload').setInteractive();
        this.tablero_button_home = this.add.image(0, 0, 'home').setInteractive();

        Phaser.Display.Align.In.Center(this.tablero_text, this.tablero_win, 0, -40);
        Phaser.Display.Align.In.BottomCenter(this.inputText, this.tablero_text, 0, 40);
        Phaser.Display.Align.In.BottomCenter(this.tablero_button_replay, this.inputText, -60, 100);
        Phaser.Display.Align.In.BottomCenter(this.tablero_button_home, this.inputText, 60, 103);

        this.tableroContainer = this.add.container(this.centroCanvas.width,
            this.centroCanvas.height);
        
        this.tableroContainer.add([
            this.tablero_win,
            this.tablero_text,
            this.inputText,
            this.tablero_button_replay,
            this.tablero_button_home
        ]);
        this.tableroContainer.setDepth(2);
        this.tableroContainer.setScale(0);

        this.tablero_button_replay.on(Phaser.Input.Events.POINTER_UP, () => {
            if(options.audio === true) {
                this.audioDraw.play();
            }
            this.checkRanking();
            this.add.tween({
                targets: this.tableroContainer,
                scaleX: 0,
                scaleY: 0,
                duration: 1000,
                ease: 'Bounce',
                onComplete: () => {
                    this.scene.start('Reload');
                }
            });
        });

        this.tablero_button_home.on(Phaser.Input.Events.POINTER_UP, () => {
            this.checkRanking();
            this.scene.start('Menu');
        });

        this.escuchaEventosTablero();
    }

    /**
     * Hace una petici??n POST a ranking.php y comprueba si la puntuaci??n del jugador actual
     * es una de las 10 mejores o no. En caos de estar entre las 10 mejores la agrega
     * al fichero ranking.json.
     */
    checkRanking() {
        this.nombre = this.inputText.getChildByName('nombre').value;

        if(this.nombre === '') {
            this.nombre = 'An??nimo';
        }

        var url = 'ranking.php';
        var data = new FormData();
        data.append('nombre', this.nombre);
        data.append('puntos', (this.puntuacion - (this.segundos/2)));

        fetch(url, {
            method: 'POST',
            body: data
        }).then(res => res.json());
    }

    /**
     * Actualiza los segundos en la escena
     */
    actualizaSegundos() {
        this.segundero = setInterval(() => {
            this.segundos += 1;
            this.segundosText.setText('SEGUNDOS: ' + this.segundos);
        }, 1000);
    }

    /**
     * Desactiva propiedad interactive de las cartas
     */
    disableInteractiveCartas() {
        this.tablero.map((carta) => {
            carta.disableInteractive();
        });
    }

    /**
     * Activa propiedad interactive de las cartas
     */
    setInteractiveCartas() {
        this.tablero.map((carta) => {
            carta.setInteractive();
        });
    }

    /**
     * Comprueba si el jugador a encontrado todas las parejas de cartas
     */
    checkVictoria() {
        if(this.parejasEncontradas === this.parejas) {
            clearInterval(this.segundero);
            if(options.audio === true) {
                this.audioWin.play();
            }
            this.tablero_text.setText('PUNTUACION\nFINAL:' + (this.puntuacion - (this.segundos/2)));
            this.add.tween({
                targets: this.tableroContainer,
                scaleX: 1,
                scaleY: 1,
                ease: 'Bounce',
                duration: 500
            });
        }
    }

    /**
     * Actualiza los puntos conseguidos por el jugador hasta ahora
     * @param {*} puntos 
     * @param {*} op 
     */
    actualizaPuntos(puntos, op) {
        if(op) {
            this.puntuacion += puntos;
        } else {
            this.puntuacion -= puntos;
        }

        this.puntuacionText.setText('PUNTOS: ' + this.puntuacion);
    }

    /**
     * Comprueba si las cartas seleccionadas son iguales o no
     * @param {*} valor indica el valor de la carta seleccionada
     */
    checkCartas(valor) {
        this.iguales = true;
        this.valorIntentos[this.intento] = valor;

        if(this.intento == options.maxIntentos - 1) {
            this.intento = 0;
            for(var i = options.maxIntentos - 1; i > 0; i--) {
                if(this.valorIntentos[0] != this.valorIntentos[i]) {
                    this.iguales = false;
                }
            }

            if(this.iguales === false) {
                this.disableInteractiveCartas();
                setTimeout(() => {
                    if(options.audio === true) {
                        this.audioFlipCard.play();
                    }
                    for(var i = 0; i < options.maxIntentos; i++) {
                        this.cartasIntentos[i].setInteractive();
                        this.cartasIntentos[i].frame = this.textures.getFrame('bck-card-1');
                    }
                    this.setInteractiveCartas();
                }, 1000);
                if(options.dificultad === 'facil') {
                    this.actualizaPuntos(2, false);
                } else if(options.dificultad === 'medio') {
                    this.actualizaPuntos(4, false);
                } else {
                    this.actualizaPuntos(6, false);
                }
            } else {
                this.parejasEncontradas++;
                this.actualizaPuntos(10, true);
                this.checkVictoria();
            }
        } else {
            this.intento++;
        }
    }

    /**
     * Escucha los eventos que se produzcan en el tablero de juego
     */
    escuchaEventosTablero() {
        this.tablero.map((carta, i) => {
            carta.setInteractive();
            carta.on(Phaser.Input.Events.POINTER_UP, () => {
                carta.disableInteractive();
                if(options.audio === true) {
                    this.audioFlipCard.play();
                }
                this.valor = options.tablero[this.obtenerPosTablero(i).x][this.obtenerPosTablero(i).y];
                carta.frame = this.textures.getFrame('card-' + options.baraja + '-' + this.valor);
                this.cartasIntentos[this.intento] = carta;
                this.checkCartas(this.valor);
            });
        });
    }

    /**
     * Saca carta de la baraja de forma aleatoria
     */
    sacaCartaRnd() {
        do {
            this.carta = Phaser.Math.Between(this.minCarta, this.parejas);
        } while(this.baraja[this.carta] >= 2);

        this.baraja[this.carta] ++;
    }

    /**
     * Inicializa valores de baraja a cero
     */
    initBaraja() {
        for(var i = 0; i < this.parejas * 2; i++) {
            this.baraja[i] = 0;
        }
    }

    /**
     * Simula el proceso de barajar cartas.
     * En primer lugar se inicializa la baraja para despues ir sacando cartas aleatorias,
     * por ultimo se van agregando las cartas sacadas al tablero de juego.
     */
    barajaCartas() {
        this.initBaraja();
        for(var i = 0; i < this.parejas * 2; i++) {
            this.sacaCartaRnd();
            options.tablero[this.obtenerPosTablero(i).x][this.obtenerPosTablero(i).y] = this.carta;
        }
    }

    /**
     * Pinta cartas en el tablero de juego
     */
    reparteCartas() {
        // facil
        if(options.dificultad === 'facil') {
            this.parejas = 4;
            this.barajaCartas();
            this.tablero = [
                // ARRIBA
                this.add.image(this.centroCanvas.width - 150,
                    this.centroCanvas.height - 150,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width - 50,
                    this.centroCanvas.height - 150,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 50,
                    this.centroCanvas.height - 150,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 150,
                    this.centroCanvas.height - 150,
                    'bck-card-1'),
                // ABAJO
                this.add.image(this.centroCanvas.width - 150,
                    this.centroCanvas.height - 25,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width - 50,
                    this.centroCanvas.height - 25,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 50,
                    this.centroCanvas.height - 25,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 150,
                    this.centroCanvas.height - 25,
                    'bck-card-1')
            ];
        }

        // medio
        if(options.dificultad === 'medio') {
            this.parejas = 6;
            this.barajaCartas();
            this.tablero = [
                // ARRIBA
                this.add.image(this.centroCanvas.width - 150,
                    this.centroCanvas.height - 150,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width - 50,
                    this.centroCanvas.height - 150,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 50,
                    this.centroCanvas.height - 150,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 150,
                    this.centroCanvas.height - 150,
                    'bck-card-1'),
                // MEDIO
                this.add.image(this.centroCanvas.width - 150,
                    this.centroCanvas.height - 25,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width - 50,
                    this.centroCanvas.height - 25,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 50,
                    this.centroCanvas.height - 25,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 150,
                    this.centroCanvas.height - 25,
                    'bck-card-1'),
                // ABAJO
                this.add.image(this.centroCanvas.width - 150,
                    this.centroCanvas.height + 100,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width - 50,
                    this.centroCanvas.height + 100,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 50,
                    this.centroCanvas.height + 100,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 150,
                    this.centroCanvas.height + 100,
                    'bck-card-1')
            ];
        }

        // dificil
        if(options.dificultad === 'dificil') {
            this.parejas = 8;
            this.barajaCartas();
            this.tablero = [
                // PRIMERA
                this.add.image(this.centroCanvas.width - 150,
                    this.centroCanvas.height - 150,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width - 50,
                    this.centroCanvas.height - 150,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 50,
                    this.centroCanvas.height - 150,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 150,
                    this.centroCanvas.height - 150,
                    'bck-card-1'),
                // SEGUNDA
                this.add.image(this.centroCanvas.width - 150,
                    this.centroCanvas.height - 25,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width - 50,
                    this.centroCanvas.height - 25,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 50,
                    this.centroCanvas.height - 25,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 150,
                    this.centroCanvas.height - 25,
                    'bck-card-1'),
                // TERCERA
                this.add.image(this.centroCanvas.width - 150,
                    this.centroCanvas.height + 100,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width - 50,
                    this.centroCanvas.height + 100,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 50,
                    this.centroCanvas.height + 100,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 150,
                    this.centroCanvas.height + 100,
                    'bck-card-1'),
                // CUARTA
                this.add.image(this.centroCanvas.width - 150,
                    this.centroCanvas.height + 225,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width - 50,
                    this.centroCanvas.height + 225,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 50,
                    this.centroCanvas.height + 225,
                    'bck-card-1'),
                this.add.image(this.centroCanvas.width + 150,
                    this.centroCanvas.height + 225,
                    'bck-card-1')
            ];
        }
    }

    /**
     * Obtiene la posicion de la carta pulsada en el tablero de juego. Es decir, en el
     * array de nuestro fichero compartido
     * @param {*} i posicion de la carta seleccionada por el usuario
     * @returns devuelve posicion real en la tabla (x: fila, y: columna)
     */
    obtenerPosTablero(i) {
        return {
            x: Math.floor(i/4),
            y: i % 4
        };
    }
}

export default Play;