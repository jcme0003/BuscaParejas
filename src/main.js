import Bootloader from './scenes/Bootloader.js';
import Preload from './scenes/Preload.js';
import Menu from './scenes/Menu.js';
import Play from './scenes/Play.js';
import Reload from './scenes/Reload.js';
import Ranking from './scenes/Ranking.js';

const config = {
    title: 'Busca parejas - Mejora tu memoria',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'contenedor',
        width: 438,
        height: 657
    },
    url: 'https://github.com/jcme0003/BuscaParejas',
    version: '0.0.1',
    type: Phaser.AUTO,
    backgroundColor: '#5ed5fb',
    dom: {
        createContainer: true
    },
    scene: [Bootloader, Preload, Menu, Play, Reload, Ranking]
};

const game = new Phaser.Game(config);