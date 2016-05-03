var cluster = "demo";
var dataAnnuaire;
var DirData = 'DATA';
var DirMap = 'MAP';
var DirSave = 'EXTRACT';
var FileAnnuaire = 'annuaireClan.json';
var FileSeason = 'seasondata.json';

function getCLANLIST() {
  var annuaire =  getJsonFile(DirData, FileAnnuaire );
  return annuaire;
}

function getSEASONLIST() {
  var annuaire =  getJsonFile(DirData, FileSeason );
  return annuaire;
}

function getMAPFILE(seasonid) {
  var FileMap = seasonid + '.json';
  var geojson =  getJsonFile(DirMap, FileMap );
  return geojson;
}


function LOADSAVE(save) {
  var FileSave = save;
  var saveJson =  getJsonFile(DirSave, FileSave );
  return saveJson;
}

function ALLSAVE() {
  var Folder =DriveApp.getFoldersByName(DirSave);
  var premierFolder = Folder.next();
  var files = premierFolder.getFiles();
  var listSave = [];
  while (files.hasNext()) {
    var currentfile = files.next();
    var nameFile = currentfile.getName();
    var dateFile = currentfile.getDateCreated();
    if (nameFile == 'extraction.json') {
    var dateshow = Utilities.formatDate(new Date(), 'GMT', 'yyyy_MM_dd') + " Online";
    } else {
    var dateshow = nameFile.replace("extraction", "");
    var dateshow = dateshow.replace(".json", "");
    }
    var newSave = {
      "fichier" : nameFile,
      "date" : dateFile,
      "dateshow" : dateshow };
    listSave.push(newSave);
  }
  listSave.sort(compareDate);
  listSaveString = JSON.stringify(listSave);
  Logger.log('listSaveString : ' + listSaveString);
  return listSaveString;
}


function BATTLETURNINFO(provinceId) {
  var pagenumber = 0;
  var listTurn = [];
  var BattleTurn = getWargamingAPI("https://eu.wargaming.net/globalmap/game_api/tournament_info?alias="+provinceId+"&round=" +pagenumber);
  var turn = BattleTurn['round_number'];
  listTurn[turn] = BattleTurn;
  while (BattleTurn['next_round']) {
    pagenumber = BattleTurn['next_round'];
    BattleTurn = getWargamingAPI("https://eu.wargaming.net/globalmap/game_api/tournament_info?alias="+provinceId+"&round=" +pagenumber);
    turn = BattleTurn['round_number'];
    listTurn[turn] = BattleTurn;
                                 }
 var listTurnString = JSON.stringify(listTurn);
 Logger.log('listTurnString : ' + listTurnString);
  return listTurnString;
}

