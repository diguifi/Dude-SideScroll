export class Lever extends Phaser.Sprite {
    game: Phaser.Game;
    active: boolean;
    size: number;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'lever', 0);
        this.game = game;

        // sprite size
        this.size = 2;
        this.scale.setTo(this.size, this.size);

        // sprite anchor
        this.anchor.setTo(0.5, 0);

        game.add.existing(this);
    }

    update() {
    }
}