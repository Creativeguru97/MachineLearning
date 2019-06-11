void setup(){
  size(400, 400);
}

void draw(){
  background(0);
  PVector coord = new PVector(mouseX, mouseY);
  text(coord.x, 20, 20);
  text(coord.y, 20, 40);
  //float x = mouseX;
  //float y = mouseY;
  //text(x, 20, 20);
  //text(y, 20, 40);
  
  
  
  float pixelIndex = coord.x + coord.y * width;
  
  float x2 = pixelIndex % width;
  float y2 = pixelIndex / width;
  text(x2, 20, 70);
  text(y2, 20, 90);
  fill(255);
  ellipse(x2, y2, 10, 10);  
}
