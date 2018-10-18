module Diguifi {

    export class LevelManager {
        private level: LevelBase;
        private game: Phaser.Game;
        private nextLevel: string;

        constructor(game, level, nextLevel) {
            this.game = game;
            this.level = level;
            this.nextLevel = nextLevel;
            this.level.lastCameraPositionX = 0;
        }

        public createBasicLevelStuff(jsonTilemap: string) {
            this.createMap(jsonTilemap);
            this.createParallax();
            this.game.world.bringToTop(this.level.back);
            this.game.world.bringToTop(this.level.walls);
            this.createGreenEnemies();
            this.createGems();
            this.createRedGems();
        }

        public updateBasicLevelStuff(player: Player) {
            this.updateRedGemsInteraction(player);
            this.updateGemsInteraction(player);
            this.updateEnemiesInteraction(player);
            this.updateParallax(player.speed);
        }

        public createMap(jsonTilemap: string) {
            this.level.map = this.game.add.tilemap(jsonTilemap);
            this.level.map.addTilesetImage('jungletileset', 'jungle_tileset');
            this.level.map.setCollisionBetween(1, 2000, true, 'walls');

            this.level.back = this.level.map.createLayer('back');
            this.level.back.setScale(2);

            this.level.walls = this.level.map.createLayer('walls');
            this.level.walls.setScale(2);
            this.level.walls.resizeWorld();
        }

        public createParallax() {
            this.level.paralax2 = this.game.add.tileSprite(0,
                this.game.world.height - 430,
                this.game.world.width,
                this.game.world.height,
                'jungle_paralax2'
            );
            this.level.paralax2.tileScale.x = 2;
            this.level.paralax2.tileScale.y = 2;
            this.level.paralax3 = this.game.add.tileSprite(0,
                this.game.world.height - 435,
                this.game.world.width,
                this.game.world.height,
                'jungle_paralax3'
            );
            this.level.paralax3.tileScale.x = 2;
            this.level.paralax3.tileScale.y = 2;
            this.level.paralax4 = this.game.add.tileSprite(0,
                this.game.world.height - 450,
                this.game.world.width,
                this.game.world.height,
                'jungle_paralax4'
            );
            this.level.paralax4.tileScale.x = 2;
            this.level.paralax4.tileScale.y = 2;
            this.level.paralax5 = this.game.add.tileSprite(0,
                this.game.world.height - 460,
                this.game.world.width,
                this.game.world.height,
                'jungle_paralax5'
            );
            this.level.paralax5.tileScale.x = 2;
            this.level.paralax5.tileScale.y = 2;
            this.level.paralax5.checkWorldBounds = true;
        }

        public createGreenEnemies() {
            this.level.map.objects.enemies.forEach(function (data) {
                this.level.enemies.push(new Enemy(this.game, data.x * 2, data.y * 1.7, this.game.physics.arcade.gravity.y, this.level.enemySpeed));
            }.bind(this));
        }

        public createGems() {
            this.level.gems = this.game.add.physicsGroup();
            this.level.map.createFromObjects('gems', 'gem1', 'greygem', 0, true, false, this.level.gems);

            this.level.gems.forEach(function (gem) {
                gem = this.gemSetup(gem);
            }.bind(this));
        }

        public createRedGems() {
            this.level.redGems = this.game.add.physicsGroup();
            this.level.map.createFromObjects('redgems', 'redgem', 'redgem', 0, true, false, this.level.redGems);

            this.level.redGems.forEach(function (gem) {
                gem = this.gemSetup(gem);
            }.bind(this));
        }

        public updateParallax(playerSpeed: number) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                if (this.game.camera.position.x != this.level.lastCameraPositionX) {
                    this.level.paralax4.tilePosition.x += playerSpeed / 1875;
                    this.level.paralax3.tilePosition.x += playerSpeed / 6000;
                    this.level.paralax2.tilePosition.x += playerSpeed / 30000;
                }
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                if (this.game.camera.position.x != this.level.lastCameraPositionX) {
                    this.level.paralax4.tilePosition.x -= playerSpeed / 1875;
                    this.level.paralax3.tilePosition.x -= playerSpeed / 6000;
                    this.level.paralax2.tilePosition.x -= playerSpeed / 30000;
                }
            }

            this.level.lastCameraPositionX = this.game.camera.position.x;
        }

        public updateEnemiesInteraction(player: Player) {
            this.game.physics.arcade.collide(this.level.enemies, this.level.walls);
            this.game.physics.arcade.overlap(player, this.level.enemies, this.enemyOverlap);
        }

        public updateGemsInteraction(player: Player) {
            this.game.physics.arcade.collide(this.level.gems, this.level.walls);
            this.game.physics.arcade.overlap(player, this.level.gems, this.gemsCollect, null, this);
        }

        public updateRedGemsInteraction(player: Player) {
            this.game.physics.arcade.collide(this.level.redGems, this.level.walls);
            this.game.physics.arcade.overlap(player, this.level.redGems, this.goNextLevel, null, this);
        }

        private enemyOverlap(player, enemy) {
            if (player.body.touching.down) {
                if ((player.position.y) < (enemy.position.y - (enemy.height - 5))) {
                    enemy.body.enable = false;
                    player.body.velocity.y = -80;
                    enemy.kill();
                }
                else {
                    player.lives--;
                    player.position.x = 6;
                }

            } else {
                player.lives--;
                player.position.x = 6;
            }
        }

        private gemSetup(gem) {
            gem.x = gem.x * 2;
            gem.y = gem.y * 1.7;
            gem.scale.setTo(1.8, 2);
            gem.body.immovable = true;
            gem.body.bounce.y = 0.3;
            gem.animations.add('shine', [0, 1, 2, 3], 8, true);
            gem.animations.play('shine');

            return gem;
        }

        private gemsCollect(player, gem) {
            player.gems++;
            gem.kill();
        }

        private goNextLevel(player) {
            this.game.state.start(this.nextLevel, true, false, player);
        }
    }
}