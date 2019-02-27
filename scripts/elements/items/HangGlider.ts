export class HangGlider extends Phaser.Sprite {
    game: Phaser.Game;
    size: number;
    caught: boolean = false;
    name: string = 'hangglider';

    constructor(game: Phaser.Game, x: number, y: number, gravity: number) {
        super(game, x, y, 'hangglider', 0);
        this.game = game;

        // sprite size
        this.size = 2;
        this.scale.setTo(this.size, this.size);

        // sprite anchor
        this.anchor.setTo(0.5, 0);

        // physics
        this.game.physics.arcade.enableBody(this);
        this.body.setSize(30, 26, 0, 0);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = gravity;

        game.add.existing(this);
    }

    update() {
        if (this.caught) {
            this.body.enable = false;
            this.visible = false;
        }
        else {
            this.body.enable = true;
            this.visible = true;
        }
    }
}