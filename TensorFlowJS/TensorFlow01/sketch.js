function setup(){
  noCanvas();
  // Pass an array of values to create a vector.
    // tf.tensor([1, 2, 3, 4]).print();
    // const data = tf.tensor([1, 2, 3, 4]);//These are pixel values

    // tf.tensor([values], [shape], [dtype]);
    // const data = tf.tensor([0, 0, 127.5, 255, 100, 50, 65, 39], [2, 2, 2], 'int32');//These are pixel values
    // console.log(data.toString());
    // console.log(data);
    const data = tf.tensor([0, 0, 127.5, 255], [2, 2], 'int32');
    data.print();

    const values = [];
    for(let i = 0; i < 15; i++){
      values[i] = random(0, 100);
    }
    const shape1 = [5, 3];
    // const shape2 = [3, 5];

    // const tens = tf.tensor3d(values, shape, 'int32');
    // const tensV = tf.variable(tens);//We can change value of this even const
    // console.log(tensV);

    //Math operation
    const a = tf.tensor2d(values, shape1, 'int32');
    const b = tf.tensor2d(values, shape1, 'int32');
    const bb = b.transpose();
    const c = a.matMul(bb);
    // a.print();
    // b.print();
    c.print();

    // console.log(tens.toString());
    // tens.print();

    /*When we declare the value, the values are stored in array
    then when we make the tensor, that values get copied on GPU.
    That takes some time
    So we want minimize that by*/

    //tens.data().then(function(stuff){
    //   console.log(stuff);
    // });

    // console.log(tens.dataSync());//Give us all data back to array
    // console.log(tens.get(1));//Deprecated since 1.0,0
    // console.log(values[0]);
    // tens.set(0, 10);
}
