const colorEraser = "#ffff"; // only alpha value is enabled by destination-out
const colorStroke = "#111";
const widthEraser = 70;
const widthPen = 7;

let canvas = null;
let offscreenCanvas = null;
let context = null; // context of offscreenCanvas
let screenContext = null;
let lastpoints = null;
let hold = false;

function paintCanvas() {
  const screenContext = canvas.getContext("2d");
  screenContext.clearRect(0, 0, canvas.width, canvas.height);
  screenContext.drawImage(
    offscreenCanvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
}

function changeTool(tool) {
  if (!context) return;
  if (tool === "eraser") {
    // note: use 'multiply'
    context.globalCompositeOperation = "destination-out";
    context.strokeStyle = colorEraser;
    context.lineWidth = widthEraser;
  } else if (tool === "pen") {
    context.globalCompositeOperation = "source-over";
    context.strokeStyle = colorStroke;
    context.lineWidth = widthPen;
  }
}

function drawline(points) {
  context.beginPath();
  context.moveTo(points[0][0], points[0][1]);
  points.forEach((p) => context.lineTo(p[0], p[1]));
  context.stroke();
  paintCanvas();
}

function onCanvasPenDown(px, py) {
  if (!context) return;
  lastpoints = [[px, py]];
  hold = true;
}
function onCanvasPenMove(px, py) {
  if (!hold) return;
  if (!context) return;
  lastpoints.push([px, py]);
  drawline(lastpoints);
  while (lastpoints.length > 4) lastpoints.shift();
}
function onCanvasPenUp() {
  if (!context) return;
  lastpoints = null;
  hold = false;
}
function onCanvasResize(width, height) {
  canvas.width = width;
  canvas.height = height;
  paintCanvas();
}

function main() {
  canvas = document.getElementById("drawingarea");
  canvas.addEventListener("mousedown", (e) =>
    onCanvasPenDown(e.clientX, e.clientY)
  );
  canvas.addEventListener("mousemove", (e) =>
    onCanvasPenMove(e.clientX, e.clientY)
  );
  canvas.addEventListener("mouseup", (e) => onCanvasPenUp());
  canvas.addEventListener(
    "touchstart",
    (e) => onCanvasPenDown(e.touches[0].clientX, e.touches[0].clientY),
    false
  );
  canvas.addEventListener(
    "touchmove",
    (e) => onCanvasPenMove(e.touches[0].clientX, e.touches[0].clientY),
    false
  );
  canvas.addEventListener("touchend", (e) => onCanvasPenUp(), false);
  canvas.addEventListener("touchcancel", (e) => onCanvasPenUp(), false);
  screenContext = canvas.getContext("2d");

  offscreenCanvas = new OffscreenCanvas(1920, 1920);
  context = offscreenCanvas.getContext("2d");
  changeTool("pen");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

document.addEventListener("DOMContentLoaded", main);
window.addEventListener("resize", () => {
  onCanvasResize(window.innerWidth, window.innerHeight);
});
