class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader');
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
        this.load.image(['titulo-preload', 'logo', 'menu', 'facil', 'medio', 'dificil', 'clasificacion', 'tablero_win', 'reload', 'home', 'stars', 'options', 'tablero_options', 'sound_true', 'sound_false', 'ok_button', 'info_ventana', 'info', 'close']);
        this.load.setPath('./assets/imgs/cards');
        this.load.image(['bck-card-1', 'card-1-0', 'card-1-1', 'card-1-2', 'card-1-3', 'card-1-4', 'card-1-5', 'card-1-6', 'card-1-7', 'card-1-8', 'card-2-0', 'card-2-1', 'card-2-2', 'card-2-3', 'card-2-4', 'card-2-5', 'card-2-6', 'card-2-7', 'card-2-8']);

        this.load.on('complete', () => {
            const fuente = this.cache.json.get('fontConfig');
            this.cache.bitmapFont.add('futilePro', Phaser.GameObjects.RetroFont.Parse(this, fuente));
            this.scene.start('Preload');
        });
    }
    
    
}

export default Bootloader;