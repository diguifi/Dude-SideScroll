import { Player } from "../Player";
import { Torch } from "../Torch";
import { SoundManager } from "../SoundManager";
import { LevelManager } from "./LevelManager";
import { LevelBase } from "./LevelBase";
import { Hud } from "../Hud";
import { Bat } from "../Bat";

export class Level3 extends Phaser.State {

    music: Phaser.Sound;
    player: Player;
    lastPlayer: Player;
    hud: Hud;
    levelManager: LevelManager;
    levelBase: LevelBase;
    soundManager: SoundManager;
    torches: Torch[];

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
            
        this.levelManager = new LevelManager(this.game, this.levelBase, 'Level4', this.soundManager);

        // ---- level genesis (without parallax, so must set each one)

        this.levelManager.createMap('tileMap_level3');
        this.game.world.bringToTop(this.levelManager.level.back);
        this.game.world.bringToTop(this.levelManager.level.walls);
        this.levelManager.createGreenEnemies();
        this.levelManager.createGems();
        this.levelManager.createRedGems();

        // ---- Torch

        this.torches = [new Torch(this.game, 200, 250)];

        // ---- player
        this.player = new Player(this.game, 80, 50, 150, this.game.physics.arcade.gravity.y, this.lastPlayer.gems, this.lastPlayer.lives, this.soundManager);
        this.game.camera.follow(this.player);

        // ---- bats

        this.levelManager.createBats(this.player);

        // ---- hud and game

        this.hud = new Hud(this.game, this.player);
        this.game.world.bringToTop(this.hud);
    }

    update() {
        if (this.player.lives < 0)
            this.game.state.start('MainMenu');

        this.game.physics.arcade.collide(this.player, this.levelBase.walls);
        this.levelManager.updateRedGemsInteraction(this.player);
        this.levelManager.updateGemsInteraction(this.player);
        this.levelManager.updateEnemiesInteraction(this.player);
        this.levelManager.updateBatsInteraction(this.player);
    }

    render() {
        this.game.debug.text(": " + this.player.gems.toString(), 662, 40);
    }

}