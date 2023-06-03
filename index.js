const fps = 60;
let screen;
let radius = 50;
let cor = 0.8;
let xAcc = 0;
let yAcc = 5000;

function generate(event)
{
	radius = document.querySelector('#radiusSlider').value * 0.5 * Math.min(screen.offsetWidth, screen.offsetHeight);
	cor = document.querySelector('#corSlider').value;
	ball = new Ball(1/fps, screen, radius, cor, xAcc, yAcc, event.clientX, event.clientY);
}

document.addEventListener('DOMContentLoaded', function() 
{
	screen = document.querySelector('#screen');
	screen.addEventListener('mousedown', generate);
});

// TODO make radius, bounce sliders; gravity slider, selector; colors