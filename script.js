var canvas =document.querySelector('canvas');
var c = canvas.getContext('2d');

//Position of mouse
var mouse = {
    x: undefined,
    y: undefined
}
//Make canvas fill the size of the window
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;



//Defining radius of the circle
var maxRadius = 30;
//var minRadius = 20;

//Colors for circle
var colorArray = [
    '#08D9D6',
    '#252A34',
    '#FF2E63',
    '#EAEAEA',
 ];

//Event listener for mouse movement
window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;

    })

//Event listener for windows resize
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init()
})


//Circle Creation
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
  //Randomize the color of circles
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
//Draw a circle
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }


    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;



        this.draw();
    }
}

//Randomize circle radius circle position 
//Create Number of circles
var circleArray = [];
function init() {
    circleArray=[];
    
    for (var i = 0; i < 800; i++) {
        var radius = Math.random() * 6 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));
        //var circle = new Circle(x, y, dx, dy, radius);
    }

}

//Animate the circles
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
init();
animate();