import { SoundManager } from "./SoundManager";

export class MainMenu extends Phaser.State {

    logo: Phaser.Sprite;
    soundManager: SoundManager;
    paralaxSpeed: number = 450;
    paralax2: Phaser.TileSprite;
    paralax3: Phaser.TileSprite;
    paralax4: Phaser.TileSprite;
    paralax5: Phaser.TileSprite;

    create() {
        this.createParallax(450);

        this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.tint = 0xffffff;

        this.add.tween(this.logo).to({ y: 120 }, 1000, Phaser.Easing.Elastic.Out, true, 2000);

        this.input.onDown.addOnce(this.fadeOut, this);

        this.soundManager = new SoundManager(this.game);
    }

    update() {
        this.paralax5.tilePosition.x -= this.paralaxSpeed / 1000;
        this.paralax4.tilePosition.x -= this.paralaxSpeed / 1875;
        this.paralax3.tilePosition.x -= this.paralaxSpeed / 6000;
        this.paralax2.tilePosition.x -= this.paralaxSpeed / 10000;
    }

    fadeOut() {
        this.game.camera.fade(0x00000, 500);
        var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
        this.game.camera.onFadeComplete.add(this.startGame,this);
    }

    public createParallax(compensationHeight: number) {
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

    render() {
        this.game.debug.text("Click to start", 345, 370);
    }

    startGame() {
        this.game.camera.onFadeComplete.removeAll();
        this.game.state.start('Cutscene1', true, false, this.soundManager);
    }

}