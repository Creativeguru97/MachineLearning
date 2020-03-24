
let video;
let poseNet;
let pose;

function setup(){
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);//callback
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses){
  console.log(poses);
  if(poses.length > 0){
    pose = poses[0].pose;
  }
}

function modelLoaded(){
  console.log("poseNet ready!");
}

function draw(){
  image(video, 0, 0);

  if(pose != undefined){
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, 20);
  }
  console.log(frameRate());
}
