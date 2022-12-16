const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width  =  innerWidth;
canvas.height = innerHeight;

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 50;
let minRadius = 2;

let colorArray = [
    "#CF4B5F",
    "#805677",
    "#C06C80",
    "#F18D76",
    "#FFBE68",
    "#F9F871"
]

addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init()
})

class Circle {
    constructor(x, y, radius, color, fill, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.minRadius = radius;
        this.color = color;
        this.fill = fill;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        if (this.fill) {
            c.fillStyle = this.color;
            c.fill()
        } else {
            c.strokeStyle = this.color;
            c.stroke()
        }
    }

    update() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if(this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

let circleArray = [];

function init() {
    circleArray = []
    for (let i = 0; i <= 400; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let color = colorArray[Math.floor(Math.random() * colorArray.length)];
        let dx = (Math.random() - 0.5) * 5;
        let dy = (Math.random() - 0.5) * 5;

        circleArray.push(new Circle(x, y, radius, color, true, dx, dy))
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight)
    circleArray.forEach(circle => {
        circle.update();
    }) 
}

init()
animate()
