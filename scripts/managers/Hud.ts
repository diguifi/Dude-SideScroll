import { Player } from '../elements/player/Player';

export class Hud extends Phaser.Sprite {
    private player: Player;
    private lives: number;
    private hearts: Phaser.Sprite[] = [];
    private gemsFontSize: number = 16;
    private redGemsFontSize: number = 16;
    private hudGemsText: Phaser.BitmapText;
    private hudRedGemsText: Phaser.BitmapText;

    constructor(game: Phaser.Game, player: Player) {
        super(game, 0, 0, 'hud', 0);            

        this.fixedToCamera = true;
        this.player = player;
        this.lives = player.lives;

        this.adjustFontSize();

        this.hudGemsText = game.add.bitmapText(672, 29, 'carrier_command', this.player.gems.toString(), this.gemsFontSize);
        this.hudRedGemsText = game.add.bitmapText(572, 29, 'carrier_command', this.player.redGems.toString(), this.redGemsFontSize);
        this.addChild(this.hudGemsText);
        this.addChild(this.hudRedGemsText);

        this.fillLives();

        game.add.existing(this);
    }

    public update() {
        this.hudGemsText.setText(this.player.gems.toString());
        this.hudRedGemsText.setText(this.player.redGems.toString());
        this.adjustFontSize();

        if (this.lives != this.player.lives) {
            this.lives = this.player.lives;

            this.fillLives();
        }
    }

    public fillLives() {
        this.hearts.forEach(function (heart) {
            heart.destroy();
        });

        this.hearts = [];

        for (var i = 0; i < this.lives; i++)
            this.hearts.push(this.game.add.sprite(35 * i + 30, 23, 'heart2'));

        this.hearts.forEach(function (heart) {
            heart.fixedToCamera = true;
        });
    }

    public adjustFontSize() {
        if(this.player.gems >= 100){
            this.gemsFontSize = 12;
            this.hudGemsText.fontSize = 12;
        }
        if(this.player.redGems >= 100){
            this.redGemsFontSize = 12;
            this.hudRedGemsText.fontSize = 12;
        }
    }
}
