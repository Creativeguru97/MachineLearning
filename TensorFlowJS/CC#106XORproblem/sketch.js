// let nn;
let NNmodel;
// let lr_slider;

let resolution = 25;
let pixRows;
let pixCols;
let tensorInputs;

const trainInputs = tf.tensor2d([
  [1, 1],
  [1, 0],
  [0, 1],
  [0, 0]
]);
const trainOutputs = tf.tensor2d([
  [0],
  [1],
  [1],
  [0]
]);

function setup(){
  createCanvas(400, 400);
  pixRows = height / resolution;
  pixCols = width / resolution;

  //Create the input data
  let inputs = [];
  for(let i = 0; i < pixCols; i++){
    for(let j = 0; j < pixRows; j++){
      let x0 = i / pixCols;//Get a value from 0 to 1
      let x1 = j / pixRows;
      inputs.push([x0, x1]);
    }
  }

  tensorInputs = tf.tensor2d(inputs);

  NNmodel = tf.sequential();
  const hidden = tf.layers.dense({
    units:6,//Number of nodes
    inputShape: [2],
    // activation: "relu"
    activation: "sigmoid"
  });
  NNmodel.add(hidden);

  const output = tf.layers.dense({
    units: 1,//Number of nodes
    inputShape: [6],
    // activation: "relu"
    activation: "sigmoid"
  });
  NNmodel.add(output);

  const sgdOpt = tf.train.adam(0.2);//adam loss function is great!!!
  // const sgdOpt = tf.train.sgd(0.2);

  //Compile the configured model
  NNmodel.compile({
    optimizer: sgdOpt,
    loss: "meanSquaredError"
  });

  setTimeout(train, 10);//100milisecond wait then call train();
}

function train(){
  trainModel().then((result) => {//tf.fit automatically clean up tensors
    console.log(result.history.loss[0]);

      setTimeout(train, 10);//100milisecond wait then call train();
  });
}
function trainModel(){
      const config = {
        shuffle: true,
        epochs : 10
      }
      return NNmodel.fit(trainInputs, trainOutputs, config);
      // console.log(response.history.loss[0]);
    // }
  }


function draw(){
  background(0);
  //Get the prediction
  /*We create tensor, and give that to GPU.
  GPU calculate then give them back to us with dataSync();*/
  tf.tidy(() =>{
    let testOutputs = NNmodel.predict(tensorInputs).dataSync();
    // console.log(testOutputs);

    //Draw the results
    let index = 0;
    for(let i = 0; i < pixCols; i++){
      for(let j = 0; j < pixRows; j++){

        fill(testOutputs[index]*255);
        noStroke();
        rect(i*resolution, j*resolution, resolution, resolution);
        fill(255-testOutputs[index]*255);
        textSize(8);
        textAlign(CENTER, CENTER);
        text(nf(testOutputs[index],1, 2), i*resolution+resolution/2, j*resolution+resolution/2);
        index++;
      }
    }
  });

}
