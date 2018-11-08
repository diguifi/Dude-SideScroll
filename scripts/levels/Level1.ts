import { Player } from "../Player";
import { SoundManager } from "../SoundManager";
import { LevelManager } from "./LevelManager";
import { LevelBase } from "./LevelBase";
import { Hud } from "../Hud";

export class Level1 extends Phaser.State {

    player: Player;
    hud: Hud;
    arrowKeysSprite;
    shiftSprite;
    levelManager: LevelManager;
    levelBase: LevelBase;
    soundManager: SoundManager;

    init(soundManager) {
        this.soundManager = soundManager;
    }

    create() {
        this.soundManager.music.volume = 0.1;

        this.levelBase = new LevelBase();
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
        if (this.player.lives < 0)
            this.game.state.start('MainMenu');

        if (this.player.x > this.arrowKeysSprite.x - 120 && this.player.x < this.arrowKeysSprite.x + 100)
            this.game.add.tween(this.arrowKeysSprite).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        else
            this.game.add.tween(this.arrowKeysSprite).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);

        if (this.player.x > this.shiftSprite.x - 120 && this.player.x < this.shiftSprite.x + 150)
            this.game.add.tween(this.shiftSprite).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);
        else
            this.game.add.tween(this.shiftSprite).to({ alpha: 0 }, 300, Phaser.Easing.Linear.None, true, 0, 0, true);

        this.game.physics.arcade.collide(this.player, this.levelBase.walls);
        this.levelManager.updateBasicLevelStuff(this.player);
    }

    render() {
        this.game.debug.text(": " + this.player.gems.toString(), 662, 40);
    }
}