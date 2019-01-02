import { SoundManager } from "../../managers/SoundManager";
import { ControllerManager } from "../../managers/ControllerManager";

export class Player extends Phaser.Sprite {

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

        // shield attributes
        this.shieldMaxTime = 10;
        this.shieldSeconds = this.shieldMaxTime;
        this.lastShieldSeconds = 0;
        this.shieldTimer = this.game.add.bitmapText(this.x, this.y + 10, 'carrier_command', this.shieldSeconds.toString(), 12);
        this.shieldTimer.visible = false;
        this.hasShield = false;
        this.shieldSprite = this.game.add.sprite(this.x, this.y + 10, 'shield');
        this.shieldSprite.scale.setTo(2, 2);
        this.shieldSprite.anchor.setTo(0.5, 0);
        this.shieldSprite.visible = false;

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
        this.body.bounce.y = 0.2;

        // controls
        this.controller = new ControllerManager(this, this.game);

        // sound
        this.soundManager = soundManager;

        game.add.existing(this);
    }

    hasShield: boolean;
    shieldMaxTime: number;
    shieldTimer: Phaser.BitmapText;
    shieldSeconds: number;
    lastShieldSeconds: number;
    shieldSprite: Phaser.Sprite;
    spawnX: number;
    spawnY: number;
    animSpeeds;
    controller: ControllerManager;
    soundManager: SoundManager;
    lives: number;
    dead: boolean;
    fadeComplete: boolean;
    gems: number;
    redGems: number;
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
        if (!this.dead){
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
                this.playerDamage(this.soundManager);

            this.checkShield();
        }
        else {
            if (this.fadeComplete)
            this.playerDamageEffects(this.soundManager);
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

        if (this.lives < 0){
            this.soundManager.music.stop();
            this.soundManager = null;
            this.game.state.start('MainMenu');
        }
        this.fadeComplete = false;
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
                this.shieldSprite.scale.x = -2;
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
                this.shieldSprite.scale.x = 2;
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
                this.shieldSprite.scale.x = -2;
            }
            else if (this.movingLeft) {
                this.scale.x = -this.size;
                this.shieldSprite.scale.x = 2;
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