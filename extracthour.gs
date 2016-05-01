
  var cluster = "d0a293dc77667c9328783d489c8cef73";



function buildnewsave () {
 var season = getWargamingAPI("https://api.worldoftanks.eu/wot/globalmap/seasons/?application_id=" + cluster + "&status=ACTIVE");
 if (season['status'] == 'ok' && season['data'][0]['status'] == 'ACTIVE' ) {
  var season_id = season['data'][0]['season_id'];
} 
  var fronts = getWargamingAPI("https://api.worldoftanks.eu/wot/globalmap/fronts/?application_id=" + cluster);
  var parametresfront =  {};
  var parametresprovince =  {};
  var savecomplete =  {};
  fronts['data'].forEach (function (front) {		
  var frontid =  front['front_id']	;
  var k = 0;
  var j= 0;
  var provinces = {};
  var propertiesofprovince =  {};
  var provinces_status = "ok";
  var provinces_meta_count = 100;
  var nbprovfront = 0;    

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
        'province_id' : province['province_id'],
        'front_name' : province['front_name'],     
        'prime_time' : province['prime_time'],     
        'server' : province['server'],     
        'status' : province['status'],     
        'daily_revenue' : province['daily_revenue'],     
        'revenue_level' : province['revenue_level'],     
        'owner_clan_id' : province['owner_clan_id'],     
        'landing_type' : province['landing_type'],     
        'uri' : province['uri'],     
        'active_battles' : province['active_battles'],     
        'attackers' : province['attackers'],     
        'competitors' : province['competitors'],     
        'pillage' : province['pillage'],           
      }
      parametresprovince[provinceencours] = propertiesofprovince;
    })
  }
    Logger.log("nombre province traité pour le front : " + nbprovfront);
    parametresfront[frontid] =  front;
  })
  var savecomplete = {
    'front' : parametresfront,
    'provinces' : parametresprovince,
  };
  var jsonString = JSON.stringify(savecomplete);
  setJsonFile("extraction",jsonString ) 
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
  var Folder =DriveApp.getFoldersByName("EXTRACT");
  var premierFolder = Folder.next();
  var files = premierFolder.getFilesByName(Filename+ ".json");
  while (files.hasNext()) {
    var file = files.next();
    Logger.log('fichier a supprimer : ' + file.getId());
    Drive.Files.remove(file.getId())
  }
  premierFolder.createFile(Filename + ".json", output, MimeType.PLAIN_TEXT);

}


