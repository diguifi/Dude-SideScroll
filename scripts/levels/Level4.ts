import { Player } from '../elements/player/Player';
import { SoundManager } from '../managers/SoundManager';
import { LevelManager } from './LevelManager';
import { LevelBase } from './LevelBase';
import { Hud } from '../managers/Hud';

export class Level4 extends Phaser.State {

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
        this.levelManager = new LevelManager(this.game, this.levelBase, 'CutsceneDemoFinal', this.soundManager);

        // ---- back to regular music
        if (!this.soundManager.musicMuted) {
            this.soundManager.musiclvl3.stop();
            this.soundManager.music.loop = true;
            this.soundManager.music.play();
        }

        // ---- level genesis
        this.levelManager.createBasicLevelStuff('tileMap_level4');

        // ---- player
        this.player = new Player(this.game, 100, 200, 150, this.game.physics.arcade.gravity.y, this.lastPlayer.gems, this.lastPlayer.redGems, this.lastPlayer.lives, this.soundManager);
        this.game.camera.follow(this.player);

        // ---- hud and game
        this.hud = new Hud(this.game, this.player);
        this.game.world.bringToTop(this.hud);
    }

    public update() {
        this.levelManager.updateBasicLevelStuff(this.player);
    }
}