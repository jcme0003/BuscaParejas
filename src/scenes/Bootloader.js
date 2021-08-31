class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader');
    }

    init() {
        console.log('Scene Bootloader');
    }
    
    preload() {
        this.load.setPath('./assets/');
        this.load.atlas('sprite-loading-bar', 'sprite-loading-bar.png', 'sprite-loading-bar_atlas.json');
        this.load.animation('loadingBarAnim', 'sprite-loading-bar_anim.json');
        this.load.image('font', 'fonts/font.png');
        this.load.json('fontConfig', 'fonts/font.json');
        this.load.audio('flipcard', 'flipcard.wav');
        this.load.audio('win', 'win.mp3');
        this.load.audio('draw', 'draw.mp3');
        this.load.setPath('./assets/imgs/');
        this.load.image(['titulo-preload', 'logo', 'menu', 'facil', 'medio', 'dificil', 'clasificacion', 'tablero_win', 'reload', 'home', 'stars']);
        this.load.setPath('./assets/imgs/cards');
        this.load.image(['bck-card-1', 'card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7', 'card-8']);

        this.load.on('complete', () => {
            const fuente = this.cache.json.get('fontConfig');
            this.cache.bitmapFont.add('futilePro', Phaser.GameObjects.RetroFont.Parse(this, fuente));
            this.scene.start('Preload');
        });
    }
    
    
}

export default Bootloader;