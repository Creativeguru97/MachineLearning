function sigmoid(x){
  return 1 / (1 + Math.exp(-x));
}

function derivativeSigmoid(y){
  //return sigmoid(x) * (1 - sigmoid(x));
  return y * (1 - y);
}

function ReLU(x){
  if(x >= 0 && x <= 128){
    return Math.max(0, x);
  }else if(x < 0){
    return 0.001*x;
  }else{
    return 1;
  }
}

function derivativeReLU(y){
  if(y >= 0){
    return 1;
  }else if(y < 0){
    return 0.001;
  }
}




class NeuralNetwork{

  constructor(input_nodes, hidden_nodes, output_nodes){
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.weights_IH = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_HO = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_IH.randomize();//We take random(-1, 1) for weight
    this.weights_HO.randomize();

    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();
    this.learning_rate = 0.3;
  }

  feedforward(input_array){
    //Generating the Hidden outputs !!!
    let inputs = Matrix.fromArray(input_array);//Make input matrix from array
    let hidden = Matrix.multiply(this.weights_IH, inputs);//I * H
    //print(hidden);
    hidden.add(this.bias_h);//I * H + b (= h)
    //Activation function!
    hidden.map(sigmoid);
    // hidden.map(ReLU);

    //Generating the Output's outputs !!!
    let output = Matrix.multiply(this.weights_HO, hidden);//h * O
    output.add(this.bias_o);//h * O + b2
    //Activation function!
    output.map(sigmoid);
    // output.map(ReLU);
    //Sending it back to the caller
    return output.toArray();
  }

  train(input_array, target_array){

    //Feedforward
    //Generating the Hidden outputs !!!
    let inputs = Matrix.fromArray(input_array);//Make input matrix from array
    let hidden = Matrix.multiply(this.weights_IH, inputs);//I * H
    // print(inputs);
    // print(this.weights_IH);
    // print(hidden);

    hidden.add(this.bias_h);//I * H + b (= h)
    // print(hidden);
    hidden.map(sigmoid);
    // hidden.map(ReLU);

    //Generating the Output's outputs !!!
    let outputs = Matrix.multiply(this.weights_HO, hidden);//h * O
    outputs.add(this.bias_o);//h * O + b2
    outputs.map(sigmoid);
    // outputs.map(ReLU);
    // console.log(outputs);
//----------------------------------------------------------
    //Backpropagation
    let targets = Matrix.fromArray(target_array);
    // console.log(targets);
    //Calculate the console.error
    let output_errors = Matrix.subtract(targets, outputs);//Error = targets(answer) - outputs
    // console.log(output_errors);
    //Gradient Desent Calculation
    let gradients = Matrix.map(outputs, derivativeSigmoid);// let gradient = outputs * (1 - outputs);
    // let gradients = Matrix.map(outputs, derivativeReLU);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_rate);

    //Calculate delta weights
    let hiddenT = Matrix.transpose(hidden);
    let delta_weights_HO = Matrix.multiply(gradients, hiddenT);
    this.weights_HO.add(delta_weights_HO);//Adjust by delta weights
    this.bias_o.add(gradients);//Adjust the bias by its deltas (which is kust the calculated gradient)


    //Calculate hidden layer errors
    let weights_HO_tr = Matrix.transpose(this.weights_HO);
    let hidden_errors = Matrix.multiply(weights_HO_tr, output_errors);
    //Calculate hidden gradient descent
    let hidden_gradients = Matrix.map(hidden, derivativeSigmoid);
    // let hidden_gradients = Matrix.map(hidden, derivativeReLU);
    hidden_gradients.multiply(hidden_errors);
    hidden_gradients.multiply(this.learning_rate);

    //Calculate hidden delta weights
    let inputsT = Matrix.transpose(inputs);
    let delta_weights_IH = Matrix.multiply(hidden_gradients, inputsT);

    this.weights_IH.add(delta_weights_IH);//Adjust by delta weights
    this.bias_h.add(hidden_gradients);//Adjust the bias by its deltas (which is kust the calculated gradient)

  }
}
