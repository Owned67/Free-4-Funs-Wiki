---
title: "HlstatsX:CE"
---

![hlstatsx](/images-wiki/hlstatsx.png)

## Description

HlstatsX:CE permet de générer des statistiques en temps réel selon les maps, jeux etc...

![Warning](/images-wiki/Warning.png) HlstatsX:CE est lourd et il est loin d'être optimisé donc nous vous recommandons de ne pas l'utiliser sur la même machine que votre/vos serveur(s) de jeu(x).

## Installation et Configuration HlstatsX:CE

L'archive a été refaite par notre staff pour être la plus simple tout simplement.

Voici le contenu de l'archive :

```text
 <font color="#FF0000">sourcemod</font>
 <font color="#FF0000">web</font>
 <font color="#FF0000">sql</font>
 <font color="#0000FF">CHANGELOG</font>
 <font color="#0000FF">CREATORS</font>
 <font color="#0000FF">IMAGES</font>
 <font color="#0000FF">LICENSE</font>
 <font color="#0000FF">NOTES.hitbox</font>
```

**Légende**:
En rouge les dossier.
En bleu les fichier.

Le dossier **heatmaps** ne sera pas utilisé dans notre tutoriel. Nous vous recommandons de lire le fichier **README** se situant à l'intérieur du répertoire pour l'installation.

Placez vous dans **/var/www/**

```text
 su root
 cd /var/www
```

Télécharger l'archive :

```text
 mkdir hlstatsx
 cd hlstatsx
 wget https://tutocss.pages-perso.free.fr/wiki/HLXCE-1.6.19-FULL-FR.zip
```

Décompression de l'archive :

```text
unzip HLXCE-1.6.19-FULL-FR.zip
mv HLXCE-1.6.19-FULL-FR hlstatsx
```

Mettre un chmod 777 sur les dossiers **games** et **progress** :

```text
 chmod 777 /var/www/hlstatsx/hlstatsimg/games
 chmod 777 /var/www/hlstatsx/hlstatsimg/progress
```

Créer la table **hlstatsx**.

![Warning](/images-wiki/Warning.png) **ATTENTION** Les mots contenant des caractères spéciaux pourront poser problème pour la partie ci-dessous !

```text
   mysql -u root -pvotre_passe
   create database hlstatsx;
   CREATE USER 'hlstatsx'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
```

```text
   GRANT USAGE ON * . * TO 'hlstatsx'@'localhost' IDENTIFIED BY 'votre_mot_de_passe' 
   WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
   GRANT ALL PRIVILEGES ON `hlstatsxce` . * TO 'hlstatsxce'@'localhost' WITH GRANT OPTION;
```

```text
  FLUSH PRIVILEGES;
```

```text
  exit
```

![Warning](/images-wiki/Warning.png) De **GRANT USAGE ON** à **MAX_USER_CONNECTIONS 0;** doit être inséré sur une ligne sinon vous aurez une erreur de syntaxe !

Editer le fichier **config.php** :

```text
   nano config.php
```

Son contenu :

```text
   
// DB_ADDR - The address of the database server, in host:port format.
//           (You might also try setting this to e.g. ":/tmp/mysql.sock" to
//           use a Unix domain socket, if your mysqld is on the same box as
//           your web server.)
define("DB_ADDR", "localhost");

// DB_USER - The username to connect to the database as
define("DB_USER", "");

// DB_PASS - The password for DB_USER
define("DB_PASS", "");

// DB_NAME - The name of the database
define("DB_NAME", "");

// DB_TYPE - The database server type. Only "mysql" is supported currently
define("DB_TYPE", "mysql");

// DB_PCONNECT - Set to 1 to use persistent database connections. Persistent
//               connections can give better performance, but may overload
//               the database server. Set to 0 to use non-persistent
//               connections.
define("DB_PCONNECT", 0);

// INCLUDE_PATH - Filesystem path to the includes directory, relative to hlstats.php. This must be specified
//		as a relative path.
//
//                Under Windows, make sure you use forward slash (/) instead
//                of back slash (\) and use absolute paths if you are having any issue.
define("INCLUDE_PATH", "./includes");

// PAGE_PATH - Filesystem path to the pages directory, relative to hlstats.php. This must be specified
//		as a relative path.
//
//                Under Windows, make sure you use forward slash (/) instead
//                of back slash (\) and use absolute paths if you are having any issue.
define("PAGE_PATH", "./pages");

// PAGE_PATH - Filesystem path to the hlstatsimg directory, relative to hlstats.php. This must be specified
//		as a relative path.
//
//                Under Windows, make sure you use forward slash (/) instead
//                of back slash (\) and use absolute paths if you are having any issue.
//
// 		Note: the progress directory under hlstatsimg must be writable!!
define("IMAGE_PATH", "./hlstatsimg");

// How often dynamicly generated images are updated (in seconds)
define("IMAGE_UPDATE_INTERVAL", 300);

//define("DB_DEBUG", true);
```

Remplissez les champs **DB_USER**, **DB_PASS** avec vos identifiants de connexion au serveur MySql.

Maintenant on vas importer le fichier **install.sql** (Dans le répertoire **web**):

```text
   cd /var/www/hlstatsx/sql
   mysql -uroot -p nom_de_la_base_de_donnée < install.sql
```

Editer le fichier **hlstats.conf** (répertoire **scripts**) et concernant la partie **BindIP ""**, elle ne vous intéresse que si vous disposez d'une IP FailOver par exemple....

Mise à jour de la base de donnée de **GeoIPCity** :

```text
 cd /var/www/hlstatsx/scripts/GeoLiteCity
 chmod +x install_binary.sh
 ./install_binary.sh
 rm GeoLiteCity.dat.gz
```

Pour terminer, nous allons rendre certains fichiers exécutable pour ne pas rencontrer de problèmes avec la génération des statistiques :

```text
   cd /var/www/hlstatsx/scripts
   chmod +x hlstats.pl
   chmod +x run_hlstats
   chmod +x hlstats-awards.pl
```

On supprime tout ce qui est inutile :

```text
   cd ..
   rm -rf CHANGELOG CREATORS heatmaps HLXCommunityEdition1.6.19FULL.zip
```

```text
  rm -rf IMAGES LICENSE NOTES.hitbox install.sql updater web
```

```text
  rm -rf /var/www/hlstatsx/updater
```

Le dossier **sourcemod** est à installer uniquement si vous souhaitez avoir HlstatsX:CE avec le plugin SourceMod autrement supprimer le.

```text
   rm -rf sourcemod
```

Dans votre navigateur, entrer http://votre_ip_ou_domaine.fr/hlstatsx puis connectez-vous avec les identifiants :

Utilisateur: admin
Mot de passe : 123456

Une fois connecté au panel :
Dans **Paramètres généraux** >> **Gestion des Admins**

Créer votre utilisateur avec un mot de passe, cliquez sur **Appliquer** puis supprimer le compte **admin** et re valider les modifications.

Dans **Gestion des jeux** >> décochez la case **Cacher** pour *Left 4 Dead 2** et cocher la case pour le jeu **Team Fortress II** puis cliquez sur **Appliquer*'.

Dans **Paramètres Jeux** >> **Left 4 Dead 2 (l4d2)** >> **Ajouter un serveur** et suivez les instructions... Terminer en cliquant sur le bouton **Ajouter le serveur**.

Nous n'allons pas détailler tout en détails, c'est assez simple d'utilisation même pour quelqu'un qui ne comprends pas l'anglais. ^^

**Avant de lancer votre serveur**.

Dans un **Terminal**, faite :

```text
   crontab -e
```

ajoutez :

```text
   * 12 * * * cd /var/www/hlstatsx/scripts/;./hlstats-awards.pl
   * 12 * * * cd /var/www/hlstatsx/scripts/;./hlstats-resolve.pl
```

puis faites **CTRL** + **X** puis **O** et **Entrée**.

Les statistiques seront mises à jour toutes les douze heures.

Dans le fichier **server.cfg**, ajoutez-y cette ligne :

```text
   logaddress_add votre_ip:27500
```

Lancer votre serveur puis tapez ceci :

```text
   cd /var/www/hlstatsx/scripts/ && ./run_hlstats start
```

Vous devriez voir ceci :

```text
  HLstatsX:CE daemon control
  http://www.hlxce.com
   ---------------------------
  Attempting to start HLstatsX:CE daemon on port 27500...
  Daemon successfully started on port 27500
```

On vérifie les logs :

```text
   cd /var/www/hlstatsx/logs && dir
```

Dans notre tutorial, le fichier est nommé **hlstats_27500_2013-11-01_23-50-17** :

tail -n 30

```text
   2011-02-27 20:14:27:                       - MYSQL: Connecting to MySQL database 'hlstatsxce' on 'localhost' as user     'hlstatsxce' ... connected ok
   2011-02-27 20:14:27:                       - CONFIG: Reading database config...
   2011-02-27 20:14:27:                       - CONFIG: I have found the following server configs in database:
   2011-02-27 20:14:27:                       - S_CONFIG: 88.190.16.25:27025
   2011-02-27 20:14:27:                       - HLSTATSX: HLstatsX:CE 1.6.19 starting...
   2011-02-27 20:14:27:                       - UDP: Opening UDP listen socket on port 27500 ... ok
   2011-02-27 20:14:27:                       - HLSTATSX: Tracking Trend of the stats are enabled
   2011-02-27 20:14:27:                       - HLSTATSX: Global Banning on all servers is enabled
   2011-02-27 20:14:27:                       - HLSTATSX: Maximum Skill Change on all servers are 25 points
   2011-02-27 20:14:27:                       - HLSTATSX: Minimum Skill Change on all servers are 2 points
   2011-02-27 20:14:27:                       - HLSTATSX: Minimum Players Kills on all servers are 50 kills
   2011-02-27 20:14:27:                       - HLSTATSX: Players chat logging is enabled
   2011-02-27 20:14:27:                       - HLSTATSX: Admins chat logging is enabled
   2011-02-27 20:14:27:                       - HLSTATSX: Broadcasting public chat is disabled
   2011-02-27 20:14:27:                       - HLSTATSX: Event queue size is set to 10
   2011-02-27 20:14:27:                       - HLSTATSX: HLstatsX:CE is now running (Normal mode, debug level 1)
```

N'oubliez pas de lancer **run_hlstats** à chaque fois que vous redémarrez votre serveur dédié.

Si vous souhaitez utiliser plusieurs serveur, vous devrez exécuter ceci :

```text
   ./run_hlstats start X
```

X = un nombre

**Exemple**: ./run_hlstats start 5 lancera 5 deamon sur les ports 27500 à 27504 :

./run_hlstats start 5

```text
   HLstatsX:CE daemon control
   http://www.hlxce.com
   ---------------------------
   Attempting to start HLstatsX:CE daemon on port 27500...
   Daemon successfully started on port 27500
   Attempting to start HLstatsX:CE daemon on port 27501...
   Daemon successfully started on port 27501
   Attempting to start HLstatsX:CE daemon on port 27502...
   Daemon successfully started on port 27502
   Attempting to start HLstatsX:CE daemon on port 27503...
   Daemon successfully started on port 27503
   Attempting to start HLstatsX:CE daemon on port 27504...
   Daemon successfully started on port 27504
```

Donc dans le fichier **server.cfg** de chaque serveur :

Serveur 1 :

```text
   logaddress_add votre_ip:27500
```

Serveur 2 :

```text
   logaddress_add votre_ip:27501
```

etc.....

Sinon, vous pouvez faire un lien symbolique du fichier dans le dossier **/etc/init.d/** pour qu'il soit lancé à chaque démarrage PC..

Avec votre utilisateur **ROOT** :

Depuis le passage à Squeeze, la séquence de boot dans les scripts doivent être mieux informés donc éditer le fichier **hlstatsx.sh** :

```text
    nano /etc/init.d/hlstatsx.sh
```

et ajoutez ceci :

```text
   ### BEGIN INIT INFO
   # Provides:          hlstatsx
   # Required-Start:    $remote_fs $syslog
   # Required-Stop:     $remote_fs $syslog
   # Default-Start:     2 3 4 5
   # Default-Stop:      0 1 6
   # Short-Description: Demarrage de hlstatsx au boot
   # Description:       Demarrage de hlstatsx au boot
   ### END INIT INFO
   #!/bin/bash
   cd /var/www/hlstatsx/scripts/ && ./run_hlstats start
```
