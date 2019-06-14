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
      
      float BladeStartIndex = int(saber.bladeStart.x) + int(saber.bladeStart.y) * width;
      float BladeEndIndex = int(saber.bladeEnd.x) + int(saber.bladeEnd.y) * 128;

    //DEBUG
      //print("index "+ BladeStartIndex);
      //println("   index "+ BladeEndIndex);
      
      //print("x "+saber.bladeStart.x);
      //println("   x "+saber.bladeEnd.x);
      //print("y "+saber.bladeStart.y);
      //println("   y "+saber.bladeEnd.y);
      
      //float xs = BladeStartIndex % width;
      //float ys = (BladeStartIndex - xs) / width;
      //float xe = BladeEndIndex % width;
      //float ye = (BladeEndIndex - xe) / width;
      //print("xs "+xs);
      //println("   xe "+xe);
      //print("ys "+ys);
      //println("   ye "+ye);
            
    
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
