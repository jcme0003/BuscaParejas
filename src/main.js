const config = {
    title: 'Busca parejas - Mejora tu memoria',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'contenedor',
        width: 180,
        height: 320,
    },
    url: 'https://urldeejemplo.com',
    version: '0.0.1',
    type: Phaser.AUTO,
    backgroundColor: '#6F82ED'
};

const game = new Phaser.Game(config);