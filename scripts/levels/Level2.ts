module Diguifi {

    export class Level2 extends Phaser.State {

        music: Phaser.Sound;
        player: Player;
        lastPlayer: Player;
        hud: Hud;
        levelManager: LevelManager;
        levelBase: LevelBase;
        soundManager: SoundManager;

        init (player, soundManager) {
            this.lastPlayer = player;
            this.soundManager = soundManager;
            player.kill();
        }

        create() {
            this.levelBase = new LevelBase();
            this.levelManager = new LevelManager(this.game, this.levelBase, 'Level3', this.soundManager);

            // ---- level genesis

            this.levelManager.createBasicLevelStuff('tileMap_level2');

            // ---- player
            this.player = new Diguifi.Player(this.game, 10, 300, 150, this.game.physics.arcade.gravity.y, this.lastPlayer.gems, this.lastPlayer.lives, this.soundManager);
            this.game.camera.follow(this.player);

            // ---- hud and game

            this.hud = new Hud(this.game, this.player);
            this.game.world.bringToTop(this.hud);
        }

        update() {
            if (this.player.lives < 0)
                this.game.state.start('MainMenu');

            if (this.player.y > 450)
                this.killPlayer();

            this.game.physics.arcade.collide(this.player, this.levelBase.walls);
            this.levelManager.updateBasicLevelStuff(this.player);
        }

        killPlayer() {
            this.player.lives--;
            this.player.position.x = 15;
            this.player.position.y = 300;
        }

        render() {
            this.game.debug.text(": " + this.player.gems.toString(), 662, 40);
        }

    }

} 