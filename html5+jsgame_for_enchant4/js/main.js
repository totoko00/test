enchant();

window.onload = preloadAssets;
var game;
var scene;
var shots;

var char_arr = new Array();
var enemy_arr = new Array();
var shots = new Array();

var IMG_PLAYER = "img/character2.png";
var IMG_ENEMY = "img/enemy1.png";
var IMG_BULLET = "img/bullet1.png";
var GAME_WIDTH = 750;
var GAME_HEIGHT = 500

function preloadAssets(){
    game = new Game(GAME_WIDTH, GAME_HEIGHT);
    game.preload(
        IMG_PLAYER
        ,IMG_ENEMY
        ,IMG_BULLET
    );
    game.onload = init;
    game.start();
}

function init(){
    game.scale = 1;
    game.fps = 30;
    game.keybind(90,"a");//Z key => [a]button
    game.keybind(67,"b");//C key => [b]button
    scene = new Scene();
    scene.backgroundColor = "#ffa";
    game.pushScene(scene);

    count = 0;
    //shots = [];

    player = new Player(100,100);
    scene.addChild(player);
    enemy = new Enemy();

    playtime = new Label("TiME: 00 ");
    playtime.color = "#F00";
    playtime.font = "normal normal 15px/1.0 monospace";
    scene.addChild(playtime);


    life = new Label("PLAYER:"+player.life);
    life.y = 17;
    life.color = "#F00";
    life.font = "normal normal 15px/1.0 monospace";
    scene.addChild(life);

    main();
}

function main(){
    game.addEventListener('bbuttondown',change);
    //game.addEventListener('abuttondown',shoot);
    game.onenterframe = function(){
        shoot();
        hit();
        bhit();
        enemyhit();
        gamecheck();
        playtime.text = ("TiME:"+ Math.floor(game.frame/game.fps));
    }
    player.move();
    enemy.enemy();
}

function change(){
    player.scaleX *= -1;
    if (player.scaleX == -1) {
        player.frame = 1;
    } else {
        player.frame = 0;
    }
}

function shoot(){
    var s = new Shot(30,20);
    var maxbullet = 4;
    var bullets = shots.length;
        if(bullets < maxbullet){
            s.x = player.x + player.width;
            s.y = player.y + player.height / 2;
            scene.addChild(s);
            shots.push(s);
        }
}

function hit(){
    var l = shots.length;
    for (var i = 0; i < l; i++) {
        for(var j = 0; j < 16; j++){
            if(player.scaleX == 1){
            if(shots[i].intersect(enemy_arr[j])){
                if(enemy_arr[j].life < 1){
                    shots[i].remove();
                    enemy_arr[j].remove();
                    scene.removeChild(shots[i]);
                    scene.removeChild(enemy_arr[j]);
                    enemy_arr.splice(j,1);
                    shots.splice(i,1);
                    i--;
                    l--;
                    j--;
                    return true;
                } else {
                    shots[i].remove();
                    scene.removeChild(shots[i]);
                    shots.splice(i,1);
                    enemy_arr[j].life--;
                    enemy_arr[j].frame++;
                    i--;
                    l--;
                    return true;
                }
            }
        }
    }
    }
}

function bhit(){
    var b = shots.length;
    for (var i = 0; i < b; i++) {
        if(count == 0 && shots[i].within(player,30)){
            shots[i].remove();
            scene.removeChild(shots[i]);
            shots.splice(i,1);
            i--;
            b--;
            player.life--;
            life.text = ("PLAYER:"+player.life);
            player.damage();
            count = 1;
            setTimeout(function(){
                count = 0;
            },2000);
        }
    }
}

function enemyhit(){
    var en = enemy_arr.length;
    for (var i = 0; i < en; i++) {
        if(count == 0 && enemy_arr[i].within(player,30)){
                player.life--;
                life.text = ("PLAYER:"+player.life);
                player.damage();
                count = 1;
                setTimeout(function(){
                    count = 0;
                },2000);
            }
    }
}

function gamecheck(){
    var ck = enemy_arr.length;
    if(ck < 1){
        game.stop();
        alert("GAME CLEAR! \n クリア"+playtime.text);
    }
    if(player.life < 1){
        game.stop();
        alert("GAME OVER");
    }
}