module Diguifi {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;
        background: Phaser.Sprite;
        ready: boolean = false;

        preload() {
            this.game.load.spritesheet('dude', 'assets/sprites/dude_spritesheet.png?v=1', 16, 25, 4);
            this.game.load.image('enemy1', 'assets/sprites/enemy.png?v=1');

            this.game.load.image('titlepage', 'assets/images/back.png');
            this.game.load.image('logo', 'assets/images/logo.png');

            this.game.load.spritesheet('tiles_level1', 'assets/levels/level1tiles.png', 16, 16);
            this.game.load.tilemap('tileMap_level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);

            this.game.load.spritesheet('buttonvertical', 'assets/buttons/button-vertical.png', 64, 64);
            this.game.load.spritesheet('buttonhorizontal', 'assets/buttons/button-horizontal.png', 96, 64);
            this.game.load.spritesheet('buttondiagonal', 'assets/buttons/button-diagonal.png', 64, 64);
            this.game.load.spritesheet('buttonfire', 'assets/buttons/button-round-a.png', 96, 96);
            this.game.load.spritesheet('buttonjump', 'assets/buttons/button-round-b.png', 96, 96);
        }

        create() {
            this.game.state.start('MainMenu');
        }
    }
}