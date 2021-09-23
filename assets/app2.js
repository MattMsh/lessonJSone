const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const size = 1000;
const NUMBER_OF_FIGURES = 100;

//var grd = ctx.createLinearGradient(this.x, this.y, this.size, 0);
//grd.addColorStop(0, "rgba(255,0,0," + self.opacity + ")");
//grd.addColorStop(1, "rgba(255,0,0," + self.opacity + ")");

class Shape {
	constructor() {
		this.size = Math.random() * 100;
		this.x = Math.random() * size - this.size;
		this.y = Math.random() * size - this.size;

		this.x = this.x < 0 ? 0 : this.x;
		this.y = this.y < 0 ? 0 : this.y;

		this.opacity = Math.random();
		this.movementIncrementX = Math.random() > 0.5 ? 1 : -1;
		this.movementIncrementY = Math.random() > 0.5 ? 1 : -1;
		this.random = Math.random();
	}
	draw() { }
	move() {
		if (((this.x + this.size) > size) || (this.x < 0))
			this.movementIncrementX *= -1;

		this.x += this.movementIncrementX * this.random;

		if (((this.y + this.size) > size) || (this.y < 0))
			this.movementIncrementY *= -1;

		this.y += this.movementIncrementY * this.random;

		this.draw();
	}
	update() {
		this.random = Math.random();
	}
}

class Rect extends Shape {
	constructor() {
		super();
	}

	draw() {
		var grd = ctx.createLinearGradient(this.x, this.y, this.size, 0);
		grd.addColorStop(0, "rgba(255,0,0," + this.opacity + ")");
		grd.addColorStop(1, "rgba(255,0,0," + this.opacity + ")");
		ctx.fillStyle = grd;
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}
}

class Star extends Shape {
	constructor() {
		super();
		this.step = Math.PI / 4;
		this.rotation = Math.PI / 2 * 3;
		this.NUMBER_OF_SPIKES = 4;
	}
	drawLine = (radius) => {
		let x = this.x + Math.cos(this.rotation) * radius;
		let y = this.y + Math.sin(this.rotation) * radius;
		ctx.lineTo(x, y);
		this.rotation += this.step;
	}

	draw() {
		var grd = ctx.createLinearGradient(this.x, this.y, this.size, 0);
		grd.addColorStop(0, "rgba(255,0,0," + this.opacity + ")");
		grd.addColorStop(1, "rgba(255,0,0," + this.opacity + ")");
		ctx.fillStyle = grd;

		ctx.beginPath();
		ctx.moveTo(this.x, this.y - this.size)
		for (let i = 0; i < this.NUMBER_OF_SPIKES; i++) {
			this.drawLine(this.size);
			this.drawLine(this.size / 2);
		}
		ctx.lineTo(this.x, this.y - this.size);
		ctx.closePath();

		ctx.fill();
	}
}

const createShapes = () => {
	const figures = [];

	for (let i = 0; i < NUMBER_OF_FIGURES; i++) {
		let figure;
		Math.random() < 0.5 ? figure = new Rect() : figure = new Star();
		figures.push(figure);
		figure.draw();
	}

	return figures;
}

const shapes = createShapes();

setInterval(function () {
	ctx.clearRect(0, 0, size, size);
	shapes.map(figure => {
		figure.move();
	});
}, 1)

setInterval(function () {
	shapes.map(figure => {
		figure.update();
	})
}, 1000)