module Diguifi {

    export class Game{

        constructor() {
            this.game = new Phaser.Game(
                800, 400,
                Phaser.CANVAS,
                'content',
                {
                    preload: this.preload,
                    create: this.create
                },
                false,
                false,
                Phaser.Physics.Arcade
            );
            this.game.state.add('Preloader', Preloader, false);
            this.game.state.add('MainMenu', MainMenu, false);
            this.game.state.add('Level1', Level1, false);
        }

        game: Phaser.Game;

        preload() {
            
        }

        create() {
            this.game.time.desiredFps = 60;
            this.game.renderer.renderSession.roundPixels = true;

            if (this.game.device.desktop) {
                this.game.scale.pageAlignHorizontally = true;
            }
            else {
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 200;
            this.game.stage.backgroundColor = "#4286f4";

            this.game.state.start('Preloader');
        }
    }
}

window.onload = () => {

    var game = new Diguifi.Game();

};
