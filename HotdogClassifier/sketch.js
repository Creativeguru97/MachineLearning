let nn;
let trainImgH = [];
let trainImgNH = [];
let testImgH = [];
let testImgNH = [];

const Hotdog = 0;
const NotHotdog = 1;

//Make blank objects
let hotdogs = {};
let notHotdogs = {};

let trainLabel;
let testLabel;
let fanfare;
const trainImageTotal = 249;
const testImageTotal = 250;
const imagePixelLength = 16384;
const imageDataSize = 65536;

let epochCounter = 0;
let indexDisplay;
let epochDisplay;
let indexSlider;
let epochSlider;

function preload(){
  for(let i = 0; i < trainImageTotal; i++){
    trainImgH[i] = loadImage('trainingData/hotdog/hotdog'+i+'.jpg');
    trainImgNH[i] = loadImage('trainingData/notHotdog/notHotdog'+i+'.jpg');
  }

  for(let i = 0; i < testImageTotal; i++){
    testImgH[i] = loadImage('testData/hotdog/hotdog'+i+'.jpg');
    testImgNH[i] = loadImage('testData/notHotdog/notHotdog'+i+'.jpg');
  }
  fanfare = loadSound("fanfare00.mp3");
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

  // print(inputs);

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

function prepareInputs(category, data, label){
  // let allInputs = [];
  category.inputArray = [];

  //For all image
  for(let i = 0; i < data.length; i++){
    image(data[i], 0, 0, 128, 128);//Display the image
    let d = pixelDensity();
    let canvasImage = get();
    // canvasImage.resize(28, 28);
    canvasImage.loadPixels();//Taking pixels on display

    let input = [];
    input.label = label;
    //For each indivisual image
    for(let i = 0; i < imagePixelLength; i++){
      let r = canvasImage.pixels[i]/255;
      let g = canvasImage.pixels[i+1]/255;
      let b = canvasImage.pixels[i+2]/255;
      let bright = canvasImage.pixels[i+3]/255;
      input.push(r);
      input.push(g);
      input.push(b);
      input.push(bright);
    }
    category.inputArray.push(input);
  }
  // shuffle(allInputs, true);
  return category.inputArray;
}

//display image then loading every pixels
function train(trainingData){
  shuffle(trainingData, true);
  // print(trainingData.length);
    for(let i = 0; i < trainingData.length; i++){
      let input = trainingData[i];

      let label = trainingData[i].label;
      let targets = [0, 0];
      targets[label] = 1;
      // print(targets);
      nn.train(input, targets);
      // canvasImage.updatePixels();
    }
}

function testAll(testingData){
  shuffle(testingData, true);
  print(testingData.length);
  let correct = 0;

  for(let i = 0; i < testingData.length; i++){
    let input = testingData[i];
    print(input);
    let label = testingData[i].label;
    let targets = [0, 0];
    targets[label] = 1;
    print(targets);
    let guess = nn.feedforward(input);
    print(guess);
    print("-------------");
    let m = max(guess);
    let classification = guess.indexOf(m);
    if(classification === label){
      correct++;
    }
  }
  let percentage = correct / testingData.length * 100;
  return percentage;
}

// function guess(displayIndex){
//     // updatePixels();
//   image(testImg[displayIndex], 0, 0);//Display the image
//
//   print("Test image index: "+displayIndex);
//   let d = pixelDensity();
//   let canvasImage = get();
//   // canvasImage.resize(28, 28);
//   canvasImage.loadPixels();//Taking pixels on display
//
//   let inputs = [];
//   for(let i = 0; i < imagePixelSize; i++){
//     let bright = canvasImage.pixels[i*4];//Only take braightness value
//     inputs[i] = bright / 255.0; //Normalizing
//     // inputs[i] = bright;
//   }
//
//   let guess = nn.feedforward(inputs);
//   let guessCoordinaites = [];
//   print(guess);
//   // print(inputs);
//   for(let i=0; i < guess.length; i++){
//     // print(guess[i]*128);
//     guessCoordinaites.push(guess[i]*128);
//     // guessCoordinaites.push(guess[i]);
//   }
//   print(guessCoordinaites);
//
//       //Taking labels from JSON
//   let coordXS = testLabel.coordinates[displayIndex].xs;
//   let coordYS = testLabel.coordinates[displayIndex].ys;
//   let coordXE = testLabel.coordinates[displayIndex].xe;
//   let coordYE = testLabel.coordinates[displayIndex].ye;
//
//   // print(coordXS);
//   // print(coordYS);
//   // print(coordXE);
//   // print(coordYE);
//
//   strokeWeight(4);
//   stroke(255, 0, 0);
//   line(coordXS, coordYS, coordXE, coordYE);
//   stroke(66, 200, 244);
//   line(guessCoordinaites[0], guessCoordinaites[1], guessCoordinaites[2], guessCoordinaites[3]);
//   // canvasImage.updatePixels();//Taking pixels on display
// }

function setup(){
  createCanvas(128, 128);
  background(0);


  nn = new NeuralNetwork(imageDataSize, 256, 2);
  nn.learningRate(0.1);

  let inputTrH = prepareInputs(hotdogs, trainImgH, Hotdog);
  let inputTrNH = prepareInputs(notHotdogs, trainImgNH, NotHotdog);
  let inputTeH = prepareInputs(hotdogs, testImgH, Hotdog);
  let inputTeNH = prepareInputs(notHotdogs, testImgNH, NotHotdog);
  // console.log(inputTrH);

  let trainingData = [];
  trainingData = trainingData.concat(inputTrH);
  trainingData = trainingData.concat(inputTrNH);
  // print(trainingData);

  let testingData = [];
  testingData = testingData.concat(inputTeH);
  testingData = testingData.concat(inputTeNH);
  print(testingData);

  // trainDataCheck(300);//Number must be 0 - 1999
  // testDataCheck(6);//Number must be 0 - 9

  indexDisplay = createP();
  indexDisplay.id("Display");
  indexSlider = createSlider(0, testImageTotal-1, 0, 1);
  indexSlider.id("Slider");

  epochDisplay = createP();
  epochDisplay.id("Display");
  epochSlider = createSlider(1, 5, 1, 1);
  epochSlider.id("Slider");

  let displayId = document.getElementById("Display").innerHTML;
  // createDiv(displayId);


  let sliderId = document.getElementById("Slider").innerHTML;
  createDiv(sliderId);

  // let trainButton = select('#train');
  let trainButton = createButton('train');
    trainButton.id("Button");
    trainButton.mousePressed(function(){
      for(let i = 0; i < epochSlider.value(); i++){
        // train(inputTrH, Hotdog);
        // train(inputTrNH, NotHotdog);
        train(trainingData);
        epochCounter++;
        console.log("Epoch: "+epochCounter);
      }
      fanfare.setVolume(0.2);
      fanfare.play();
      console.log("Training compulite !!!");
    });


  // let testButton = select('#guess');
  let testButton = createButton('test');
  testButton.id("Button");
  testButton.mousePressed(function(){
    // let percentage1 = testAll(inputTrH, Hotdog);
    // let percentage2 = testAll(inputTrNH, NotHotdog);
    let percentage = testAll(testingData);
    print(percentage);
  });

  // let guessButton = createButton('guess');
  // guessButton.id("Button");
  // guessButton.mousePressed(function(){
  //   guess(indexSlider.value());
  // });

  // let clearButton = select('#clearAll');
  let clearButton = createButton('clear');
  clearButton.id("Button");
  clearButton.mousePressed(function(){
    background(0);
  });

  let buttonId = document.getElementById("Button").innerHTML;
  // createDiv(buttonId);

}

function draw(){
  // display.html(indexSlider.value());
  indexDisplay.html("Test image index: " + indexSlider.value());
  epochDisplay.html("Epoch per click: " + epochSlider.value());
}
