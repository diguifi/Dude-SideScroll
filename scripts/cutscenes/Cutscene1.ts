import { SoundManager } from "../SoundManager";
import { LevelManager } from "../levels/LevelManager";
import { LevelBase } from "../levels/LevelBase";

export class Cutscene1 extends Phaser.State {

    logo: Phaser.Sprite;
    background: Phaser.Sprite;
    soundManager: SoundManager;
    levelManager: LevelManager;
    levelBase: LevelBase;
    skip: boolean = false;

    init(soundManager) {
        this.soundManager = soundManager;
    }

    create() {
        this.levelBase = new LevelBase();
        this.levelManager = new LevelManager(this.game, this.levelBase, 'Level1', this.soundManager);

        this.input.onDown.addOnce(this.fadeOut, this);

        this.levelManager.createMap('cutscene1_tilemap');
        this.levelManager.createParallax(500);
        this.game.world.bringToTop(this.levelManager.level.back);
        this.game.world.bringToTop(this.levelManager.level.walls);
    }

    fadeOut() {
        this.game.camera.fade(0x00000, 500);
        this.game.camera.onFadeComplete.add(this.startGame,this);
    }

    render(){
        this.game.debug.text("This is the base of the 1st cutscene's version", 220, 150);
        this.game.debug.text("Soon there will be some storytelling here", 220, 200);
        this.game.debug.text("Click to continue", 300, 250);
    }

    startGame() {
        this.game.camera.onFadeComplete.removeAll();
        this.game.state.start('Level1', true, false, this.soundManager, this.levelBase, this.levelManager);
    }

}