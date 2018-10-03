module Diguifi {

    export class Hud extends Phaser.Sprite {
        player: Player;

        constructor(game: Phaser.Game, player: Player) {
            super(game, 0, 0, 'hud', 0);

            this.fixedToCamera = true;

            this.player = player;

            game.add.existing(this);
        }

        update() {

        }

        render() {
            this.game.debug.text("This is debug text", 200, 200);
            this.game.debug.geom(new Phaser.Rectangle(100, 100, 100, 100), 'rgba(255,0,0,1)');
            console.log("is it working?");
        }
    }
}