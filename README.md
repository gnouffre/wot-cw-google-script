# wot-cw-google-script

exracthour.gs => permet de créer un JSON sur google drive, dans le repertoire EXTRACT au format attendu par l"application WOT

annuaire.gs => permet de mettre a jour l'annuaire des clans, pour le moment il est appelé par extracthour.gs pour les clans n'existant pas dans l'annuaire. A coder, mettre a jour les XX clans les plus anciens.
Astuce technique la bibliotheque js detectlang a été remplacé par une fonction native de GoogleSheet, pour cela ouverture d'un Spreadsheet temporaire, puis cellule A1 => description clan, cellule B1 on met la fonction =DETECTLANGUAGE (A1) et enfin on recupere la valeur B1.

