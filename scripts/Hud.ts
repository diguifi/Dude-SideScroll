import { Player } from "./Player";

export class Hud extends Phaser.Sprite {
    player: Player;
    lives: number;
    hearts: Phaser.Sprite[] = [];

    constructor(game: Phaser.Game, player: Player) {
        super(game, 0, 0, 'hud', 0);            

        this.fixedToCamera = true;

        this.player = player;

        this.lives = player.lives;

        this.fillLives();

        game.add.existing(this);
    }

    update() {
        if (this.lives != this.player.lives) {
            this.lives = this.player.lives;

            this.fillLives();
        }
    }

    fillLives() {
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
}
