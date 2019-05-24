//Create model
const NNmodel = tf.sequential();

//Create H and O layer, then add the model
const hidden = tf.layers.dense({
  units:12,//Number of nodes
  inputShape: [2],
  // activation: "relu"
  activation: "sigmoid"
});
NNmodel.add(hidden);

const output = tf.layers.dense({
  units: 1,//Number of nodes
  inputShape: [12],
  // activation: "relu"
  activation: "sigmoid"
});
NNmodel.add(output);

//An optimizer using gradient descent
const sgdOpt = tf.train.sgd(0.5);

//Compile the configured model
NNmodel.compile({
  optimizer: sgdOpt,
  loss: "meanSquaredError"
});


//input is expected to have two dimensions, so we have to put arrays in array
const trainInputs = tf.tensor2d([
  [1, 1],
  [1, 0],
  [0, 1],
  [0, 0]
  // [0, 0],
  // [0.5, 0.5],
  // [1, 1]
]);
const trainOutputs = tf.tensor2d([
  [0],
  [1],
  [1],
  [0]
  // [1],
  // [0.5],
  // [0]
]);
//

train().then(() => {
  console.log("Training complete")
  let testOutputs = NNmodel.predict(trainInputs);
  testOutputs.print();
});


async function train(){
//history: An object returns a lot of information how the training is going on.
  for(let i = 0; i < 100; i++){
    const config = {
      shuffle: true,
      epochs : 50
    }
    const response = await NNmodel.fit(trainInputs, trainOutputs, config);
    console.log(response.history.loss[0]);
  }
}



// const inputs = tf.tensor2d([
//   [0.25, 0.92],
//   [0.65, 0.34]
// ]);
//
// let outputs = NNmodel.predict(inputs);
// outputs.print();
