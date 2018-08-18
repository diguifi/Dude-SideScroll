module Diguifi {

    export class Game{

        constructor() {
            this.game = new Phaser.Game(
                800, 400,
                Phaser.AUTO,
                'content',
                {
                    preload: this.preload,
                    create: this.create
                },
                false,
                false,
                Phaser.Physics.Arcade
            );
            this.game.state.add('Level1', Level1, false);
        }

        game: Phaser.Game;

        preload() {
            this.game.load.image('dude', 'assets/sprites/dudeD0.png?v=1');
            this.game.load.spritesheet('tiles_level1', 'assets/levels/level1tiles.png', 16, 16);
            this.game.load.tilemap('tileMap_level1', 'assets/levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            if (this.game.device.desktop) {
                this.game.scale.pageAlignHorizontally = true;
            }
            else {
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 200;
            this.game.stage.backgroundColor = "#a9f0ff";

            this.game.state.start('Level1');
        }
    }
}

window.onload = () => {

    var game = new Diguifi.Game();

};
