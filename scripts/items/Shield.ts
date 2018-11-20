export class Shield extends Phaser.Sprite {
    game: Phaser.Game;
    light: Phaser.Sprite;
    lightSize: number = 8;
    size: number;
    shadowTexture: Phaser.BitmapData;
    lightSprite: Phaser.Image;

    constructor(game: Phaser.Game, x: number, y: number, gravity: number) {
        super(game, x, y, 'shield', 0);
        this.game = game;

        // sprite size
        this.size = 2;
        this.scale.setTo(this.size, this.size);

        // animation
        this.frame = 3;
        this.animations.add('shine', [0, 0, 0, 0, 0, 0, 0,
                                      0, 0, 0, 0, 1, 2, 3,
                                      4, 5, 4, 3, 2, 1, 0], 15, true);
        this.animations.play('shine');

        // sprite anchor
        this.anchor.setTo(0.5, 0);

        // physics
        this.game.physics.arcade.enableBody(this);
        this.body.setSize(16, 12, 0, 0);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = gravity;

        game.add.existing(this);
    }

    update() {
        
    }
}