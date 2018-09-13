module Diguifi {

    export class Level1 extends Phaser.State {

        music: Phaser.Sound;
        player: Player;
        enemies;
        enemySpeed = 100;
        map;
        layer;

        create() {

            this.map = this.game.add.tilemap('tileMap_level1');
            this.map.addTilesetImage('tiles', 'tiles_level1');
            this.map.setCollisionBetween(3, 12, true, 'solid');

            this.map.createLayer('background');

            this.layer = this.map.createLayer('solid');
            this.layer.setScale(2);
            this.layer.resizeWorld();

            this.player = new Diguifi.Player(this.game, 5, 370, 150, this.game.physics.arcade.gravity.y);
            this.game.camera.follow(this.player);

            this.enemies = [new Enemy(this.game, 700, 370, this.game.physics.arcade.gravity.y, this.enemySpeed),
                new Enemy(this.game, 1000, 370, this.game.physics.arcade.gravity.y, this.enemySpeed),
                new Enemy(this.game, 1500, 370, this.game.physics.arcade.gravity.y, this.enemySpeed),
                new Enemy(this.game, 2000, 370, this.game.physics.arcade.gravity.y, this.enemySpeed),
                new Enemy(this.game, 2500, 370, this.game.physics.arcade.gravity.y, this.enemySpeed),
                new Enemy(this.game, 2700, 370, this.game.physics.arcade.gravity.y, this.enemySpeed),
                new Enemy(this.game, 3000, 370, this.game.physics.arcade.gravity.y, this.enemySpeed),
                new Enemy(this.game, 3500, 370, this.game.physics.arcade.gravity.y, this.enemySpeed)];
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.layer);
            this.game.physics.arcade.collide(this.enemies, this.layer);
            this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyOverlap);
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