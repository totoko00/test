enchant();

Enemy = Class.create(Sprite, {
enemy: function(){
    for(var i = 0;i < 15;i++){
            var enemy = new Sprite(50, 50);
            enemy.frame = 0;
            enemy.image = game.assets[IMG_ENEMY];
            enemy.x = game.width - 50;
            enemy.y = game.height - 50;
            enemy.life = 2;
            enemy.counter = Math.floor(Math.random() * 100) + 100;
            enemy.dx = Math.floor(Math.random() * 15);
            enemy.dy = Math.floor(Math.random() * 15);
            enemy.addEventListener(enchant.Event.ENTER_FRAME, function(){
                this.counter--;
                if (this.counter <= 0){
                    this.counter = Math.floor(Math.random() * 100) + 100;
                    this.dx = Math.floor(Math.random() * 15);
                    this.dy = Math.floor(Math.random() * 15);
                }
                this.x += this.dx;
                this.y += this.dy;
                if(player.scaleX == -1){
                    this.x -= this.dx;
                    this.y -= this.dy;
                }
                if (this.x < 0 || this.x > game.width - 50){
                    this.dx *= -1;
                }
                if (this.y < 0 || this.y > game.height - 50){
                    this.dy *= -1;
                }
            });
            scene.addChild(enemy);
            enemy_arr[i] = enemy;
        }
    }
});