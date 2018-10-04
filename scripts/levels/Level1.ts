module Diguifi {

    export class Level1 extends Phaser.State {

        music: Phaser.Sound;
        player: Player;
        hud: Hud;
        gems;
        enemies: Enemy[] = [];
        enemySpeed = 100;
        map;
        walls;
        back;
        lastCameraPositionX;
        paralax1;
        paralax2;
        paralax3;
        paralax4;
        paralax5;

        create() {
            this.lastCameraPositionX = 0;

            this.map = this.game.add.tilemap('tileMap_level1');
            this.map.addTilesetImage('jungletileset', 'tiles_level1');
            this.map.setCollisionBetween(1, 2000, true, 'walls');

            this.back = this.map.createLayer('back');
            this.back.setScale(2);

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

            this.game.world.bringToTop(this.back);
            this.game.world.bringToTop(this.walls);

            this.player = new Diguifi.Player(this.game, 6, 300, 150, this.game.physics.arcade.gravity.y);
            this.game.camera.follow(this.player);
            
            this.map.objects.enemies.forEach(function (data) {
                this.enemies.push(new Enemy(this.game, data.x*2, data.y, this.game.physics.arcade.gravity.y, this.enemySpeed));
            }.bind(this));

            this.gems = this.game.add.physicsGroup();
            this.map.createFromObjects('gems', 'gem1', 'greygem', 0, true, false, this.gems);
            
            this.gems.forEach(function (gem) {
                gem = this.gemSetup(gem);
            }.bind(this));

            this.hud = new Hud(this.game, this.player);
            this.game.world.bringToTop(this.hud);
        }

        update() {
            if (this.player.lives < 0)
                this.game.state.start('MainMenu');

            this.game.physics.arcade.collide(this.player, this.walls);
            this.game.physics.arcade.collide(this.enemies, this.walls);
            this.game.physics.arcade.collide(this.gems, this.walls);
            this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyOverlap);
            this.game.physics.arcade.overlap(this.player, this.gems, this.gemsCollect, null, this);

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                if (this.game.camera.position.x != this.lastCameraPositionX) {
                    this.paralax4.tilePosition.x += this.player.speed / 1875;
                    this.paralax3.tilePosition.x += this.player.speed / 6000;
                    this.paralax2.tilePosition.x += this.player.speed / 30000;
                }
            }
                
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                if (this.game.camera.position.x != this.lastCameraPositionX) {
                    this.paralax4.tilePosition.x -= this.player.speed / 1875;
                    this.paralax3.tilePosition.x -= this.player.speed / 6000;
                    this.paralax2.tilePosition.x -= this.player.speed / 30000;
                }
            }

            this.lastCameraPositionX = this.game.camera.position.x;
        }

        enemyOverlap(player, enemy) {
            if (player.body.touching.down) {
                if ((player.position.y) < (enemy.position.y - (enemy.height))) {
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

        gemSetup(gem) {
            gem.x = gem.x * 2
            gem.scale.setTo(1.8);
            gem.body.immovable = true;
            gem.body.bounce.y = 0.3;
            gem.animations.add('shine', [0, 1, 2, 3], 8, true);
            gem.animations.play('shine');

            return gem;
        }

        gemsCollect(player, gem) {
            player.gems++;
            gem.kill();
        }

        render() {
            this.game.debug.text(": "+this.player.gems.toString(), 662, 40);
        }

    }

} 