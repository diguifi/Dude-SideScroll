import { SoundManager } from '../../managers/SoundManager';
import { ControllerManager } from '../../managers/ControllerManager';
import { HangGlider } from '../items/HangGlider';

export class Player extends Phaser.Sprite {

    public hasShield: boolean;
    public hasHangGlider: boolean;
    public shieldMaxTime: number;
    public hangGliderMaxTime: number;
    public shieldTimer: Phaser.BitmapText;
    public hangGliderTimer: Phaser.BitmapText;
    public shieldSeconds: number;
    public hangGliderSeconds: number;
    public lastShieldSeconds: number;
    public lastHangGliderSeconds: number;
    public shieldSprite: Phaser.Sprite;
    public hangGliderSprite: Phaser.Sprite;
    public hangGliderReference: HangGlider;
    public hangGliderGravityFactor: number;
    public lightRadius: number;
    public defaultMaxLightRadius: number;
    public defaultMinLightRadius: number;
    public spawnX: number;
    public spawnY: number;
    public animSpeeds: number[];
    public controller: ControllerManager;
    public soundManager: SoundManager;
    public lives: number;
    public dead: boolean;
    public fadeComplete: boolean;
    public gems: number;
    public redGems: number;
    public size: number;
    public speed: number;
    public speedBonus: number;
    public jumpStrength: number;
    public jumpBonus: number;
    public jumping: boolean;
    public pressingUp: boolean;
    public running: boolean;
    public localGravity: number;
    public movingLeft: boolean;
    public movingRight: boolean;
    public playingOnDesktop: boolean;

    constructor(game: Phaser.Game, x: number, y: number, speed: number,
        gravity: number, gems: number, redGems:number, lives: number, soundManager: SoundManager) {
        super(game, x, y, 'dude', 0);

        this.gems = gems;
        this.redGems = redGems;
        this.lives = lives;

        // attributes
        this.spawnX = x;
        this.spawnY = y;
        this.playingOnDesktop = this.game.device.desktop;
        this.localGravity = gravity;
        this.speedBonus = 50;
        this.jumpBonus = 50;
        this.speed = speed;
        this.jumpStrength = gravity + (gravity * 0.4);
        this.jumping = false;
        this.pressingUp = false;
        this.dead = false;
        this.fadeComplete = false;
        this.defaultMaxLightRadius = 250;
        this.defaultMinLightRadius = 120;
        this.lightRadius = this.defaultMaxLightRadius;

        // shield attributes
        this.shieldMaxTime = 10;
        this.hangGliderMaxTime = 15;
        this.shieldSeconds = this.shieldMaxTime;
        this.hangGliderSeconds = this.hangGliderMaxTime;
        this.lastShieldSeconds = 0;
        this.lastHangGliderSeconds = 0;
        this.shieldTimer = this.game.add.bitmapText(this.x, this.y + 10, 'carrier_command', this.shieldSeconds.toString(), 12);
        this.shieldTimer.visible = false;
        this.hangGliderTimer = this.game.add.bitmapText(this.x, this.y + 10, 'carrier_command', this.hangGliderSeconds.toString(), 12);
        this.hangGliderTimer.visible = false;
        this.hasShield = false;
        this.hasHangGlider = false;
        this.shieldSprite = this.game.add.sprite(this.x, this.y + 10, 'shield');
        this.shieldSprite.scale.setTo(2, 2);
        this.shieldSprite.anchor.setTo(0.5, 0);
        this.shieldSprite.visible = false;
        this.hangGliderSprite = this.game.add.sprite(this.x, this.y + 10, 'hangglider');
        this.hangGliderSprite.scale.setTo(2, 2);
        this.hangGliderSprite.anchor.setTo(0.5, 0);
        this.hangGliderSprite.visible = false;
        this.hangGliderGravityFactor = 1.4;

        // sprite size
        this.size = 1.8;
        this.scale.setTo(this.size, this.size);

        // sprite anchor
        this.anchor.setTo(0.5, 0);
        this.animations.add('walk', [0, 1, 2, 3], 10, true);
        this.animations.add('damaged', [4, 5, 6, 7], 10, false);
        this.animSpeeds = [8, 13];

        // physics
        this.game.physics.arcade.enableBody(this);
        this.body.setSize(16, 21, 0, 0);
        this.body.collideWorldBounds = false;
        this.body.gravity.y = gravity;

        // controls
        this.controller = new ControllerManager(this, this.game);

        // sound
        this.soundManager = soundManager;

        game.add.existing(this);
    }

    public update() {
        this.body.velocity.x = 0;
        if (!this.dead) {
            if (this.movingRight) {
                this.moveRight();
            }
            else if (this.movingLeft) {
                this.moveLeft();
            }
            else {
                this.animations.frame = 0;
                this.animations.stop();
            }

            if (this.playingOnDesktop)
                this.controller.getKeyboardInput(this);
            
            if (this.jumping) {
                if (this.hasHangGlider) {
                    if (this.body.velocity.y > 0) {
                        this.body.gravity.y = -this.localGravity/this.hangGliderGravityFactor;
                    }
                }
                else {
                    if (this.body.velocity.y > 0) {
                        this.body.gravity.y = this.localGravity;
                    }
                }

                if (this.body.blocked.down) {
                    this.soundManager.fall.volume = 0.3;
                    this.soundManager.fall.play();
                    this.jumping = false;
                    this.body.gravity.y = this.localGravity;
                }
            }

            if (this.y > 450)
                this.playerDamage(this.soundManager);
                
            this.checkShield();
            this.checkHangGlider();
            this.applyHangGliderEffects();
        }
        else {
            if (this.fadeComplete)
            this.playerDamageEffects(this.soundManager);
        }
    }

    public updateLightRadius() {
        if (this.lightRadius > this.defaultMinLightRadius)
            this.lightRadius -= 0.2;
    }

    private applyHangGliderEffects() {
        if (this.jumping) {
            if (this.hasHangGlider) {
                this.animations.frame = 8;
                this.animations.stop();
                if (this.body.velocity.y > 0) {
                    this.body.gravity.y = -this.localGravity/this.hangGliderGravityFactor;
                }
            }
            else {
                this.body.gravity.y = this.localGravity;
            }
        }
        if (this.hasHangGlider) {
            let isGoingUp = this.body.velocity.y < 0;

            if (isGoingUp) {
                this.body.gravity.y = this.localGravity;
            }
            else {
                if (!this.body.blocked.down) {
                    this.animations.frame = 8;
                }
                this.body.gravity.y = -this.localGravity/this.hangGliderGravityFactor;
            }
        }
        else {
            this.body.gravity.y = this.localGravity;
        }
    }

    public removeShield() {
        if (this.shieldSeconds === 0) {
            this.hasShield = false;
            this.shieldSprite.visible = false;
            this.shieldTimer.visible = false;
            this.shieldSeconds = this.shieldMaxTime;
        }
        else {
            this.shieldSeconds--;
            this.shieldTimer.setText(this.shieldSeconds.toString());
        }
    }

    public removeHangGlider() {
        if (this.hangGliderSeconds === 0) {
            this.hasHangGlider = false;
            this.hangGliderSprite.visible = false;
            this.hangGliderTimer.visible = false;
            this.hangGliderSeconds = this.hangGliderMaxTime;

            this.hangGliderReference.caught = false;
        }
        else {
            this.hangGliderSeconds--;
            this.hangGliderTimer.setText(this.hangGliderSeconds.toString());
        }
    }

    public playerDamage(soundManager: SoundManager) {
        this.soundManager.damage.play();
        this.dead = true;
        this.body.enable = false;
        this.animations.play('damaged');
        this.game.camera.fade(0x00000, 500);
        this.game.camera.onFadeComplete.add(this.fadeCompleted,this);
    }

    private checkShield() {
        if (this.hasShield) {
            if (this.shieldSeconds !== this.lastShieldSeconds) {
                this.lastShieldSeconds = this.shieldSeconds;
                this.game.world.bringToTop(this.shieldSprite);
                this.shieldSprite.visible = true;
                this.shieldTimer.visible = true;
                this.game.time.events.add(1000, this.removeShield, this);
            }
            else {
                this.shieldSprite.x = this.x - 1 * this.shieldSprite.scale.x;
                this.shieldSprite.y = this.y + 10;
                this.shieldTimer.position.x = this.x + 22;
                this.shieldTimer.position.y = this.y + 2;
            }
        }
    }

    private checkHangGlider() {
        if (this.hasHangGlider) {
            if (this.hangGliderSeconds !== this.lastHangGliderSeconds) {
                this.lastHangGliderSeconds = this.hangGliderSeconds;
                this.game.world.bringToTop(this.hangGliderSprite);
                this.hangGliderSprite.visible = true;
                this.hangGliderTimer.visible = true;
                this.hangGliderReference.caught = true;
                this.game.time.events.add(1000, this.removeHangGlider, this);
            }
            else {
                this.hangGliderSprite.x = this.x + 10 * this.hangGliderSprite.scale.x;
                this.hangGliderSprite.y = this.y - 42;
                this.hangGliderTimer.position.x = this.x + 22;
                this.hangGliderTimer.position.y = this.y + 10;
            }
        }
    }

    private fadeCompleted(){
        this.fadeComplete = true;
    }

    private playerDamageEffects(soundManager: SoundManager) {
        this.game.camera.resetFX();
        this.body.enable = true;
        this.lives--;
        this.position.x = this.spawnX;
        this.position.y = this.spawnY;
        this.dead = false;
        this.lightRadius = this.defaultMaxLightRadius;

        if (this.lives < 0){
            this.soundManager.music.stop();
            this.soundManager = null;
            this.game.state.start('MainMenu');
        }
        this.fadeComplete = false;
    }

    public moveRight() {
        if (this.position.x < this.game.world.bounds.bottomRight.x) {
            if (this.running) {
                if (!this.hasHangGlider) {
                    this.animations.play('walk').speed = this.animSpeeds[1];
                }
                else {
                    if (this.body.blocked.down) {
                        this.animations.play('walk').speed = this.animSpeeds[1];
                    }
                }
                this.body.velocity.x = this.speed + this.speedBonus;
            }
            else {
                if (!this.hasHangGlider) {
                    this.animations.play('walk').speed = this.animSpeeds[0];
                }
                else {
                    if (this.body.blocked.down) {
                        this.animations.play('walk').speed = this.animSpeeds[0];
                    }
                }
                this.body.velocity.x = this.speed;
            }


            if (this.scale.x == -this.size) {
                this.scale.x = this.size;
                this.shieldSprite.scale.x = -2;
                this.hangGliderSprite.scale.x = 2;
            }
        }
        else {
            this.position.x = this.game.world.bounds.bottomRight.x - 0.1;
        }
            
    }

    public moveLeft() {
        if (this.position.x > 4) {
            if (this.running) {
                if (!this.hasHangGlider) {
                    this.animations.play('walk').speed = this.animSpeeds[1];
                }
                else {
                    if (this.body.blocked.down) {
                        this.animations.play('walk').speed = this.animSpeeds[1];
                    }
                }
                this.body.velocity.x = -this.speed - this.speedBonus;
            }
            else {
                if (!this.hasHangGlider) {
                    this.animations.play('walk').speed = this.animSpeeds[0];
                }
                else {
                    if (this.body.blocked.down) {
                        this.animations.play('walk').speed = this.animSpeeds[0];
                    }
                }
                this.body.velocity.x = -this.speed;
            }


            if (this.scale.x == this.size) {
                this.scale.x = -this.size;
                this.shieldSprite.scale.x = 2;
                this.hangGliderSprite.scale.x = -2;
            }
        }
        else {
            this.position.x = 4.1;
        }
    }

    public jump() {
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
                this.shieldSprite.scale.x = -2;
                this.hangGliderSprite.scale.x = 2;
            }
            else if (this.movingLeft) {
                this.scale.x = -this.size;
                this.shieldSprite.scale.x = 2;
                this.hangGliderSprite.scale.x = -2;
            }
        }
    }

    public fall() {
        if (this.jumping) {
            if (this.body.velocity.y < 0) {
                if (this.hasHangGlider) {
                    this.body.velocity.y = -this.body.velocity.y/10;
                }
                else {
                    this.body.velocity.y = -this.body.velocity.y/4;
                }
            }
        }
    }
}