import { Player } from '../elements/player/Player';
import { SoundManager } from '../managers/SoundManager';
import { LevelManager } from './LevelManager';
import { LevelBase } from './LevelBase';
import { Hud } from '../managers/Hud';

export class Level1 extends Phaser.State {

    private player: Player;
    private hud: Hud;
    private arrowKeysSprite: Phaser.Sprite;
    private shiftSprite: Phaser.Sprite;
    private glowSpriteB: Phaser.Sprite;
    private glowSpriteA: Phaser.Sprite;
    private levelManager: LevelManager;
    private levelBase: LevelBase;
    private soundManager: SoundManager;

    public init(soundManager: SoundManager,
        previousLevelBase: LevelBase,
        previousLevelManager: LevelManager,
        cutscene1: any) {
        this.soundManager = soundManager;
        this.levelBase = previousLevelBase;

        previousLevelBase = null;
        previousLevelManager = null;
        cutscene1 = null;
    }

    public create() {
        this.soundManager.music.volume = this.soundManager.inGameVolume;

        this.levelManager = new LevelManager(this.game, this.levelBase, 'Level2', this.soundManager);

        // ---- level genesis

        this.levelManager.createBasicLevelStuff('tileMap_level1');

        // ---- tutorial sprites

        this.arrowKeysSprite = this.game.add.sprite(180, 265, 'arrowkeys');
        this.arrowKeysSprite.scale.setTo(3);
        this.arrowKeysSprite.alpha = 0;

        this.shiftSprite = this.game.add.sprite(1650, 265, 'shift');
        this.shiftSprite.scale.setTo(2.5);
        this.shiftSprite.alpha = 0;

        this.glowSpriteB = this.game.add.sprite(180, 265, 'buttonglow');
        this.glowSpriteB.anchor.setTo(0.5, 0.5);
        this.glowSpriteB.alpha = 0;

        this.glowSpriteA = this.game.add.sprite(180, 265, 'buttonglow');
        this.glowSpriteA.anchor.setTo(0.5, 0.5);
        this.glowSpriteA.alpha = 0;

        // ---- player

        this.player = new Player(this.game, 10, 300, 150, this.game.physics.arcade.gravity.y, 0, 0, 3, this.soundManager);
        this.game.camera.follow(this.player);

        // ---- set button glow position
        
        if (!this.game.device.desktop) {
            this.glowSpriteB.position.set(this.player.controller.buttonjump.x, this.player.controller.buttonjump.y);
            this.glowSpriteA.position.set(this.player.controller.buttonfire.x, this.player.controller.buttonfire.y);
            this.glowSpriteB.fixedToCamera = true;
            this.glowSpriteA.fixedToCamera = true;
        }

        // ---- hud and game

        this.hud = new Hud(this.game, this.player);
        this.game.world.bringToTop(this.hud);
    }

    public update() {
        if (this.game.device.desktop)
            this.showDesktopButtons();
        else
            this.showMobileButtons();

        this.levelManager.updateBasicLevelStuff(this.player);
    }

    private showDesktopButtons() {
        if (this.checkProximityFirstTutorial())
            this.game.add.tween(this.arrowKeysSprite).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        else
            this.game.add.tween(this.arrowKeysSprite).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);

        if (this.checkProximitySecondTutorial())
            this.game.add.tween(this.shiftSprite).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        else
            this.game.add.tween(this.shiftSprite).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
    }

    private showMobileButtons() {
        if (this.checkProximityFirstTutorial()) {
            this.game.add.tween(this.player.controller.buttonjump.scale).to({ x: 1.2, y: 1.2 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
            this.game.add.tween(this.glowSpriteB).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
            this.game.add.tween(this.glowSpriteB.scale).to({ x: 1.2, y: 1.2 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        }
        else {
            this.game.add.tween(this.player.controller.buttonjump.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
            this.game.add.tween(this.glowSpriteB).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
            this.game.add.tween(this.glowSpriteB.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        } 

        if (this.checkProximitySecondTutorial()) {
            this.game.add.tween(this.player.controller.buttonfire.scale).to({ x: 1.2, y: 1.2 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
            this.game.add.tween(this.glowSpriteA).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
            this.game.add.tween(this.glowSpriteA.scale).to({ x: 1.2, y: 1.2 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        }
        else {
            this.game.add.tween(this.player.controller.buttonfire.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
            this.game.add.tween(this.glowSpriteA).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
            this.game.add.tween(this.glowSpriteA.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        } 
    }

    private checkProximityFirstTutorial(){
        return (this.player.x > this.arrowKeysSprite.x - 120 && this.player.x < this.arrowKeysSprite.x + 100);
    }

    private checkProximitySecondTutorial(){
        return (this.player.x > this.shiftSprite.x - 100 && this.player.x < this.shiftSprite.x + 170);
    }
}