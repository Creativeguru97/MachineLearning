let nn;
let trainImg = [];
let testImg = [];

let trainLabel;
let testLabel;
const trainImageTotal = 80;
const testImageTotal = 10;
let testImgIndex = 0;
let trainImgIndex = 3;
const imagePixelSize = 16384;
const imagePixelSize2 = 784;


let epoch = 10;

function preload(){
  for(let i = 0; i < trainImageTotal; i++){
    trainImg[i] = loadImage('trainingData/saber'+nf(i, 2)+'.png');
  }
  trainLabel = loadJSON("trainLabel.json");

  for(let i = 0; i < testImageTotal; i++){
    testImg[i] = loadImage('testData/saber'+nf(i, 2)+'.png');
  }
  testLabel = loadJSON("testLabel.json");
}

function trainDataCheck(index){
  let trainImageIndex = index; //must be 0 - 79
  image(trainImg[trainImageIndex], 0, 0);

  let d = pixelDensity();
  let canvasImage = get();
  canvasImage.loadPixels();//Taking pixels on display
  let inputs = [];
  for(let i = 0; i < imagePixelSize; i++){
    let bright = canvasImage.pixels[i*4];//Only take braightness value
    inputs[i] = bright / 255; //Normalizing
  }

  let coordXS = trainLabel.coordinates[trainImageIndex].xs;
  let coordYS = trainLabel.coordinates[trainImageIndex].ys;
  let coordXE = trainLabel.coordinates[trainImageIndex].xe;
  let coordYE = trainLabel.coordinates[trainImageIndex].ye;

  print(coordXS);
  print(coordYS);
  print(coordXE);
  print(coordYE);

  print(inputs);

  strokeWeight(4);
  stroke(255, 0, 0);
  line(coordXS, coordYS, coordXE, coordYE);
}

function testDataCheck(index){
  let testImageIndex = index; //must be 0 - 9
  image(testImg[testImageIndex], 0, 0);

  let coordXS = testLabel.coordinates[testImageIndex].xs;
  let coordYS = testLabel.coordinates[testImageIndex].ys;
  let coordXE = testLabel.coordinates[testImageIndex].xe;
  let coordYE = testLabel.coordinates[testImageIndex].ye;

  print(coordXS);
  print(coordYS);
  print(coordXE);
  print(coordYE);

  strokeWeight(4);
  stroke(255, 0, 0);
  line(coordXS, coordYS, coordXE, coordYE);
}


//display image then loading every pixels
function train(){
  // shuffle(trainImg, true);
    for(let i = 0; i < trainImg.length; i++){
      image(trainImg[i], 0, 0);//Display the image
      let d = pixelDensity();
      let canvasImage = get();
      canvasImage.resize(28, 28);
      canvasImage.loadPixels();//Taking pixels on display

      //Make inputs
      // let inputs = [];
      // for(let i = 0; i < imagePixelSize; i++){
      //   let bright = canvasImage.pixels[i*4];//Only take braightness value
      //   inputs[i] = bright / 255; //Normalizing
      // }
      let inputs = [];
      for(let i = 0; i < imagePixelSize2; i++){
        let bright = canvasImage.pixels[i*4];//Only take braightness value
        inputs[i] = bright / 255; //Normalizing
      }
      // print(inputs);

      //Taking labels from JSON
      let targets = [];
      let labelXS = trainLabel.coordinates[i].xs/128;
      let labelYS = trainLabel.coordinates[i].ys/128;
      let labelXE = trainLabel.coordinates[i].xe/128;
      let labelYE = trainLabel.coordinates[i].ye/128;

      targets.push(labelXS);
      targets.push(labelYS);
      targets.push(labelXE);
      targets.push(labelYE);

      nn.train(inputs, targets);
      canvasImage.updatePixels();
    }
}

function guess(){
      // updatePixels();
      image(testImg[testImgIndex], 0, 0);//Display the image

      print("Test image index: "+testImgIndex);
      let d = pixelDensity();
      let canvasImage = get();
      canvasImage.resize(28, 28);
      canvasImage.loadPixels();//Taking pixels on display

      //Make inputs
      // let inputs = [];
      // for(let i = 0; i < imagePixelSize; i++){
      //   let bright = canvasImage.pixels[i*4];//Only take braightness value
      //   inputs[i] = bright / 255.0; //Normalizing
      // }
      let inputs = [];
      for(let i = 0; i < imagePixelSize2; i++){
        let bright = canvasImage.pixels[i*4];//Only take braightness value
        inputs[i] = bright / 255.0; //Normalizing
      }

      let guess = nn.feedforward(inputs);
      let guessCoordinaites = [];
      print(guess);
      // print(inputs);
      for(let i=0; i < guess.length; i++){
        // print(guess[i]*128);
        guessCoordinaites.push(guess[i]*128);
      }
      print(guessCoordinaites);

      //Taking labels from JSON
      let coordXS = testLabel.coordinates[testImgIndex].xs;
      let coordYS = testLabel.coordinates[testImgIndex].ys;
      let coordXE = testLabel.coordinates[testImgIndex].xe;
      let coordYE = testLabel.coordinates[testImgIndex].ye;

      // print(coordXS);
      // print(coordYS);
      // print(coordXE);
      // print(coordYE);

      strokeWeight(4);
      // stroke(255, 0, 0);
      // line(coordXS, coordYS, coordXE, coordYE);
      stroke(66, 200, 244);
      line(guessCoordinaites[0], guessCoordinaites[1], guessCoordinaites[2], guessCoordinaites[3]);
      canvasImage.updatePixels();//Taking pixels on display
}


function setup(){
  createCanvas(128, 128);
  // createCanvas(56, 56);
  background(0);

  // nn = new NeuralNetwork(imagePixelSize, 128, 4);
  nn = new NeuralNetwork(imagePixelSize2, 128, 4);

  trainDataCheck(79);//Number must be 0 - 79
  // testDataCheck(0);//Number must be 0 - 10

  let trainButton = select('#train');
  let epochCounter = 0;
  for(let epoch = 0; epoch < 20; epoch++){
    trainButton.mousePressed(function(){
      train();
      epochCounter++;
      console.log("Epoch: "+epochCounter);
    });
  }

  let testButton = select('#guess');
    testButton.mousePressed(function(){
    guess();
  });

  let clearButton = select('#clearAll');
  clearButton.mousePressed(function(){
    background(0);
  });
}

function draw(){
}
