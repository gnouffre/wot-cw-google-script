

// Appel Wargaming API et recuperation du JSON  
function getWargamingAPI(urlwargaming, method) {
 var options =
    {
        "method"  : method,
        "followRedirects" : true,
        "muteHttpExceptions": true
  };
  var result = UrlFetchApp.fetch(urlwargaming, options);
  if (result.getResponseCode() == 200) {
    var params = JSON.parse(result.getContentText());
     return params; 
  }
}



// Lecture JSON sur DRIVE  
function getJsonFile(Dirname, Filename ) {
  var Folder =DriveApp.getFoldersByName(Dirname);
  var premierFolder = Folder.next();
  var files = premierFolder.getFilesByName(Filename);
  var file = files.next();
  var FileBlob = file.getBlob();
  FileBlob.setContentType("text/plain");
  var contenuFile = FileBlob.getDataAsString();
  return contenuFile;

}

  // Sauvegarde du JSON  
function setJsonFile(Dirname, Filename, output ) {
  var Folder =DriveApp.getFoldersByName(Dirname);
  var premierFolder = Folder.next();
  var files = premierFolder.getFilesByName(Filename);
  while (files.hasNext()) {
    var file = files.next();
    Logger.log('fichier a supprimer : ' + file.getId());
    Drive.Files.remove(file.getId())
  }
  premierFolder.createFile(Filename, output, MimeType.PLAIN_TEXT);

}


function doGet(value){
  Logger.log('value : ' + JSON.stringify(value));
  // Logger.log('typeselection : ' + parameter);
  var variable = value.parameter.typeSelection;
    switch (variable)
    {
        case "CLANLIST":
              var data = getCLANLIST();
        return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON); ;
        break;
        case "SEASONLIST":
              var data = getSEASONLIST();
        return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON); ;
        break;
         case "MAP":
        var seasonid = value.parameter.seasonid;
        var data = getMAPFILE(seasonid);
        return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON); 
        break;
         case "LOADSAVE":
        var save = value.parameter.save;
        var data = LOADSAVE(save);
        return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON); 
        break;
        case "ALLSAVE":
        var data = ALLSAVE();
        return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON); 
        break;
        case "BATTLETURNINFO":
        var provinceId = value.parameter.provinceId;
        var data = BATTLETURNINFO(provinceId);
        return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON); 
        break;        
        default:
           return ContentService.createTextOutput("invalid parameter" + JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); 
        break;
    }
 
}

function compareDate(a, b) {
   	if (a['date'] == b['date']) {
    return 0;
  }

  return a['date'] > b['date'] ? -1 : 1;
}


 
