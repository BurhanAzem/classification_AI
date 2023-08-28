const turntexet = document.getElementById("status");
const statustime = document.getElementById("status-time");
const selectm = document.getElementById("mode");
const selectd = document.getElementById("difficulty");
const cellElements = document.querySelectorAll('[data-cell]')
const table = document.getElementById('game-back')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const canvas = document.getElementById('classification-canvas');
canvas.width  = 400;
canvas.height = 300; 
const ctx = canvas.getContext('2d');
ctx.fillStyle = "#FFFF";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.translate(0, canvas.height);
ctx.scale(1, -1);


const x_coordinate = document.getElementById('x-coordinate');
const y_coordinate = document.getElementById('y-coordinate');
const inPage = document.getElementById('canvas-container');
const learning_rate = document.getElementById('learning-rate');
const max_iterations = document.getElementById('max-iterations');
const Iterations = document.getElementById('iterations');
const accuracy = document.getElementById('accuracy');

let model = null;
const dropdown = document.getElementById("myDropdown");

let dataPoints = [];
let ySets = []
let GreenPoints = []
let RedPoints = []
let YellowPoints = []
let BlackPoints = []
let ThereIsGreen = false
let ThereIsRed = false
let ThereIsYellow = false
let ThereIsBlack = false
let selectedColor = 'Green';
let XPlayer;
let IsHard;
let IsOnePlayer;
let gameMode = "";
let difficulty = "";
let depthfactor;




class Perceptron{
  constructor(x_set, y_set, learingRate=0.2, epochs=1000){
      this.x_set = x_set;
      this.y_set = y_set; 
      this.learningRate = learingRate;
      this.epochs = epochs;
      this.accuracy = 0;
      this.samples = 0;
      this.alpha = 1;
      this.weights = new Array(x_set[0].length);
      for(let i = 0; i < this.weights.length; i++){
          this.weights[i] = this.random();
      }
  }

  // returns random values between -0.5 and 0.5
  random() {
      return (Math.random() * 2 - 1)
  }

  cur_accuracy(){
      return this.accuracy / this.samples;
  }

  activation(x){
      return x < 0 ? 0 : 1 
  }

  predict(x_input){
      console.log(x_input);
      let total = this.alpha
      this.weights.forEach((w, index) => { total += x_input[index] * w })
      //console.log('x '+ x_input[0] + ' y ' + x_input[1] +' total ' + total + 'alpha' + this.alpha);
      return this.activation(total)
  }

  learn(){
      for(let e = 0; e < this.epochs; e++){
          for(let i = 0; i < this.x_set.length; i++){
              Iterations.innerText = `Number of Iterations: ${this.epochs * 10} ` 
              let ya = this.predict(this.x_set[i])
              console.log('Expected '+ this.y_set[i] + ' model output ' + ya + ' w1 ' + this.weights[0] + ' w2 ' + this.weights[1]);
              if(ya != this.y_set[i]){
                  this.accuracy--;
              }
              else
                  this.accuracy++;
              this.samples++;

              let error =  this.y_set[i] - ya 
              for(let w = 0; w < this.weights.length; w++){
                  this.weights[w] += this.learningRate * (this.x_set[i][w] * error)
              }
              this.alpha += error * this.learningRate
          }
          console.log(this.cur_accuracy() + '    ------------------------------------------------------------------ epoch# ' + e);
          accuracy.innerHTML = `Accuracy: ${this.cur_accuracy() * 100}%`
      }
      
  }
}


//x = [[0, 10], [10, 2], [2, 1], [2, 2], [50, 150], [115, 99], [94, 87], [74, 84]]
x = [[0, 100], [10, 150], [20, 115], [30, 99], [100, 15], [115, 9], [150, 7], [120, 18]]
y = [1, 1, 1, 1, 0, 0, 0, 0]

// p = new Perceptron(x, y, 0.5, 1000);

// p.learn()
// console.log(p.weights, ' - ' , p.alpha)
// let weights = p.weights
// let alpha = p.alpha
// let y0, y1, x0, x1 = 0
// weights[0] = (-1 * weights[0]) / weights[1]
// alpha = (alpha) /  weights[1]
// // when x = 0 
// x0 = 399
// y0 = alpha + weights[0] * x0
// x1 = 0
// y1 = alpha + weights[0] * x1
// // when y = 0
// // y1 = 200
// // x1 = (y1 - alpha) / weights[0]
// console.log(x0, x1, y0, y1);
// drawLine(x0, x1, y0, y1)
// dataPoints = []
// ySets = new Array(4).fill([])

// drawLine(0, 500, 500, 0)

    
    dropdown.addEventListener("change", function() {
      selectedColor = dropdown.value;
      console.log("Selected option:", selectedColor);
      // Perform any desired actions based on the selected option
    });
    

    canvas.onclick = function(event) {
      let color
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = Math.abs(event.clientY - rect.top - 300);
        switch(selectedColor){
          case "Green":
            color = "00CC00"
            GreenPoints.push([x, y])
            break
          case "Red":
            color = "CC0000"
            RedPoints.push([x, y])
            break
          case "Yellow":
            color = "CCCC00"
            YellowPoints.push([x, y])
            break
          case "Black":
            color = "000000"
            BlackPoints.push([x, y])
          break
        }

        // Draw a point at the clicked coordinates
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `#${color}`;
        ctx.fill();
      };


    function start(){
      if(GreenPoints.length != 0 && !ThereIsGreen){
        let ySub = []
        ThereIsGreen = true
        GreenPoints.forEach((point, index) => {
          dataPoints.push(point)
          ySub.push(1)
        })
        RedPoints.forEach((point, index) => {
          ySub.push(0)
        })
        YellowPoints.forEach((point, index) => {
          ySub.push(0)
        })
        BlackPoints.forEach((point, index) => {
          ySub.push(0)
        })
        ySets[0] = ySub
        //GreenPoints = []
      }
      if(RedPoints.length != 0 && !ThereIsRed){
        let ySub = []
        ThereIsRed = true
        GreenPoints.forEach((point, index) => {
          ySub.push(0)
        })
        RedPoints.forEach((point, index) => {
          dataPoints.push(point)
          ySub.push(1)
        })
        YellowPoints.forEach((point, index) => {
          ySub.push(0)
        })
        BlackPoints.forEach((point, index) => {
          ySub.push(0)
        })
        ySets[1] = ySub
        //RedPoints = []
      }
      if(YellowPoints.length != 0 && !ThereIsYellow){
        let ySub = []
        ThereIsYellow = true
        GreenPoints.forEach((point, index) => {
          ySub.push(0)
        })
        RedPoints.forEach((point, index) => {
          ySub.push(0)
        })
        YellowPoints.forEach((point, index) => {
          dataPoints.push(point)
          ySub.push(1)
        })
        BlackPoints.forEach((point, index) => {
          ySub.push(0)
        })
        ySets[2] = ySub
        //YellowPoints = []
      }
      if(BlackPoints.length != 0 && !ThereIsBlack){
        let ySub = []
        ThereIsBlack = true
        GreenPoints.forEach((point, index) => {
          ySub.push(0)
        })
        RedPoints.forEach((point, index) => {
          ySub.push(0)
        })
        YellowPoints.forEach((point, index) => {
          ySub.push(0)
        })
        BlackPoints.forEach((point, index) => {
          dataPoints.push(point)
          ySub.push(1)
        })
        ySets[3] = ySub
        //BlackPoints = []
      }
      ySets.forEach((data, index) => {console.log(data);})
      if(ySets.length == 2){
        let data = ySets[0] 
        if(data.length > 0){
          console.log(data);
          dataPoints.forEach(x => console.log(x + "-----"))
          const p = new Perceptron(dataPoints, data, learning_rate.value, max_iterations.value / 10)
          p.learn()
          let weights = p.weights
          let alpha = p.alpha
          console.log(weights, ' - '+ alpha);
          let y0, y1, x0, x1 = 0
          weights[0] = (-1 * weights[0]) / weights[1]
          alpha = (alpha) /  weights[1]
          // when x = 0 
          x0 = 399
          y0 = alpha + weights[0] * x0
          x1 = 10
          y1 = alpha + weights[0] * x1
          // when y = 0
          // y1 = 200
          // x1 = (y1 - alpha) / weights[0]
          drawLine(x0, x1, y0, y1)
          console.log(x0, x1, y0, y1);
        }
      }
      else if(ySets.length > 2) 
        ySets.forEach((data, index) => {
          if(data.length > 0){
            console.log(data);
            dataPoints.forEach(x => console.log(x + "-----"))
            const p = new Perceptron(dataPoints, data, learning_rate.value, max_iterations.value / 10)
            p.learn()
            let weights = p.weights
            let alpha = p.alpha
            console.log(weights, ' - '+ alpha);
            let y0, y1, x0, x1 = 0
            weights[0] = (-1 * weights[0]) / weights[1]
            alpha = (alpha) /  weights[1]
            // when x = 0 
            x0 = 399
            y0 = alpha + weights[0] * x0
            x1 = 10
            y1 = alpha + weights[0] * x1
            // when y = 0
            // y1 = 200
            // x1 = (y1 - alpha) / weights[0]
            drawLine(x0, x1, y0, y1)
            console.log(x0, x1, y0, y1);
          }
        })
    };
  
function drawLine(x0, x1, y0, y1){
  // let w = canvas.width / 2
  // let h = canvas.height / 2
  // if(x0 < 0)
  //   x0 = w + x0
  // if(y0 < 0)
  //   y0 = h - y0
  // if(x1 < 0)
  //   x1 = w + x1
  // if(y1 < 0)
  //   y1 = h - y1
  // console.log(x0, x1, y0, y1);
  ctx.beginPath();
 
  ctx.moveTo(x0, y0);

  ctx.lineTo(x1, y1);

  ctx.stroke();
}





// [[41.5,47],
// [32.5,42],
// [24.5,61],
// [31.5,66],
// [139.5,145],
// [125.5,143],
// [127.5,161],
// [137.5,176]
// ]

  
  
  





    
    

  


