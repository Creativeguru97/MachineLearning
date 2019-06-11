Saber saber;
imageExport excuteImage;
JSON excuteJSON;
int EndNum = 1;

void setup(){
  size(128, 128);
  excuteImage = new imageExport(EndNum);//Number of frames will be exported
  excuteJSON = new JSON();
}

void draw(){
  background(0);
  saber = new Saber();
  saber.display();
  excuteImage.exportImage();
  if(excuteImage.frameIndex >= EndNum){
      excuteJSON.generate();
  }
  
}

void keyPressed(){
  if(key == 'e'){
    excuteImage.Exporting = !excuteImage.Exporting;
  }else if(key == 'j' && excuteImage.frameIndex >= EndNum){
    excuteJSON.exportJSON();
  }
}
