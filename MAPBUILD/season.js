var DataDir = 'DATA';
var Fileseason = 'seasondata.json';
var cluster = "demo";


function upDateSeason() {
  var season = getWargamingAPI("https://api.worldoftanks.eu/wot/globalmap/seasons/?application_id=" + cluster + "&status=ACTIVE", "POST");
 if (season['status'] == 'ok' && season['data'][0]['status'] == 'ACTIVE' ) {
  var season_id = season['data'][0]['season_id'];
} 
  
var seasonData = getJsonFile(DataDir, Fileseason );
  var seasonList = JSON.parse(seasonData);
  if (typeof seasonList[season_id] != "undefined" && seasonList[season_id]["build"] == true) {
    
    // rien a faire la map est construite
    
  } else {
    // demande de construction de la carte 
    var mapbuild = mapBuild(season_id);
    if (mapbuild == true) {
      // si carte construite mise a jour de la saison.
    var seasonDetail = {
    'season_id' : season_id,
    'season_name' : season['data'][0]['season_name'],
    'start' : season['data'][0]['start'],
    'end' : season['data'][0]['end'],
    'status' : season['data'][0]['status'],
    'build' : true
    };  
      seasonList[season_id] = seasonDetail;
      var jsonString = JSON.stringify(seasonList);
      setJsonFile(DataDir, Fileseason, jsonString );
    }


  }
}
  

