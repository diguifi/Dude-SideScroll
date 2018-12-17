import { Player } from "../elements/player/Player";
import { SoundManager } from "../managers/SoundManager";
import { LevelManager } from "./LevelManager";
import { LevelBase } from "./LevelBase";
import { Hud } from "../managers/Hud";

export class Level4 extends Phaser.State {

    music: Phaser.Sound;
    player: Player;
    lastPlayer: Player;
    hud: Hud;
    levelManager: LevelManager;
    levelBase: LevelBase;
    soundManager: SoundManager;

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
        this.levelManager = new LevelManager(this.game, this.levelBase, 'Level5', this.soundManager);

        // ---- level genesis

        this.levelManager.createBasicLevelStuff('tileMap_level4');

        // ---- player
        this.player = new Player(this.game, 100, 200, 150, this.game.physics.arcade.gravity.y, this.lastPlayer.gems, this.lastPlayer.redGems, this.lastPlayer.lives, this.soundManager);
        this.game.camera.follow(this.player);

        // ---- hud and game

        this.hud = new Hud(this.game, this.player);
        this.game.world.bringToTop(this.hud);
    }

    update() {
        this.levelManager.updateBasicLevelStuff(this.player);
    }

}