function preload() {
    this.load.image('grass', 'tile_0017.png');
    this.load.image('wheelbarrow', 'tile_0057.png');
    this.load.image('mapimage', 'tilemap_packed.png');        
    this.load.image('coin', 'tile_0093.png');
    this.load.image('empty', 'tile_0130.png');
    this.load.image('full', 'tile_0131.png');    
    this.load.tilemapTiledJSON('map', 'Map.json');
}

function create() {
    map = this.add.tilemap('map');
    var groundTiles = map.addTilesetImage('tilemap_packed', 'mapimage');
    var floorLayer = map.createStaticLayer('floors', groundTiles, 0, 0);
    var houseLayer = map.createDynamicLayer('houses', groundTiles, 0, 0);
    wheelbarrow = this.physics.add.sprite(218, 250, 'wheelbarrow').setInteractive();
    wheelbarrow.moved = false;
    wheelbarrow.on('pointerdown', function (pointer) {
        moveWheelbarrow(wheelbarrow)
    });
    empty = this.physics.add.sprite(440, 296, 'empty').setInteractive();        
    empty.on('pointerdown', function (pointer) {
        fillBucketWithWater(empty);
    });
    coin1 = this.physics.add.sprite(374, 96, 'coin');
    coin2 = this.physics.add.sprite(374, 80, 'coin');
    coin3 = this.physics.add.sprite(374, 64, 'coin');
    grass1 = this.physics.add.sprite(58, 265, 'grass');
    grass2 = this.physics.add.sprite(74, 265, 'grass');
    grass3 = this.physics.add.sprite(58, 280, 'grass');
    grass4 = this.physics.add.sprite(74, 280, 'grass');
    houseLayer.setCollisionByProperty({'deflects': true});
    const r2 = this.add.rectangle(240, 450, 472, 255, 0xffffff);
    r2.setStrokeStyle(5, 0x0000ff);
    instructions = "- Quests available:"
    styleList = { fontSize: '18px bold', fill: '#fff' };
    text1 = this.add.text(15, 235, '- Quests available:', { fontSize: '22px bold', fill: '#fff' });
    text2 = this.add.text(15, 270, '> Remove the grass from yard', styleList);
    text3 = this.add.text(15, 290, '> Move away the wheelbarrow', styleList);
    text4 = this.add.text(15, 310, '> Fill the empty bucket with water', styleList);
    text5 = this.add.text(15, 330, '> Collect all the coins', styleList);
    text6 = this.add.text(15, 350, '', styleList);
    text7 = this.add.text(15, 370, '', styleList);
    text8 = this.add.text(15, 390, '', styleList);
    text9 = this.add.text(15, 410, '', styleList);
    text1.setTintFill(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);
    text2.setTintFill(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);
    text3.setTintFill(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);
    text4.setTintFill(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);
    text5.setTintFill(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);
    text6.setTintFill(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);
    text7.setTintFill(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);
    text8.setTintFill(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);
    text9.setTintFill(0xff00ff, 0xff00ff, 0x0000ff, 0x0000ff);
    grassGroup = this.physics.add.group();
    grassGroup.add(grass1);
    grassGroup.add(grass2);
    grassGroup.add(grass3);
    grassGroup.add(grass4);
    grassGroup.children.each(function(sprite) {
        sprite.setInteractive();
        sprite.on('pointerdown', function (pointer) {
            removeGrass(sprite);
        });
    });
    coinsGroup = this.physics.add.group();
    coinsGroup.add(coin1);
    coinsGroup.add(coin2);
    coinsGroup.add(coin3);
    coinsGroup.children.each(function(sprite) {
        sprite.setInteractive();
        sprite.on('pointerdown', function (pointer) {
            collectCoins(sprite);
        });
    });
}

function removeGrass(grass) {       
    grass.destroy();
    if(grassGroup.countActive() === 0) {
        clearText();
        text1.text = "- Formação:";
        text2.text = "> "
        text3.text = "> "
        text4.text = "> "
        text5.text = "> "
    }
}

function moveWheelbarrow(sprite) {
    if(sprite.moved === false) {
        clearText();
        sprite.x = sprite.x + 10;
        text1.text = "- Experiência Profissional:";
        text2.text = "> "
        text3.text = "> "
        text4.text = "> "
        text5.text = "> "
    }
    sprite.moved = true;        
}

function fillBucketWithWater(sprite) {
    if(sprite.texture.key === 'empty') {
        clearText();
        text1.text = "- Outros Cursos:";
        text2.text = "> "
        text3.text = "> "            
        text4.text = "> "
        text5.text = "> "
        text6.text = "> "
        text7.text = "> "
        text8.text = "> "
        text9.text = "> "
    }
    sprite.setTexture('full');
}

function collectCoins(coin) {        
    coin.destroy();
    if(coinsGroup.countActive() === 0) {
        clearText();
        text1.text = "- Áreas de Interesse:";
        text2.text = "> "
        text3.text = "> "            
        text4.text = "> "
        text5.text = "> "
        text6.text = "> "
        text7.text = "> "
        text8.text = "> "
        text9.text = "> "
    }
}

function clearText() {
    text1.text = "";
    text2.text = ""
    text3.text = ""            
    text4.text = ""
    text5.text = ""
    text6.text = ""
    text7.text = ""
    text8.text = ""
    text9.text = ""
}

function update() {                
}

var config = {
    type: Phaser.AUTO,
    parent: "game",
    width: 480,
    height: 580,
    backgroundColor: '#fff',
    scene: {
        preload: preload,
        create: create
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
var map;
var wheelbarrow, empty, full, coin1, coin2, coin3, grass1, grass2, grass3, grass4;
var coinsGroup, grassGroup;
var text1, text2, text3, text4, text5, text6, text7, text8, text9;