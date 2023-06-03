const fps = 60;
let screen;
let radius = 50;

function generate(event)
{
	ball = new Ball(1/fps, screen, radius, event.clientX, event.clientY);
}

document.addEventListener('DOMContentLoaded', function() 
{
	screen = document.querySelector('div');
	document.addEventListener('mousedown', generate);
});

// TODO make radius, bounce sliders; gravity selector; colors