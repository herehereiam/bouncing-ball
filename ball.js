const power = 15;
const minSpeedRetainedAfterFriction = 0.8;

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
		this.element.className = 'circle';
		this.element.style.width = 2*this.radius + 'px';
		this.element.style.height = 2*this.radius + 'px';
		this.element.style.position = 'absolute';
		this.element.style.left = this.xPos + 'px';
		this.element.style.top = this.yPos + 'px';
		screen.appendChild(this.element);

		document.addEventListener('mouseup', this.release.bind(this), {once: true});
	}

	release(event)
	{
		let xDiff = (this.xPos+this.radius) - event.clientX;
		let yDiff = (this.yPos+this.radius) - event.clientY;

		// randomize initial velocity if user clicked in place (e.g. on a touchscreen)
		if (xDiff == 0 && yDiff == 0)
		{
			xDiff = this.xPos - (Math.random() * screen.offsetWidth);
			yDiff = this.yPos - (Math.random() * screen.offsetHeight);
		}

		this.xVel = power * xDiff;
		this.yVel = power * yDiff;
		setInterval(this.redraw.bind(this), this.frameLength*1000);
	}

	redraw()
	{
		this.xVel += this.xAcc * this.frameLength;
		this.yVel += this.yAcc * this.frameLength;
		this.xPos += this.xVel * this.frameLength;
		this.yPos += this.yVel * this.frameLength;
		this.bounce();
		this.element.style.left = this.xPos + 'px';
		this.element.style.top = this.yPos + 'px';
	}

	bounce() // TODO fix jitter at bottom; add friction
	{
		if (this.xPos < 0)
		{
			this.xVel = -this.xVel * this.cor;
			this.yVel *= this.speedRetainedAfterFriction;
			this.xPos = -this.xPos;
		}
		else if (this.xPos + 2*this.radius > screen.offsetWidth)
		{
			this.xVel = -this.xVel * this.cor;
			this.yVel *= this.speedRetainedAfterFriction;
			this.xPos = (screen.offsetWidth - ((this.xPos+2*this.radius)-screen.offsetWidth)) - 2*this.radius;
		}

		if (this.yPos < 0)
		{
			this.yVel = -this.yVel * this.cor;
			this.xVel *= this.speedRetainedAfterFriction;
			this.yPos = -this.yPos;
		}
		else if (this.yPos + 2*this.radius > screen.offsetHeight)
		{
			this.yVel = -this.yVel * this.cor;
			this.xVel *= this.speedRetainedAfterFriction;
			this.yPos = (screen.offsetHeight - ((this.yPos+2*this.radius)-screen.offsetHeight)) - 2*this.radius;
		}
	}
}