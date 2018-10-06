module Diguifi {

    export class Player extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, speed, gravity) {
            super(game, x, y, 'dude', 0);

            this.gems = 0;
            this.lives = 3;

            // attributes
            this.playingOnDesktop = this.game.device.desktop;
            this.localGravity = gravity;
            this.speedBonus = 50;
            this.jumpBonus = 50;
            this.speed = speed;
            this.jumpStrength = gravity + (gravity * 0.4);
            this.jumping = false;

            // sprite size
            this.size = 1.8;
            this.scale.setTo(this.size, this.size);

            // sprite anchor
            this.anchor.setTo(0.5, 0);
            this.animations.add('walk', [0, 1, 2, 3], 10, true);
            this.animSpeeds = [8, 13];

            // physics
            this.game.physics.arcade.enableBody(this);
            this.body.collideWorldBounds = false;
            this.body.gravity.y = gravity;
            this.body.bounce.y = 0.2;

            this.controller = new ControllerManager(this, this.game);

            game.add.existing(this);
        }

        animSpeeds;
        controller;
        lives: number;
        gems: number;
        size: number;
        speed: number;
        speedBonus: number;
        jumpStrength: number;
        jumpBonus: number;
        jumping: boolean;
        running: boolean;
        localGravity: number;
        movingLeft: boolean;
        movingRight: boolean;
        playingOnDesktop: boolean;

        update() {
            this.body.velocity.x = 0;

            if (this.movingRight)
                this.moveRight();
            else if (this.movingLeft)
                this.moveLeft();
            else
                this.animations.frame = 0


            if (this.playingOnDesktop)
                this.controller.getKeyboardInput(this);

            if (this.jumping)
                if (this.body.blocked.down) {
                    this.jumping = false;
                }
        }

        moveRight() {
            if (this.position.x < this.game.world.bounds.bottomRight.x) {
                if (this.running) {
                    this.animations.play('walk').speed = this.animSpeeds[1];
                    this.body.velocity.x = this.speed + this.speedBonus;
                }
                else {
                    this.animations.play('walk').speed = this.animSpeeds[0];
                    this.body.velocity.x = this.speed;
                }


                if (this.scale.x == -this.size) {
                    this.scale.x = this.size;
                }
            }
            else {
                this.position.x = this.game.world.bounds.bottomRight.x - 0.1;
            }
            
        }

        moveLeft() {
            if (this.position.x > 4) {
                if (this.running) {
                    this.animations.play('walk').speed = this.animSpeeds[1];
                    this.body.velocity.x = -this.speed - this.speedBonus;
                }
                else {
                    this.animations.play('walk').speed = this.animSpeeds[0];
                    this.body.velocity.x = -this.speed;
                }


                if (this.scale.x == this.size) {
                    this.scale.x = -this.size;
                }
            }
            else {
                this.position.x = 4.1;
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
                this.body.blocked.down = false;

                if (this.movingRight) {
                    this.scale.x = this.size;
                }
                else if (this.movingLeft) {
                    this.scale.x = -this.size;
                }
            }
        }

        fall() {
            if (this.jumping) {
                this.jumping = false;

                if (this.body.velocity.y < 0)
                    this.body.velocity.y = -this.body.velocity.y/4;
            }
        }
    }
}