module Diguifi {

    export class Player extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'dude');

            this.scale.setTo(2, 2);

            this.game.physics.arcade.enableBody(this);
            this.body.collideWorldBounds = true;
            this.body.bounce.y = 0.2;

            this.anchor.setTo(0.5, 0);

            this.speed = 100;
            this.jumpStrength = 150;

            game.add.existing(this);
        }

        speed: number;
        jumpStrength: number;
        movingRight: boolean;
        jumping: boolean;

        update() {
            this.body.velocity.x = 0;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
                this.moveLeft();
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
                this.moveRight();

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
                this.jump();

            if (this.body.blocked.down)
                this.jumping = false;
        }

        moveRight() {
            this.body.velocity.x = this.speed;
            this.movingRight = true;

            if (this.scale.x == -2) {
                this.scale.x = 2;
            }
        }

        moveLeft() {
            this.body.velocity.x = -this.speed;
            this.movingRight = false;

            if (this.scale.x == 2) {
                this.scale.x = -2;
            }
        }

        jump() {
            if (!this.jumping) {
                this.body.velocity.y = -this.jumpStrength;
                this.jumping = true;

                if (this.movingRight) {
                    this.scale.x = 2;
                }
                else {
                    this.scale.x = -2;
                }
            }
        }
    }
}