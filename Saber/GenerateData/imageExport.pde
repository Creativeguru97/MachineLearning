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
      
      excuteJSON.xs = append(excuteJSON.xs, saber.bladeStart.x);
      excuteJSON.ys = append(excuteJSON.ys, saber.bladeStart.y);
      excuteJSON.xe = append(excuteJSON.xe, saber.bladeEnd.x);
      excuteJSON.ye = append(excuteJSON.ye, saber.bladeEnd.y);
      
      fill(255,0,0);
    }else{
      fill(0,255,0);
    }
  
    noStroke();
    ellipse(width/2, height*7/8, 8, 8);
  }
  
  
}
