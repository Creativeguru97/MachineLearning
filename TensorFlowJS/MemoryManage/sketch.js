function setup(){
  noCanvas();
}

function draw(){
  frameRate(1);
  const values = [];
  for(let i = 0; i < 15000; i++){
    values[i] = random(0, 100);
  }
  const shape1 = [500, 30];
  // const shape2 = [3, 5];

  //Math operation
  tf.tidy(() => {//tidy up the allcation!!!!
    const a = tf.tensor2d(values, shape1, 'int32');
    const b = tf.tensor2d(values, shape1, 'int32');
    const b_t = b.transpose();
    const c = a.matMul(b_t);
    //Do something meaningful stuff with tensorflow
  });


  // tf.tidy(myStuff);
  // function myStuff(){
  //   const a = tf.tensor2d(values, shape1, 'int32');
  //   const b = tf.tensor2d(values, shape1, 'int32');
  //   const b_t = b.transpose();
  //   const c = a.matMul(b_t);
  // }



  //Deallocate memory for each of these
  // a.dispose();
  // b.dispose();
  // c.dispose();
  // b_t.dispose();

  // c.print();
  console.log(tf.memory().numTensors);//We can see the number of tensor stored


}
