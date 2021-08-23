class Ranking extends Phaser.Scene {
    constructor() {
        super('Ranking');
    }

    init() {
        console.log('Scene Ranking');
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
}

export default Ranking;