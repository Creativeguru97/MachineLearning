/*
  Tutorial0: https://github.com/tensorflow/tfjs-models/tree/master/posenet
  Tutorial1: https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
*/
let flipHorizontal = false;

// let imageElement = document.getElementById('Bơ');
// let imageElement = document.getElementById('bé_Bơ');
// let imageElement = document.getElementById('HaiNgười');
// let imageElement = document.getElementById('baNgười');
let imageElement = document.getElementById('bốnNgười');

let poseLength;
let keypointsLength;
let allPoses = [];
let p5Width = imageElement.width;
let p5Height = imageElement.height;

let nosePositionX;
let nosePositionY;


/*
   More about PoseNet and the parameters:
     Tutorial0: https://github.com/tensorflow/tfjs-models/tree/master/posenet
     Tutorial1: https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
*/

// ----- Single pose estimation -----
// posenet.load({
//   architecture: 'MobileNetV1',
//   outputStride: 16,
//   // inputResolution: { width: 640, height: 480 },
//   multiplier: 0.5
// }).then(function(net) {
//   const pose = net.estimateSinglePose(imageElement, {
//     flipHorizontal: false,
//     imageScaleFactor:0.5
//   });
//   return pose;
// }).then(function(pose){
//   console.log(pose);
// })

// ----- Multi-pose estimation -----

async function loadPoseNet(){
  posenet.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    // inputResolution: { width: 640, height: 480 },
    multiplier: 1.0
  }).then(function(net){
       return net.estimateMultiplePoses(imageElement, {
         flipHorizontal: false,
         maxDetections: 5,
         scoreThreshold: 0.5,
         nmsRadius: 20})
     }).then(function(poses){
       poseLength = poses.length;
       keypointsLength = poses[0].keypoints.length;
       allPoses = poses;

       nosePositionX = allPoses[0].keypoints[0].position.x;
       nosePositionY = allPoses[0].keypoints[0].position.y;
       console.log(poses);
       console.log(allPoses);
       // console.log(nosePositionX);
     })
}

loadPoseNet();

let canvas;

canvas = p => {
 p.setup = () => {
   p.createCanvas(p5Width, p5Height);
   p.clear();
   p.ellipse(p.width/2, p.height/2, 100, 100);
 }

 p.draw = () => {
   if(allPoses != undefined){
     console.log(nosePositionX);
   }

   if(allPoses != undefined){
     for(let i=0; i < poseLength; i++){
       for(let j=0; j < keypointsLength; i++){
         p.ellipse(
           allPoses[i].keypoints[j].position.x,
           allPoses[i].keypoints[j].position.y,
           5,
           5
         );
       }
     }
   }
 }
}

// ----- Comfortable p5 world! -----


let myp5 = new p5(canvas, 'canvas');
