class JSON{

  float[] BladeStart = {};
  float[] BladeEnd = {};
  
  
  int num = 0;
  
  JSONArray pixelIndices;
  
  JSON(){
    pixelIndices = new JSONArray();
  }
  
  void generate(){
    if(num < 1){
      for (int i = 0; i < BladeStart.length; i++) {
        JSONObject pixelIndex = new JSONObject();


        pixelIndex.setFloat("BladeStart", BladeStart[i]);
        pixelIndex.setFloat("BladeEnd", BladeEnd[i]);
        
    
        pixelIndices.setJSONObject(i, pixelIndex);
        //print(BladeStart.length);
      }
      num++;
    }
  }
  
  void exportJSON(){
    saveJSONArray(pixelIndices, "trainLabel.json");
  }
}
