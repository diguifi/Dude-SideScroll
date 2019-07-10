import { SoundManager } from '../managers/SoundManager';
import { LevelManager } from '../levels/LevelManager';
import { LevelBase } from '../levels/LevelBase';

export class Cutscene1 extends Phaser.State {

    private soundManager: SoundManager;
    private levelManager: LevelManager;
    private levelBase: LevelBase;
    private dudeSprite: Phaser.Sprite;
    private index: number = 0;
    private clickToSkip: Phaser.BitmapText;
    private narratorPhrase: Phaser.BitmapText;
    private narratorLines: string[] = [
        ' ',
        'This is Dude',
        ' ',
        'he has the most generic name ever',
        ' ',
        'yet he is a very happy dude',
        'he lives in a land ruled by a king',
        'and his daughter, the princess... Princess.',
        ' ',
        'Yes, the name of the princess is "Princess"',
        ' ',
        'One day...',
        ' ',
        'Yes she was kidnapped',
        'By an evil goblin!',
        'Immeditialy, Dude presented himself to rescue her',
        'and save the kingdom once and for all!',
        ' ',
    ];
    private dudePhrase: Phaser.BitmapText;
    private dudeLines: string[] = [
        ' ',
        ' ',
        'sup',
        ' ',
        'Thanks',
        ' ',
        ' ',
        ' ',
        'wtf, her name is "Princess"?!',
        ' ',
        'jesus, you suck at names',
        ' ',
        'Let me guess, she was kidnapped',
        ' ',
        ' ',
        ' ',
        ' ',
        'Let\'s do this!',
    ];

    public init(soundManager: SoundManager, mainMenu: any) {
        this.soundManager = soundManager;
        mainMenu = null;
    }

    public create() {
        this.levelBase = new LevelBase();
        this.levelManager = new LevelManager(this.game, this.levelBase, 'Level1', this.soundManager);

        this.input.onDown.addOnce(this.fadeOut, this);

        this.levelManager.createMap('cutscene1_tilemap');
        this.levelManager.createParallax(500);
        this.game.world.bringToTop(this.levelManager.level.back);
        this.game.world.bringToTop(this.levelManager.level.walls);

        this.dudeSprite = this.game.add.sprite(230, 250, 'dude');
        this.dudeSprite.scale.setTo(2, 2);
        this.dudeSprite.visible = false;

        this.clickToSkip = this.game.add.bitmapText(400, 15, 'carrier_command', 'Click to skip', 9);
        this.clickToSkip.anchor.x = 0.5;
        this.narratorPhrase = this.game.add.bitmapText(400, 370, 'carrier_command', '', 11);
        this.narratorPhrase.anchor.x = 0.5;
        this.dudePhrase = this.game.add.bitmapText(290, 270, 'carrier_command', '', 10);

        this.nextLine();
    }

    private updateLine() {
        this.dudeSprite.frame = 0;

        this.narratorPhrase.setText(this.narratorLines[this.index]);
        this.dudePhrase.setText(this.dudeLines[this.index]);

        if (this.index == 2){
            this.soundManager.jump.play();
            this.dudeSprite.visible = true;
        }
        if (this.index == 4 || this.index == 8 || this.index == 9){
            this.dudeSprite.frame = 4;
        }
        if (this.index == 10){
            this.soundManager.damage.play();
            this.dudeSprite.frame = 6;
        }
        
        this.game.time.events.add(Phaser.Timer.SECOND * 2.2, this.nextLine, this);
    
    }

    private nextLine() {
        this.game.time.events.removeAll();

        this.index++;
    
        if (this.index < this.narratorLines.length){
            this.game.time.events.repeat(80, this.narratorLines[this.index].length + 1, this.updateLine, this);
        }
        else{
            this.fadeOut();
        }
    }

    private fadeOut() {
        this.game.camera.fade(0x00000, 500);
        this.game.camera.onFadeComplete.add(this.startGame,this);
    }

    private startGame() {
        this.index = 0;
        this.game.camera.onFadeComplete.removeAll();
        this.game.state.start('Level1', true, false, this.soundManager, this.levelBase, this.levelManager, this);
    }

}