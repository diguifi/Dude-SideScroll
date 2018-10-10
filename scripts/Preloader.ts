module Diguifi {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;
        background: Phaser.Sprite;
        ready: boolean = false;

        preload() {
            this.game.load.spritesheet('dude', 'assets/sprites/dude_spritesheet.png?v=1', 16, 25, 4);
            this.game.load.image('enemy1', 'assets/sprites/enemy.png?v=1');

            this.game.load.spritesheet('greygem', 'assets/sprites/itens/spr_coin_cin.png?v=1', 16, 16, 4);
            this.game.load.image('heart', 'assets/sprites/itens/heart.png');

            this.game.load.image('titlepage', 'assets/images/back.png');
            this.game.load.image('logo', 'assets/images/logo.png');

            this.game.load.image('hud', 'assets/images/hud.png');
            this.game.load.image('heart2', 'assets/images/heart.png');

            this.game.load.image('jungle_paralax5', 'assets/levels/jungle/plx-5.png');
            this.game.load.image('jungle_paralax4', 'assets/levels/jungle/plx-4.png');
            this.game.load.image('jungle_paralax3', 'assets/levels/jungle/plx-3.png');
            this.game.load.image('jungle_paralax2', 'assets/levels/jungle/plx-2.png');
            this.game.load.spritesheet('tiles_level1', 'assets/levels/jungle/jungle_tileset.png', 16, 16);
            this.game.load.tilemap('tileMap_level1', 'assets/levels/jungle1.json', null, Phaser.Tilemap.TILED_JSON);

            this.game.load.image('arrowkeys', 'assets/sprites/arrows.png');
            this.game.load.image('shift', 'assets/sprites/shift.png');

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