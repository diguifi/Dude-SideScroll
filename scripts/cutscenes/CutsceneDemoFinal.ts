import { SoundManager } from '../managers/SoundManager';
import { LevelManager } from '../levels/LevelManager';
import { LevelBase } from '../levels/LevelBase';
import { Player } from '../elements/player/Player';

export class CutsceneDemoFinal extends Phaser.State {

    private lastPlayer: Player;
    private soundManager: SoundManager;
    private levelManager: LevelManager;
    private levelBase: LevelBase;
    private gemSprite: Phaser.Sprite;
    private redGemSprite: Phaser.Sprite;
    private demoMessage: Phaser.BitmapText;
    private gemsAmount: Phaser.BitmapText;
    private redGemsAmount: Phaser.BitmapText;
    private redGemsHint: Phaser.BitmapText;
    private redGemsHintText: string = '';
    private maxRedGems: number = 4;
    private maxGems: number = 55;
    private rateMessage: Phaser.BitmapText;
    private starButtons: Phaser.Button[] = [];
    private voted: boolean = false;

    public init(player: Player,
        soundManager: SoundManager,
        previousLevelBase: LevelBase,
        previousLevelManager: LevelManager) {
        this.lastPlayer = player;
        this.soundManager = soundManager;
        this.levelBase = previousLevelBase;
        player.destroy();

        previousLevelBase = null;
        previousLevelManager = null;
    }

    public create() {
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

        this.rateMessage = this.game.add.bitmapText(400, 350, 'carrier_command', 'Please rate this demo!', 9);
        this.rateMessage.anchor.x = 0.5;

        this.starButtons.push(this.game.add.button(400 - 80, 365, 'buttonstar', this.actionOnClick(1), this, 1, 0, 1));
        this.starButtons.push(this.game.add.button(400 - 48, 365, 'buttonstar', this.actionOnClick(2), this, 1, 0, 1));
        this.starButtons.push(this.game.add.button(400 - 16, 365, 'buttonstar', this.actionOnClick(3), this, 1, 0, 1));
        this.starButtons.push(this.game.add.button(400 + 16, 365, 'buttonstar', this.actionOnClick(4), this, 1, 0, 1));
        this.starButtons.push(this.game.add.button(400 + 48, 365, 'buttonstar', this.actionOnClick(5), this, 1, 0, 1));

        this.starButtons.forEach((button, index) => {
            button.scale.setTo(2);
            button.onInputOver.add(this.hoverStar(index), this);
            button.onInputOut.add(this.notHoveringStars, this);
        });

        this.game.time.events.add(Phaser.Timer.SECOND * 5, this.showMisteriousMessage, this);
    }

    private hoverStar(starIndex: number): Function {
        return function mouseOver() {
            this.starButtons.forEach((button, index) => {
                if (index <= starIndex)
                    button.frame = 1;
            });
        }
    }

    private notHoveringStars() {
        if (!this.voted) {
            this.starButtons.forEach((button, index) => {
                button.frame = 0;
            });
        }
    }

    private actionOnClick(index: number): Function {
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
                        xhttpPut.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                        xhttpPut.send(JSON.stringify({ 'notas': notas }));
                    }
                };
                xhttpGet.open('GET', 'https://www.jsonstore.io/16824c0f7a1696d7acfabe21392bd07d8afcc0ba76cb366ab189dfa94186dc08', true);
                xhttpGet.send();
            }
        };
    }

    private showMisteriousMessage() {
        this.game.time.events.removeAll();
        this.add.tween(this.redGemsHint).to({ alpha: 1 }, 1000, 'Linear', true);
    }

    private fadeOut() {
        this.game.camera.fade(0x00000, 500);
        this.game.camera.onFadeComplete.add(this.startGame,this);
    }

    private startGame() {
        this.soundManager.music.stop();
        this.soundManager.musicdemofinal.stop();
        this.soundManager = null;

        this.game.camera.onFadeComplete.removeAll();
        this.game.state.start('MainMenu', true, false);
    }
}