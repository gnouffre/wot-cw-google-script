  // mettre son identifiant CLUSTER
  var cluster = "demo";



function buildnewsave () {
 var season = getWargamingAPI("https://api.worldoftanks.eu/wot/globalmap/seasons/?application_id=" + cluster + "&status=ACTIVE");
 if (season['status'] == 'ok' && season['data'][0]['status'] == 'ACTIVE' ) {
  var season_id = season['data'][0]['season_id'];
} 
 var fronts = getWargamingAPI("https://api.worldoftanks.eu/wot/globalmap/fronts/?application_id=" + cluster);
  fronts['data'].forEach (function (front) {		
  var frontid =  front['front_id']	;
  var k = 0;
  var j= 0;
  var provinces = {};
  var parametresprovince =  [];
  var propertiesofprovince =  [];
  var provinces_status = "ok";
  var provinces_meta_count = 100;
  var nbprovfront = 0;    
  var parametresprovince =  {};
  while (provinces_status == 'ok' && provinces_meta_count > 0) {
    j++;
    provinces = getWargamingAPI("https://api.worldoftanks.eu/wot/globalmap/provinces/?application_id=" + cluster + "&language=en&front_id=" +frontid + "&page_no=" + j);
    provinces_status = provinces['status'];
    provinces_meta_count = provinces['meta']['count'];
    Logger.log('recherche province passage numero : ' + j); 
    if (provinces['status'] == 'error') {
      Logger.log('erreur sur la page : ' + j);
    }
    provinces['data'].forEach (function (province) {
      var provinceencours = province['province_id'];
      nbprovfront = nbprovfront + 1;
      propertiesofprovince =  {
        'arena_name' : province['arena_name'],
        'province_name' : province['province_name'],
        'province_id' : province['province_id']        
      }
      parametresprovince[provinceencours] = propertiesofprovince;
    })
  }
    Logger.log("nombre province traité pour le front : " + nbprovfront);
    //var jsontobuild = {parametresprovince};
    //Logger.log("result : " + JSON.stringify(parametresprovince));
     var jsonString = JSON.stringify(parametresprovince);
     Logger.log("jsonString: " + jsonString);
    setJsonFile("extraction",jsonString )    
  }) 
}


// Appel Wargaming API et recuperation du JSON  
function getWargamingAPI(urlwargaming) {
   

 var options =
    {
        "method"  : "POST",
        "followRedirects" : true,
        "muteHttpExceptions": true
  };
  var result = UrlFetchApp.fetch(urlwargaming, options);
  if (result.getResponseCode() == 200) {
    var params = JSON.parse(result.getContentText());
     return params; 
  }
}

// Sauvegarde du JSON  
function setJsonFile(Filename, output ) {
 var files = DriveApp.getFilesByName(Filename);
 while (files.hasNext()) {
   var file = files.next();
   Logger.log(file.getName());
   delete(file.getId());
 }

  var Folder =DriveApp.getFoldersByName("EXTRACT");
  var premierFolder = Folder.next();
  premierFolder.createFile(Filename + ".json", output, MimeType.PLAIN_TEXT);

}


