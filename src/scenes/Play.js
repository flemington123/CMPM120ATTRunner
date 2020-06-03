class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('Stone', './assets/Stone.png');
        this.load.image('Gold', './assets/Gold.png');
        this.load.image('Back', './assets/Back.png');
        this.load.image('Water', './assets/Water.jpg');
        this.load.image('RabbitDie', './assets/rabbitdie.png');
        this.load.image('Wall', './assets/Wall.png');
        this.load.image('Gate', './assets/Gate.png');
        this.load.audio('Become', './assets/Become.mp3');
        this.load.spritesheet('Rabbit', './assets/rabbitAtlas.png', {frameWidth: 60, frameHeight: 110, });
        this.load.audio('music', './assets/BGM.mp3');
    }
    isPlaying = false;
    create() {
        //////////////////////// add background ///////////////////////
        this.Back = this.add.tileSprite(0, 0, game.config.width, game.config.height + 250, 'Back').setScale(1, 0.7).setOrigin(0, 0); 
        game.music.play();  

        //////////////////////// add objects ///////////////////////
        this.water = new Water(this, game.config.width*3, 0, 'Water', 0).setScale(1, 1.8).setOrigin(0,0);
        
        
        this.rock01 = new Rock(this, game.config.width + 192, Math.random() * 100 + 100, 'Stone', 0).setScale(0.25, 0.25).setOrigin(0,0);
        this.rock02 = new Rock(this, game.config.width + 96, Math.random() * 200 + 100, 'Stone', 0).setScale(0.25, 0.25).setOrigin(0,0);
        this.rock03 = new Rock(this, game.config.width, Math.random() * 300 + 100, 'Stone', 0).setScale(0.25, 0.25).setOrigin(0,0);
        this.wall = new Wall(this, game.config.width, 0, 'Wall', 0).setScale(0.35, 0.6).setOrigin(0,0);
        this.gate = new Gate(this, game.config.width + 35, 150, 'Gate', 0).setScale(0.35, 0.45).setOrigin(0,0);
        
        this.gold = new Gold(this, game.config.width, Math.random() * 300 + 100, 'Gold', 0, 50, 4).setOrigin(0,0);

        //////////////////////// add rabbit ///////////////////////
        this.rabbit = new Rabbit(this, 20, game.config.height/2, 'Rabbit').setScale(0.5, 0.5).setOrigin(0, 0);
        this.anims.create({
            key: 'RabbitAnimas',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('Rabbit', {start: 0, end: 7, first: 0}),
            frameRate: 6
        });
        this.rabbit.play('RabbitAnimas');

        //////////////////////// add border ///////////////////////
        this.add.rectangle(0, 0, game.config.width, 12, 0x000000).setOrigin(0, 0);// up
        this.add.rectangle(0, game.config.height - 12, game.config.width, 12, 0x000000).setOrigin(0, 0); // down
        this.add.rectangle(0, 0, 12, game.config.height, 0x000000).setOrigin(0, 0); // left
        this.add.rectangle(game.config.width - 12, 0, 12, game.config.height, 0x000000).setOrigin(0, 0); // right
        
        //////////////////////// define keys ///////////////////////
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //////////////////////// rabbit animation ///////////////////////
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        //////////////////////// add score ///////////////////////
        this.p1Score = 0;
        this.hScore = highScore;

        //////////////////////// score UI config ///////////////////////
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 130
        }
        this.scoreLeft = this.add.text((game.config.width/3)-200, 20, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width-200, 20,"HS: " + this.hScore, scoreConfig);

        //////////////////////// game over flag ///////////////////////
        this.gameOver = false;
        scoreConfig.fixedWidth = 0;
        this.Scale = 0;
    }

    update() {
        // check key input for restart / menu
        this.Back.tilePositionX += 2;
        if (this.gameOver){
            let scoreConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 150
            }
            this.add.text(game.config.width/2, game.config.height/2 - 64, 'GAME OVER', scoreConfig).setOrigin(0.5);
            scoreConfig.fixedWidth = 360;
            this.add.text(game.config.width/2, game.config.height/2, 'Press "F" to restart', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press "SPACE" to menu', scoreConfig).setOrigin(0.5);
            this.Back.tilePositionX += -2;
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            highScore = this.p1Score;
            console.log(highScore);
            //game.music.setLoop(false);
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("menuScene");
            //game.music.setLoop(false);
        }
        //////////////////////// object reflesh ///////////////////////
        if (!this.gameOver) {               
            this.rabbit.update();       
            this.rock01.update();        
            this.rock02.update();
            this.rock03.update();
            this.gold.update();
            this.water.update();
            this.wall.update();
            this.gate.update();
        }    

        //////////////////////// change scale ///////////////////////
        if (!this.gameOver && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if(this.Scale == 0){
                this.rabbit.setScale(1,1);
                this.sound.play('Become'); 
                this.Scale = 1;
            }else if(this.Scale == 1){
                this.rabbit.setScale(0.5,0.5);
                this.Scale = 0;
                this.sound.play('Become'); 
            }
        }
        

        //////////////////////// collision ///////////////////////
        if((this.checkCollision(this.rabbit, this.rock03))&&(!this.checkCollision(this.rabbit, this.gate))){
                this.rabbit.destroy();
                this.add.sprite(this.rabbit.x, this.rabbit.y + 40, 'RabbitDie').setScale(0.08, 0.08);
                this.gameOver = true;
                this.add.text(game.config.width/2, game.config.height/2 - 128, 'rock3').setOrigin(0.5);
        }

        if((this.checkCollision(this.rabbit, this.rock02))&&(!this.checkCollision(this.rabbit, this.gate))){
                this.rabbit.destroy();
                this.add.sprite(this.rabbit.x, this.rabbit.y + 40, 'RabbitDie').setScale(0.08, 0.08);
                this.gameOver = true;
                this.add.text(game.config.width/2, game.config.height/2 - 128, 'rock2').setOrigin(0.5);
        }
        
        if((this.checkCollision(this.rabbit, this.rock01))&&(!this.checkCollision(this.rabbit, this.gate))){
            //if(this.Scale == 0){
                this.rabbit.destroy();
                this.add.sprite(this.rabbit.x, this.rabbit.y + 40, 'RabbitDie').setScale(0.08, 0.08);
                this.gameOver = true;
                this.add.text(game.config.width/2, game.config.height/2 - 128, 'rock1').setOrigin(0.5);
            //}else{
            //    this.rock01.reset();
            //    this.rock01.y = Math.random() * 300 + 100;
            //}
        }

        if (this.checkCollisionWater(this.rabbit, this.water)){
            if(this.Scale == 0){
                this.rabbit.destroy();
                this.add.sprite(this.rabbit.x, this.rabbit.y + 40, 'RabbitDie').setScale(0.08, 0.08);
                this.gameOver = true;
                this.add.text(game.config.width/2, game.config.height/2 - 128, 'water').setOrigin(0.5);
            }
        }
        if ((this.checkCollisionWall(this.rabbit, this.wall))&&(!this.checkCollisionGate(this.rabbit, this.gate))){
                this.rabbit.destroy();
                this.add.sprite(this.rabbit.x, this.rabbit.y + 40, 'RabbitDie').setScale(0.08, 0.08);
                this.gameOver = true;
                this.add.text(game.config.width/2, game.config.height/2 - 128, 'wall').setOrigin(0.5);
        }
        if (this.checkCollisionGate(this.rabbit, this.gate)){
            if(this.Scale == 1){
                this.rabbit.destroy();
                this.add.sprite(this.rabbit.x, this.rabbit.y + 40, 'RabbitDie').setScale(0.08, 0.08);
                this.gameOver = true;
                this.add.text(game.config.width/2, game.config.height/2 - 128, 'gate').setOrigin(0.5);
            }
        }
        
        if (this.checkCollisionGold(this.rabbit, this.gold)) {
            this.p1Score += this.gold.points;
            this.scoreLeft.text = this.p1Score;  
            this.sound.play('Eat'); 
            this.gold.reset();
            this.gold.y = Math.random() * 300 + 100;
        }

        if(this.hScore <= this.p1Score){
            this.scoreRight.setText("HS: " + this.p1Score) ;
        }

    }
    checkCollision(rabbit, rock) {
        if(this.Scale == 0){
            if(rabbit.x < rock.x + rock.width*0.15 && 
                rabbit.x + rabbit.width*0.25 > rock.x && 
                rabbit.y < rock.y + rock.height*0.15 &&
                rabbit.height*0.25 + rabbit.y > rock.y) {
                    return true;
            } else {
                return false;
            }   
        }if(this.Scale == 1){
            if(rabbit.x < rock.x + rock.width*0.15 && 
                rabbit.x + rabbit.width*0.5 > rock.x && 
                rabbit.y < rock.y + rock.height*0.15 &&
                rabbit.height*0.7 + rabbit.y > rock.y) {
                    return true;
            } else {
                return false;
            }   
        }
    }
    //////////////////////// Water collision ///////////////////////
    checkCollisionWater(rabbit, water) {
        if(this.Scale == 0){
            if(rabbit.x < water.x + water.width && 
                rabbit.x + rabbit.width - 40 > water.x && 
                rabbit.y < water.y + water.height &&
                rabbit.height + rabbit.y > water.y) {
                    return true;
            }else{
                return false;
            }
        }else{
            if(rabbit.x < water.x + water.width*0.5 && 
                rabbit.x + rabbit.width*0.5 > water.x && 
                rabbit.y + 40 < water.y + water.height*0.5 &&
                rabbit.height*0.5 + rabbit.y + 20 > water.y) {
                    return true;
            }else{
                return false;
            }   
        }
    }
    //////////////////////// Wall collision ///////////////////////
    checkCollisionWall(rabbit, wall) {
        if(this.Scale == 1){
            if(rabbit.x < wall.x + 80 + wall.width* 0.25 && 
                rabbit.x + rabbit.width > wall.x + 80 && 
                rabbit.y < wall.y + wall.height* 0.4 &&
                rabbit.height + rabbit.y > wall.y) {
                    return true;
            }else{
                return false;
            }
        }else{
            if(rabbit.x < wall.x + 80 + wall.width* 0.25 && 
                rabbit.x + rabbit.width > wall.x + 80 && 
                rabbit.y  < wall.y + wall.height* 0.4 &&
                rabbit.height + rabbit.y > wall.y) {
                    return true;
            }else{
                return false;
            }   
        }
    }
    //////////////////////// Gate collision ///////////////////////
    checkCollisionGate(rabbit, gate) {
        if(this.Scale == 1){
            if(rabbit.x < gate.x + gate.width * 1.5 && 
                rabbit.x + rabbit.width > gate.x && 
                rabbit.y < gate.y + gate.height * 1.5 &&
                rabbit.height + rabbit.y > gate.y) {
                    return true;
            }else{
                return false;
            }
        }else{
            if(rabbit.x < gate.x + gate.width * 1.5 && 
                rabbit.x + rabbit.width > gate.x && 
                rabbit.y  < gate.y + gate.height * 1.5 &&
                rabbit.height + rabbit.y > gate.y) {
                    return true;
            }else{
                return false;
            }   
        }
    }
    checkCollisionGold(rabbit, rock) {
        if(rabbit.x < rock.x + rock.width*0.25 && 
            rabbit.x + rabbit.width*0.25 > rock.x && 
            rabbit.y < rock.y + rock.height*0.5 &&
            rabbit.height*0.25 + rabbit.y > rock.y) {
                return true;
        }else{
            return false;
        }
    }
}