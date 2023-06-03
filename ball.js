class Ball
{
	constructor(frameLength, screen, radius, mouseXPos, mouseYPos)
	{
		this.element = document.createElement('span');
		this.frameLength = frameLength; // in seconds
		this.radius = radius;
		this.xAcc = 0; // in px per second
		this.yAcc = 5000;
		this.xVel = 0;
		this.yVel = 0;
		this.xPos = mouseXPos - this.radius;
		this.yPos = mouseYPos - this.radius;
		this.cor = 0.8 // bounciness

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
		let power = 15;
		this.xVel = power * ((this.xPos+this.radius) - event.clientX);
		this.yVel = power * ((this.yPos+this.radius) - event.clientY);
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
			this.xPos = -this.xPos;
		}
		else if (this.xPos + 2*this.radius > screen.offsetWidth)
		{
			this.xVel = -this.xVel * this.cor;
			this.xPos = (screen.offsetWidth - ((this.xPos+2*this.radius)-screen.offsetWidth)) - 2*this.radius;
		}

		if (this.yPos < 0)
		{
			this.yVel = -this.yVel * this.cor;
			this.yPos = -this.yPos;
		}
		else if (this.yPos + 2*this.radius > screen.offsetHeight)
		{
			this.yVel = -this.yVel * this.cor;
			this.yPos = (screen.offsetHeight - ((this.yPos+2*this.radius)-screen.offsetHeight)) - 2*this.radius;
		}
	}
}