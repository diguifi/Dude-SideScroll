module Diguifi {

    export class Player extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'dude');

            this.game.physics.arcade.enableBody(this);

            this.anchor.setTo(0.5, 0);

            game.add.existing(this);
        }

        speed: 10;

        update() {
            this.body.velocity.x = 0;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

                this.body.velocity.x = -150;

                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

                this.body.velocity.x = 150;

                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
        }
    }
}