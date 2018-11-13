export class Torch extends Phaser.Sprite {
    game: Phaser.Game;
    light: Phaser.Sprite;
    lightSize: number = 8;
    size: number;
    shadowTexture: Phaser.BitmapData;
    lightSprite: Phaser.Image;

    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'torch', 0);
        this.game = game;

        // shadow setup
        this.shadowTexture = this.game.add.bitmapData(this.game.width + 100, this.game.height + 100);

        this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);

        this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
        // --------------

        // sprite size
        this.size = 2.5;
        this.scale.setTo(this.size, this.size);

        // animation
        this.frame = 3;
        this.animations.add('fire', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        this.animations.play('fire');

        // sprite anchor
        this.anchor.setTo(0.5, 0);

        game.add.existing(this);
    }

    update() {
        this.updateShadowTexture();
    }

    updateShadowTexture() {
        this.lightSprite.reset(this.game.camera.x, this.game.camera.y);

        this.shadowTexture.clear();
        this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10, 0.75)';
        this.shadowTexture.context.fillRect(-25, -25, this.game.width + 100, this.game.height + 100);

        var radius = 150 + this.game.rnd.integerInRange(1, 20),
        torchX = this.x - this.game.camera.x,
        torchY = this.y - this.game.camera.y;

        var gradient = this.shadowTexture.context.createRadialGradient(
            torchX, torchY, 100 * 0.75,
            torchX, torchY, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        this.shadowTexture.context.beginPath();
        this.shadowTexture.context.fillStyle = gradient;
        this.shadowTexture.context.arc(torchX, torchY, radius, 0, Math.PI * 2, false);
        this.shadowTexture.context.fill();

        this.shadowTexture.dirty = true;
    }
}