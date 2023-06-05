const power = 15;
const minSpeedRetainedAfterFriction = 0.8;
const colors = ["7400b8","6930c3","5e60ce","5390d9","4ea8de","48bfe3","56cfe1","64dfdf","72efdd","80ffdb"];

class Ball
{
	constructor(frameLength, screen, radius, cor, xAcc, yAcc, mouseXPos, mouseYPos)
	{
		this.element = document.createElement('span');
		this.frameLength = frameLength; // in seconds
		this.radius = radius;
		this.cor = cor // bounciness
		this.speedRetainedAfterFriction = this.cor + minSpeedRetainedAfterFriction*(1-this.cor);
		this.xAcc = xAcc; // in px per second
		this.yAcc = yAcc;
		this.xVel = 0;
		this.yVel = 0;
		this.xPos = mouseXPos - this.radius;
		this.yPos = mouseYPos - this.radius;

		// generate circle
		this.element.object = this;
		this.element.className = 'circle';
		this.element.style.width = 2*this.radius + 'px';
		this.element.style.height = 2*this.radius + 'px';
		this.element.style.position = 'absolute';
		this.element.style.left = this.xPos + 'px';
		this.element.style.top = this.yPos + 'px';
		this.element.style.background = '#' + colors[Math.floor(Math.random()*colors.length)];
		screen.appendChild(this.element);

		document.addEventListener('mouseup', this.release.bind(this), {once: true});
	}

	release(event)
	{
		let xDiff = (this.xPos+this.radius) - event.clientX;
		let yDiff = (this.yPos+this.radius) - event.clientY;

		// randomize initial velocity if user clicked in place (e.g. on a touchscreen)
		if (xDiff === 0 && yDiff === 0)
		{
			xDiff = this.xPos - (Math.random() * screen.offsetWidth);
			yDiff = this.yPos - (Math.random() * screen.offsetHeight);
		}

		this.xVel = power * xDiff;
		this.yVel = power * yDiff;
		const animator = setInterval(this.redraw.bind(this), this.frameLength*1000);

		$(this.element).mousedown(function(event)
		{
			if (event.which === 3)
			{
				this.element.remove();
				clearInterval(animator);
			}
		}.bind(this));
	}

	redraw()
	{
		this.xVel += this.xAcc * this.frameLength;
		this.yVel += this.yAcc * this.frameLength;
		this.xPos += this.xVel*this.frameLength - 0.5*this.xAcc*Math.pow(this.frameLength, 2);
		this.yPos += this.yVel*this.frameLength - 0.5*this.yAcc*Math.pow(this.frameLength, 2);
		this.bounce();
		this.element.style.left = this.xPos + 'px';
		this.element.style.top = this.yPos + 'px';
	}

	bounce()
	{
		let vals;
		if (this.xPos < 0 || this.xPos + 2*this.radius > screen.offsetWidth)
		{
			if (this.xPos < 0)
			{
				vals = this.calculateBounce(this.xAcc, this.xVel, this.xPos, "above", 0);
				
			}
			else if (this.xPos + 2*this.radius > screen.offsetWidth)
			{
				vals = this.calculateBounce(this.xAcc, this.xVel, this.xPos, "below", screen.offsetWidth);
			}
			this.xVel = vals.vel;
			this.xPos = vals.pos;
			this.yVel *= this.speedRetainedAfterFriction;
		}

			
		if (this.yPos < 0 || this.yPos + 2*this.radius > screen.offsetHeight)
		{
			if (this.yPos < 0)
			{
				vals = this.calculateBounce(this.yAcc, this.yVel, this.yPos, "above", 0);
				
			}
			else if (this.yPos + 2*this.radius > screen.offsetHeight)
			{
				vals = this.calculateBounce(this.yAcc, this.yVel, this.yPos, "below", screen.offsetHeight);
			}
			this.yVel = vals.vel;
			this.yPos = vals.pos;
			this.xVel *= this.speedRetainedAfterFriction;
		}
	}

	calculateBounce(acc, vel, pos, approach, boundary)
	{
		if (approach === "above")
		{
			if (acc == 0)
			{
				vel = -vel * this.cor;
				pos = -pos * this.cor;
			}
			else if (vel > 1.1 * acc * this.frameLength)
			{
				vel = 0;
				pos = 0;
			}
			else
			{
				/*
				if (Math.pow(vel, 2) - 2*acc*pos < 0)
				{
					console.log("ERROR", vel, Math.pow(vel, 2), acc, pos, 2*acc*pos);
				}
				*/
				let timeClipping = (vel+Math.abs(Math.pow((Math.pow(vel, 2) - 2*acc*pos), 0.5)))/acc;
				vel = (-(vel - acc*timeClipping) * this.cor) + acc*timeClipping;
				pos = vel*timeClipping - 0.5*acc*Math.pow(timeClipping, 2);
				if (pos < 0)
				{
					vel = 0;
					pos = 0;
				}
			}
		}
		else
		{
			pos = pos + 2*this.radius - boundary;
			if (acc === 0)
			{
				vel = -vel * this.cor;
				pos = -pos * this.cor;
			}
			else if (vel < 1.1 * acc * this.frameLength)
			{
				vel = 0;
				pos = 0;
			}
			else
			{
				/*
				if (Math.pow(vel, 2) - 2*acc*pos < 0)
				{
					console.log("ERROR", vel, Math.pow(vel, 2), acc, pos, 2*acc*pos);
				}
				*/
				let timeClipping = (vel-Math.abs(Math.pow(Math.abs((Math.pow(vel, 2) - 2*acc*pos)), 0.5)))/acc;
				vel = (-(vel - acc*timeClipping) * this.cor) + acc*timeClipping;
				pos = vel*timeClipping - 0.5*acc*Math.pow(timeClipping, 2);
				if (pos > 0)
				{
					vel = 0;
					pos = 0;
				}
			}
			pos += boundary - 2*this.radius;
		}
		return {
			vel: vel,
			pos: pos
		};
	}

	updateGravity(magnitude, accCoefficients)
	{
		this.xAcc = magnitude*accCoefficients[0];
		this.yAcc = magnitude*accCoefficients[1];
	}
}