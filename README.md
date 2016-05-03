# wot-cw-google-script

GOOGLEAPP: EXTRACTHOUR
----------------------

This is a script scheduled by time (1 times per hour actually) on my google Drive account.
He make a refresh of the map (building EXTRACT/extraction.json)
He make a refresh of new clans (Update DATA/anuaireClan.json)

*** start.gs => script scheduled every hour . calling extracthour.gs , then annuaire.gs
***exracthour.gs => permet de créer un JSON sur google drive, dans le repertoire EXTRACT au format attendu par l"application WOT
***annuaire.gs => permet de mettre a jour l'annuaire des clans, pour le moment il est appelé par extracthour.gs pour les clans n'existant pas dans l'annuaire. A coder, mettre a jour les XX clans les plus anciens.
Astuce technique la bibliotheque js detectlang a été remplacé par une fonction native de GoogleSheet, pour cela ouverture d'un Spreadsheet temporaire, puis cellule A1 => description clan, cellule B1 on met la fonction =DETECTLANGUAGE (A1) et enfin on recupere la valeur B1.

GOOGLEAPP: SAVEMAP
------------------
Daily save of extraction.json betwwen 2 and 3 morning.
***dailySave.gs : copy file.

GOOGLEAPP: MAPBUILD
------------------
Not scheduled yet...
***season.gs : call the Season active to wargaming, and lokk if map was build. If not call the mapbuild script and update file season in directory DATA.
***mapbuild/gs : build a file Named by season id in directory MAP
***function : method used by script (read, write, call wargaming).

GOOGLEAPP: SHOWMAP
------------------
Contains Script used for interaction with HTML page.
***function.gs : commun function + entry point
***getList.gs : contain each function called by entry point.
***dailySave.gs : copy file.
