module Diguifi {

    export class Level1 extends Phaser.State {

        music: Phaser.Sound;
        player: Diguifi.Player;
        map;
        layer;
        buttonjump;
        buttonfire;
        buttonright;
        buttonleft;

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

            if (!this.game.device.desktop)
                this.placeButtons(this.player);

        }

        update() {
            this.game.physics.arcade.collide(this.player, this.layer);
        }

        placeButtons(player) {
            this.buttonjump = this.game.add.button(600, 310, 'buttonjump', null, this, 0, 1, 0, 1);
            this.buttonjump.fixedToCamera = true;
            this.buttonjump.events.onInputDown.add(function () { player.jump(); });
            this.buttonjump.events.onInputUp.add(function () { false; });

            this.buttonfire = this.game.add.button(700, 310, 'buttonfire', null, this, 0, 1, 0, 1);
            this.buttonfire.fixedToCamera = true;
            this.buttonfire.events.onInputDown.add(function () { player.running = true; });
            this.buttonfire.events.onInputUp.add(function () { player.running = false; });

            this.buttonleft = this.game.add.button(0, 310, 'buttonhorizontal', null, this, 0, 1, 0, 1);
            this.buttonleft.fixedToCamera = true;
            this.buttonleft.events.onInputDown.add(function () { player.movingLeft = true; });
            this.buttonleft.events.onInputUp.add(function () { player.movingLeft = false; });

            this.buttonright = this.game.add.button(160, 310, 'buttonhorizontal', null, this, 0, 1, 0, 1);
            this.buttonright.fixedToCamera = true;
            this.buttonright.events.onInputDown.add(function () { player.movingRight = true; });
            this.buttonright.events.onInputUp.add(function () { player.movingRight = false; });
        }

    }

} 