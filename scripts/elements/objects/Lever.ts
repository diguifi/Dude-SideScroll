import { SoundManager } from "../../managers/SoundManager";

export class Lever extends Phaser.Sprite {
    game: Phaser.Game;
    active: boolean;
    wasTouching: boolean;
    size: number;
    soundManager: SoundManager;

    constructor(game: Phaser.Game, x: number, y: number, gravity: number, soundManager: SoundManager) {
        super(game, x, y, 'lever', 0);
        this.game = game;

        // sprite size
        this.size = 2;
        this.scale.setTo(this.size, this.size);

        // sprite anchor
        this.anchor.setTo(0.5, 0);

        // physics
        this.game.physics.arcade.enableBody(this);
        this.body.setSize(16, 12, 0, 0);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = gravity;
        this.body.bounce.y = 0;

        // sound
        this.soundManager = soundManager;

        game.add.existing(this);
    }

    update() {
        this.wasTouching = !this.body.touching.none;
    }

    public toggle() {
        if (this.active && !this.wasTouching) {
            this.deactivate();
        }
        else if (!this.active && !this.wasTouching) {
            this.activate();
        }
    }

    public activate() {
        this.active = true;
        this.frame = 1;
        this.soundManager.leverpull.play();
    }

    public deactivate() {
        this.active = false;
        this.frame = 0;
        this.soundManager.leverpull.play();
    }
}