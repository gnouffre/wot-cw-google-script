var cluster = "demo";
var DirSave = 'EXTRACT';
var FileSave = 'extraction.json';
var DirMap = 'MAP';

function mapBuild(season_id) {
  Logger.log('mapbuild: ');
  var mapbuild = [];
  var FileMap = season_id + '.json';
  var SaveContent =  getJsonFile(DirSave, FileSave );
  var Savelist = JSON.parse(SaveContent);
  var provinceList = Savelist["provinces"];
  for (var province in provinceList) {
    var province_id = provinceList[province].province_id;
    var uri = provinceList[province].uri;
    var geom = get_coordonate(province_id);
    var provincebuild = {
      'type' : 'Feature',
      'geometry' : get_coordonate(province_id),
      'properties' : {
        'province_id' : provinceList[province].province_id,
        'linkurl' : provinceList[province].uri
      }
    }
    mapbuild.push(provincebuild);
  }
    var mapbuildjson  = {
      'type' : 'FeatureCollection',
      'features': mapbuild};
   var jsonString = JSON.stringify(mapbuildjson);
  setJsonFile(DirMap, FileMap,jsonString );
  return true;
}


function get_coordonate(province_id) {
  var provinceMapData = getWargamingAPI("https://cwxstatic-eu.wargaming.net/v25/provinces_geojson/" + province_id + ".json", "GET");
  var geom = provinceMapData['geom'];
  return geom ;

}

