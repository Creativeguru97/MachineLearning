let r, g, b;
let database;

function pickColor(){
  r = floor(random(256));
  g = floor(random(256));
  b = floor(random(256));
  background(r, g, b);
}

function setup(){

  //Project ID: color-classification-98523
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB1L5dtlPS8k_UyYVOhz9SC2zGGnBSmK_Y",
    authDomain: "color-classification-98523.firebaseapp.com",
    databaseURL: "https://color-classification-98523.firebaseio.com",
    projectId: "color-classification-98523",
    storageBucket: "color-classification-98523.appspot.com",
    messagingSenderId: "516979345814",
    appId: "1:516979345814:web:b169640ec8932031"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();//Make firebase object connected my online database


  let canvas = createCanvas(200, 200);
  canvas.id("Canvas");
  let canvasId = document.getElementById("Canvas").innerHTML;
  createDiv(canvasId);
  pickColor();

  //Other way of make selection
  // let dropdown = createSelect();
  // let radioButtons = createRadio();
  // radioButtons.option("red-ish");
  // radioButtons.option("green-ish");
  // radioButtons.option("blue-ish");

  let buttons = [];
  buttons.push(createButton("red-ish"));
  buttons.push(createButton("green-ish"));
  buttons.push(createButton("blue-ish"));
  buttons.push(createButton("orange-ish"));
  buttons.push(createButton("yellow-ish"));
  buttons.push(createButton("pink-ish"));
  buttons.push(createButton("purple-ish"));
  buttons.push(createButton("brown-ish"));
  buttons.push(createButton("grey-ish"));

  // buttons.id("Buttons");


  for(let i = 0; i < buttons.length; i++){
    buttons[i].id("Buttons");
    buttons[i].mousePressed(sendData);
  }
  // let buttonId = document.getElementById("Buttons").innerHTML;
}

function sendData(){

  let colorDatabase = database.ref("colors");

  let data = {
    r: r,
    g: g,
    b: b,
    label: this.html()
  }
  console.log("saving data");
  console.log(data);

  let color = colorDatabase.push(data, finished);
  console.log("Firebase generated key: " + color.key);

  function finished(err){
    if(err){
      console.error("ooops, something went wrong.");
      console.error(err);
    }else{
      console.log("Data saved successfully");
      pickColor();
    }
  }
}
