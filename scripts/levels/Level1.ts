module Diguifi {

    export class Level1 extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: Diguifi.Player;

        create() {

            this.background = this.add.sprite(0, 0, 'level1');

            this.player = new Diguifi.Player(this.game, 130, 284, 150, 200);

        }

    }

} 