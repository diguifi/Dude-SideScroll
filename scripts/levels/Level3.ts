import { Player } from "../elements/player/Player";
import { SoundManager } from "../managers/SoundManager";
import { LevelManager } from "./LevelManager";
import { LevelBase } from "./LevelBase";
import { Hud } from "../managers/Hud";

export class Level3 extends Phaser.State {

    music: Phaser.Sound;
    player: Player;
    lastPlayer: Player;
    hud: Hud;
    levelManager: LevelManager;
    levelBase: LevelBase;
    soundManager: SoundManager;
    shadowTexture: Phaser.BitmapData;
    lightSprite: Phaser.Image;

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

        // ---- custom lvl 3 music

        if (!this.soundManager.musicMuted) {
            this.soundManager.music.stop();
            this.soundManager.musiclvl3.loop = true;
            this.soundManager.musiclvl3.play();
            this.soundManager.musiclvl3.volume = this.soundManager.inGameVolume;
        }
        
        // ---- level genesis (without parallax, so must set each one)

        this.levelManager.createMap('tileMap_level3');
        this.game.world.bringToTop(this.levelManager.level.back);
        this.game.world.bringToTop(this.levelManager.level.walls);
        this.levelManager.createGreenEnemies();
        this.levelManager.createItems();
        this.levelManager.createGems();
        this.levelManager.createRedGems();

        // ---- player
        this.player = new Player(this.game, 80, 50, 150, this.game.physics.arcade.gravity.y, this.lastPlayer.gems, this.lastPlayer.redGems, this.lastPlayer.lives, this.soundManager);
        this.game.camera.follow(this.player);

        // ---- bats

        this.levelManager.createBats(this.player);

        // shadow setup
        this.shadowTexture = this.game.add.bitmapData(this.game.width + 100, this.game.height + 100);

        this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);

        this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

        // light item (after shadow to make it bright)
        this.levelManager.createLights();

        // ---- hud and game
        this.hud = new Hud(this.game, this.player);
        this.game.world.bringToTop(this.hud);
    }

    update() {
        this.updateShadowTexture();

        this.levelManager.updatePlayer(this.player);
        this.levelManager.updateRedGemsInteraction(this.player);
        this.levelManager.updateGemsInteraction(this.player);
        this.levelManager.updateEnemiesInteraction(this.player);
        this.levelManager.updateItemsInteraction(this.player);
        this.levelManager.updateBatsInteraction(this.player);

        this.player.updateLightRadius();
    }

    updateShadowTexture() {
        this.lightSprite.reset(this.game.camera.x, this.game.camera.y);

        this.shadowTexture.clear();
        this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10, 0.98)';
        this.shadowTexture.context.fillRect(-25, -25, this.game.width + 100, this.game.height + 100);

        let radius = this.player.lightRadius + this.game.rnd.integerInRange(1, (this.player.lightRadius * 0.13)),
        torchX = this.player.position.x - this.game.camera.x,
        torchY = this.player.position.y + 15 - this.game.camera.y;

        let gradient = this.shadowTexture.context.createRadialGradient(
            torchX, torchY, (this.player.lightRadius * 0.66) * 0.75,
            torchX, torchY, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

        this.shadowTexture.context.beginPath();
        this.shadowTexture.context.fillStyle = gradient;
        this.shadowTexture.context.arc(torchX, torchY, radius, 0, Math.PI * 2, false);
        this.shadowTexture.context.fill();

        this.shadowTexture.dirty = true;
    }

}