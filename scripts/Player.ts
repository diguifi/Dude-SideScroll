module Diguifi {

    export class Player extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, speed, gravity) {
            super(game, x, y, 'dude');

            // attributes
            this.localGravity = gravity;
            this.speedBonus = 50;
            this.jumpBonus = 50;
            this.speed = speed;
            this.jumpStrength = gravity + (gravity * 0.4);

            // sprite size
            this.size = 0.15;
            this.scale.setTo(this.size, this.size);

            // sprite anchor
            this.anchor.setTo(0.5, 0);

            // physics
            this.game.physics.arcade.enableBody(this);
            this.body.collideWorldBounds = true;
            this.body.gravity.y = gravity;
            this.body.bounce.y = 0.2;

            game.add.existing(this);
        }

        size: number;
        speed: number;
        speedBonus: number;
        jumpStrength: number;
        jumpBonus: number;
        movingRight: boolean;
        jumping: boolean;
        running: boolean;
        localGravity: number;

        update() {
            this.body.velocity.x = 0;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
                this.running = true;
            else
                this.running = false;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
                this.moveLeft();
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
                this.moveRight();

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
                this.jump();

            if(this.jumping)
                if (this.body.blocked.down)
                    this.jumping = false;
        }

        moveRight() {
            if (this.running)
                this.body.velocity.x = this.speed + this.speedBonus;
            else
                this.body.velocity.x = this.speed;


            this.movingRight = true;
            if (this.scale.x == -this.size) {
                this.scale.x = this.size;
            }
        }

        moveLeft() {
            if (this.running)
                this.body.velocity.x = -this.speed - this.speedBonus;
            else
                this.body.velocity.x = -this.speed;


            this.movingRight = false;
            if (this.scale.x == this.size) {
                this.scale.x = -this.size;
            }
        }

        jump() {
            if (!this.jumping) {
                if (this.running)
                    if (this.body.velocity.x != 0)
                        this.body.velocity.y = -this.jumpStrength - this.jumpBonus;
                    else
                        this.body.velocity.y = -this.jumpStrength;
                else
                    this.body.velocity.y = -this.jumpStrength;

                
                this.jumping = true;

                if (this.movingRight) {
                    this.scale.x = this.size;
                }
                else {
                    this.scale.x = -this.size;
                }
            }
        }
    }
}