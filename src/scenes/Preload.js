class Preload extends Phaser.Scene {
    constructor() {
        super('Preload');
    }

    init(){
        console.log('Scene Preload');
    }

    create() {
        this.titulo = this.add.image(220, 300, 'titulo-preload');
        this.loadingBar = this.add.sprite(220, 400, 'sprite-loading-bar');
        this.loadingBar.anims.play('loading-bar-start');
        setTimeout(() => {
            this.scene.start('Menu');
        }, 4000);
    }
}

export default Preload;