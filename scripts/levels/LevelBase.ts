import { Player } from "../elements/player/Player";
import { Hud } from "../managers/Hud";
import { Enemy } from "../elements/enemies/Enemy";
import { Bat } from "../elements/enemies/Bat";

export class LevelBase {
    music: Phaser.Sound;
    player: Player;
    hud: Hud;
    gems;
    redGems;
    bats: Bat[] = [];
    enemies: Enemy[] = [];
    items: [] = [];
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
    misc;

    constructor() {
    }
}