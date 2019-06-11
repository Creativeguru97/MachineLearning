class imageExport{
  int frameIndex;
  boolean Exporting = false;
  
  imageExport(int EndNum_){
    EndNum = EndNum_;
    frameIndex = 0;
  }
  
  void exportImage(){
    if(Exporting && saber.saberLength >= 60 && frameIndex < EndNum){
      saveFrame("trainingData/Saber"+nf(frameIndex, 4)+".png");
      frameIndex++;
      
      float BladeStartIndex = saber.bladeStart.x + saber.bladeStart.y * width;
      println(BladeStartIndex);
      println(saber.bladeStart.x);
      println(saber.bladeStart.y);
      
      float x = BladeStartIndex % width;
      float y = BladeStartIndex / width;
      println(x);
      println(y);
      
      float BladeEndIndex = saber.bladeEnd.x + saber.bladeEnd.y * 128;
      
    
      excuteJSON.BladeStart = append(excuteJSON.BladeStart, BladeStartIndex);
      excuteJSON.BladeEnd = append(excuteJSON.BladeEnd, BladeEndIndex);
      
      fill(255,0,0);
    }else{
      fill(0,255,0);
    }
  
    noStroke();
    ellipse(width/2, height*7/8, 8, 8);
  }
  
  
}
