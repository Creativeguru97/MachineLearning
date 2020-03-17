
let nosePositionX;
let nosePositionY;

navigator.mediaDevices.getUserMedia({video:{width: 320, height: 240 }})
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
      //I have to separate load model part from estimate part to prevent accumulatiing allocation 
      posenet.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      inputResolution: { width: 320, height: 240 },
      multiplier: 0.5
      })
      .then(function(net){
        return net.estimateMultiplePoses(element, {
          flipHorizontal: false,
          maxDetections: 2,
          scoreThreshold: 0.6,
          nmsRadius: 20})
      }).then(function(poses){
        nosePositionX = poses[0].keypoints[0].position.x;
        nosePositionY = poses[0].keypoints[0].position.y;

        console.log("----------");
        console.log("x: "+nosePositionX);
        console.log("y: "+nosePositionY);
        console.log("----------");
      })
  }, 500)

})


// ----- Comfortable p5 world! -----

let canvas;

canvas = p => {
  p.setup = () => {
    p.createCanvas(320, 240);
  }

  p.draw = () => {
    p.clear();
    if(nosePositionX != undefined && nosePositionY != undefined){
      p.ellipse(nosePositionX, nosePositionY, 20, 20);
    }
  }
}

// ----- Comfortable p5 world! -----


let myp5 = new p5(canvas, 'canvas');
