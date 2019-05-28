// var m = new Matrix(3, 2);
//console.table(m.data);
//
class Matrix{
  constructor(rows, cols){

    this.rows = rows;
    this.cols = cols;
    this.data = [];

    //Initialize value in Matrix
    for(var i = 0; i < this.rows; i++){
      this.data[i] = [];
      for(var j = 0; j < this.cols; j++){
        this.data[i][j] = 0;//Every simgle rows and cols location is a values 0
      }
    }
  }

  static fromArray(array){//arr : rows
    let m = new Matrix(array.length, 1);
    for (let i = 0; i < array.length; i++){
      m.data[i][0] = array[i];
    }
    return m;
  }

  //Take 2d Matrix and flatten it to 1d array
  toArray(){//Doesn't need to be static
    let array = [];
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        array.push(this.data[i][j]);
      }
    }
    return array;
  }

  randomize(){
    for(var i = 0; i < this.rows; i++){
      for(var j = 0; j < this.cols; j++){
        this.data[i][j] = Math.floor(Math.random()*2-1);//We take a number between -1 to 1;
      }
    }
  }

  static transpose(matrix){
    let result = new Matrix(matrix.cols, matrix.rows);//Make blank frame of Matrix

    for(var i = 0; i < matrix.rows; i++){
      for(var j = 0; j < matrix.cols; j++){
        result.data[j][i] = matrix.data[i][j];
      }
    }
    return result;
  }


  add(n){
    if(n instanceof Matrix){
      for(var i = 0; i < this.rows; i++){
        for(var j = 0; j < this.cols; j++){
          this.data[i][j] += n.data[i][j];
        }
      }
    }else{
      for(var i = 0; i < this.rows; i++){
        for(var j = 0; j < this.cols; j++){
          this.data[i][j] += n;
        }
      }
    }
  }

  static subtract(a, b){
    //Return a new Matrix object a - b
    let result = new Matrix(a.rows, a.cols);
    for(var i = 0; i < result.rows; i++){
      for(var j = 0; j < result.cols; j++){
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return result;
  }


static multiply(a, b){
    //Matrix product
    if(a.cols !== b.rows){
      console.log('Columns of A must match rows of B');
      return undefined;
    }
    //Define every result value
    let result = new Matrix(a.rows, b.cols);
    for (let i = 0; i < result.rows; i++){
      for (let j = 0; j < result.cols; j++){
        //Dot product pf value in col
        let sum = 0;
        for(let k = 0; k < a.cols/* == b.rows*/; k++){
          sum += a.data[i][k] * b.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }
    // console.table(result.data);
    return result;
}

  //Non static version
  multiply(n){
    if(n instanceof Matrix){
      //Scalar product
      for(var i = 0; i < this.rows; i++){
        for(var j = 0; j < this.cols; j++){
          this.data[i][j] *= n.data[i][j];
        }
      }
    }else{
      for(var i = 0; i < this.rows; i++){
        for(var j = 0; j < this.cols; j++){
          this.data[i][j] *= n;
        }
      }
    }
  }

    map(func){
        //Apply a function to every element of matrix
        //Programming languade like java is difficult to do this
        for(var i = 0; i < this.rows; i++){
          for(var j = 0; j < this.cols; j++){
            //Look through every element of the matrix and take the value.
            let val = this.data[i][j];
            this.data[i][j] = func(val);//Additional : func(val, i, j);
            /*This time, we take all weight sum(element) of Matrix
              and throw in to sidmoid funciton.*/
          }
        }
      }

      static map(matrix, func){
        let result = new Matrix(matrix.rows, matrix.cols);
        for(let i = 0; i < matrix.rows; i++){
          for(let j = 0; j < matrix.cols; j++){
            let val = matrix.data[i][j];
            result.data[i][j] = func(val);
          }
        }
        return result;
      }

    print(){
      console.table(this.data);
    }

}

if(typeof module !== 'undefined'){
  module.exports = Matrix;
}
