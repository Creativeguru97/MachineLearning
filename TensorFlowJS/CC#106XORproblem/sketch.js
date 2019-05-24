let nn;
let lr_slider;
let training_data = [{
    inputs:[1, 0],
    targets:[1]
  },
  {
    inputs:[0, 1],
    targets:[1]
  },
  {
    inputs:[1, 1],
    targets:[0]
  },
  {
    inputs:[0, 0],
    targets:[0]
  }
];
//Interesting syntax !!!!!!!!!!!!!!!!

function setup(){
  createCanvas(400, 400);
  nn = new NeuralNetwork(2, 12, 1);//We can set arbitrary number of hidden node

  //Creates a slider <input></input> element in the DOM
  //(min val, max val, default val, step size of slider);
  lr_slider = createSlider(0.001, 0.5, 0.1, 0.01);
  }

function draw(){
  background(0);

  nn.learningRate(lr_slider.value());
  print(nn.learning_rate);

  for(let i = 0; i < 5000; i++){
    let data = random(training_data);
      nn.train(data.inputs, data.targets);
  }

  let resolution = 10;
  let pixRows = height / resolution;
  let pixCols = width / resolution;
  for(let i = 0; i < pixCols; i++){
    for(let j = 0; j < pixRows; j++){
      let x0 = i / pixCols;//Get a value from 0 to 1
      let x1 = j / pixRows;
      let inputs = [x0, x1];
      let y = nn.feedforward(inputs);
      fill(y*255);
      noStroke();
      rect(i*resolution, j*resolution, resolution, resolution);
    }
  }

}
