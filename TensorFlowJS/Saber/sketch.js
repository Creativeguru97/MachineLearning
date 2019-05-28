let img = [];
let label;
const imageTotal = 36;
const imagePixelSize = 16384;

function preload(){
  for(let i = 0; i < imageTotal; i++){
    img[i] = loadImage('data/DataSet'+nf(i, 2)+'.png');
  }
  label = loadJSON("label.json");

}

function setup(){
  createCanvas(128, 128);
  let imageIndex = 4;
  image(img[imageIndex], 0, 0);
  let d = pixelDensity();

  let canvasImage = get();
  canvasImage.loadPixels();
  for(let i = 0; i < imagePixelSize; i++){
    let bright = canvasImage.pixels[i*4];//Only take braightness value
    // inputs[i] = bright / 255.0; //Normalize
  }
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
