import { Player } from "./Player";

export class Bat extends Phaser.Sprite {

    constructor(game: Phaser.Game, x: number, y: number, 
        gravity: number, speed: number, player: Player) {
        super(game, x, y, 'bat', 0);

        // attributes
        this.speed = speed;
        this.player = player;
        this.fieldOfView = 200;

        // sprite size
        this.size = 2;
        this.scale.setTo(this.size, this.size);

        // sprite anchor
        this.anchor.setTo(0.5, 0);
        this.wakeAnim = this.animations.add('wake', [0, 1, 2, 3, 4], 8, false);
        this.flyAnim = this.animations.add('fly', [5, 6, 7, 8, 9], 8, true);
        this.wakeAnim.onComplete.add(this.startFly, this);
        this.isSleeping = true;
        this.isChasing = false;

        // physics
        this.game.physics.arcade.enableBody(this);
        this.body.setSize(16, 16, 0, 0);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = -gravity;

        // initialize movement
        this.movingRight = true;

        game.add.existing(this);
    }
        
    player: Player;
    flyAnim: Phaser.Animation;
    wakeAnim: Phaser.Animation;
    isSleeping: boolean;
    isChasing: boolean;
    fieldOfView: number;
    size: number;
    speed: number = 125;
    localGravity: number;
    movingLeft: boolean;
    movingRight: boolean;

    update() {
        this.body.velocity.x = 0;

        if (this.isSleeping) {
            if((this.player.position.x > this.position.x - this.fieldOfView &&
               this.player.position.x < this.position.x + this.fieldOfView) && 
               this.player.position.y < this.position.y + this.fieldOfView){
                this.wake();
            } 
        }

        if (this.isChasing) {
            this.chase();
        }
    }

    wake() {
        this.wakeAnim.play();
        this.isSleeping = false;
    }

    startFly() {
        this.flyAnim.play();
        this.isChasing = true;
    }

    chase() {
        this.game.physics.arcade.moveToObject(this, this.player, this.speed);

        if (this.body.velocity.x < 0) {
            if (this.scale.x == this.size) {
                this.scale.x = -this.size;
            }
        }
        else {
            if (this.scale.x == -this.size) {
                this.scale.x = this.size;
            }
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