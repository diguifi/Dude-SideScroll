import { Player } from "../elements/player/Player";

export class ControllerManager {
    constructor(player: Player, game: Phaser.Game) {
        this.game = game;

        if (!this.game.device.desktop)
            this.getVirtualButtonsInput(player);
    }

    game: Phaser.Game;
    buttonjump: Phaser.Button;
    buttonfire: Phaser.Button;
    buttonright: Phaser.Button;
    buttonleft: Phaser.Button;

    getKeyboardInput(player) {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))
            player.running = true;
        else
            player.running = false;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            player.movingLeft = true;
        else
            player.movingLeft = false;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            player.movingRight = true;
        else
            player.movingRight = false;

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            player.pressingUp = true;
            if (player.body.blocked.down)
                player.jump();
        }
        else {
            player.pressingUp = false;
        }

        if (!this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
            if (!player.body.blocked.down)
                player.fall();
    }

    getVirtualButtonsInput(player) {
        this.buttonjump = this.game.add.button(635, 355, 'buttonjump', null, this, 0, 1, 0, 1);
        this.buttonjump.fixedToCamera = true;
        this.buttonjump.events.onInputDown.add(function () { player.pressingUp = true; if (player.body.blocked.down)player.jump(); });
        this.buttonjump.events.onInputUp.add(function () { player.pressingUp = false; if (!player.body.blocked.down) player.fall(); });
        this.buttonjump.anchor.setTo(0.5, 0.5);

        this.buttonfire = this.game.add.button(748, 355, 'buttonfire', null, this, 0, 1, 0, 1);
        this.buttonfire.fixedToCamera = true;
        this.buttonfire.events.onInputDown.add(function () { 
            player.running = !player.running; 
            if (player.running){ 
                this.buttonfire.setFrames(1, 0, 1, 0);
            } else {
                this.buttonfire.setFrames(0, 1, 0, 1)
            } 
        }.bind(this));
        this.buttonfire.anchor.setTo(0.5, 0.5);

        this.buttonleft = this.game.add.button(0, 310, 'buttonleft', null, this, 0, 1, 0, 1);
        this.buttonleft.fixedToCamera = true;
        this.buttonleft.events.onInputDown.add(function () { player.movingLeft = true; });
        this.buttonleft.events.onInputUp.add(function () { player.movingLeft = false; });

        this.buttonright = this.game.add.button(160, 310, 'buttonright', null, this, 0, 1, 0, 1);
        this.buttonright.fixedToCamera = true;
        this.buttonright.events.onInputDown.add(function () { player.movingRight = true; });
        this.buttonright.events.onInputUp.add(function () { player.movingRight = false; });
    }

}