import { Player } from '../elements/player/Player';
import { SoundManager } from '../managers/SoundManager';
import { LevelManager } from './LevelManager';
import { LevelBase } from './LevelBase';
import { Hud } from '../managers/Hud';

export class Level2 extends Phaser.State {

    private player: Player;
    private lastPlayer: Player;
    private hud: Hud;
    private levelManager: LevelManager;
    private levelBase: LevelBase;
    private soundManager: SoundManager;

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
        this.levelManager = new LevelManager(this.game, this.levelBase, 'Level3', this.soundManager);

        // ---- level genesis

        this.levelManager.createBasicLevelStuff('tileMap_level2');

        // ---- player
        this.player = new Player(this.game, 10, 300, 150, this.game.physics.arcade.gravity.y, this.lastPlayer.gems, this.lastPlayer.redGems, this.lastPlayer.lives, this.soundManager);
        this.game.camera.follow(this.player);

        // ---- hud and game

        this.hud = new Hud(this.game, this.player);
        this.game.world.bringToTop(this.hud);
    }

    public update() {
        this.levelManager.updateBasicLevelStuff(this.player);
    }
}