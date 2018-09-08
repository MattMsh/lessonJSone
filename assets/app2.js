const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const size = 1000;



//var grd = ctx.createLinearGradient(this.x, this.y, this.size, 0);
//grd.addColorStop(0, "rgba(255,0,0," + self.opacity + ")");
//grd.addColorStop(1, "rgba(255,0,0," + self.opacity + ")");


class Rect {
	constructor(){
		this.size = Math.random()*100;
		this.x = Math.random()*size - this.size;
		this.y = Math.random()*size - this.size;
		
		this.x = this.x <0 ? 0 : this.x;
		this.y = this.y <0 ? 0 : this.y;

		this.opacity = Math.random();
		this.movementIncrementX = Math.random()>0.5?1:-1;
		this.movementIncrementY = Math.random()>0.5?1:-1;
	}

	draw(){
		var grd = ctx.createLinearGradient(this.x, this.y, this.size, 0);
		grd.addColorStop(0, "rgba(255,0,0," + this.opacity + ")");
		grd.addColorStop(1, "rgba(255,0,0," + this.opacity + ")");
		ctx.fillStyle = grd;
		ctx.fillRect(this.x, this.y, this.size, this.size);		
	}
	move(){
		 if(((this.x+this.size) >size) || (this.x<0)) 
		  	this.movementIncrementX *= -1;        
		
		this.x += this.movementIncrementX;

		if(((this.y+this.size) >size) || (this.y<0)) 
		  	this.movementIncrementY *= -1;        

		this.y += this.movementIncrementY;
		
		this.draw();
	}
}

const figures = [];

for (var i = 0; i < 100; i++) {
	let rect = new Rect();
	rect.draw();
	figures.push(rect);
}

setInterval(function () {
	ctx.clearRect(0, 0, size, size);	
	figures.forEach(rect=>{
		rect.move();
	});
}, 1)