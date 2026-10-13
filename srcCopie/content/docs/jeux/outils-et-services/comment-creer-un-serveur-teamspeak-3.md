---
title: "Comment créer un serveur Teamspeak 3"
---

![Teamspeak 3](/images-wiki/Teamspeak_3.jpg)

## Introduction

![warning](/images-wiki/warning.png) Il faut savoir que ce tutoriel est destiné aux utilisateurs ayant quelques bases sur l'utilisation de Linux et ses dérivés.

**Note** : Ce tutoriel est réalisé à partir d'une machine virtuelle créé sur mon PC donc ne vous attardez pas sur l'adresse IP affichée et les diverses informations.

## Installation Standalone

Ce tutoriel a été réalisé sur une Debian Wheezy 64 Bits avec les librairies 32 bits d'installés.

Connectez-vous à puTTY avec votre utilisateur (Ici, ce sera l'utilisateur **serveur**).

Une fois connecté avec votre utilisateur, vous vous retrouverez dans **/home/serveur**.

**Pour une version 32 bits** :

```text
  wget http://ftp.4players.de/pub/hosted/ts3/releases/3.0.10/teamspeak3-server_linux-x86-3.0.10
  tar -xvzf teamspeak3-server_linux-x86-3.0.10.tar.gz
```

**Pour version 64 bits** :

```text
  wget http://dl.4players.de/ts/releases/3.0.10/teamspeak3-server_linux-amd64-3.0.10.tar.gz
  tar -xvzf teamspeak3-server_linux-amd64-3.0.10.tar.gz
```

On renomme l'archive en **teamspeak3** dans notre exemple.

```text
 mv teamspeak3-server_linux-amd64 teamspeak3
```

On se place dans le répertoire du serveur.

```text
  cd teamspeak3
```

On lance le serveur :

```text
  ./ts3server_startscript.sh start
```

**IMPORTANT :  NE LANCER JAMAIS VOTRE SERVEUR TS3 EN ROOT par mesure de SECURITÉ**.

Veuillez noter sur un papier les identifiants fournies **serveradmin** et **password**, le token pourra être retrouvé dans le fichier de log :

```text
   ------------------------------------------------------------------
                     I M P O R T A N T
   ------------------------------------------------------------------
             Server Query Admin Acccount created
        loginname= "serveradmin", password= "1234567890"
   ------------------------------------------------------------------
```

```text
   2010-01-25 02:10:32.670200|WARNING |VirtualServer |  1|     --------------------------------------------------------
   2010-01-25 02:10:32.670734|WARNING |VirtualServer |  1| ServerAdmin token created, please use     the line below
   2010-01-25 02:10:32.671380|WARNING |VirtualServer |  1|     token=d2gjNVJCNj3am3V8K52/V4geBDjG3R1Az*******
```

Faite **CTRL** + **C** pour fermer la fenêtre contenant les identifiants.

Démarrer le serveur lors d'un reboot du serveur dédié :

```text
   crontab -e
```

puis :

```text
   @reboot cd /home/serveur/teamspeak3 && ./ts3server_startscript.sh start
```

Démarrer le serveur TS3 :

```text
   ./ts3server_startscript.sh start
```

Stopper le serveur TS3:

```text
   ./ts3server_startscript.sh stop
```

Redémarrer le serveur TS3 :

```text
   ./ts3server_startscript.sh restart
```

Status du serveur TS3 :

```text
   ./ts3server_startscript.sh status
```

## Gérer le serveur par le Query

Sachez que l'installation d'un panel web est plus agréable mais demande aussi plus de ressources, c'est pourquoi, nous allons vous expliquez comment gérer votre serveur en ligne de commande.

Requis

:::note[Note]

- telnet doit être installé

```text
* Le port 10011 ouvert en TCP (par défaut si vous ne l'avez pas modifié).
* Le serveur TeamSpeak doit être démarré
```

:::

Pour y accéder ;

```bash
telnet localhost 10011
```

Pour gérer votre serveur, vous devrez être authentifié :

```bash
login serveradmin votre_motdepasse
```

Voir le(s) serveur(s) virtuel(s) :

```bash
serverlist
```

qui retournera les informations de(s) serveur(s) :

:::note

virtualserver_id=1 virtualserver_port=9987 virtualserver_status=online virtualserver_clientsonline=0 virtualserver_queryclientsonline=0 virtualserver_maxclients=32 virtualserver_uptime=762 virtualserver_name=TeamSpeak\s]I[\sServer virtualserver_autostart=1 virtualserver_machine_id

:::

Modifier une valeur :

Avant tout, vous devrez connaître l'ID de votre serveur (si c'est la première installation, l'ID sera toujours à 1) sinon vous l'obtiendrez dans le résultat de la commande **serverlist** ![icon11](/images-wiki/icon11.gif) **virtualserver_id**.

Pour modifier le port du serveur :

```text
 use 1
 serveredit virtualserver_port=9990
 serverstop sid=1
 serverstart sid=1
```

Pour modifier le nom du serveur :

```bash
use 1
serveredit virtualserver_name=Free\s4\sFuns
```

Si le titre est trop long et/ou contient des caractères spéciaux, pensez à insérer **\s** entre chaque mot.

Une reconnexion au serveur suffira pour voir les changements.

Lorsque vous avez terminé, on se déconnecte et on quit la dession telnet :

```bash
logout
```

puis :

```bash
quit
```

Toutes les commandes disponibles :

```text
   help                        | read help files
   login                       | authenticate with the server
   logout                      | deselect virtual server and log out
   quit                        | close connection
   use                         | select virtual server
   banadd                      | create a ban rule
   banclient                   | ban a client
   bandelall                   | delete all ban rules
   bandel                      | delete a ban rule
   banlist                     | list ban rules on a virtual server
   bindinglist                 | list IP addresses used by the server instance
   channeladdperm              | assign permission to channel
   channelclientaddperm        | assign permission to channel-client combi
   channelclientdelperm        | remove permission from channel-client combi
   channelclientpermlist       | list channel-client specific permissions
   channelcreate               | create a channel
   channeldelete               | delete a channel
   channeldelperm              | remove permission from channel
   channeledit                 | change channel properties
   channelfind                 | find channel by name
   channelgroupadd             | create a channel group
   channelgroupaddperm         | assign permission to channel group
   channelgroupclientlist      | find channel groups by client ID
   channelgroupcopy            | copy a channel group
   channelgroupdel             | delete a channel group
   channelgroupdelperm         | remove permission from channel group
   channelgrouplist            | list channel groups
   channelgrouppermlist        | list channel group permissions
   channelgrouprename          | rename a channel group
   channelinfo                 | display channel properties
   channellist                 | list channels on a virtual server
   channelmove                 | move channel to new parent
   channelpermlist             | list channel specific permissions
   clientaddperm               | assign permission to client
   clientdbdelete              | delete client database properties
   clientdbedit                | change client database properties
   clientdbfind                | find client database ID by nickname or UID
   clientdbinfo                | display client database properties
   clientdblist                | list known client UIDs
   clientdelperm               | remove permission from client
   clientedit                  | change client properties
   clientfind                  | find client by nickname
   clientgetdbidfromuid        | find client database ID by UID
   clientgetids                | find client IDs by UID
   clientgetnamefromdbid       | find client nickname by database ID
   clientgetnamefromuid        | find client nickname by UID
   clientgetuidfromclid        | find client UID by client ID
   clientinfo                  | display client properties
   clientkick                  | kick a client
   clientlist                  | list clients online on a virtual server
   clientmove                  | move a client
   clientpermlist              | list client specific permissions
   clientpoke                  | poke a client
   clientsetserverquerylogin   | set own login credentials
   clientupdate                | set own properties
   complainadd                 | create a client complaint
   complaindelall              | delete all client complaints
   complaindel                 | delete a client complaint
   complainlist                | list client complaints on a virtual server
   custominfo                  | display custom client properties
   customsearch                | search for custom client properties
   ftcreatedir                 | create a directory
   ftdeletefile                | delete a file
   ftgetfileinfo               | display details about a file
   ftgetfilelist               | list files stored in a channel filebase
   ftinitdownload              | init a file download
   ftinitupload                | init a file upload
   ftlist                      | list active file transfers
   ftrenamefile                | rename a file
   ftstop                      | stop a file transfer
   gm                          | send global text message
   hostinfo                    | display server instance connection info
   instanceedit                | change server instance properties
   instanceinfo                | display server instance properties
   logadd                      | add custom entry to log
   logview                     | list recent log entries
   messageadd                  | send an offline message
   messagedel                  | delete an offline message from your inbox
   messageget                  | display an offline message from your inbox
   messagelist                 | list offline messages from your inbox
   messageupdateflag           | mark an offline message as read
   permfind                    | find permission assignments by ID
   permget                     | display client permission value for yourself
   permidgetbyname             | find permission ID by name
   permissionlist              | list permissions available
   permoverview                | display client permission overview
   permreset                   | delete all server and channel groups and restore default permissions
   privilegekeyadd             | creates a new privilege key
   privilegekeydelete          | delete an existing privilege key
   privilegekeylist            | list all existing privilege keys on this server
   privilegekeyuse             | use a privilege key
   sendtextmessage             | send text message
   servercreate                | create a virtual server
   serverdelete                | delete a virtual server
   serveredit                  | change virtual server properties
   servergroupaddclient        | add client to server group
   servergroupadd              | create a server group
   servergroupaddperm          | assign permissions to server group
   servergroupautoaddperm      | globally assign permissions to server groups
   servergroupbyclientid       | get all server groups of specified client
   servergroupclientlist       | list clients in a server group
   servergroupcopy             | create a copy of an existing server group
   servergroupdelclient        | remove client from server group
   servergroupdel              | delete a server group
   servergroupdelperm          | remove permissions from server group
   servergroupautodelperm      | globally remove permissions from server group
   servergrouplist             | list server groups
   servergrouppermlist         | list server group permissions
   servergrouprename           | rename a server group
   servergroupsbyclientid      | find server groups by client ID
   serveridgetbyport           | find database ID by virtual server port
   serverinfo                  | display virtual server properties
   serverlist                  | list virtual servers
   servernotifyregister        | register for event notifications
   servernotifyunregister      | unregister from event notifications
   serverprocessstop           | shutdown server process
   serverrequestconnectioninfo | display virtual server connection info
   serversnapshotcreate        | create snapshot of a virtual server
   serversnapshotdeploy        | deploy snapshot of a virtual server
   serverstart                 | start a virtual server
   servertemppasswordadd       | create a new temporary server password
   servertemppassworddel       | delete an existing temporary server password
   servertemppasswordlist      | list all existing temporary server passwords
   serverstop                  | stop a virtual server
   setclientchannelgroup       | set a clients channel group
   tokenadd                    | create a privilege key (token)
   tokendelete                 | delete a privilege key (token)
   tokenlist                   | list privilege keys (tokens) available
   tokenuse                    | use a privilege key (token)
   version                     | display version information
   whoami                      | display current session info
```

## Installation d'un Viewer TeamSpeak 3

## Requis

```text
* unzip
* [[Comment_créer_un_serveur_Teamspeak_3|Un serveur TeamSpeak 3]] (il devra être démarré !)
```

## Téléchargement

```text
 su root
 cd /var/www
 wget http://tsstatus.sebastien.me/tsstatus-2013-08-31.zip
```

## Installation

```text
unzip tsstatus-2013-08-31.zip
mv tsstatus viewer.
```

Éditer le fichier **tsstatusgen.php** :

trouver **$enableGenerator = false;** et remplacer par **$enableGenerator = true;**.

Sauvegarder et uploader la modification.

Ouvrez votre navigateur et mettez ceci :

```text
[http://ip_ou_ndd/viewer/tsstatusgen.php http://ip_ou_ndd/viewer/tsstatusgfr.php]
```

- ndd = nom de domaine

Remplissez le formulaire et cliquez sur le bouton **TEST TSStatus!**.

Si vous obtenez l'erreur :

```text
 TS3 Server returned the following error: error id=2568 msg=insufficient client permissions failed_permid=23
```

Pensez à créer un identifiant avec un mot de passe pour résoudre ce problème.

Ouvrez votre client TeamSpeak 3 ![icon11](/images-wiki/icon11.gif) Tools ![icon11](/images-wiki/icon11.gif) ServerQuery login ![icon11](/images-wiki/icon11.gif) Votre pseudo ![icon11](/images-wiki/icon11.gif) mot de passe généré (que vous pouvez modifier).

Mettez ces informations dans le formulaire et voici ce que cela donne :

http://i.share.pho.to/aa6bbd20_o.png

Une traduction est en cours....

## Installation et Configuration avec MySQL

**Requis**

- [1 serveur Apache2](/administration/web-et-ftp/comment-creer-un-serveur-web-apache2/) avec php5, phpmyadmin et MySQL 5<br />

Pour commencer, nous allons prendre comme user **serveur**

Connectez vous en **ROOT** à putty ou ssh secure shell :

création de l'utilisateur **serveur** :

```text
 adduser serveur
```

On s'identifie avec l'user serveur.

```text
 su serveur && cd /home/serveur
```

On télécharge et on décompresse l'archive pour la création du serveur TS3.

**Pour une version 32 bits** :

```text
 wget http://ftp.4players.de/pub/hosted/ts3/releases/3.0.10/teamspeak3-server_linux-x86-3.0.10.tar.gz
```

```text
 tar -xvzf teamspeak3-server_linux-x86-3.0.10.tar.gz
```

**Pour une version 64 bits** :

```text
 wget http://ftp.4players.de/pub/hosted/ts3/releases/3.0.10/teamspeak3-server_linux-amd64-3.0.10.tar.gz
```

```text
 tar -xvzf teamspeak3-server_linux-amd64-3.0.10.tar.gz
```

On renomme l'archive en **teamspeak3** dans notre exemple.

**Pour une version 32 bits** :

```text
 mv teamspeak3-server_linux-x86 teamspeak3
```

**Pour une version 64 bits** :

```text
 mv teamspeak3-server_linux-amd64 teamspeak3
```

On se place dans le répertoire du serveur.

```text
 cd teamspeak3
```

On rend exécutable le fichier  :

```text
 chmod +x ts3server_minimal_runscript.sh && chmod +x ts3server_startscript.sh
```

On vas utiliser le serveur TS3 avec une base de donnée.

Création d'un utilisateur et de la base de donnée :

```text
   mysql -uroot -pvotre_passe
   CREATE DATABASE IF NOT EXISTS `teamspeak3`;
   GRANT USAGE ON * . * TO 'teamspeak3'@'localhost' IDENTIFIED BY 'votre_passe';
   GRANT ALL PRIVILEGES ON `teamspeak3` . * TO 'teamspeak3'@'localhost';
   flush privileges;
   exit
```

Maintenant on vas créer un fichier **.ini** :

```text
   su serveur && cd /home/serveur/teamspeak3
   nano ts3db_mysql.ini
```

Copier / Coller ceci :

```text
   [config]
   host=localhost
   port=3306
   username=teamspeak3
   password=votre_passe
   database=teamspeak3
   socket=
```

Sauvegarder le fichier en faisant CTRL + X puis O.

Création du fichier de configuration du serveur :

```text
   nano ts3server.ini
```

```text
 machine_id=
 default_voice_port=998	
 voice_ip=0.0.0.0	
 liscensepath=./	
 filetransfer_port=30033	
 filetransfer_ip=0.0.0.0	
 query_port=10011	
 query_ip=0.0.0.0	
 dbplugin=ts3db_mysql	
 dbpluginparameter=ts3db_mysql.ini	
 dbsqlpath=sql/	
 dbsqlcreatepath=create_mysql/	
 logpath=logs	
 logquerycommands=1
```

Dans les champs **voice_ip**, **filetransfer_ip** et **query_ip**, ne mettez rien sauf si vous disposez d'une IP extérieur (IPFailOver par exemple si vous êtes chez OVH)

Vous pouvez [obtenir une licence gratuite](https://wiki.rusty-familly.eu/Comment_cr%C3%A9er_un_serveur_Teamspeak_3#Comment_obtenir_la_licence_gratuite_de_TeamSpeak3_.3F) pour votre serveur TeamSpeak

![Warning](/images-wiki/Warning.png) **ATTENTION** : En aucun cas, vous ne pourrez utilisez votre licence pour vendre des serveurs TeamSpeak3 gratuitement, cela est illégal, vous risquez de perdre la licence.

On édite le fichier **ts3server_startscript.sh** :

```text
   nano ts3server_startscript.sh
```

Dans la ligne **COMMANDLINE_PARAMETERS="\{2\}"**, remplacer par :

```text
   COMMANDLINE_PARAMETERS="dbplugin=ts3db_mysql inifile=ts3server.ini"
```

Sauvegarder le fichier (CTRL + X puis O).

On lance le serveur :

```text
 ./ts3server_startscript.sh start
```

Voici ce que vous devriez avoir :

```text
	
Starting the TeamSpeak 3 server
	
TeamSpeak 3 server started, for details please view the log file

	
------------------------------------------------------------------
	
                      I M P O R T A N T
	
------------------------------------------------------------------
	
              Server Query Admin Account created
	
        loginname= "serveradmin", password= "kf5B4nvj"
	
------------------------------------------------------------------

	
	
	
------------------------------------------------------------------
	
                      I M P O R T A N T
	
------------------------------------------------------------------
	
      ServerAdmin privilege key created, please use it to gain
	
      serveradmin rights for your virtualserver. please
	
      also check the doc/privilegekey_guide.txt for details.

	
	
      token=tSgrpkplTHgoWODur+LZyayFDfgaqAzzRo2XiGII
	
------------------------------------------------------------------
```

Dans le dossier **logs**, on vérifie le log :

```text
2013-11-01 14:33:38.548204|INFO    |ServerLibPriv |  | TeamSpeak 3 Server 3.0.10 (2013-09-27 10:13:58)
2013-11-01 14:33:38.548355|INFO    |ServerLibPriv |  | SystemInformation: Linux 3.2.0-4-amd64 #1 SMP Debian 3.2.51-1 x86_64 Binary: 64bit
2013-11-01 14:33:38.551417|INFO    |DatabaseQuery |  | dbPlugin name:    MySQL plugin, (c)TeamSpeak Systems GmbH
2013-11-01 14:33:38.551460|INFO    |DatabaseQuery |  | dbPlugin version: 1
2013-11-01 14:33:38.552887|ERROR  |DatabaseQuery |  | mysql_real_connect() failed with error: Can't connect to MySQL server on '127.0.0.1' (111)
```

On stop le serveur :

```text
 ./ts3server_startscript.sh stop
```

Pour corriger ce problème, exécuter ceci (ligne à adapter avant d'exécuter !) :

```text
 mysql -uroot -pvotre_passe
 GRANT ALL PRIVILEGES ON * . * TO  'teamspeak3'@'VOTRE_IP' IDENTIFIED BY  'votre_passe' WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;
 Flush privileges;
 exit
```

Copier la série de chiffres et lettres après **token=**, connectez vous à votre serveur TeamSpeak, allez dans **Permissions** puis **Privileges Keys** et coller le jeton.

Un message de confirmation s'affichera.

Vous avez accès à toutes les modifications possibles.

Démarrer le serveur TS3 :

```text
   ./ts3server_startscript.sh start
```

Stopper le serveur TS3:

```text
   ./ts3server_startscript.sh stop
```

Redémarrer le serveur TS3 :

```text
   ./ts3server_startscript.sh restart
```

Status du serveur TS3 :

```text
   ./ts3server_startscript.sh status
```

## Comment obtenir la licence gratuite de TeamSpeak3 ?

Allez sur ce site :

***** ![icon11](/images-wiki/icon11.gif) la licence vous permettra d'avoir 10 serveurs virtuels pour 512 slots.
**ATTENTION** : En aucun cas, vous ne pourrez utilisez votre licence pour vendre des serveurs TeamSpeak3 gratuitement, cela est illégal, vous risquez de perdre la licence.

[Triton CI & Associates, Inc.](http://npl.tritoncia.com/ts3npl.php)

Cliquez sur **Continue** ![icon11](/images-wiki/icon11.gif) lisez la licence puis valider en cliquant sur le bouton **I Agree** ![icon11](/images-wiki/icon11.gif) remplissez les champs et cliquez sur **Submit** et regarder dans votre boîte mail (courrier indésirable pour hotmail) et vous avez obtenu la licence. Celle-ci doit être mise à la racine de votre dossier **teamspeak3**

## Configurer TeamSpeak3 X64 avec un nom de domaine

Le nom de domaine doit être [FQDN](http://fr.wikipedia.org/wiki/Fully_qualified_domain_name).

Nous partons dans l'hypothèse que le serveur soit déjà installé !

```text
 su serveur
 cd /home/serveur/teamspeak3/tsdns
 cp -R tsdns_settings.ini.sample tsdns_settings.ini
 nano tsdns_settings.ini
```

Ajouter cette ligne (à adapter selon la configuration de votre serveur TS3) :

```text
 votredomaine.fr=VOTREIP:PORTDUSERVEUR
```

Puis exécuter :

```text
 ./tsdnsserver_linux_amd64
```

retournera le nombre d'entrée saisis, ici une dans notre tutoriel :

:::note

Scanned tsdns_settings.ini, number of entries: 1

:::

Lancer le dans un screen autrement le script ne fonctionnera plus :

```text
screen -dmS ts3dns ./tsdnsserver_linux_amd64
```

Pour démarrer à chaque redémarrage le script :

```text
 su serveur
 crontab -e
```

Ajouter cette ligne :

```text
 @reboot cd /home/serveur/teamspeak3/tsdns && ./tsdnsserver_linux_amd64
```

Un script a été mis à disposition sur le forum de TeamSpeak3 :
[tsdns_startscript.sh](http://forum.teamspeak.com/showthread.php/64143-start-TSDNS-permantly-in-Linux)

N'oubliez pas le rendre exécutable et de le placer dans le répertoire où se trouve le binaire.

##  Installation du panel d'administration By PsychoKiller

Lien de la source : [Ts3 Webinterface](http://forum.teamspeak.com/showthread.php?t=49547)

## Requis

- *[Se connecter à puTTY](/administration/systeme/comment-se-connecter-en-root/)

- [Comment créer un serveur Web ?](/administration/web-et-ftp/comment-creer-un-serveur-web-apache2/)

## Installation

Connectez-vous à puTTY avec votre utilisateur **root**.

Télécharger l'archive :

```text
   wget https://tutocss.pages-perso.free.fr/wiki/ts3wi.zip
   unzip ts3wi.zip
   mv ts3wi /var/wwww
```

On édite le fichier **config.php** :

```text
   nano /var/www/ts3wi/config.php
```

Voici son contenu :<br />
`$server[0]['alias']= "Lokaler Server";<br /> $server[0]['ip']= "localhost";<br /> $server[0]['tport']= "10011";<br />  $cfglang        =       "fr";                   //Language German = de, English = en, Netherlandish=nl (by pd1evl)<br />  $duration = "100";                              //Set the Limit for Clients show per Page on Client List<br />  $fastswitch=true;                               //If true you can switch the Server on the header<br />   $showicons="left";                              //Define the position where the icons on the Viewer will show left or right<br />  $style="new";                                   //Chose your design  set 'default' or 'new' for the default designs or the name of your own create design<br />  $msgsend_name="Webinterface";   //This Name will be show if you send a message to a Server<br />  $show_motd=true;                                // Set it to false to not show the message of the day window<br />  $serverhost=false;                              //If this true normal query clients must specific a port on Login.<br /> $hostusername='superadmin';     //If $serverhost=true write here your webinterface username.<br /> $hostpassword='123456';                 //If $serverhost=true write here your webinterface password.<br />`

**Explication** :
Permet de définir le nom de votre serveur affiché sur la page Web.

```text
$server[0]['alias']= "Lokaler Server";
```

Adresse IP du serveur dédié

```text
$server[0]['ip']= "localhost";
```

Port Query du serveur TEamSpeak3

```text
$server[0]['tport']= "10011";
```

Langue affiché

```text
$cfglang        =       "fr";
```

Set the Limit for Clients show per Page on Client List

```text
$duration = "100";
```

If true you can switch the Server on the header

```text
$fastswitch=true;
```

Définir la position des icônes (gauche ou droite)

```text
$showicons="left";
```

Définis le thème affiché

```text
$style="new";
```

Définis le nom (préfixe) du message envoyé à un serveur

```text
$msgsend_name="Webinterface";
```

Affiche le Motd

```text
$show_motd=true;
```

Si définis à True alors le clients devront spécifier un port pour se connecter

```text
$serverhost=false;
```

Si la variable $serverhost est égale à true alors écrivez ici votre nom du superadmin

```text
$hostusername='superadmin';
```

Si la variable $serverhost est égale à true alors écrivez ici le mot de passe du superadmin

```text
$hostpassword='123456';
```

Lancer votre serveur TeamSpeak et connectez-vous au panel d'administration. Vous devrez avoir les identifiants fournis lors de la première installation du compte **superadmin**.

Maintenant il vous faudra appliquer un chmod 777 sur les répertoires suivants :

- icons,

- temp,

- templates_c,

- site

- backups (chmod récursif requis)

Démarrer votre serveur TeamSpeak et ouvrez dans votre navigateur [votre_domaine.fr/ts3wi/index.php](http://votre_domaine.fr/ts3wi/index.php) puis connectez-vous avec le compte **superadmin** et là vous pourrez gérer votre serveur.
