
class Gold extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene, displayList, updateList
        this.points = pointValue;   
        this.speed = speed;
    }
    update() {
        this.x -= this.speed;
        if (this.x <= 0) {
            this.reset();
            this.y = Math.random() * 300 + 100;
        }
    }
    reset() {
        this.x = game.config.width;
    }
}