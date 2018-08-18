module Diguifi {

    export class Level1 extends Phaser.State {

        music: Phaser.Sound;
        player: Diguifi.Player;
        map;
        layer;

        create() {

            this.map = this.game.add.tilemap('tileMap_level1');
            this.map.addTilesetImage('tiles', 'tiles_level1');
            this.map.setCollisionBetween(3, 12, true, 'solid');

            this.map.createLayer('background');

            this.layer = this.map.createLayer('solid');
            this.layer.setScale(2);
            this.layer.resizeWorld();

            this.player = new Diguifi.Player(this.game, 5, 284, 150, 200);
            this.game.camera.follow(this.player);

        }

        update() {
            this.game.physics.arcade.collide(this.player, this.layer);
        }

    }

} 