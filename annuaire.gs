
var cluster = "demo";
var dataAnnuaire;
var DataDir = 'DATA';
var FileAnnuaire = 'annuaireClan.json';
var DetectLangFile = 'detectLang';

function miseAJourAnnuaire(dataprovince) {
  Logger.log('fonction mise a jour appele : ');
  Logger.log('dataprovince : ' + dataprovince);
  var annuaire =  getJsonFile(DataDir, FileAnnuaire );
  dataAnnuaire = JSON.parse(annuaire);
  var compteurtrouve = 0;
  var compteurabsent = 0;
  for (var province in dataprovince) {
    var owner = dataprovince[province].owner_clan_id;
    if (dataAnnuaire[owner]) {
      compteurtrouve ++;
    }
      else {        
      compteurabsent ++;
      ajoutDuClan(owner);  
      }
    }
  Logger.log('clan absent: ' + compteurabsent);
  Logger.log('clan trouve: ' + compteurtrouve);
  var jsonString = JSON.stringify(dataAnnuaire);
  setJsonFile("DATA", FileAnnuaire,jsonString );
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

function ajoutDuClan(owner) {
  
  var ClanDatail1 = getWargamingAPI("https://api.worldoftanks.eu/wgn/clans/info/?application_id=" + cluster +
         "&fields=description%2C%20members_count%2C%20created_at %2C%20accepts_join_requests%2C%20clan_id%2C%20color%2C%20tag%20%2C%20emblems.x32%2C%20name%2C%20&clan_id=" +owner );
  var ClanDetailDescription = ClanDatail1["data"][owner]["description"];
  var ClanDatailStat = getWargamingAPI("https://api.worldoftanks.eu/wot/globalmap/claninfo/?application_id=" + cluster + "&clan_id=" +owner );
  var datecreated_at = new Date(ClanDatail1['data'][owner]['created_at'] * 1000);
  var langue = detectLang(ClanDetailDescription)
  var ClanDetailResult = {
    'id' : ClanDatail1['data'][owner]['clan_id'],
    'tag' :  ClanDatail1['data'][owner]['tag'],
	'color' : ClanDatail1['data'][owner]['color'],
	'emblem_url' : ClanDatail1['data'][owner]['emblems']['x32']['portal'],
	'language' : langue,
	'name' : ClanDatail1['data'][owner]['name'],
	'elo_rating_6' : ClanDatailStat['data'][owner]['ratings']['elo_6'],
	'elo_rating_8' : ClanDatailStat['data'][owner]['ratings']['elo_8'],
	'elo_rating_10' : ClanDatailStat['data'][owner]['ratings']['elo_10'],
	'fine_level' : 0 ,
	'members_count' : ClanDatail1['data'][owner]['members_count'],
	'created_at' : Utilities.formatDate(datecreated_at, 'GMT', 'yyyy_MM_dd'),
	'accepts_join_requests' : ClanDatail1['data'][owner]['accepts_join_requests'],
	'battles' : ClanDatailStat['data'][owner]['statistics']['battles'],
	'battles_10_level' : ClanDatailStat['data'][owner]['statistics']['battles_10_level'],
	'battles_6_level' : ClanDatailStat['data'][owner]['statistics']['battles_6_level'],
	'battles_8_level' : ClanDatailStat['data'][owner]['statistics']['battles_8_level'],
	'captures' : ClanDatailStat['data'][owner]['statistics']['captures'],
	'losses' : ClanDatailStat['data'][owner]['statistics']['losses'],
	'provinces_count' : ClanDatailStat['data'][owner]['statistics']['provinces_count'],
	'wins' : ClanDatailStat['data'][owner]['statistics']['wins'],
	'wins_10_level' : ClanDatailStat['data'][owner]['statistics']['wins_10_level'],
	'wins_6_level' : ClanDatailStat['data'][owner]['statistics']['wins_6_level'],
	'wins_8_level' : ClanDatailStat['data'][owner]['statistics']['wins_8_level'],
    '$daterefresh' : Utilities.formatDate(new Date(), 'GMT', 'yyyy_MM_dd')
                                          };
  
   dataAnnuaire[owner] = ClanDetailResult;
};  



// Detect Langage avec la fonction intégré de Google sheet  
function detectLang(ClanDetailDescription) {
  var tempSheet = JSON.stringify(new Date());
  var ss = SpreadsheetApp.create(tempSheet, 1, 2);
  var idss = ss.getId();
  var sheet = ss.getSheets()[0];
  var cell = sheet.getRange("A1");
  cell.setValue(ClanDetailDescription);
  var langagefunction = sheet.getRange("B1").setFormula("=DETECTLANGUAGE (A1)")
  var langage = sheet.getRange("B1").getValue();
  Logger.log('ClanDetailDescription: ' + ClanDetailDescription);
  Logger.log('langage: ' + langage);
  Drive.Files.remove(ss.getId())
  
  return langage;

}
