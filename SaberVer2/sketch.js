let nn;
let trainImg = [];
let testImg = [];

let trainLabel;
let testLabel;
let fanfare;
const trainImageTotal = 2000;
const testImageTotal = 10;
const imagePixelSize = 16384;
const imagePixelSize2 = 784;

let epochCounter = 0;
let indexDisplay;
let epochDisplay;
let indexSlider;
let epochSlider;

function preload(){
  for(let i = 0; i < trainImageTotal; i++){
    trainImg[i] = loadImage('trainingData/Saber'+nf(i, 4)+'.png');
  }
  trainLabel = loadJSON("trainLabel.json");

  for(let i = 0; i < testImageTotal; i++){
    testImg[i] = loadImage('testData/Saber'+nf(i, 4)+'.png');
  }
  testLabel = loadJSON("testLabel.json");

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

  let bladeStartIndex = trainLabel.pixelIndices[trainImageIndex].BladeStart;
  let bladeEndIndex = trainLabel.pixelIndices[trainImageIndex].BladeEnd;


  let bladeStartX = bladeStartIndex % width;
  let bladeStartY = (bladeStartIndex - bladeStartX) / width;

  let bladeEndX = bladeEndIndex % width;
  let bladeEndY = (bladeEndIndex - bladeEndX) / width;

  strokeWeight(4);
  stroke(255, 0, 0);
  line(bladeStartX, bladeStartY, bladeEndX, bladeEndY);
}

function testDataCheck(index){
  let testImageIndex = index; //must be 0 - 9
  image(testImg[testImageIndex], 0, 0);

  let bladeStartIndex = testLabel.pixelIndices[testImageIndex].BladeStart;
  let bladeEndIndex = testLabel.pixelIndices[testImageIndex].BladeEnd;

  let bladeStartX = bladeStartIndex % width;
  let bladeStartY = (bladeStartIndex - bladeStartX) / width;

  let bladeEndX = bladeEndIndex % width;
  let bladeEndY = (bladeEndIndex - bladeEndX) / width;

  strokeWeight(4);
  stroke(255, 0, 0);
  line(bladeStartX, bladeStartY, bladeEndX, bladeEndY);
}

function prepareInputs(){
  let allInputs = [];

  for(let i = 0; i < trainImg.length; i++){
    image(trainImg[i], 0, 0);//Display the image
    let d = pixelDensity();
    let canvasImage = get();
    // canvasImage.resize(28, 28);
    canvasImage.loadPixels();//Taking pixels on display

    let input = [];
    for(let i = 0; i < imagePixelSize; i++){
      let bright = canvasImage.pixels[i*4];//Only take braightness value
      input[i] = bright / 255; //Normalizing
      // input[i] = bright;
    }

    allInputs.push(input);
  }
  return allInputs;
}

//display image then loading every pixels
function train(allInputs){
  shuffle(allInputs, true);
    for(let i = 0; i < allInputs.length; i++){
      let input = allInputs[i];
      // print(input);

      //Taking labels from JSON
      let bladeStartIndex = trainLabel.pixelIndices[i].BladeStart/(width * width);
      let bladeEndIndex = trainLabel.pixelIndices[i].BladeEnd/(width * width);


      let targets = [];
      targets.push(bladeStartIndex);
      targets.push(bladeEndIndex);

      nn.train(input, targets);
      // canvasImage.updatePixels();
    }
}

function guess(displayIndex){
    // updatePixels();
  image(testImg[displayIndex], 0, 0);//Display the image

  print("Test image index: "+displayIndex);
  let d = pixelDensity();
  let canvasImage = get();
  // canvasImage.resize(28, 28);
  canvasImage.loadPixels();//Taking pixels on display

  let inputs = [];
  for(let i = 0; i < imagePixelSize; i++){
    let bright = canvasImage.pixels[i*4];//Only take braightness value
    inputs[i] = bright / 255.0; //Normalizing
    // inputs[i] = bright;
  }

  let guess = nn.feedforward(inputs);
  let guessCoordinaites = [];
  print(guess);

  let guessStartIndex = guess[0] * (width * width);
  let guessEndIndex = guess[1] * (width * width);

  let guessStartX = guessStartIndex % width;
  let guessStartY = (guessStartIndex - guessStartX) / width;

  let guessEndX = guessEndIndex % width;
  let guessEndY = (guessEndIndex - guessEndX) / width;

  print(guessStartX);
  print(guessStartY);
  print(guessEndX);
  print(guessEndY);


  //Taking labels from JSON
  let bladeStartIndex = testLabel.pixelIndices[displayIndex].BladeStart;
  let bladeEndIndex = testLabel.pixelIndices[displayIndex].BladeEnd;

  let bladeStartX = bladeStartIndex % width;
  let bladeStartY = (bladeStartIndex - bladeStartX) / width;

  let bladeEndX = bladeEndIndex % width;
  let bladeEndY = (bladeEndIndex - bladeEndX) / width;

  strokeWeight(4);
  stroke(255, 0, 0);
  line(bladeStartX, bladeStartY, bladeEndX, bladeEndY);
  stroke(66, 200, 244);
  line(guessStartX, guessStartY, guessEndX, guessEndY);
}

function setup(){
  createCanvas(128, 128);
  background(0);


  nn = new NeuralNetwork(imagePixelSize, 64, 2);

  let allInputs = prepareInputs();
  // console.log(allInputs[1614]);

  // trainDataCheck(578);//Number must be 0 - 1999
  testDataCheck(0);//Number must be 0 - 9

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
        train(allInputs);
        epochCounter++;
        console.log("Epoch: "+epochCounter);
      }
      fanfare.setVolume(0.2);
      fanfare.play();
      console.log("Training compulite !!!");
    });


  // let testButton = select('#guess');
  let testButton = createButton('guess');
  testButton.id("Button");
  testButton.mousePressed(function(){
    guess(indexSlider.value());
  });

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
