const canvas = document.getElementById('canvas-0');
const ctx = canvas.getContext('2d');
const clearBtn = document.querySelector('.btn__clear-canvas');
let startX, startY, endX, endY;
let currentRectangleCounter = 1;
const colors = {
  main: 'rgb(245, 66, 245)',
  mainTransparent: 'rgba(245, 66, 245, .1)'
};

/**
 * Handles the mousedown event occurring on the canvas
 * Gets the coordinates of the starting point (x, y)
 * Starts the handleVisualFeedback() function
 *
 * @param { object } e - the event passed by the addEventListener() function
 */
const handleMouseDown = (e) => {
  // Start the visual feedback
  canvas.addEventListener('mousemove', handleVisualFeedback);

  const rect = e.target.getBoundingClientRect();
  // Define the cords of starting position
  [startX, startY] = [e.clientX - rect.left, e.clientY - rect.top];

  console.log(`Start point: ${startX}, ${startY}`);
};

/**
 * Handles the mouse down event occurring on the canvas
 * Gets the coordinates of the ending point (x, y)
 * Draws rectangle
 * Ends the handleVisualFeedback() function
 *
 * @param { object } e - the event passed by the addEventListener() function
 */
const handleMouseUp = (e) => {
  // Stop the visual feedback
  canvas.removeEventListener('mousemove', handleVisualFeedback);

  const rect = e.target.getBoundingClientRect();
  [endX, endY] = [e.clientX - rect.left, e.clientY - rect.top];

  console.log(`End point: ${endX}, ${endY}`);

  const [rectWidth, rectHeight] = [
    Math.abs(endX - startX),
    Math.abs(endY - startY)
  ];

  const cords = { startX, startY, endX, endY };
  const startPoint = calculateCords(cords, rectWidth, rectHeight);

  ctx.fillStyle = colors.main;
  ctx.fillRect(startPoint.x, startPoint.y, rectWidth, rectHeight);

  // Remove visual feedback
  removeRectangle();
};

/**
 * Creates a visual feedback (semi-transparent rectangle)
 * that appears when you click and disappears when the mouse is up
 *
 * @param { object } e - event passed by the addEventListener() function
 */
const handleVisualFeedback = (e) => {
  // Remove the rectangle drawn before
  removeRectangle();

  const rect = e.target.getBoundingClientRect();

  // Calculate currentX and currentY
  const [currentX, currentY] = [e.clientX - rect.left, e.clientY - rect.top];
  // console.log(currentX, currentY);

  // Calculate the current width and height
  const [currentWidth, currentHeight] = [
    Math.abs(startX - currentX),
    Math.abs(startY - currentY)
  ];

  // Get the new start point
  const cords = { startX, startY, endX: currentX, endY: currentY };
  const startPoint = calculateCords(cords, currentWidth, currentHeight);

  drawRectangle(startPoint, currentWidth, currentHeight);
};

/**
 * Calculate the coordinates (x, y) of the starting point
 * from which the rectangle is created
 *
 * @param { object } cords - an object containing coordinates of the initial starting point and the end point
 * @param { number } width - width of the rectangle
 * @param { number } height - height of the rectangle
 * @returns {{x: number, y: number}} - an object containing coordinates of the new starting point (x, y)
 */
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

const drawRectangle = function (startPoint, width, height) {
  const rectNode = document.createElement('div');
  rectNode.classList.add('visual_feedback');
  rectNode.style.position = 'absolute';
  rectNode.style.top = `${startPoint.y + 20}px`;
  rectNode.style.left = `${startPoint.x + 20}px`;
  rectNode.style.border = '1px dashed red';
  rectNode.style.width = `${width}px`;
  rectNode.style.height = `${height}px`;
  rectNode.id = `vRect-${currentRectangleCounter}`;

  document.body.appendChild(rectNode);
  currentRectangleCounter++;
};

/**
 * Remove the visual feedback rectangle from the DOM
 */
const removeRectangle = () => {
  try {
    document.getElementById(`vRect-${currentRectangleCounter - 1}`).remove();
  } catch (e) {
    // Prevents the error from the initial case when there is no previous rectangle in the DOM
    // just do nothing
  }
};

/**
 * Clear the canvas
 */
const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Event handlers
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);
clearBtn.addEventListener('click', clearCanvas);
