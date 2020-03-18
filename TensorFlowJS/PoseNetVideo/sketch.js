/*
  Tutorials to implement image feeding:
    Tutorial0: https://github.com/tensorflow/tfjs-models/tree/master/posenet
    Tutorial1: https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5

  Resource that help me a lot to implement video feeding:
    https://github.com/hpssjellis/beginner-tensorflowjs-examples-in-javascript/blob/master/tfjsv1/tfjs01-posenet-webcam.html
*/

//I think this is the simplest PoseNet Video feeding Implementation ever.

let net;
let poses = [];//Must be array, because estimateMultiplePoses() returns array

let nosePositionX;
let nosePositionY;

const widthValue = 320;
const heightValue = 240;


async function loadPoseNet(){
  net = await posenet.load({
  architecture: 'MobileNetV1',
  outputStride: 16,
  inputResolution: { width: widthValue, height: heightValue },
  multiplier: 0.5
  })
}

loadPoseNet();


navigator.mediaDevices.getUserMedia({video:{width: widthValue, height: heightValue }})
.then(mediaStream => {
  var video = document.querySelector('video');
  video.srcObject = mediaStream;
  // video.onloadedmetadata = function(e) {
  //   video.play();
  // };
})
.catch((err) => { console.log(err.name + ": " + err.message); });

let flipHorizontal = false;
let element = document.getElementById('video');


element.addEventListener("play", () => {

  setInterval(async () => {
  poses = await net.estimateMultiplePoses(element, {
    flipHorizontal: false,
    maxDetections: 2,
    scoreThreshold: 0.6,
    nmsRadius: 20
  })

  nosePositionX = poses[0].keypoints[0].position.x;
  nosePositionY = poses[0].keypoints[0].position.y;

  // console.log("----------");
  // console.log("x: "+nosePositionX);
  // console.log("y: "+nosePositionY);
  // console.log("----------");

}, 50)

})


// ----- Comfortable p5 world! -----

let canvas;

canvas = p => {
  p.setup = () => {
    p.createCanvas(widthValue, heightValue);
    // p.clear();
  }

  p.draw = () => {
    p.clear();
    if(nosePositionX != undefined && nosePositionY != undefined){
      p.ellipse(nosePositionX, nosePositionY, 20, 20);
    }

    console.log(p.frameRate());
  }
}

// ----- Comfortable p5 world! -----


let myp5 = new p5(canvas, 'canvas');
