const fps = 50;
const interval = 1000/fps;
let screen;
let ball; // TODO make ball an object
let radius = 50;

function generate(event)
{
	ball = document.createElement('span');
	ball.className = 'circle';
	ball.style.width = 2*radius + 'px';
	ball.style.height = 2*radius + 'px';
	ball.style.position = 'absolute';
	ball.style.left = (event.clientX - radius) + 'px';
	ball.style.top =  (event.clientY - radius) + 'px';
	screen.appendChild(ball);
}

function redraw()
{
	if (ball !== undefined)
	{
		ball.style.top = parseInt(ball.style.top) + 5 + 'px'; // TODO make velocity
	}
}

document.addEventListener('DOMContentLoaded', function() 
{
	screen = document.querySelector('div');
	setInterval(redraw, interval);
})

document.addEventListener('mousedown', generate)