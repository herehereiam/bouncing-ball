const fps = 60;
let screen;
let radius;
let cor;
let gravity = 5000;
let accCoefficients = [0, 1];

function generate(event)
{
	radius = Number(document.querySelector('#radiusSlider').value) * 0.5 * Math.min(screen.offsetWidth, screen.offsetHeight);
	cor = Number(document.querySelector('#corSlider').value);
	gravity = Number(document.querySelector('#gravitySlider').value);
	ball = new Ball(1/fps, screen, radius, cor, gravity*accCoefficients[0], gravity*accCoefficients[1], event.clientX, event.clientY);
}

document.addEventListener('DOMContentLoaded', function() 
{
	screen = document.querySelector('#screen');
	$(screen).mousedown(function(event)
	{
		if (event.which === 1)
		{
			generate(event);
		}
	});

	$(':button').click(function()
	{
		switch ($(this).attr('id'))
		{
			case 'up':
				accCoefficients = [0, -1];
				break;
			case 'upright':
				accCoefficients = [Math.pow(2, 0.5)/2, -Math.pow(2, 0.5)/2];
				break;
			case 'right':
				accCoefficients = [1, 0];
				break;
			case 'downright':
				accCoefficients = [Math.pow(2, 0.5)/2, Math.pow(2, 0.5)/2];
				break;
			case 'down':
				accCoefficients = [0, 1];
				break;
			case 'downleft':
				accCoefficients = [-Math.pow(2, 0.5)/2, Math.pow(2, 0.5)/2];
				break;
			case 'left':
				accCoefficients = [-1, 0];
				break;
			case 'upleft':
				accCoefficients = [-Math.pow(2, 0.5)/2, -Math.pow(2, 0.5)/2];
				break;
			case 'center':
				accCoefficients = [0, 0];
				break;
		}

		$('.circle').each(function()
		{
			$(this).prop('object').updateGravity(gravity, accCoefficients);
		});
	});
});

// TODO make gravity slider, selector; colors