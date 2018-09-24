module Diguifi {

    export class Level1 extends Phaser.State {

        music: Phaser.Sound;
        player: Player;
        enemies;
        enemySpeed = 100;
        map;
        walls;
        lastCameraCositionX;
        paralax1;
        paralax2;
        paralax3;
        paralax4;
        paralax5;

        create() {
            this.lastCameraCositionX = 0;

            this.map = this.game.add.tilemap('tileMap_level1');
            this.map.addTilesetImage('jungletileset', 'tiles_level1');
            this.map.setCollisionBetween(1, 2000, true, 'walls');

            this.walls = this.map.createLayer('walls');
            this.walls.setScale(2);
            this.walls.resizeWorld();

            this.paralax2 = this.game.add.tileSprite(0,
                this.game.world.height - 420,
                this.game.world.width,
                this.game.world.height,
                'jungle_paralax2'
            );
            this.paralax2.tileScale.x = 2;
            this.paralax2.tileScale.y = 2;
            this.paralax3 = this.game.add.tileSprite(0,
                this.game.world.height - 420,
                this.game.world.width,
                this.game.world.height,
                'jungle_paralax3'
            );
            this.paralax3.tileScale.x = 2;
            this.paralax3.tileScale.y = 2;
            this.paralax4 = this.game.add.tileSprite(0,
                this.game.world.height - 420,
                this.game.world.width,
                this.game.world.height,
                'jungle_paralax4'
            );
            this.paralax4.tileScale.x = 2;
            this.paralax4.tileScale.y = 2;
            this.paralax5 = this.game.add.tileSprite(0,
                this.game.world.height - 420,
                this.game.world.width,
                this.game.world.height,
                'jungle_paralax5'
            );
            this.paralax5.tileScale.x = 2;
            this.paralax5.tileScale.y = 2;
            this.paralax5.checkWorldBounds = true;
            
            this.game.world.bringToTop(this.walls);

            this.player = new Diguifi.Player(this.game, 5, 300, 150, this.game.physics.arcade.gravity.y);
            this.game.camera.follow(this.player);

            this.enemies = [new Enemy(this.game, 700, 300, this.game.physics.arcade.gravity.y, this.enemySpeed)];
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.walls);
            this.game.physics.arcade.collide(this.enemies, this.walls);
            this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyOverlap);

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                if (this.game.camera.position.x != this.lastCameraCositionX) {
                    this.paralax4.tilePosition.x += this.player.speed / 1875;
                    this.paralax3.tilePosition.x += this.player.speed / 6000;
                    this.paralax2.tilePosition.x += this.player.speed / 30000;
                }
            }
                
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                if (this.game.camera.position.x != this.lastCameraCositionX) {
                    this.paralax4.tilePosition.x -= this.player.speed / 1875;
                    this.paralax3.tilePosition.x -= this.player.speed / 6000;
                    this.paralax2.tilePosition.x -= this.player.speed / 30000;
                }
            }

            this.lastCameraCositionX = this.game.camera.position.x;
        }

        enemyOverlap(player, enemy) {
            if (player.body.touching.down) {
                if ((player.position.y) < (enemy.position.y - (enemy.height))) {
                    enemy.body.enable = false;
                    player.body.velocity.y = -80;
                    enemy.kill();
                }
                else {
                    player.body.enable = false;
                    player.kill();
                }

            } else {
                player.body.enable = false;
                player.kill();
            }
        }

    }

} 