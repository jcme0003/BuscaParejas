import options from "../share/options.js";

class Reload extends Phaser.Scene {
    constructor() {
        super('Reload');
    }

    init(){
        options.tablero = [
            [-1, -1, -1, -1],
            [-1, -1, -1, -1],
            [-1, -1, -1, -1],
            [-1, -1, -1, -1]
        ];
        this.scene.start('Play');
    }
}

export default Reload;