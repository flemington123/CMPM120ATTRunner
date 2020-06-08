// Rabbit prefab
class Rabbit extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);             
    }
    update() {
            if (keyLEFT.isDown && this.x >= 12) {
                this.x -= 3.5;
            } else if (keyRIGHT.isDown && this.x <= 598) {
                this.x += 3.5;
            } else if (keyUP.isDown && this.y > 62){
                this.y -= 3.5;
            } else if (keyDOWN.isDown && this.y < 370){
                this.y += 3.5;
            }
    }
    reset() {
        this.isFiring = false;
        this.y = game.config.height/2;
        this.x = 20;
    }
}
