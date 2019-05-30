let img = [];
let label;
const imageTotal = 80;
const imagePixelSize = 16384;
let epoch = 10;

function preload(){
  for(let i = 0; i < imageTotal; i++){
    img[i] = loadImage('data/saber'+nf(i, 2)+'.png');
  }
  label = loadJSON("label.json");
}


function setup(){
  createCanvas(128, 128);
  background(0);

  nn = new NeuralNetwork(imagePixelSize, 128, 3);


  let imageIndex = 28; //0 - 79
  image(img[imageIndex], 0, 0);

  let labelXS = label.coordinates[imageIndex].xs;
  let labelYS = label.coordinates[imageIndex].ys;
  let labelXE = label.coordinates[imageIndex].xe;
  let labelYE = label.coordinates[imageIndex].ye;
  print(labelXS);
  print(labelYS);
  print(labelXE);
  print(labelYE);

  strokeWeight(4);
  stroke(255, 0, 0);
  line(labelXS, labelYS, labelXE, labelYE);
}

//display image then loading every pixels
function train(){
  for(let e = 0; e < epoch; e++){
    for(let i = 0; i < img.length; i++){
      image(img[i], 0, 0);//Display the image
      let d = pixelDensity();
      let canvasImage = get();
      canvasImage.loadPixels();//Taking pixels on display

      //Make inputs
      let inputs = [];
      for(let i = 0; i < imagePixelSize; i++){
        let bright = canvasImage.pixels[i*4];//Only take braightness value
        inputs[i] = bright / 255.0; //Normalizing
      }

      //Taking labels from JSON
      let label = [];
      let labelXS = label.coordinates[imageIndex].xs;
      let labelYS = label.coordinates[imageIndex].ys;
      let labelXE = label.coordinates[imageIndex].xe;
      let labelYE = label.coordinates[imageIndex].ye;

      train(inputs, )

    }
  }
}
