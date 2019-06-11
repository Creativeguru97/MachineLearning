class JSON{

  float[] xs = {};
  float[] ys = {};
  float[] xe = {};
  float[] ye = {};
  
  int num = 0;
  
  JSONArray coordinates;
  
  JSON(){
    coordinates = new JSONArray();
  }
  
  void generate(){
    if(num < 1){
      for (int i = 0; i < xs.length; i++) {
        JSONObject coordinate = new JSONObject();
    
        coordinate.setFloat("xs", xs[i]);
        coordinate.setFloat("ys", ys[i]);
        coordinate.setFloat("xe", xe[i]);
        coordinate.setFloat("ye", ye[i]);
    
        coordinates.setJSONObject(i, coordinate);
        print(xs.length);
      }
      num++;
    }
  }
  
  void exportJSON(){
    saveJSONArray(coordinates, "trainLabel.json");
  }
}
