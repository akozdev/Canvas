const canvas = document.getElementById('canvas-0');
const ctx = canvas.getContext('2d');
let startX, startY, endX, endY;

canvas.addEventListener('mousedown', (e) => {
	const rect = e.target.getBoundingClientRect();
	// Define the cords of starting position
	[startX, startY] = [e.clientX - rect.left, e.clientY - rect.top];

	console.log(startX, startY);
});


canvas.addEventListener('mouseup', (e) => {
	const rect = e.target.getBoundingClientRect();
	[endX, endY] = [e.clientX - rect.left, e.clientY - rect.top];

	console.log(endX, endY);

	const [rectWidth, rectHeight] = [
			Math.abs(endX - startX),
			Math.abs(endY - startY)
	];

	const cords = { startX, startY, endX, endY };
	const startPoint = calculateCords(cords, rectWidth, rectHeight);

	ctx.fillStyle = 'rgb(245, 66, 245)';
	ctx.fillRect(startPoint.x, startPoint.y, rectWidth, rectHeight);
});

/* TODO: Create a visual feedback of drawing rectangle */
// canvas.addEventListener('mousemove', (e) => {
// 	console.log(e.clientX, e.clientY);
// });


const calculateCords = (cords, width, height) => {
	const { startX, startY, endX, endY } = cords;
	let startPoint = { x: 0, y: 0 };

	if (endX - startX > 0 && endY - startY > 0) {
		startPoint = { x: startX, y: startY };
	} else if (endX - startX < 0 && endY - startY > 0) {
		startPoint = { x: startX - width, y: startY };
	} else if (endX - startX > 0 && endY - startY < 0) {
		startPoint = { x: startX, y: startY - height };
	} else if (endX - startX < 0 && endY - startY < 0) {
		startPoint = { x: startX - width, y: startY - height };
	}

	return startPoint;
};