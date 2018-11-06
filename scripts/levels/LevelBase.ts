import { Player } from "../Player";
import { Hud } from "../Hud";
import { Enemy } from "../Enemy";

export class LevelBase {
    music: Phaser.Sound;
    player: Player;
    hud: Hud;
    gems;
    redGems;
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

    constructor() {
    }
}