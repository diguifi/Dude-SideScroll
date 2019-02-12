import { SoundManager } from "../managers/SoundManager";
import { LevelManager } from "../levels/LevelManager";
import { LevelBase } from "../levels/LevelBase";
import { Player } from "../elements/player/Player";

export class CutsceneDemoFinal extends Phaser.State {

    lastPlayer: Player;
    soundManager: SoundManager;
    levelManager: LevelManager;
    levelBase: LevelBase;
    gemSprite: Phaser.Sprite;
    redGemSprite: Phaser.Sprite;
    clickToRestart: Phaser.BitmapText;
    demoMessage: Phaser.BitmapText;
    gemsAmount: Phaser.BitmapText;
    redGemsAmount: Phaser.BitmapText;
    redGemsHint: Phaser.BitmapText;
    redGemsHintText: string = '';
    maxRedGems: number = 4;
    maxGems: number = 55;

    init(player: Player, soundManager: SoundManager,
        previousLevelBase: LevelBase, previousLevelManager: LevelManager) {
        this.lastPlayer = player;
        this.soundManager = soundManager;
        this.levelBase = previousLevelBase;
        player.destroy();

        previousLevelBase = null;
        previousLevelManager = null;
    }

    create() {
        this.levelManager = new LevelManager(this.game, this.levelBase, 'Level1', this.soundManager);

        this.input.onDown.addOnce(this.fadeOut, this);

        this.levelManager.createParallax(450);
        this.lastPlayer.bringToTop();

        this.gemSprite = this.game.add.sprite(200, 170, 'greygem');
        this.gemSprite.scale.set(3);
        this.redGemSprite = this.game.add.sprite(500, 170, 'redgem');
        this.redGemSprite.scale.set(3);

        this.gemsAmount = this.game.add.bitmapText(250, 185, 'carrier_command', 
            this.lastPlayer.gems.toString() + '/' + this.maxGems, 20);
        this.gemsAmount = this.game.add.bitmapText(550, 185, 'carrier_command', 
            this.lastPlayer.redGems.toString() + '/' + this.maxRedGems, 20);

        if (this.maxRedGems == this.lastPlayer.redGems) {
            this.redGemsHintText = 'Mysterious voice says: \n\n\t' +
            '"You ve gathered all of them so far, thank you ...\n\n\t\t...my hero."' +
            '\n\n\n\n            (remember this on the full game)'
        } else {
            this.redGemsHintText = 'Mysterious voice says: "Bring me the gems..."'
        }

        this.clickToRestart = this.game.add.bitmapText(400, 15, 'carrier_command', 'Click to restart', 9);
        this.clickToRestart.anchor.x = 0.5;
        this.demoMessage = this.game.add.bitmapText(400, 55, 'carrier_command',
         '  You have completed the Demo!\n\nThank you very much for playing!', 
         14);
        this.demoMessage.anchor.x = 0.5;
        this.redGemsHint = this.game.add.bitmapText(400, 300, 'carrier_command', this.redGemsHintText, 9);
        this.redGemsHint.anchor.x = 0.5;
        this.redGemsHint.alpha = 0;

        this.game.time.events.add(Phaser.Timer.SECOND * 5, this.showMisteriousMessage, this);
    }

    showMisteriousMessage() {
        this.game.time.events.removeAll();
        this.add.tween(this.redGemsHint).to({ alpha: 1 }, 1000, "Linear", true);
    }

    fadeOut() {
        this.game.camera.fade(0x00000, 500);
        this.game.camera.onFadeComplete.add(this.startGame,this);
    }

    startGame() {
        this.soundManager.music.stop();
        this.soundManager = null;

        this.game.camera.onFadeComplete.removeAll();
        this.game.state.start('MainMenu', true, false);
    }

}