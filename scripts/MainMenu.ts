import { SoundManager } from './managers/SoundManager';

export class MainMenu extends Phaser.State {

    private logo: Phaser.Sprite;
    private startButton: Phaser.Button;
    private soundButton: Phaser.Button;
    private soundManager: SoundManager;
    private paralaxSpeed: number = 450;
    private paralax2: Phaser.TileSprite;
    private paralax3: Phaser.TileSprite;
    private paralax4: Phaser.TileSprite;
    private paralax5: Phaser.TileSprite;

    public create() {
        this.createParallax(450);

        this.logo = this.add.sprite(this.game.camera.width/2, -300, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.tint = 0x159b30;
        this.add.tween(this.logo).to({ y: 120 }, 1000, Phaser.Easing.Elastic.Out, true, 1000);

        this.startButton = this.game.add.button(this.game.camera.width/2 - 72, 275, 'buttonstart', this.fadeOut, this, 0, 0, 1, 0);
        this.startButton.scale.setTo(3);
        this.startButton.alpha = 0;
        this.add.tween(this.startButton).to({ alpha: 1 }, 1000, 'Linear', true);

        this.soundButton = this.game.add.button(this.game.camera.width/2 - this.game.camera.width/2.5, 350, 'buttonsound', this.toggleMusic, this);
        this.soundButton.scale.setTo(2);
        this.soundButton.onInputUp.add(this.btnSoundUp, this);
        this.soundButton.onInputDown.add(this.btnSoundDown, this);
        this.soundButton.alpha = 0;
        this.add.tween(this.soundButton).to({ alpha: 1 }, 1000, 'Linear', true);

        this.soundManager = new SoundManager(this.game);
    }

    public update() {
        this.paralax5.tilePosition.x -= this.paralaxSpeed / 1000;
        this.paralax4.tilePosition.x -= this.paralaxSpeed / 1875;
        this.paralax3.tilePosition.x -= this.paralaxSpeed / 6000;
        this.paralax2.tilePosition.x -= this.paralaxSpeed / 10000;
    }

    private fadeOut() {
        this.game.camera.fade(0x00000, 500);
        var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
        this.game.camera.onFadeComplete.add(this.startGame,this);
    }

    private btnSoundDown() {
        if(!this.soundManager.musicMuted) {
            this.soundButton.frame = 1;
        }
        else {
            this.soundButton.frame = 3;
        }
    }

    private btnSoundUp() {
        if(!this.soundManager.musicMuted) {
            this.soundButton.frame = 0;
        }
        else {
            this.soundButton.frame = 2;
        }
    }

    private toggleMusic() {
        if(!this.soundManager.musicMuted) {
            this.soundManager.music.pause();
            this.soundManager.musicMuted = true;
        }
        else {
            this.soundManager.music.play();
            this.soundManager.musicMuted = false;
        }
    }

    private createParallax(compensationHeight: number) {
        this.paralax2 = this.game.add.tileSprite(0,
            this.game.world.height - compensationHeight,
            this.game.world.width + 50,
            this.game.world.height + 100,
            'jungle_paralax2'
        );
        this.paralax2.tileScale.x = 2;
        this.paralax2.tileScale.y = 2;
        this.paralax3 = this.game.add.tileSprite(0,
            this.game.world.height - compensationHeight - 5,
            this.game.world.width + 50,
            this.game.world.height + 100,
            'jungle_paralax3'
        );
        this.paralax3.tileScale.x = 2;
        this.paralax3.tileScale.y = 2;
        this.paralax4 = this.game.add.tileSprite(0,
            this.game.world.height - compensationHeight - 20,
            this.game.world.width + 50,
            this.game.world.height + 100,
            'jungle_paralax4'
        );
        this.paralax4.tileScale.x = 2;
        this.paralax4.tileScale.y = 2;
        this.paralax5 = this.game.add.tileSprite(0,
            this.game.world.height - compensationHeight - 30,
            this.game.world.width + 50,
            this.game.world.height + 100,
            'jungle_paralax5'
        );
        this.paralax5.tileScale.x = 2;
        this.paralax5.tileScale.y = 2;
        this.paralax5.checkWorldBounds = true;
    }

    private startGame() {
        this.game.camera.onFadeComplete.removeAll();
        this.game.state.start('Cutscene1', true, false, this.soundManager, this);
    }

}