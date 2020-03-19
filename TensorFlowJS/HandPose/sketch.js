/*
  Tutorials to implement image feeding:
    Tutorial0: https://github.com/tensorflow/tfjs-models/tree/master/posenet
    Tutorial1: https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5

  Resource that help me a lot to implement video feeding:
    https://github.com/hpssjellis/beginner-tensorflowjs-examples-in-javascript/blob/master/tfjsv1/tfjs01-posenet-webcam.html
*/

//I think this is the simplest PoseNet Video feeding Implementation ever.

let pose;
let handPoses = [];//Must be array, because estimateMultiplePoses() returns array

const widthValue = 640;
const heightValue = 480;


async function loadHandPose(){
  pose = await handpose.load();
}

loadHandPose();


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
let element = document.querySelector('video');


element.addEventListener("play", () => {

  setInterval(async () => {
    handPoses = await pose.estimateHands(element);
    if(handPoses.length > 0){
      console.log(handPoses);
    }

  }, 100)

})


// ----- Comfortable p5 world! -----
//
// let canvas;
//
// canvas = p => {
//   p.setup = () => {
//     p.createCanvas(widthValue, heightValue);
//     // p.clear();
//   }
//
//   p.draw = () => {
//     p.clear();
//     if(nosePositionX != undefined && nosePositionY != undefined){
//       p.ellipse(nosePositionX, nosePositionY, 20, 20);
//     }
//
//     console.log(p.frameRate());
//   }
// }
//
// // ----- Comfortable p5 world! -----
//
//
// let myp5 = new p5(canvas, 'canvas');
