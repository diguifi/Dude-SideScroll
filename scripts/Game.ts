import { Preloader } from './Preloader';
import { MainMenu } from './MainMenu';
import { Cutscene1 } from './cutscenes/Cutscene1';
import { CutsceneDemoFinal } from './cutscenes/CutsceneDemoFinal';
import { Level1 } from './levels/Level1';
import { Level2 } from './levels/Level2';
import { Level3 } from './levels/Level3';
import { Level4 } from './levels/Level4';

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
        this.game.state.add('Cutscene1', Cutscene1, false);
        this.game.state.add('CutsceneDemoFinal', CutsceneDemoFinal, false);
        this.game.state.add('Level1', Level1, false);
        this.game.state.add('Level2', Level2, false);
        this.game.state.add('Level3', Level3, false);
        this.game.state.add('Level4', Level4, false);
    }

    game: Phaser.Game;

    private preload() {
        this.game.time.advancedTiming = true;
    }

    private create() {
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
        this.game.stage.backgroundColor = '#aedecb';

        this.game.state.start('Preloader');
    }
}


window.onload = () => {
    var game = new Game();
};
