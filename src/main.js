// Team member: Xuqi Wang, Jiabin Zhang, Kaisen Xue
// Title: Hungry Rabbit
// Date: 5/3
// Creative points: We used the skills from the class example to track the player's high score and save it in the highest history score. 
// We're proud of the bgm we chose and the visual art works we create. What's more, we tried something new with endless runner form by 
// adding the function that if rabbit hitting the rocks the game ends. 
//
let config = {
    type: Phaser.CANVAS,
    width:720,
    height: 480,
    scene: [ Menu, Instruction, Instruction2, Play ]
}
// main game object
let game = new Phaser.Game(config);
// define game settings
game.settings = {
    spaceshipSpeed: 2,
}
// reserve keyboard vars
let keyF, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE;
var highScore = 0;