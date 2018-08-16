module Diguifi {

    export class Game{

        constructor() {
            this.game = new Phaser.Game(
                800, 600,
                Phaser.AUTO,
                'content',
                {
                    preload: this.preload,
                    create: this.create
                },
                false,
                true,
                Phaser.Physics.Arcade
            );
        }

        game: Phaser.Game;
        player: Diguifi.Player;

        preload() {
            this.game.load.image('dude', 'assets/sprites/dudeD0.png');
        }

        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 200;
            this.game.stage.backgroundColor = "#a9f0ff";

            this.player = new Diguifi.Player(this.game, 130, 284);
        }
    }
}

window.onload = () => {

    var game = new Diguifi.Game();

};
