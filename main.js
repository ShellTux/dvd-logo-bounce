const images = new Array(8)
	.fill()
	.map(
		(_, index) => {
			const image = new Image();
			image.src = `assets/dvdlogo-0${index + 1}.png`
			return image;
		}
	);

const maxImageWidth = 192;
const maxImageHeight = Math.floor(maxImageWidth * 9 / 16);

const restrictImageWidth = (image, maxWidth) => Math.min(image.naturalWidth, maxWidth);
const restrictImageHeight = (image, maxHeight) => Math.min(image.naturalHeight, maxHeight);

const main = function() {
	const canvas = document.querySelector('canvas');
	const context = canvas.getContext('2d');

	const rectangle = {
		'x': canvas.width * .5,
		'y': canvas.height * .5,
		'width': restrictImageWidth(images[0], maxImageWidth),
		'height': restrictImageHeight(images[0], maxImageHeight)
	};

	const magnitude = Number(new URL(document.URL).searchParams.has('speed') ? new URL(document.URL).searchParams.get('speed') : 17);
	const angle = Math.atan2(1, 2);
	const speed = {
		'x': Math.cos(angle) * magnitude,
		'y': Math.sin(angle) * magnitude,
	};

	let dvdIndex = 0;

	const loop = () => {
		// Resize canvas according to the window
		context.canvas.width = window.innerWidth;
		context.canvas.height = window.innerHeight;

		// Clear screen
		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);

		// Show image
		context.drawImage(images[dvdIndex], rectangle.x, rectangle.y, rectangle.width, rectangle.height)


		// Move rectangle
		rectangle.x += speed.x;
		rectangle.y += speed.y;


		// Bounce

		if (rectangle.x < 0 || rectangle.x + rectangle.width > canvas.width) {
			speed.x *= -1;
			dvdIndex = (dvdIndex + 1) % images.length;
			rectangle.x = Math.max(Math.min(rectangle.x, context.canvas.width - rectangle.width), 0);
			rectangle.width = restrictImageWidth(images[dvdIndex], maxImageWidth);
			rectangle.height = restrictImageHeight(images[dvdIndex], maxImageHeight);
		}

		if (rectangle.y < 0 || rectangle.y + rectangle.height > canvas.height) {
			speed.y *= -1;
			dvdIndex = (dvdIndex + 1) % images.length;
			rectangle.y = Math.max(Math.min(rectangle.y, context.canvas.height - rectangle.height), 0);
			rectangle.width = restrictImageWidth(images[dvdIndex], maxImageWidth);
			rectangle.height = restrictImageHeight(images[dvdIndex], maxImageHeight);
		}

		// Loop
		setTimeout(loop, 20);
	}

	loop();
}

window.onload = main;
