module Diguifi {

    export class Enemy extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, gravity, speed) {
            super(game, x, y, 'enemy1', 0);

            // attributes
            this.localGravity = 200;
            this.speed = speed;

            // sprite size
            this.size = 1.8;
            this.scale.setTo(this.size, this.size);

            // sprite anchor
            this.anchor.setTo(0.5, 0);

            // physics
            this.game.physics.arcade.enableBody(this);
            this.body.collideWorldBounds = true;
            this.body.gravity.y = gravity;

            // initialize movement
            this.movingRight = true;

            game.add.existing(this);
        }
        
        size: number;
        speed: number;
        localGravity: number;
        movingLeft: boolean;
        movingRight: boolean;

        update() {
            this.body.velocity.x = 0;

            if (this.movingRight)
                this.moveRight();
            else if (this.movingLeft)
                this.moveLeft();

            if (this.body.blocked.right) {
                this.movingRight = false;
                this.movingLeft = true;
            }
            if (this.body.blocked.left) {
                this.movingRight = true;
                this.movingLeft = false;
            }
        }

        moveRight() {
            this.body.velocity.x = this.speed;

            if (this.scale.x == -this.size) {
                this.scale.x = this.size;
            }
        }

        moveLeft() {
            this.body.velocity.x = -this.speed;

            if (this.scale.x == this.size) {
                this.scale.x = -this.size;
            }
        }
    }
}