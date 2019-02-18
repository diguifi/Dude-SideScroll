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
    demoMessage: Phaser.BitmapText;
    gemsAmount: Phaser.BitmapText;
    redGemsAmount: Phaser.BitmapText;
    redGemsHint: Phaser.BitmapText;
    redGemsHintText: string = '';
    maxRedGems: number = 4;
    maxGems: number = 55;
    rateMessage: Phaser.BitmapText;
    starButtons: Phaser.Button[] = [];
    voted: boolean = false;

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
        this.soundManager.music.stop();
        this.soundManager.musicdemofinal.loop = true;
        this.soundManager.musicdemofinal.play();

        this.levelManager = new LevelManager(this.game, this.levelBase, 'Level1', this.soundManager);

        this.levelManager.createParallax(450);
        this.lastPlayer.bringToTop();

        this.gemSprite = this.game.add.sprite(200, 120, 'greygem');
        this.gemSprite.scale.set(3);
        this.redGemSprite = this.game.add.sprite(500, 120, 'redgem');
        this.redGemSprite.scale.set(3);

        this.gemsAmount = this.game.add.bitmapText(250, 135, 'carrier_command', 
            this.lastPlayer.gems.toString() + '/' + this.maxGems, 20);
        this.gemsAmount = this.game.add.bitmapText(550, 135, 'carrier_command', 
            this.lastPlayer.redGems.toString() + '/' + this.maxRedGems, 20);

        if (this.maxRedGems == this.lastPlayer.redGems) {
            this.redGemsHintText = 'Mysterious voice says: \n\n\t' +
            '"You ve gathered all of them so far, thank you ...\n\n\t\t...my hero."' +
            '\n\n\n\n            (remember this on the full game)'
        } else {
            this.redGemsHintText = 'Mysterious voice says: "Bring me the gems..."'
        }

        this.demoMessage = this.game.add.bitmapText(400, 45, 'carrier_command',
         '  You have completed the Demo!\n\nThank you very much for playing!', 
         14);
        this.demoMessage.anchor.x = 0.5;
        this.redGemsHint = this.game.add.bitmapText(400, 200, 'carrier_command', this.redGemsHintText, 9);
        this.redGemsHint.anchor.x = 0.5;
        this.redGemsHint.alpha = 0;

        this.rateMessage = this.game.add.bitmapText(this.game.world.centerX, 350, 'carrier_command', 'Please rate this demo!', 9);
        this.rateMessage.anchor.x = 0.5;

        this.starButtons.push(this.game.add.button(this.game.world.centerX - 80, 365, 'buttonstar', this.actionOnClick(1), this, 1, 0, 1));
        this.starButtons.push(this.game.add.button(this.game.world.centerX - 48, 365, 'buttonstar', this.actionOnClick(2), this, 1, 0, 1));
        this.starButtons.push(this.game.add.button(this.game.world.centerX - 16, 365, 'buttonstar', this.actionOnClick(3), this, 1, 0, 1));
        this.starButtons.push(this.game.add.button(this.game.world.centerX + 16, 365, 'buttonstar', this.actionOnClick(4), this, 1, 0, 1));
        this.starButtons.push(this.game.add.button(this.game.world.centerX + 48, 365, 'buttonstar', this.actionOnClick(5), this, 1, 0, 1));

        this.starButtons.forEach((button, index) => {
            button.scale.setTo(2);
            button.onInputOver.add(this.hoverStar(index), this);
            button.onInputOut.add(this.notHoveringStars, this);
        });

        this.game.time.events.add(Phaser.Timer.SECOND * 5, this.showMisteriousMessage, this);
    }

    hoverStar(starIndex: number): Function {
        return function mouseOver() {
            this.starButtons.forEach((button, index) => {
                if (index <= starIndex)
                    button.frame = 1;
            });
        }
    }

    notHoveringStars() {
        if (!this.voted) {
            this.starButtons.forEach((button, index) => {
                button.frame = 0;
            });
        }
    }

    actionOnClick(index: number): Function {
        return function castVote() {
            if (!this.voted) {
                this.voted = true;
                this.rateMessage.setText('Thank you for rating!');
                this.starButtons.forEach(button => {
                    button.destroy();
                });

                let xhttpPut = new XMLHttpRequest();
                xhttpPut.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log('Success');
                    }
                };

                let xhttpGet = new XMLHttpRequest();
                xhttpGet.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        let notas = JSON.parse(this.responseText).result.notas;
                        notas.push(index);

                        xhttpPut.open('PUT', 'https://www.jsonstore.io/16824c0f7a1696d7acfabe21392bd07d8afcc0ba76cb366ab189dfa94186dc08', true);
                        xhttpPut.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                        xhttpPut.send(JSON.stringify({ "notas": notas }));
                    }
                };

                xhttpGet.open('GET', 'https://www.jsonstore.io/16824c0f7a1696d7acfabe21392bd07d8afcc0ba76cb366ab189dfa94186dc08', true);
                xhttpGet.send();
            }
        };
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
        this.soundManager.musicdemofinal.stop();
        this.soundManager = null;

        this.game.camera.onFadeComplete.removeAll();
        this.game.state.start('MainMenu', true, false);
    }

}