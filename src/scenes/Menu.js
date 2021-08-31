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
        console.log('Scene Menu');
    }
    
    create() {
        this.logo = this.add.image(50, 50, 'logo');
        const cabecera = this.add.container(0, 0);
        cabecera.add([
            this.logo
        ]);

        this.texto = this.add.bitmapText(0, 0, 'futilePro', 'NUEVA PARTIDA', 16, 1);
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