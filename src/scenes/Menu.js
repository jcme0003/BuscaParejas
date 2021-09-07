import options from "../share/options.js";

class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    init() {
        this.centroCanvas = {
            width: this.sys.game.config.width / 2,
            height: this.sys.game.config.height / 2
        };
    }
    
    create() {
        this.logo = this.add.image(50, 50, 'logo');
        this.info = this.add.image(300, 49, 'info').setInteractive();
        this.opciones = this.add.image(388, 50, 'options').setInteractive();

        const cabecera = this.add.container(0, 0);
        cabecera.add([
            this.logo,
            this.info,
            this.opciones
        ]);

        this.opciones_tablero = this.add.image(0, 0, 'tablero_options').setInteractive();
        this.opciones_text = this.add.bitmapText(0, 0, 'futilePro', 'OPCIONES:', 20, 1);
        this.opciones_sound = this.add.image(0, 0, 'sound_' + options.audio).setInteractive();
        this.opciones_card_1 = this.add.image(0, 0, 'card-1-0').setInteractive();
        this.opciones_card_2 = this.add.image(0, 0, 'card-2-1').setInteractive();
        this.opciones_ok_button = this.add.image(0, 0, 'ok_button').setInteractive();

        Phaser.Display.Align.In.Center(this.opciones_text, this.opciones_tablero, 0, -130);
        Phaser.Display.Align.To.BottomCenter(this.opciones_sound, this.opciones_text, 0, 10);
        Phaser.Display.Align.To.BottomLeft(this.opciones_card_1, this.opciones_sound, 20, 0);
        Phaser.Display.Align.To.BottomRight(this.opciones_card_2, this.opciones_sound, 20, 0);
        Phaser.Display.Align.To.BottomCenter(this.opciones_ok_button, this.opciones_sound, 0, 100);

        this.opcionesContainer = this.add.container(this.centroCanvas.width,
            this.centroCanvas.height);
        
        this.opcionesContainer.add([
            this.opciones_tablero,
            this.opciones_text,
            this.opciones_sound,
            this.opciones_card_1,
            this.opciones_card_2,
            this.opciones_ok_button
        ]);
        this.opcionesContainer.setDepth(2);
        this.opcionesContainer.setScale(0);

        this.opciones.on(Phaser.Input.Events.POINTER_UP, () => {
            this.add.tween({
                targets: this.opcionesContainer,
                scaleX: 1,
                scaleY: 1,
                ease: 'Bounce',
                duration: 500
            });
        });

        this.opciones_sound.on(Phaser.Input.Events.POINTER_UP, () => {
            options.audio = !options.audio;
            this.opciones_sound.frame = this.textures.getFrame('sound_' + options.audio);
        });

        this.opciones_card_1.on(Phaser.Input.Events.POINTER_UP, () => {
            options.baraja = 1;
            this.opciones_card_1.frame = this.textures.getFrame('card-1-0');
            this.opciones_card_2.frame = this.textures.getFrame('card-2-1');
        });

        this.opciones_card_2.on(Phaser.Input.Events.POINTER_UP, () => {
            options.baraja = 2;
            this.opciones_card_1.frame = this.textures.getFrame('card-1-1');
            this.opciones_card_2.frame = this.textures.getFrame('card-2-0');
        });

        this.opciones_ok_button.on(Phaser.Input.Events.POINTER_UP, () => {
            this.add.tween({
                targets: this.opcionesContainer,
                scaleX: 0,
                scaleY: 0,
                ease: 'Bounce',
                duration: 500
            });
        });

        // Ventana bienvenida
        this.ini_ventana = this.add.image(0, 0, 'info_ventana').setInteractive();
        this.ini_titulo = this.add.bitmapText(0, 0, 'futilePro', 'BIENVENIDO', 20, 1);
        this.ini_texto = this.add.bitmapText(0, 0, 'futilePro', 'Bienvenido! esta\nusted utilizando\nuna aplicación basada\nen la tecnologia PWA.\nEsto significa que\npuede ser instalada\ndesde su navegador,\npara ello pulse en\nel boton Instalar\nque le aparece en\nla parte superior. Si\nsu navegador no\nmuestra esta ventana,\no boton, acceda al\nmenu de opciones de\nsu navegador y busque\nla opcion de instalar.', 12, 0);
        this.ini_close = this.add.image(0, 0, 'close').setInteractive();

        Phaser.Display.Align.In.Center(this.ini_titulo, this.ini_ventana, 0, -130);
        Phaser.Display.Align.To.BottomCenter(this.ini_texto, this.ini_titulo, 0, 30);
        Phaser.Display.Align.To.BottomCenter(this.ini_close, this.ini_texto, 0, 0);

        this.iniContainer = this.add.container(this.centroCanvas.width,
            this.centroCanvas.height);

        this.iniContainer.add([
            this.ini_ventana,
            this.ini_titulo,
            this.ini_texto,
            this.ini_close
        ]);
        this.iniContainer.setDepth(2);
        if(options.nuevaVisita === true) {
            options.nuevaVisita = false;
            this.iniContainer.setScale(1);
        } else {
            this.iniContainer.setScale(0);
        }

        this.ini_close.on(Phaser.Input.Events.POINTER_UP, () => {
            this.add.tween({
                targets: this.iniContainer,
                scaleX: 0,
                scaleY: 0,
                ease: 'Bounce',
                duration: 500
            });
        });

        this.info_ventana = this.add.image(0, 0, 'info_ventana').setInteractive();
        this.info_titulo = this.add.bitmapText(0, 0, 'futilePro', 'REGLAS', 20, 1);
        this.info_text = this.add.bitmapText(0, 0, 'futilePro', 'El juego de las parejas\nconsiste en buscar las\nparejas de cartas\nde dos en dos. Segun\nel nivel de dificultad\nel numero de parejas\nvaria, siendo de 4 en\nfacil, 6 en medio\ny 8 parejas en dificil.\nLa puntuacion final\nse obtiene restandole\nlos puntos conseguidos\na los segundos tardados\nen encontrar todas\nlas parejas.', 12, 0);
        this.info_close = this.add.image(0, 0, 'close').setInteractive();

        Phaser.Display.Align.In.Center(this.info_titulo, this.info_ventana, 0, -130);
        Phaser.Display.Align.To.BottomCenter(this.info_text, this.info_titulo, 0, 30);
        Phaser.Display.Align.To.BottomCenter(this.info_close, this.info_text, 0, 15);

        this.infoContainer = this.add.container(this.centroCanvas.width,
            this.centroCanvas.height);
        
        this.infoContainer.add([
            this.info_ventana,
            this.info_titulo,
            this.info_text,
            this.info_close
        ]);
        this.infoContainer.setDepth(2);
        this.infoContainer.setScale(0);

        this.info.on(Phaser.Input.Events.POINTER_UP, () => {
            this.add.tween({
                targets: this.infoContainer,
                scaleX: 1,
                scaleY: 1,
                ease: 'Bounce',
                duration: 500
            });
        });

        this.info_close.on(Phaser.Input.Events.POINTER_UP, () => {
            this.add.tween({
                targets: this.infoContainer,
                scaleX: 0,
                scaleY: 0,
                ease: 'Bounce',
                duration: 500
            });
        });

        this.texto = this.add.bitmapText(0, 0, 'futilePro', 'SELECCIONA\nDIFICULTAD', 26, 1);
        this.facil = this.add.image(0, 0, 'facil').setInteractive();
        this.medio = this.add.image(0, 0, 'medio').setInteractive();
        this.dificil = this.add.image(0, 0, 'dificil').setInteractive();
        this.clasificacion = this.add.image(0, 0, 'clasificacion').setInteractive();

        Phaser.Display.Align.In.Center(this.texto, cabecera, 0, 0);
        Phaser.Display.Align.To.BottomCenter(this.facil, this.texto, 0, 20);
        Phaser.Display.Align.To.BottomCenter(this.medio, this.facil, 0, 20);
        Phaser.Display.Align.To.BottomCenter(this.dificil, this.medio, 0, 20);
        Phaser.Display.Align.To.BottomCenter(this.clasificacion, this.dificil, 0, 20);
        
        const opciones = this.add.container(this.centroCanvas.width, 0);
        opciones.add([
            this.texto,
            this.facil,
            this.medio,
            this.dificil,
            this.clasificacion
        ]);

        this.add.tween({
            targets: opciones,
            ease: 'Bounce',
            y: 150,
            duration: 1250
        });

        this.facil.on(Phaser.Input.Events.POINTER_UP, () => {
            options.dificultad = 'facil';
            this.scene.start('Play');
        });

        this.medio.on(Phaser.Input.Events.POINTER_UP, () => {
            options.dificultad = 'medio';
            this.scene.start('Play');
        });

        this.dificil.on(Phaser.Input.Events.POINTER_UP, () => {
            options.dificultad = 'dificil';
            this.scene.start('Play');
        });

        this.clasificacion.on(Phaser.Input.Events.POINTER_UP, () => {
            this.scene.start('Ranking');
        });
    }
}

export default Menu;