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

function prepareInputs(){
  let allInputs = [];

  for(let i = 0; i < trainImg.length; i++){
    image(trainImg[i], 0, 0);//Display the image
    let d = pixelDensity();
    let canvasImage = get();
    canvasImage.resize(28, 28);
    canvasImage.loadPixels();//Taking pixels on display

    let input = [];
    for(let i = 0; i < imagePixelSize2; i++){
      let bright = canvasImage.pixels[i*4];//Only take braightness value
      input[i] = bright / 255; //Normalizing
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
      let targets = [];
      // let labelXS = trainLabel.coordinates[i].xs/128;
      // let labelYS = trainLabel.coordinates[i].ys/128;
      // let labelXE = trainLabel.coordinates[i].xe/128;
      // let labelYE = trainLabel.coordinates[i].ye/128;
      let labelXS = trainLabel.coordinates[i].xs;
      let labelYS = trainLabel.coordinates[i].ys;
      let labelXE = trainLabel.coordinates[i].xe;
      let labelYE = trainLabel.coordinates[i].ye;

      targets.push(labelXS);
      targets.push(labelYS);
      targets.push(labelXE);
      targets.push(labelYE);

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
  canvasImage.resize(28, 28);
  canvasImage.loadPixels();//Taking pixels on display

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
  let coordXS = testLabel.coordinates[displayIndex].xs;
  let coordYS = testLabel.coordinates[displayIndex].ys;
  let coordXE = testLabel.coordinates[displayIndex].xe;
  let coordYE = testLabel.coordinates[displayIndex].ye;

  // print(coordXS);
  // print(coordYS);
  // print(coordXE);
  // print(coordYE);

  strokeWeight(4);
  stroke(255, 0, 0);
  line(coordXS, coordYS, coordXE, coordYE);
  stroke(66, 200, 244);
  line(guessCoordinaites[0], guessCoordinaites[1], guessCoordinaites[2], guessCoordinaites[3]);
  // canvasImage.updatePixels();//Taking pixels on display
}

function setup(){
  createCanvas(128, 128);
  background(0);


  nn = new NeuralNetwork(imagePixelSize2, 128, 4);

  let allInputs = prepareInputs();

  // trainDataCheck(300);//Number must be 0 - 1999
  // testDataCheck(6);//Number must be 0 - 9

  indexDisplay = createP();
  indexDisplay.id("Display");
  indexSlider = createSlider(0, testImageTotal-1, 0, 1);
  indexSlider.id("Slider");

  epochDisplay = createP();
  epochDisplay.id("Display");
  epochSlider = createSlider(10, 100, 10, 10);
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
