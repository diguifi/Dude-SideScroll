import { SoundManager } from "./SoundManager";

export class MainMenu extends Phaser.State {

    logo: Phaser.Sprite;
    background: Phaser.Sprite;
    soundManager: SoundManager;

    create() {
        this.background = this.add.sprite(0, 0, 'titlepage');
        this.background.alpha = 0;

        this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);

        this.add.tween(this.logo).to({ y: 120 }, 1000, Phaser.Easing.Elastic.Out, true, 2000);
        this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);

        this.input.onDown.addOnce(this.fadeOut, this);

        this.soundManager = new SoundManager(this.game);
    }

    fadeOut() {

        this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);

        tween.onComplete.add(this.startGame, this);

    }

    startGame() {
        this.game.state.start('Level1', true, false, this.soundManager);
    }

}