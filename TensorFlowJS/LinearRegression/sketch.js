let eachX = [];
let eachY = [];

let m, b;

const learningRate = 0.2;
const optimizer = tf.train.sgd(learningRate);

function setup(){
  createCanvas(400, 400);
  background(0);

  //y = mx + b's m and b
  m = tf.variable(tf.scalar(random(1)));//Tensor number 1
  b = tf.variable(tf.scalar(random(1)));//Tensor number 2
  tfVal = [m, b];
}

function mousePressed(){

  let x = map(mouseX, 0, width, 0, 1);
  let y = map(mouseY, 0, height, 1, 0);

  eachX.push(x);
  eachY.push(y);
}

function predict(eachX){

  const tensorEachX = tf.tensor1d(eachX);//Tensor number 3
  //y = mx + b
  const tensorPredictEachY = tensorEachX.mul(m).add(b);
  return tensorPredictEachY;
}

function loss(pred, label){//pred : guess, label : answer(actual Y value)
  return pred.sub(label).square().mean();
}
//Identical
// (pred, label) => pred.sub(label).square().mean();

function draw(){
   tf.tidy(() => {
    if(eachX.length > 0){
      //Make eachY to tensor
      const tensorEachY = tf.tensor1d(eachY);//Tensor number 4
      //tfVal : m, b is optional. By default, TensorFlow uses every possible variable.
      optimizer.minimize(() => loss(predict(eachX), tensorEachY),tfVal);
      //Identical
      // function train(){
      //   loss(predict(eachX), eachY);
      // }
      // optimizer.minimize(train);
    }
  });

  background(0);
  stroke(255);
  strokeWeight(8);

  //Draw each point
  for(let i = 0; i < eachX.length; i++){
    let pixelX = map(eachX[i], 0, 1, 0, width);
    let pixelY = map(eachY[i], 0, 1, height, 0);
    point(pixelX, pixelY);
  }

    //Draw line
    const x = [0, 1];
    const y = tf.tidy(() => predict(x));//Tensor number 5
    let lineY = y.dataSync();//Make y from tensor to plain numbers
    y.dispose();

    let lineX0 = map(x[0], 0, 1, 0, width);
    let lineX1 = map(x[1], 0, 1, 0, width);

    // console.log(lineY);
    let lineY0 = map(lineY[0], 0, 1, height, 0);
    let lineY1 = map(lineY[1], 0, 1, height, 0);

    strokeWeight(2);
    line(lineX0, lineY0, lineX1, lineY1);
    // y.dispose();


  console.log(tf.memory().numTensors);
}
