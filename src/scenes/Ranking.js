class Ranking extends Phaser.Scene {
    constructor() {
        super('Ranking');
    }

    preload() {
        this.load.text('ranking', './src/share/ranking.json');
    }

    init() {
        this.centroCanvas = {
            width: this.sys.game.config.width / 2,
            height: this.sys.game.config.height / 2
        };
        console.log('Scene Ranking');
        
    }
    
    create() {
        this.logo = this.add.image(50, 50, 'logo');
        this.menu = this.add.image(388, 50, 'menu').setInteractive();
        this.cabecera = this.add.container(0, 0);
        this.cabecera.add([
            this.logo,
            this.menu
        ]);

        this.menu.on(Phaser.Input.Events.POINTER_UP, () => {
            this.scene.start('Menu');
        });

        this.stars = this.add.image(this.centroCanvas.width, 120, 'stars');

        this.ranking = JSON.parse(this.cache.text.get('ranking'));
        console.log(this.ranking);

        this.ranking.ranking.forEach(element => {
            console.log(element.nombre);
            console.log(element.puntos);
        });

        this.pintaRanking();
    }

    pintaRanking() {
        this.container = document.createElement('div');

        this.ranking.ranking.forEach(element => {
            this.content = document.createElement('p');
            this.text = document.createTextNode(element.nombre + ': ' + element.puntos + ' pts');
            this.content.appendChild(this.text);
            this.container.appendChild(this.content);
        });

        this.styles = 'width: 400px; max-width: 100%; max-height: 550px; margin: 80px 20px 0 0; color: #fff; font-size: 36px; font-weight: bold; text-shadow: 1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;'
        this.content = this.add.dom(this.centroCanvas.width, this.centroCanvas.height, this.container, this.styles);
    }
}

export default Ranking;