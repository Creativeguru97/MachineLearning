class Saber{
  PVector gripStart;
  PVector bladeStart;
  PVector bladeEnd;
  float saberLength;
  float thickness;
  
  float[] saberXS = {};
  float[] saberYS = {};
  float[] saberXE = {};
  float[] saberYE = {};
  
  
  Saber(){
    gripStart = new PVector(random(width), random(height));
    bladeEnd = new PVector(random(width), random(height));
    saberLength = dist(gripStart.x, gripStart.y, bladeEnd.x, bladeEnd.y);
    thickness = saberLength / 30;
  }
  
  //From formula in High School Math2 text book p.74
  float Y(float x1, float y1, float x2, float y2){
    float X = x1 + (x2 - x1)/4;
    return ((y2 - y1)/(x2 - x1))*(X - x1) + y1;
  }
  
  void display(){
    stroke(255);
    strokeWeight(thickness);
    float bladestartY = Y(gripStart.x, gripStart.y, bladeEnd.x, bladeEnd.y);
    line(gripStart.x, gripStart.y, bladeEnd.x, bladeEnd.y);
    
    float bladestartX = gripStart.x + (bladeEnd.x - gripStart.x)/4;
    bladeStart = new PVector(bladestartX, bladestartY);
    stroke(128);
    strokeWeight(thickness + 0.4);
    line(gripStart.x, gripStart.y, bladeStart.x, bladeStart.y);
    
    ////For debugging
    //fill(0, 255, 0);
    //stroke(0, 255, 0);
    //ellipse(gripStart.x, gripStart.y, 3, 3);
    //fill(255, 0, 0);
    //stroke(255, 0, 0);
    //ellipse(bladeEnd.x, bladeEnd.y, 3, 3);
    //fill(0, 0, 255);
    //stroke(0, 0, 255);
    //ellipse(gripStart.x + (bladeEnd.x - gripStart.x)/4, gripEndY, 3, 3);
  }
}
