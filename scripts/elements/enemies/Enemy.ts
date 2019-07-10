export class Enemy extends Phaser.Sprite {

    private size: number;
    private speed: number;
    private movingRight: boolean;

    constructor(game: Phaser.Game, x: number, y: number, gravity, speed) {
        super(game, x, y, 'enemy1', 0);

        // attributes
        this.speed = speed;

        // sprite size
        this.size = 1.8;
        this.scale.setTo(this.size, this.size);

        // sprite anchor
        this.anchor.setTo(0.5, 0);
        this.animations.add('walk', [4, 3, 2, 3, 4, 1, 0, 1], 10, true);
        this.animations.play('walk');

        // physics
        this.game.physics.arcade.enableBody(this);
        this.body.setSize(21, 19, 0, 0);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = gravity;

        // initialize movement
        this.movingRight = true;

        game.add.existing(this);
    }

    public update() {
        this.body.velocity.x = 0;

        if (this.movingRight)
            this.moveRight();
        else
            this.moveLeft();

        if (this.body.blocked.right) {
            this.movingRight = false;
        }
        if (this.body.blocked.left) {
            this.movingRight = true;
        }
    }

    private moveRight() {
        this.body.velocity.x = this.speed;

        if (this.scale.x == -this.size) {
            this.scale.x = this.size;
        }
    }

    private moveLeft() {
        this.body.velocity.x = -this.speed;

        if (this.scale.x == this.size) {
            this.scale.x = -this.size;
        }
    }
}