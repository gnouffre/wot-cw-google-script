

// Sauvegarde quotidienne
function dailySave() {
  
  
  var Folder =DriveApp.getFoldersByName("EXTRACT");
  var premierFolder = Folder.next();
  var files = premierFolder.getFilesByName("extraction.json");
  var file = files.next();
  var FileBlob = file.getBlob();
  FileBlob.setContentType("text/plain");
  var contenuFile = FileBlob.getDataAsString();
  
  var newDate = Utilities.formatDate(new Date(), 'GMT', 'yyyy_MM_dd');
  var Filename = "extraction" +newDate+ ".json";  
  premierFolder.createFile(Filename, contenuFile, MimeType.PLAIN_TEXT);
 
}
