var canvas, height, width, context, vertexCapacity, mouseX, mouseY;
var vertexArray = [];

function varInit() {
    height = window.innerHeight;
    width = window.innerWidth;
    canvas = document.getElementById('home-canvas');
    context = canvas.getContext('2d');
    functionInit();
}

function functionInit() {
    setDimensions();
    canvasBackground();
    setVertexCapacity();
    pushVertex();
}

function setDimensions() {
    canvas.height = height;
    canvas.width = width;
}

window.addEventListener('resize', function () {
    setDimensions();
});

window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX + window.scrollX;
    mouseY = e.clientY + window.scrollY;
});

function canvasBackground() {
    context.beginPath();
    context.rect(0, 0, width, height);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
}

function drawLines(x, y, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.dx = dx;
    this.dy = dy;

    this.draw = (otherX, otherY) => {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(otherX, otherY);
        context.strokeStyle = this.color;
        context.stroke();
        context.closePath();
    }

    this.update = () => {

        if (this.x > width || this.x < 0) {
            this.dx *= -1;
        }
        if (this.y > height || this.y < 0) {
            this.dy *= -1;
        }
        for (var i = 0; i < vertexArray.length; i++) {
            if ((this.x + 50) > vertexArray[i].x && (this.x - 50) < vertexArray[i].x && (this.y + 50) > vertexArray[i].y && (this.y - 50) < vertexArray[i].y && this !== vertexArray[i]) {
                this.draw(vertexArray[i].x, vertexArray[i].y);
            }
        }
        if ((this.x + 100) > mouseX && (this.x - 100) < mouseX && (this.y + 100) > mouseY && (this.y - 100) < mouseY) {
            this.draw(mouseX, mouseY);
        }
        this.x += this.dx;
        this.y += this.dy;

    }
}

function setVertexCapacity() {
    vertexCapacity = (height + width) / 5;
}

function pushVertex() {
    for (var i = 0; i < vertexCapacity; i++) {
        var radius = 0;
        var x = Math.floor(Math.random() * width - (radius * 10)) + (radius * 10);
        var y = Math.floor(Math.random() * height - (radius * 10)) + (radius * 10);
        var dx = Math.floor(Math.random() * 2) + 1;
        var dy = Math.floor(Math.random() * 2) + 1;
        // var color = Math.floor(Math.random() * 4) + 1;
        switch (dx) {
            case 1:
                dx = 0.8;
                break;
            case 2:
                dx = -0.8;
                break;
            default:
                break;
        }
        switch (dy) {
            case 1:
                dy = 0.8;
                break;
            case 2:
                dy = -0.8;
                break;
            default:
                break;
        }
        // switch (color) {
        //     case 1:
        //         color = "red";
        //         break;
        //     case 2:
        //         color = "green";
        //         break;
        //     case 3:
        //         color = "yellow";
        //         break;
        //     case 4:
        //         color = "blue";
        //         break;
        //     default:
        //         break;
        // }
        var color = "grey";
        vertexArray.push(new drawLines(x, y, color, dx, dy));
    }
}

function animate() {
    context.clearRect(0, 0, width, height);
    canvasBackground();
    for (var i = 0; i < vertexCapacity; i++) {
        vertexArray[i].update();
    }
    requestAnimationFrame(animate);
}

varInit();
animate();