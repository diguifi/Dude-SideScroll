export class Light extends Phaser.Sprite {
    public game: Phaser.Game;
    public name: string = 'light';
    public respawns: boolean = false;
    private size: number;

    constructor(game: Phaser.Game, x: number, y: number, gravity: number) {
        super(game, x, y, 'light', 0);
        this.game = game;

        // sprite size
        this.size = 2;
        this.scale.setTo(this.size, this.size);

        // animation
        this.frame = 0;
        this.animations.add('shine', [0, 1, 2, 3, 2, 1], 8, true);
        this.animations.play('shine');

        // sprite anchor
        this.anchor.setTo(0.5, 0);

        // physics
        this.game.physics.arcade.enableBody(this);
        this.body.setSize(12, 9, 0, 0);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = gravity;

        game.add.existing(this);
    }
}