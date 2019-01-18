import { SoundManager } from "../../managers/SoundManager";

export class Platform extends Phaser.Sprite {
    game: Phaser.Game;
    active: boolean;
    initialX: number;
    size: number;
    soundManager: SoundManager;
    canPlaySound: boolean;

    constructor(game: Phaser.Game, x: number, y: number, gravity: number, soundManager: SoundManager) {
        super(game, x, y, 'platform', 0);
        this.game = game;

        // properties
        this.initialX = x;
        this.active = false;

        // sprite size
        this.size = 2;
        this.scale.setTo(this.size, this.size);

        // sprite anchor
        this.anchor.setTo(0.5, 0);

        // physics
        this.game.physics.arcade.enableBody(this);
        this.body.setSize(32, 3, 0, 0);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = gravity;
        this.body.bounce.y = 0;

        // sound
        this.soundManager = soundManager;
        this.canPlaySound = true;

        game.add.existing(this);
    }

    update() {
        if(this.body.touching.none) {
            this.deactivate();
        }
        else {
            this.activate();
        }
    }

    public activate() {
        this.active = true;
        this.frame = 1;
        if (this.canPlaySound) {
            this.soundManager.clickin.play();
            this.canPlaySound = false;
        }
    }

    public deactivate() {
        this.active = false;
        this.frame = 0;
        if (!this.canPlaySound) {
            this.soundManager.clickout.play();
            this.canPlaySound = true;
        }
    }
}