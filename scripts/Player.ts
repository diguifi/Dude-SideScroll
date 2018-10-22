module Diguifi {

    export class Player extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, speed: number,
            gravity: number, gems: number, lives: number, soundManager: SoundManager) {
            super(game, x, y, 'dude', 0);

            this.gems = gems;
            this.lives = lives;

            // attributes
            this.playingOnDesktop = this.game.device.desktop;
            this.localGravity = gravity;
            this.speedBonus = 50;
            this.jumpBonus = 50;
            this.speed = speed;
            this.jumpStrength = gravity + (gravity * 0.4);
            this.jumping = false;
            this.pressingUp = false;

            // sprite size
            this.size = 1.8;
            this.scale.setTo(this.size, this.size);

            // sprite anchor
            this.anchor.setTo(0.5, 0);
            this.animations.add('walk', [0, 1, 2, 3], 10, true);
            this.animSpeeds = [8, 13];

            // physics
            this.game.physics.arcade.enableBody(this);
            this.body.setSize(16, 21, 0, 0);
            this.body.collideWorldBounds = false;
            this.body.gravity.y = gravity;
            this.body.bounce.y = 0.2;

            // controls
            this.controller = new ControllerManager(this, this.game);

            // sound
            this.soundManager = soundManager;

            game.add.existing(this);
        }

        animSpeeds;
        controller;
        soundManager: SoundManager;
        lives: number;
        gems: number;
        size: number;
        speed: number;
        speedBonus: number;
        jumpStrength: number;
        jumpBonus: number;
        jumping: boolean;
        pressingUp: boolean;
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

            if (this.jumping) {
                if (this.body.blocked.down) {
                    this.soundManager.fall.volume = 0.3;
                    this.soundManager.fall.play();
                    this.jumping = false;
                }
            }

            if (this.y > 450)
                this.playerDamage();
        }

        public playerDamage() {
            this.soundManager.damage.play();
            this.lives--;
            this.position.x = 10;
            this.position.y = 300;
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

                this.soundManager.jump.play();
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
                if (this.body.velocity.y < 0)
                    this.body.velocity.y = -this.body.velocity.y/4;
            }
        }
    }
}