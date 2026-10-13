---
title: "Comment créer un serveur ftp Proftpd"
---

## Introduction

Ce Tutoriel a été réalisé afin de vous montrez comment installer un serveur FTP ainsi que d'ajouter des utilisateurs sur votre serveur dédié.

## Installation Standalone

## Prérequis

- [Connecter vous en root](/pages-wiki/comment-se-connecter-en-root) ou avec [Sudo](/pages-wiki/sudo) à votre machine.

## Installation

Deux choix vous seront proposés :

- inetd ![icon11](/images-wiki/icon11.gif) Le serveur FTP sera démarré à la demande (l'idéal si vous ne l'utiliser pas régulièrement)

- indépendamment ![icon11](/images-wiki/icon11.gif) Le serveur FTP sera démarré de façon permanente et donc toute connexion entrante sera accepté (l'idéal si vous l'utiliser régulièrement).

Exécuter :

```bash
apt install proftpd
```

## Configuration Standard

```bash
nano /etc/proftpd/proftpd.conf
```

Si vous n'utilisez pas IPV6, vous pouvez le désactiver :

```text
 UseIPv6                         off
```

Personnaliser le message d'accueil :

```text
ServerName                      "Serveur FTP by Free 4 Funs"
```

Lorsque vous ou d'autres se connecteront notamment via Filezilla a leur ftp ils auront ce message qui s'affichera. Vous n'êtes pas obligé de le modifier, c'est juste une personnalisation.

Vérifiez bien que **ServerType** soit sur **standalone** bien que celle-ci est par défaut !
Chercher :

```text
  #DefaultRoot ~
```

Remplacer par :

```text
  DefaultRoot ~
```

Activer cette fonction empêchera les utilisateurs de naviguer sur le FTP des autres utilisateurs, il sera bloqué dans son répertoire pour résumé.

Chercher (ligne 38):

```text
  # RequireValidShell
```

Remplacer par :

```text
  RequireValidShell
```

On s'assure que le shell des utilisateurs est listé dans /etc/shells. Ceci aura pour effet de désactiver la gestion des utilisateurs virtuels !

Chercher (ligne 29) :

```text
  ListOptions                     "-l"
```

Remplacer par :

```text
  ListOptions 			"" strict
```

Permet de cacher les fichiers cachés.

Directive qui n'affiche pas les fichiers cachés

```text
  <Directory />
  HideFiles ^\..*
  <Limit ALL>
    IgnoreHidden On
  </Limit>
  </Directory>
```

Chercher (ligne 81):

```text
  #AuthOrder                       mod_auth_pam.c* mod_auth_unix.c
```

Remplacer par :

```text
  AuthOrder                       mod_auth_pam.c* mod_auth_unix.c
```

Cela est nécessaire pour utiliser l'authentification par mot de passe et locale sur la base de PAM.

Vous pouvez ajouter :

```text
   AllowRetrieveRestart on
   AllowStoreRestart on
```

Permet au client de reprendre un téléchargement et un upload interrompu. Par défaut, elle sont sur **off**.

```text
   MaxLoginAttempts X
```

Permet d'empêcher de faire plus de X tentatives de login.

```text
   MaxClients X <message>
```

Permet de limiter le serveur à X utilisateurs en indiquant un message aux utilisateurs.

```text
   MaxClientsPerHost X
```

Permet de limiter le serveur à X connexions par ip. Une valeur comprise entre 5 et 10 nous semble être correct.

:::note[Note]

Pensez que l'augmentation de certaines variables auront un impact considérables sur les ressources du CPU.

:::

La [documentation officiel](http://www.proftpd.org/docs/directives/configuration_full.html) où vous trouverez toute une liste de variable à étudier sérieusement car la configuration par défaut est un peu quitch...

Une fois les modifications faites vous faite la manipulation clavier CTRL + X ensuite vous appuyez sur o et validez par la touche Entrée.

On redémarre le serveur FTP

```text

```bash
systemctl restart proftpd
```

```

## Configuration SSL

Reprenez la configuration standard et appliquez ceci si vous désirez une connexion sécurisée.

On vas procéder à la création des clés pour sécurisé l'accès du serveur.

```text
   

```bash
mkdir -p /etc/proftpd/ssl && cd /etc/proftpd/ssl
```

```

Génération du certificat :

```text
   

```bash
openssl req -x509 -newkey rsa:1024 -keyout proftpd.key -out proftpd.crt -nodes -days 365
```

```

Remplissez les diverses informations :

```text
Generating a 1024 bit RSA private key
............++++++
.........++++++
writing new private key to 'proftpd-key.pem'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:
Email Address []:
```

On règle la permission de la clé :

```text
   chmod 440 proftpd-key.pem
```

On édite le fichier '*tls.conf* :

```text
    nano /etc/proftpd/tls.conf
```

Chercher :

```text
   #TLSOptions
```

Remplacer par :

```text
   TLSOptions NoSessionReuseRequired
```

Chercher :

```text
   #TLSEngine                               on
```

Remplacer par :

```text
   TLSEngine                               on
```

Chercher :

```text
   #TLSLog                                  /var/log/proftpd/tls.log
```

Remplacer par :

```text
   TLSLog                                  /var/log/proftpd/tls.log
```

Chercher :

```text
   #TLSRSACertificateFile                   /etc/ssl/certs/proftpd.crt
   #TLSRSACertificateKeyFile                /etc/ssl/private/proftpd.key
```

Remplacer par :

```text
   TLSRSACertificateFile                   /etc/proftpd/ssl/proftpd.crt
   TLSRSACertificateKeyFile                /etc/proftpd/ssl/proftpd.key
```

On redémarre :

```text
   

```bash
systemctl restart proftpd
```

```

Connectez-vous à votre FTP et une fenêtre s'ouvrira, accepter là et tout est bon !

## Installation avec MySQL

## Requis

- Un serveur MySQL

Pensez à [mettre à jour votre machine](/pages-wiki/comment-mettre-a-jour-son-serveur).

## Installation

Deux choix vous seront proposés :

- inetd ![icon11](/images-wiki/icon11.gif) Le serveur FTP sera démarré à la demande (l'idéal si vous ne l'utiliser pas régulièrement)

- indépendamment ![icon11](/images-wiki/icon11.gif) Le serveur FTP sera démarré de façon permanente et donc toute connexion entrante sera accepté (l'idéal si vous l'utiliser régulièrement).

Exécuter :

```text
apt-get install proftpd proftpd-mod-mysql
```

Nous choisissons le choix **2**.

## Configuration avec MySQL

```text
   nano /etc/proftpd/proftpd.conf
```

Personnaliser le message d'accueil :

```text
   ServerName                      "Serveur FTP by Free 4 Funs"
```

Lorsque vous ou d'autres se connecteront notamment via Filezilla à leur ftp ils auront ce message qui s'affichera.

Vérifiez bien que **ServerType** soit sur **standalone** bien que celle-ci est par défaut !

Chercher :

```text
   #DefaultRoot ~
```

Remplacer par :

```text
   DefaultRoot ~
```

Activer cette fonction empêchera les utilisateurs de naviguer sur le FTP des autres utilisateurs, il sera bloqué dans son répertoire pour résumé.

Chercher (ligne 133):

```text
   #Include /etc/proftpd/sql.conf
```

Remplacer par :

```text
   Include /etc/proftpd/sql.conf
```

On active le module SQL.

Chercher (ligne 38):

```text
   # RequireValidShell
```

Remplacer par :

```text
   RequireValidShell
```

On s'assure que le shell des utilisateurs est listé dans **/etc/shells**. Ceci aura pour effet de désactiver la gestion des utilisateurs virtuels !

Une fois les modifications faites vous faite la manipulation clavier **CTRL** + **X** ensuite vous appuyez sur **o** et validez par la touche **Entrée**.

On active le module SQL pour le serveur FTP :

```text
   nano /etc/proftpd/modules.conf
```

Chercher (ligne 22):

```text
   #LoadModule mod_sql.c
```

Remplacer par :

```text
   LoadModule mod_sql.c
```

Chercher (ligne 38):

```text
   #LoadModule mod_sql_mysql.c
```

Remplacer par :

```text
   LoadModule mod_sql_mysql.c
```

On modifie la configuration MySQL :

```text
   nano /etc/proftpd/sql.conf
```

Active l'authentification MySQL
Chercher :

```text
   #SQLBackend
```

Remplacer par :

```text
   SQLBackend
```

Mot de passe crypté
Chercher :

```text
   #SQLAuthTypes
```

Remplacer par :

```text
   SQLAuthTypes
```

Information de connexion
Chercher :

```text
   #SQLConnectInfo proftpd@sql.example.com proftpd_user proftpd_password
```

Remplacer par :

```text
   SQLConnectInfo proftpd@localhost_ou_AdresseIP votre_user votre_mot_de_passe
```

Structure de la table utilisateur
Chercher :

```text
   #SQLUserInfo users userid passwd uid gid homedir shell
```

Remplacer par :

```text
   SQLUserInfo users userid passwd uid gid homedir shell
```

Structure de la table des groupes

Chercher :

```text
   #SQLGroupInfo groups groupname gid members
```

Remplacer par :

```text
   SQLGroupInfo groups groupname gid members
```

Ajouter à la fin :

1. Gestion des logs
Enregistre les requêtes SQL dans /var/log/proftpd/mysql.log

```text
   SQLLogFile /var/log/proftpd/mysql.log
```

1. Enregistre les authentifications

```text
   LogFormat auth "%v [%P] %h %t \"%r\" %s"
   ExtendedLog /var/log/proftpd/auth.log AUTH auth
```

1. Enregistre les accès aux fichiers

```text
   LogFormat write "%h %l %u %t \"%r\" %s %b"
   ExtendedLog /var/log/proftpd/access.log WRITE,READ write
```

Ajouter à la fin :

```text
   SQLDefaultUID   2001
   SQLDefaultGID   2001
```

**2001** correspond à l'UID et GID définis ci-dessous donc pensez à le modifier si vous n'appliquez pas le tutoriel dans son intégralité.

Création d'un utilisateur et de son groupe :

```text
   groupadd -g 2001 ftpgroup
   useradd -u 2001 -s /bin/false -d /bin/null -c "Utilisateur ProFTPD" -g ftpgroup votre_user_ftp
```

Création de la base de donnée :

```text
   mysql -uroot -pvotre_mot_de_passe
   CREATE DATABASE IF NOT EXISTS proftpd;
```

Créez la table pour la liste des groupes.<br />

:::note[Note]

PENSER A MODIFIER ftpgroup par le votre

:::

```text
   CREATE TABLE ftpgroup (
groupname varchar(16) NOT NULL default '',
gid smallint(6) NOT NULL default '2001',
members varchar(16) NOT NULL default '',
KEY groupname (groupname)
   ) ENGINE=MyISAM COMMENT='ProFTP group table';
```

Créez la table pour la liste des utilisateurs
<br />

:::note[Note]

PENSER A MODIFIER ftpuser par le votre.

:::

```text
   CREATE TABLE ftpuser (
id int(10) unsigned NOT NULL auto_increment,
userid varchar(32) NOT NULL default '',
passwd varchar(32) NOT NULL default '',
uid smallint(6) NOT NULL default '2001',
gid smallint(6) NOT NULL default '2001',
homedir varchar(255) NOT NULL default '',
shell varchar(16) NOT NULL default '/sbin/nologin',
count int(11) NOT NULL default '0',
accessed datetime NOT NULL default '0000-00-00 00:00:00',
modified datetime NOT NULL default '0000-00-00 00:00:00',
PRIMARY KEY (id),
UNIQUE KEY userid (userid)
   ) ENGINE=MyISAM COMMENT='ProFTP user table';
```

Mettre le groupe dans la table "ftpgroup"

```text
   INSERT INTO `ftpgroup` (`groupname`, `gid`, `members`) VALUES ('ftpgroup', 2001, 'ftpuser');
```

Mettre un utilisateur dans la table "ftpuser", son nom est "votredomain.com", son mot de passe "password", et il a accès uniquement au dossier /var/www/votredomain.com/. Vous devrez naturellement créer ce dossier avant de continuer.
PENSER A MODIFIER les valeurs : votredomain.com, password et /var/www/votredomain.com/ (emplacement de votre site web)

```text
   INSERT INTO `ftpuser` (`id`, `userid`, `passwd`, `uid`, `gid`, `homedir`, `shell`, `count`, `accessed`, `modified`) VALUES ('', 'votredomain.com', ENCRYPT('password'), 2001, 2001, '/var/www/sites/domain.tld/', '/sbin/nologin', 0, '', '');
```

## Configuration SSL

Reprenez la configuration standard et appliquez ceci si vous désirez une connexion sécurisée.

On vas procéder à la création des clés pour sécurisé l'accès du serveur.

```text
   cd /etc/proftpd && mkdir ssl && cd ssl
```

Génération du certificat :

```text
   openssl req -x509 -newkey rsa:1024 -keyout proftpd.key -out proftpd.crt -nodes -days 365
```

Remplissez les diverses informations :

```text
Generating a 1024 bit RSA private key
............++++++
.........++++++
writing new private key to 'proftpd-key.pem'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:
Email Address []:
```

On règle la permission de la clé :

```text
   chmod 440 proftpd-key.pem
```

On édite le fichier '*tls.conf* :

```text
    nano /etc/proftpd/tls.conf
```

Chercher :

```text
   #TLSEngine                               on
```

Remplacer par :

```text
   TLSEngine                               on
```

Chercher :

```text
   #TLSLog                                  /var/log/proftpd/tls.log
```

Remplacer par :

```text
   TLSLog                                  /var/log/proftpd/tls.log
```

Chercher :

```text
   #TLSRSACertificateFile                   /etc/ssl/certs/proftpd.crt
   #TLSRSACertificateKeyFile                /etc/ssl/private/proftpd.key
```

Remplacer par :

```text
   TLSRSACertificateFile                   /etc/proftpd/ssl/proftpd.crt
   TLSRSACertificateKeyFile                /etc/proftpd/ssl/proftpd.key
```

On redémarre :

```text
   service proftpd restart
```

Connectez-vous à votre FTP et une fenêtre s'ouvrira, accepter là et tout est bon !

## Créer un compte ftp

```text
adduser wiki
```

Il vous demandera ensuite le mot de passe et la confirmation.

Des informations complémentaires vous seront demandées, ignorer ces étapes en appuyant sur la touche Entrée jusqu’à ce qu'il vous demande d'appuyer sur **O** ou **n**, vous ferez donc **o** puis **Entrée**.

Avec cette méthode, l'utilisateur n'aura accès qu'à son dossier (/home/wiki).

Vous pouvez également créer un utilisateur qui aura un emplacement spécifique.<br />
Exemple : **/var/www/votredomaine.fr**

Pour créer ce genre de compte il vous suffit de taper :

```text
mkdir -p /var/www/votredomaine.fr
adduser wiki --home /var/www/votredomaine.fr
```

## Gérer Proftpd par une interface graphique

Si vous n'êtes pas à l'aide avec les commandes sous Debian, il est possible de gérer votre serveur FTP par une interface graphique.

### Requis

- Vous avez déjà installé et configurer un serveur Web ([Apache 2](/pages-wiki/comment-creer-un-serveur-web-apache2) ou [Nginx](/pages-wiki/comment-creer-un-serveur-web-nginx-version-complete))

- Installer le paquet git pour avoir la dernière version

### Installation

```text
   cd /var/www/
   git clone https://github.com/ChristianBeer/ProFTPd-Admin.git
   chown -R www-data.www-data ProFTPd-Admin
   cd ProFTPd-Admin
```

On modifie la configuration MySQL :

```text
   nano /etc/proftpd/sql.conf
```

Rechercher '''&lt;/IfModule>
''', ajouter avant :

`SQLUserWhereClause      "disabled != 1" SQLLog PASS             updatecount SQLNamedQuery           updatecount UPDATE "login_count=login_count+1, last_login=datetime() WHERE userid='%u'" users   # Used to track xfer traffic per user (without invoking a quota) SQLLog RETR             bytes-out-count SQLNamedQuery           bytes-out-count UPDATE "bytes_out_used=bytes_out_used+%b WHERE userid='%u'" users SQLLog RETR             files-out-count SQLNamedQuery           files-out-count UPDATE "files_out_used=files_out_used+1 WHERE userid='%u'" users  SQLLog STOR             bytes-in-count SQLNamedQuery           bytes-in-count UPDATE "bytes_in_used=bytes_in_used+%b WHERE userid='%u'" users SQLLog STOR             files-in-count SQLNamedQuery           files-in-count UPDATE "files_in_used=files_in_used+1 WHERE userid='%u'" users`

Création du virtualhost :
`Alias /ftpadmin "/var/www/ProFTPd-Admin"<br /><br />   <VirtualHost *:80><br /> ServerName votre_domain.fr<br /> ServerAlias ftpadmin<br /> ServerAdmin webmaster@mondomaine.fr<br /> DocumentRoot /var/www/ProFTPd-Admin<br /> <br />     <Directory /var/www/ProFTPd-Admin><br />         Options +FollowSymLinks<br />         AllowOverride All<br />         order allow,deny<br />         allow from all<br />     </Directory><br />   # On protege le dossier configs/<br /><br />   <Directory /var/www/ProFTPd-Admin/configs><br />         Options -FollowSymLinks<br />         AllowOverride None<br />     </Directory><br /><br />   </VirtualHost><br />`

Redémarrage du serveur :

```text
   apachectl restart
```

On édite le fichier de configuration :

```text
    mv config_example.php config.php
    nano config.php
```

Remplissez les informations et sauvegarder les modifications.

Si vous ne souhaitez pas que ce dossier soit accessible par tout le monde, vous pouvez le protéger de cette façon :

```text
    nano /var/www/ProFTPd-Admin/.htaccess
```

`AuthName "Acces prive" AuthType Basic AuthUserFile "/var/www/ProFTPd-Admin/.htpasswd" AuthGroupFile /dev/null <Limit GET POST> order deny,allow require valid-user </Limit>   <IfModule mod_rewrite.c>   <IfModule mod_ssl.c>         RewriteEngine on         RewriteCond %{HTTPS} !^on$ [NC]         RewriteRule (.*) https://www.mondomaine.fr/ftpadmin/       [L]   </IfModule> </IfModule> <br />`

On génère le mot de passe :

```text
   htpasswd -c /var/www/ProFTPd-Admin/.htpasswd VOTRE_UTILISATEUR
```

Redémarrage du serveur :

```text
   apachectl restart
```

## F.A.Q

Q Lors du démarrage du serveur, j'obtiens cette erreur :<br />

:::note

Starting ftp server: proftpddebian proftpd[3955]: mod_tls_memcache/0.1: notice: unable to register 'memcache' SSL session cache: Memcache support not enabled

:::

R Exécuter : nano /etc/proftpd/modules.conf

Chercher :

```text
   LoadModule mod_tls_memcache.c
```

Remplacer par :

```text
   #LoadModule mod_tls_memcache.c
```

Q La connexion est lente pour se connecter au FTP.

R Exécuter :

```text
 nano /etc/proftpd/proftpd.conf
```

Chercher :

```text
 IdentLookups
```

Ajouter en dessous :

```text
 UseReverseDNS off
```

Redémarrer le serveur FTP :

```text
 invoke-rc.d proftpd restart
```

Ce tutoriel a été réalisé avec l'aide du tutoriel du site [Debian-fr](https://www.isalo.org/wiki.debian-fr/Installation_de_Proftpd_avec_base_de_donn%C3%A9es_Mysql_%2B_TLS_et_gestion_des_users_virtuel_%C3%A0_l%27aide_de_proftpdadmin), si l'auteur souhaite que je retire quelque chose, qu'il me contacte.
