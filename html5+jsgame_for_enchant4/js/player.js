enchant();
Player = Class.create(Sprite, {
	initialize: function(w,h){
    //操作するキャラ
    	Sprite.call(this, w, h);
    	this.image = game.assets[IMG_PLAYER];
    	this.x = game.width / 2 - this.width / 2;;
    	this.y = game.height / 2 - this.height / 2;
    	this.frame = 0;
    	this.life = 3;
    	this.vx = 0;
    	this.vy = 0;
    	this.maxVy = 9;
    	this.maxVx = 9;
    	this.accel = 1.5;
    	this.retarding = 0.9;
    },
    onenterframe: function(){
    	if(this.vx > this.maxVx) this.vx = this.maxVx;
		if(this.vx < -this.maxVx) this.vx = -this.maxVx;
		if(this.vy > this.maxVy) this.vy = this.maxVy;
		if(this.vy < -this.maxVy) this.vy = -this.maxVy;
		this.x += this.vx;
		this.y += this.vy;
		this.vx *= this.retarding;
		this.vy*=this.retarding;
		if(this.x > game.width -240) this.x = game.width -240;
		if(this.x < /*game.width +*/ 200) this.x = /*game.width + */200;
		if(this.y > game.height - this.height) this.y = game.height - this.height;
		if(this.y < 0) this.y = 0;
    },
    move: function(){
    	this.addEventListener(Event.ENTER_FRAME, function(){
            if (game.input.up){ this.vy -= this.accel; }
            if (game.input.down){ this.vy += this.accel; }
            if (game.input.right){ this.vx += this.accel; }
            if (game.input.left){ this.vx -= this.accel; }
        });
    },
    damage:function(){
		var tgarget = this;
			tgarget.opacity = 0.5;
		setTimeout(function(){
			tgarget.opacity = 1;
		},1500);
	}
});