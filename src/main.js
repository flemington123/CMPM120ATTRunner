// Team member: Xuqi Wang, Jiabin Zhang, Kaisen Xue
// Title: Hungry Rabbit
// Date: 5/3
// Creative points: 
//
let config = {
    type: Phaser.CANVAS,
    width:720,
    height: 480,
    scene: [ Menu, Play ]
}

// main game object
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    //gameTimer: 60000   
}

// reserve keyboard vars
let keyF, keyLEFT, keyRIGHT, keyUP, keyDOWN;
var highScore = 0;