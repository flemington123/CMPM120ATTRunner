// Rock prefab
class Rock extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);  
    }
    update() {
        this.x -= game.settings.spaceshipSpeed;
        if (this.x <= 0-this.width) {
            this.reset();
            this.y = Math.random() * 300 + 100;
        }
    }
    reset() {
        this.x = game.config.width;
    }
}
