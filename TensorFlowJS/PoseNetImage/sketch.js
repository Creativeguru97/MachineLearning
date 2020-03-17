/*
  Tutorial0: https://github.com/tensorflow/tfjs-models/tree/master/posenet
  Tutorial1: https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
*/


// MobileNet: smaller, faster, lees accurate
const net = await posenet.load({
  //Configure parameters below
  architecture: 'MobileNetV1',
  outputStride: 16,
  inputResolution: { width: 640, height: 480 },
  multiplier: 0.75
});

// ResNet: larger, slower, more accurate
const net = await posenet.load({
  //Configure parameters below
  architecture: 'ResNet50',
  outputStride: 32,
  inputResolution: { width: 257, height: 200 },
  quantBytes: 2
});
