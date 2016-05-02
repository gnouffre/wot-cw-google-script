
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
