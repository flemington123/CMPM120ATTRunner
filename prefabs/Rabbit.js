// Rabbit prefab
class Rabbit extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene, displayList, updateList
        //this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        //this.isFiring = false;      // track firing status
        //game.anims.create({ key: 'RabbitAnimas', frames: game.anims.generateFrameNames('Rabbit'), repeat: -1 });             
    }

    update() {

        // if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >= 12) {
                this.x -= 3;
            } else if (keyRIGHT.isDown && this.x <= 598) {
                this.x += 3;
            } else if (keyUP.isDown && this.y > 62){
                this.y -= 3;
            } else if (keyDOWN.isDown && this.y < 360){
                this.y += 3;
            }
    }
    reset() {
        this.isFiring = false;
        this.y = game.config.height/2;
        this.x = 20;
    }
}
