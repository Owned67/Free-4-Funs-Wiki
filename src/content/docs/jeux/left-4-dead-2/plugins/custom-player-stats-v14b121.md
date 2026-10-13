---
title: "Custom Player Stats v1.4B121"
---

Comment installer le plugin Custom Player Stats v1.4B121 ?

## Présentation

Le plugin Custom Player Stats permet d'avoir des statistiques des joueurs détaillées via une interface web.

[Lien Officiel](http://forums.alliedmods.net/showthread.php?t=115965)

Vous trouverez toutes les commandes et variables utilisées.

## Téléchargement

1) Télécharger l'archive [l4d2_stats.zip](https://tutocss.pages-perso.free.fr/wiki/l4d2_stats.zip) puis décompresser là avec un logiciel de décompression (WinRar, 7Zip etc...)

2) Voici l'arborescence :

 |- l4d_stats
 |
 |-- l4d_stats\Server\addons\sourcemod\scripting\l4d_stats.sp
 |
 |-- l4d_stats\Server\addons\sourcemod\gamedata\l4d_stats.txt
 |
 |-- l4d_stats\Web\*
 |
 |-- l4d_stats\Web\l4d2stats.sql

## Installation serveur de jeux

- Le fichier **l4d_stats.smx** devra être uploadé dans le répertoire **../../left4dead2/left4dead2/addons/sourcemod/plugins**.

- Le fichier **l4d_stats.txt** devra être uploadé dans le répertoire **../../left4dead2/left4dead2/addons/sourcemod/gamedata**.

- Le fichier **l4d_stats.sp** devra être uploadé dans le répertoire **../../left4dead2/left4dead2/addons/sourcemod/scripting**.

Le fichier .sp n'a pas besoin d'être uploadé pour le bon fonctionnement du plugin.

Éditer le fichier **../../left4dead2/left4dead2/addons/sourcemod/config/databases.cfg** et ajoutez-y ce code en dessous de la ligne **"driver_default"		"mysql"** :<br />

`"l4dstats"<br /> 	{<br /> 		"driver"			"mysql"<br /> 		"host"				"VOTRE_IP_ou_Nom_de_Domaine"<br /> 		"database"			"Votre_base_De_Donnee"<br /> 		"user"				"Votre_Utilisateur_SQL"<br /> 		"pass"				"Votre_mot_de_passe"<br /> 	}<br />`<br />

Sauvegarder les modifications et fermer l'éditeur de texte puis transférer le tout sur votre FTP (ne fermer pas le logiciel FTP).

Déplacez vous dans le répertoire **../../left4dead2/left4dead2/cfg/sourcemod** et ouvrez le fichier **l4d_stats.cfg**', rechercher la ligne :
`l4d_stats_dbprefix ""`

et mettez le préfix de la table dans la base de donnée, dans ce tutoriel, nous avons pris **l4d2_**' que vous retrouverez un peu plus loin.

`l4d_stats_dbprefix "l4d_stats_"`

Si vous le voulez, les fichier peuvent être supprimé de votre disque dur.

Redémarrez votre serveur de jeu.

Cette partie est maintenant terminée.

## Installation hébergement web

Dans le dossier **l4d_stats\Web** :

![icon11](/images-wiki/icon11.gif) Renommer le fichier **config_example.php** en **config.php** puis éditer le.

Voici l'information la plus importante à savoir :

```text
$mysql_server = "127.0.0.1";
$mysql_db = "l4dstats";
$mysql_user = "l4d";
$mysql_password = "l4d";
$mysql_tableprefix = "";

$site_name = "YOUR SITE NAME HERE";

$game_version = 2;
```

A quoi correspondent ces variables :<br />
**$mysql_server**   ![icon11](/images-wiki/icon11.gif) Hote SQL ![icon11](/images-wiki/icon11.gif) Adresse permettant pour se connecter au serveur MySQL ou avoir un accès à PhpMyAdmin depuis un navigateur, un plugin  etc... <br />
**$mysql_db**       ![icon11](/images-wiki/icon11.gif) Base SQL         ![icon11](/images-wiki/icon11.gif) Nom de la base de donnée<br />
**$mysql_user**     ![icon11](/images-wiki/icon11.gif) Identifiant SQL  ![icon11](/images-wiki/icon11.gif) Nom d'utilisateur pour se connecter au serveur MySQL<br />
**$mysql_password** ![icon11](/images-wiki/icon11.gif) Mot de passe SQL ![icon11](/images-wiki/icon11.gif) Le mot de passe de l'utilisateur<br />
**$site_name**   ![icon11](/images-wiki/icon11.gif) Indiquer le nom de votre Team / Communauté<br />
**$game_version**   ![icon11](/images-wiki/icon11.gif) Indiquer le type de jeu (1 = Left 4 Dead; 2 = Left 4 Dead 2)

Ces informations vous ont été transmises lors de l'achat de votre hébergement Web.

Cette valeur dans ce tutoriel prendra la valeur :<br />
`$mysql_tableprefix = "l4d_stats_";`

Après avoir terminé la configuration, sauvegarder les modifications puis connectez vous à votre FTP et uploader tout le dossier à la racine du FTP.

Vous pouvez installez de deux méthodes distingues :<br />

Soit l'une, soit l'autre mais pas les deux ^^

Avant de commencer, appliquer un chmod 777 sur le fichier **./l4d2_stats/templates/awards_cache.html**.

**1**.)
Dans votre navigateur, mettez l'adresse complète pour effectuer l'installation, dans ce tutoriel :
[http://freeforfuns.no-ip.org/l4d2_stats/install.php](http://freeforfuns.no-ip.org/l4d2_stats/install.php)

Patientez un petit moment pour la création des tables.... Ne vous affolez pas en voyant les erreurs :D Il n'empêcheront pas le bon fonctionnement !

Suivez bien les instructions en bas de la page...

une fois l'exécution terminé, **SUPPRIMER LE FICHIER install.php** de votre FTP.

**2**.)
Ouvrez le fichier **l4d2stats.sql**, sélectionner tout le contenu puis clique droit et copier ensuite connectez vous à PhpMyadmin soit par votre panel soit par votre navigateur.

Sélectionner la base de donnée **l4d_stats**, cliquez sur **SQL** (à côté de **Structure**), coller ce que vous venez de copier en cliquant sur le bouton **Exécuter** pour effectuer les modifications.

Voilà, vous pouvez tout supprimer de votre disque dur et redémarrer votre serveur de jeu et allez admirer le résultat en jeu. :P

Si toutefois il y a des personnes intéressés par la traduction de ce plugin, veuillez me contacter par email.

## F.A.Q

Q Lors de l'installation, il y a une de multiples erreurs !

R Si vous êtes codeurs en php, vous pouvez le corriger autrement ne vous inquiétez pas, tout fonctionnera correctement.

Q Je souhaite avoir les villes mais le fichier **updatetable.php** n'existe pas ? Tout en bas de la page, il indique :

```text
[OPTIONAL] Download latest GeoIPCountryCSV.zip, unzip it to the web stats folder and run updatetable.php
[OPTIONAL] Download latest GeoLiteCity_YYYYMMDD.zip (CSV format), unzip it (two files) to the web stats folder and run updatetable.php
[OPTIONAL] Download latest GeoLiteCity_YYYYMMDD.zip (CSV format), unzip it (two files) to the web stats folder and run updatetable.php
```

R Vider les tables de la base de donnée, dans phpmyadmin, sélectionner la base de donnée **l4d_stats**, cliquer sur **SQL** et copier/coller ceci :
`` DROP TABLE `ip2country` ,<br /> `ip2country_blocks` ,<br /> `ip2country_locations` ,<br /> `l4d_stats_maps` ,<br /> `l4d_stats_players` ,<br /> `l4d_stats_server_settings` ,<br /> `l4d_stats_settings` ,<br /> `l4d_stats_timedmaps` ; ``

Cliquer sur **Exécuter** et cela supprimera les données, maintenant, télécharger l'archive **GeoIPCountryCSV.zip**, décompresser et uploader le fichier à la racine du dossier **l4d2_stats** et recommencer l'installation.

Penser à supprimer le fichier **GeoIPCountryCSV.cvs** après avoir terminé le processus d'installation.
