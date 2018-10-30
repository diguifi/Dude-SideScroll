module Diguifi {

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

            // ---- level genesis

            this.levelManager.createBasicLevelStuff('tileMap_level3');

            // ---- Torch

            this.torches = [new Torch(this.game, 200, 250)];

            // ---- player
            this.player = new Diguifi.Player(this.game, 80, 50, 150, this.game.physics.arcade.gravity.y, 0, 3, this.soundManager);
            this.game.camera.follow(this.player);

            // ---- hud and game

            this.hud = new Hud(this.game, this.player);
            this.game.world.bringToTop(this.hud);
        }

        update() {
            if (this.player.lives < 0)
                this.game.state.start('MainMenu');

            this.game.physics.arcade.collide(this.player, this.levelBase.walls);
            this.levelManager.updateBasicLevelStuff(this.player);
        }

        render() {
            this.game.debug.text(": " + this.player.gems.toString(), 662, 40);
        }

    }

} 