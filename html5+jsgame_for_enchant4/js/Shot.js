enchant();
var Shot = Class.create(Sprite, {
    initialize: function(w,h){
        Sprite.call(this, w, h);
        this.image = game.assets[IMG_BULLET];
        this.vx = 12;
        this.vy = 10;
        this.onenterframe = function(){this.enterFrame();}
	},
	enterFrame:function(){
		this.x += this.vx;
		this.y += this.vy;
		if(player.scaleX == -1){
			this.x -= this.vx;
			this.y -= this.vy;
		}
		if (this.x < 0 || this.x > game.width - 20){
			this.scaleX *= -1;
            this.vx *= -1;
        }
        if (this.y < 0 || this.y > game.height - 50){
        	this.scaleY *= -1;
            this.vy *= -1;
        }
	},
	remove:function(){
		this.removeEventListener(Event.ENTER_FRAME,this.enterFrame);
	}
});