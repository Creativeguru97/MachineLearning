let eachX = [];
let eachY = [];

let a, b, c, d;
let dragging = false;

const learningRate = 0.2;
const optimizer = tf.train.adam(learningRate);

function setup(){
  createCanvas(400, 400);
  background(0);

  //y = mx + b's m and b
  a = tf.variable(tf.scalar(random(-1, 1)));//Tensor number 1
  b = tf.variable(tf.scalar(random(-1, 1)));//Tensor number 2
  c = tf.variable(tf.scalar(random(-1, 1)));//Tensor number 3
  d = tf.variable(tf.scalar(random(-1, 1)));//Tensor number 3


  tfVal = [a, b, c, d];
}

function mouseDragged(){
  dragging = true;
}
function mouseReleased(){
  dragging = false;
}

function predict(eachX){

  const tensorEachX = tf.tensor1d(eachX);//Tensor number 4
  // //y = mx + b
  // const tensorPredictEachY = tensorEachX.mul(m).add(b);
  //y = ax^2 + bx + c
  // const tensorPredictEachY = tensorEachX.square().mul(a).add(tensorEachX.mul(b)).add(c);
  //Tensor number 5

  //y = ax^3 + bx^2 + cx + d
  const tensorPredictEachY =
    tensorEachX.pow(tf.scalar(3)).mul(a)
    .add(tensorEachX.pow(tf.scalar(2)).mul(b))
    .add(tensorEachX.mul(c))
    .add(d);

  return tensorPredictEachY;
}

function loss(pred, label){//pred : guess, label : answer(actual Y value)
  return pred.sub(label).square().mean();
}
//Identical
// (pred, label) => pred.sub(label).square().mean();

function draw(){
  if(dragging){
    let x = map(mouseX, 0, width, -1, 1);
    let y = map(mouseY, 0, height, 1, -1);

    eachX.push(x);
    eachY.push(y);
  }else{
     tf.tidy(() => {
      if(eachX.length > 0){
        //Make eachY to tensor
        const tensorEachY = tf.tensor1d(eachY);//Tensor number 6
        //tfVal : m, b is optional. By default, TensorFlow uses every possible variable.
        optimizer.minimize(() => loss(predict(eachX), tensorEachY),tfVal);
        //Identical
        // function train(){
        //   loss(predict(eachX), eachY);
        // }
        // optimizer.minimize(train);
        }
      });
  }

  background(0);
  stroke(255);
  strokeWeight(8);

  //Draw each point
  for(let i = 0; i < eachX.length; i++){
    let pixelX = map(eachX[i], -1, 1, 0, width);
    let pixelY = map(eachY[i], -1, 1, height, 0);
    point(pixelX, pixelY);
  }

    //Draw Polynomial curve
    const sampleX = [];
    for(let x = -1; x < 1.01; x += 0.05){
      sampleX.push(x);
    }

    const y = tf.tidy(() => predict(sampleX));//Tensor number 7
    let curveY = y.dataSync();//Make y from tensor to plain numbers
    y.dispose();

    beginShape();
    noFill();
    stroke(255);
    strokeWeight(2);

    for(let i = 0; i < sampleX.length; i++){
      let x = map(sampleX[i], -1, 1, 0, width);
      let y = map(curveY[i], -1, 1, height, 0);
      vertex(x, y);
    }
    endShape();

  console.log(tf.memory().numTensors);
}
