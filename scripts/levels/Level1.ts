import { Player } from "../elements/player/Player";
import { SoundManager } from "../managers/SoundManager";
import { LevelManager } from "./LevelManager";
import { LevelBase } from "./LevelBase";
import { Hud } from "../managers/Hud";

export class Level1 extends Phaser.State {

    player: Player;
    hud: Hud;
    arrowKeysSprite: Phaser.Sprite;
    shiftSprite: Phaser.Sprite;
    levelManager: LevelManager;
    levelBase: LevelBase;
    soundManager: SoundManager;

    init(soundManager: SoundManager,
        previousLevelBase: LevelBase, previousLevelManager: LevelManager, cutscene1) {
        this.soundManager = soundManager;
        this.levelBase = previousLevelBase;

        previousLevelBase = null;
        previousLevelManager = null;
        cutscene1 = null;
    }

    create() {
        if(!this.soundManager.musicMuted)
            this.soundManager.music.volume = 0.1;

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

        // ---- player

        this.player = new Player(this.game, 10, 300, 150, this.game.physics.arcade.gravity.y, 0, 3, this.soundManager);
        this.game.camera.follow(this.player);

        // ---- hud and game

        this.hud = new Hud(this.game, this.player);
        this.game.world.bringToTop(this.hud);
    }

    update() {
        if (this.game.device.desktop)
            this.showDesktopButtons();
        else
            this.showMobileButtons();

        this.game.physics.arcade.collide(this.player, this.levelBase.walls);
        this.levelManager.updateBasicLevelStuff(this.player);
    }

    showDesktopButtons() {
        if (this.checkProximityFirstTutorial())
            this.game.add.tween(this.arrowKeysSprite).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        else
            this.game.add.tween(this.arrowKeysSprite).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);

        if (this.checkProximitySecondTutorial())
            this.game.add.tween(this.shiftSprite).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        else
            this.game.add.tween(this.shiftSprite).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
    }

    showMobileButtons() {
        if (this.checkProximityFirstTutorial())
            this.game.add.tween(this.player.controller.buttonjump.scale).to({ x: 1.2, y: 1.2 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        else
            this.game.add.tween(this.player.controller.buttonjump.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);

        if (this.checkProximitySecondTutorial())
            this.game.add.tween(this.player.controller.buttonfire.scale).to({ x: 1.2, y: 1.2 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        else
            this.game.add.tween(this.player.controller.buttonfire.scale).to({ x: 1, y: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
    }

    checkProximityFirstTutorial(){
        return (this.player.x > this.arrowKeysSprite.x - 120 && this.player.x < this.arrowKeysSprite.x + 100);
    }

    checkProximitySecondTutorial(){
        return (this.player.x > this.shiftSprite.x - 120 && this.player.x < this.shiftSprite.x + 150);
    }

    render() {
        this.game.debug.text(": " + this.player.gems.toString(), 662, 40);
    }
}