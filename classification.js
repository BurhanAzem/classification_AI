const canvas = document.getElementById('classification-canvas');
canvas.width  = 400;
canvas.height = 300; 
const ctx = canvas.getContext('2d');
const x_coordinate = document.getElementById('x-coordinate');
const y_coordinate = document.getElementById('y-coordinate');
const inPage = document.getElementById('canvas-container');
const dataPoints = [];
let model = null;

// Uncomment the following code to enable the setXY function
// document.addEventListener('click', setXY, true);

canvas.onclick = function(event) {
    x_coordinate.innerHTML = event.pageX;
    y_coordinate.innerHTML = event.pageY;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    // Draw a point at the clicked coordinates
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.stroke();
    //ctx.fillStyle = '#ff0000';
    ctx.fill();
  };

// function setXY(e) {
//   let xVal = e.pageX
//   let yVal = e.pageY
//   x.innerHTML = e.pageX;
//   y.innerHTML = e.pageY;
//   dataPoints.push({ xVal, yVal });
//   drawDataPoints(xVal, yVal);
// }

// function addDataPoint(xVal, yVal) {
// //   const x1 = parseInt(document.getElementById('x-coordinate').innerText);
// //   const y1 = parseInt(document.getElementById('y-coordinate').innerText);
//   dataPoints.push({ xVal, yVal });
//   drawDataPoints();
// }


// function drawDataPoints(xVal, yVal) {
//   //ctx.clearRect(0, 0, canvas.width, canvas.height);
//   let rect = canvas.getBoundingClientRect();
//   console.log('Top:', rect.top);
//   console.log('Top:', rect.left);
//   //for (const point of dataPoints) {
//     ctx.beginPath();
//     //ctx.fillStyle = '#ff0000';
//     //ctx.fill();
//     ctx.arc(xVal - rect.left, yVal - rect.top, 5, 0, Math.PI * 2);
//     ctx.stroke();

//     // ctx.closePath();
//   //}
// }

function trainModel() {
  const learningRate = parseFloat(document.getElementById('learning-rate').value);
  const maxIterations = parseInt(document.getElementById('max-iterations').value);
  
  // Train your classification model here using the dataPoints array, learningRate, and maxIterations
  // This is just a placeholder implementation
  model = {
    accuracy: 0.85,
    precision: 0.9,
    recall: 0.8
  };
}