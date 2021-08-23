class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }

    init() {
        console.log('Scene Play');

        this.reparteCartas();
    }

    create() {
        this.logo = this.add.image(50, 50, 'logo');
        this.menu = this.add.image(388, 50, 'menu').setInteractive();
        const cabecera = this.add.container(0, 0);
        cabecera.add([
            this.logo,
            this.menu
        ]);

        this.menu.on(Phaser.Input.Events.POINTER_UP, () => {
            this.scene.start('Menu');
        });
    }

    reparteCartas() {
        this.add.image(70, 200, 'bck-card-1');
        this.add.image(170, 200, 'bck-card-1');
        this.add.image(270, 200, 'bck-card-1');
        this.add.image(370, 200, 'bck-card-1');
        this.add.image(70, 350, 'bck-card-1');
        this.add.image(170, 350, 'bck-card-1');
        this.add.image(270, 350, 'bck-card-1');
        this.add.image(370, 350, 'bck-card-1');
    }
}

export default Play;