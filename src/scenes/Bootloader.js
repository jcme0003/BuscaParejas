class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader');
    }

    init() {
        console.log('Scene Bootloader');
    }
    
    preload() {
        this.load.setPath('./assets/');
        this.load.image(['titulo-preload', 'logo', 'menu', 'facil', 'medio', 'dificil', 'clasificacion', 'bck-card-1']);
        this.load.atlas('sprite-loading-bar', 'sprite-loading-bar.png', 'sprite-loading-bar_atlas.json');
        this.load.animation('loadingBarAnim', 'sprite-loading-bar_anim.json');
        this.load.image('font', 'fonts/font.png');
        this.load.json('fontConfig', 'fonts/font.json');

        this.load.on('complete', () => {
            const fuente = this.cache.json.get('fontConfig');
            this.cache.bitmapFont.add('futilePro', Phaser.GameObjects.RetroFont.Parse(this, fuente));
            this.scene.start('Preload');
        });
    }
    
    
}

export default Bootloader;