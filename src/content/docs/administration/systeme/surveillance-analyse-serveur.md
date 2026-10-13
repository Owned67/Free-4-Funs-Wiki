---
title: "Surveillance Analyse Serveur"
---

## Logwatch

Logwatch analyse les logs et il est personnalisable. il analyse à travers les logs de votre système et crée un rapport en analysant les zones que vous spécifiez.

### Installation Logwatch

Si vous n'avez pas Logwatch d'installer, faites ceci **root** :

```bash
apt install logwatch -f
```

ou avec **sudo**
sudo 

```bash
apt install Logwatch -f
```

### Utilisation

Générer un rapport dans le terminal, la valeur **Output** doit être définis sur **stdout** :

```bash
logwatch
```

Analyser le log **messages** et l'envoyer par mail.

```bash
logwatch –detail high –logfile messages –mailto votre_mail@domaine.fr
```

Pour avoir l'aide complète de logwatch :

```bash
logwatch --help
```

En anglais bien évidemment ^^

### Configuration Logwatch

Faites ceci en **root** :

```bash
cp /usr/share/logwatch/default.conf/logwatch.conf /etc/logwatch/conf/
nano /etc/logwatch/conf/logwatch.conf
```

puis modifiez les valeurs :
Si vous disposez d'un serveur mail qui envoie les mails, modifier la valeur **MailTo = root** ![icon11](/images-wiki/icon11.gif) **MailTo = votre_mail@votre_domaine.fr**.

Modifiez également :

```ini
Output = mail (défaut: stdout)
Detail = Med (ou High selon le niveau que vous désirez).
```

Sauvegarder les modifications (**CTRL** + **O** puis **Entrée**).

### Nginx et Logwatch

Il est tout à fait possible d'analyser les logs de Nginx, suivez le guide...

:::caution[Avertissement]

Sur les versions récentes de logwatch (c'est le cas de la 7.7), les logs d'accès de Nginx sont déjà analysés par le service **http**. Ce tutoriel permet d'obtenir une section **Nginx** séparée dans le rapport. Pour vérifier : `grep nginx /usr/share/logwatch/default.conf/logfiles/http.conf`

:::

Dans un premier temps, nous allons créer les dossiers de configuration s'ils n'existent pas :

```bash
mkdir -p /etc/logwatch/conf/logfiles /etc/logwatch/conf/services /etc/logwatch/scripts/services
```

Nous allons ensuite créer le fichier de configuration **nginx.conf** dans le répertoire **/etc/logwatch/conf/logfiles/**. Son nom doit être identique à celui du groupe référencé plus loin (**LogFile = nginx**).

Le dossier **/usr/share/logwatch/default.conf/logfiles/** est aussi valable, cependant logwatch va trouver les informations en premier dans le répertoire donné ci-dessus.

```bash
nano /etc/logwatch/conf/logfiles/nginx.conf
```

Copier/coller :

```text
 ########################################################
 # Define log file group for nginx
 ########################################################
 # What actual file? Defaults to LogPath if not absolute path...
 LogFile = nginx/*access.log
 LogFile = nginx/*access.log.1
 # If the archives are searched, here is one or more line
 # (optionally containing wildcards) that tell where they are...
 # If you use a "-" in naming add that as well -mgt
 Archive = nginx/*access.log*
 # Expand the repeats (actually just removes them now)
 *ExpandRepeats
 # Keep only the lines in the proper date range...
 *ApplyhttpDate
 # vi: shiftwidth=3 tabstop=3 et
```

Sauvegarder le fichier.

Maintenant passons au second fichier, celui du service (comme précédemment, le dossier **/usr/share/logwatch/default.conf/services/** est aussi valable) :

```bash
nano /etc/logwatch/conf/services/nginx.conf
```

Copier/coller :

```text
 ###########################################################################
 # Configuration file for nginx filter
 ###########################################################################
 # Vous pouvez mettre le titre que vous souhaitez...
 Title = "Logwatch Nginx"
 # Which logfile group...
 LogFile = nginx
```

Sauvegarder le fichier.

Voici l'avant-dernière étape, très facile (comme précédemment, le dossier **/usr/share/logwatch/scripts/services/** est aussi valable) :

```bash
cp /usr/share/logwatch/scripts/services/http /etc/logwatch/scripts/services/nginx
```

Pour terminer, testons le résultat :

```bash
logwatch --service nginx --range today --output stdout --detail high
```

Le rapport doit afficher une section **Logwatch Nginx**. Si vous obtenez l'erreur *There is no logfile defined*, le fichier de groupe n'est pas nommé **/etc/logwatch/conf/logfiles/nginx.conf**.

Il n'y a aucun service à redémarrer : logwatch est lancé par cron et relit sa configuration à chaque exécution.

## Psad
### Installation Psad

## Nagios
### Introduction

## Linux-Dash

### Introduction

Linux-Dash permet de suivre en temps réel l'état des ressources de son serveur.

Il est léger, plutôt performant et assez complet. Bien entendu il à ses limitations donc si vous souhaitez gérer un parc ou que vous avez besoin de choses complexes, il vous faudra voir du côté de Nagios ou autres...

:::caution[Avertissement]

Ce tutoriel a été réalisé pour Nginx<br />

:::

### Requis

- Un serveur web avec les fonctions suivantes activés :

```text
   exec, shell_exec, et escapeshellarg
```

### Installation

Avant de commencer, nous mettons à jour la machine :

```bash
apt update && apt upgrade -y
```

avec sudo :

```bash
sudo apt update && sudo apt upgrade -y
```

nous allons créer un vhost (pensez à modifier checksys.no-ip.org par votre domaine à chaque étapes !) :

```text
 

```bash
nano /etc/nginx/sites-available/checksys.no-ip.org
```

```

ou avec sudo :

```bash
sudo nano /etc/nginx/sites-available/checksys.no-ip.org
```

Copier/coller ceci :

```text
server {
        server_name     votre_domaine.fr;
        listen          80;
        access_log      /var/log/nginx/access_linux-dash.log;
        error_log       /var/log/nginx/error_linux-dash.log;

        location /linux-dash {
                root    /usr/share/nginx/html;
                index index.html index.php;

        }

        location ~* \.(?:xml|ogg|mp3|mp4|ogv|svg|svgz|eot|otf|woff|ttf|css|js|jpg|jpeg|gif|png|ico)$ {
                try_files $uri =404;
                expires max;
                access_log off;
                add_header Pragma public;
                add_header Cache-Control "public, must-revalidate, proxy-revalidate";
        }

        location ~ \.php(/|$) {
                fastcgi_param  SCRIPT_FILENAME   $document_root$fastcgi_script_name;
                fastcgi_split_path_info ^(.+?\.php)(/.*)$;
                #fastcgi_pass unix:/var/run/php5-fpm.sock;
                fastcgi_pass 127.0.0.1:9000;
                if (!-f $document_root$fastcgi_script_name) {
                        return 404;
                }
                try_files $uri $uri/ /index.php?$args;
                include fastcgi_params;
                }

    }
```

<br />

:::caution[Avertissement]

Si vous utiliser php-fpm via socket, de commenter la ligne **fastcgi_pass unix:/var/run/php5-fpm.sock;** et commenter celle-ci : **fastcgi_pass 127.0.0.1:9000;** en mettant un **#**.

:::

On active notre vhost :

```text
 

```bash
ln -s /etc/nginx/sites-available/checksys.no-ip.org /etc/nginx/sites-enabled/
```

```

On se place dans le répertoire du serveur web :

```text
 

```bash
cd /usr/share/nginx/html
```

```

ou avec sudo :

```text
 

```bash
sudo bash -c 'cd /usr/share/nginx/html'
```

```

On télécharge Linux-Dash (ceci nous permettra de garder à jour la version ultérieurement) :

```text
 

```bash
git clone https://github.com/afaqurk/linux-dash.git
```

```

ou avec sudo :

```text
 

```bash
sudo git clone https://github.com/afaqurk/linux-dash.git
```

```

```text
Cloning into 'linux-dash'...
remote: Counting objects: 1994, done.
remote: Compressing objects: 100% (39/39), done.
remote: Total 1994 (delta 17), reused 0 (delta 0)
Receiving objects: 100% (1994/1994), 1.19 MiB | 1.09 MiB/s, done.
Resolving deltas: 100% (1139/1139), done.
```

On redémarre Nginx :

```bash
service nginx restart
```

ou avec sudo :

```bash
sudo service nginx restart
```

Maintenant, dans votre navigateur, allez sur la page [http://votre_domaine.fr/linux-dash](http://votre_domaine.fr/linux-dash) et admirer :)

### Sécurisation

Nous utilisons **apache2-utils** pour pouvoir générer le htpasswd, si vous avez une autre méthode, vous pouvez ignorer cette étape.

```bash
apt install apache2-utils
```

avec sudo :

```bash
sudo apt-get install apache2-utils
```

Création du fichier **.htpasswd** avec une encryption en SHA :

```bash
htpasswd -cs /usr/share/nginx/html/linux-dash/.htpasswd VOTRE_LOGIN
```

ou avec sudo :

```bash
sudo htpasswd -cs /usr/share/nginx/html/linux-dash/.htpasswd VOTRE_LOGIN
```

Vous devrez saisir votre mot de passe (et le confirmer) :

```text
New password:
Re-type new password:
Adding password for user VOTRE_LOGIN
```

Éditons notre vhost :

```bash
nano /etc/nginx/sites-enabled/votre_domaine.fr
```

ou avec sudo :

```bash
sudo nano /etc/nginx/sites-enabled/votre_domaine.fr
```

Chercher **location /linux-dash \{**, sur une nouvelle ligne, ajouter (Ce code devra être inséré avant l'accolade de fermeture du bloc **location linux-dash**):

```text
       auth_basic "Linux Dash";
       auth_basic_user_file "/usr/share/nginx/html/linux-dash/.htpasswd";
```

Le vhost complet devra ressembler à :

```text
server {
        server_name     votre_domaine.fr;
        listen          80;
        access_log      /var/log/nginx/access_linux-dash.log;
        error_log       /var/log/nginx/error_linux-dash.log;

        location /linux-dash {
                root    /usr/share/nginx/html;
                index index.html index.php;
                auth_basic "Linux Dash";
                auth_basic_user_file "/usr/share/nginx/html/linux-dash/.htpasswd";
        }

        location ~* \.(?:xml|ogg|mp3|mp4|ogv|svg|svgz|eot|otf|woff|ttf|css|js|jpg|jpeg|gif|png|ico)$ {
                try_files $uri =404;
                expires max;
                access_log off;
                add_header Pragma public;
                add_header Cache-Control "public, must-revalidate, proxy-revalidate";
        }

        location ~ \.php(/|$) {
                fastcgi_param  SCRIPT_FILENAME   $document_root$fastcgi_script_name;
                fastcgi_split_path_info ^(.+?\.php)(/.*)$;
                #fastcgi_pass unix:/var/run/php5-fpm.sock;
                fastcgi_pass 127.0.0.1:9000;
                if (!-f $document_root$fastcgi_script_name) {
                        return 404;
                }
                try_files $uri $uri/ /index.php?$args;
                include fastcgi_params;
                }
}
```

On redémarre Nginx :

```bash
service nginx restart
```

ou

```bash
systemctl restart nginx
```

Maintenant, dans votre navigateur, rendez-vous sur [la page](http://votre_domaine.fr/linux-dash) :

![nginx htpasswd](/images-wiki/nginx_htpasswd.jpg)

et si vous n'indiquez pas le bon identifiant :

![nginx 401 htpasswd](/images-wiki/nginx_401_htpasswd.jpg)

### F.A.Q

Q Comment mettre à jour Linux-Dash ?

Rcd /chemin_Linux-Dash && git pull

ou avec sudo :

```text
 cd /chemin_Linux-Dash && sudo git pull
```

## Glances
### Introduction

Glances vous permet de suivre en temps réel l'état des ressources de son serveur.

:::caution[Avertissement]

Free 4 Funs ne pourra être tenue responsable d’une instabilité du système résultant d’une mauvaise installation.

:::

### Requis

```bash
apt-get install python-dev python-pip
```

avec sudo :

```bash
sudo apt-get install python-dev python-pip
```

### Installation Python

Avant de commencer, nous mettons à jour la machine :

```bash
apt update && apt upgrade
```

ou avec sudo

```bash
sudo apt update && sudo apt upgrade
```

On télécharge Glances (ceci nous permettra de garder à jour la version ultérieurement) :

```bash
pip install Glances
```

ou avec sudo :

```bash
sudo pip install Glances
```

une fois installé, il vous suffira d'exécuter **glances** en SSH pour voir les différentes informations.

Une capture d'écran :

![f4f glances](/images-wiki/f4f_glances.jpg)

Il n'y a rien de compliqué, cependant voici la légende des couleurs :

```text
   <font color="green">VERT</font> : la statistique est '''OK'''
   <font color="blue">BLEU</font> : la statistique est '''CAREFUL''' (prudence donc à surveiller...)
<span style="color:#800080">VIOLET</span>: la statistique est '''WARNING''' (en alerte)
   <font color="red">ROUGE</font> : la statistique est '''CRITICAL''' (critique)
```

Si vous souhaitez vous amuser à modifier la configuration, vous trouverez le fichier de configuration dans **/etc/glances/glances.conf**.

A ce jour où nous écrivons ce tutoriel, glances est en version **2.2.1**.

L'aide de glances :

```text
  glances -h
 usage: glances [-h] [-V] [-d] [-C CONF_FILE] [--disable-network]
              [--disable-diskio] [--disable-fs] [--disable-sensors]
              [--disable-left-sidebar] [--disable-process] [--disable-log]
              [--disable-bold] [--enable-process-extended] [--enable-history]
              [--path-history PATH_HISTORY] [--output-csv OUTPUT_CSV]
              [-c CLIENT] [-s] [--browser] [--disable-autodiscover] [-p PORT]
              [-B BIND_ADDRESS] [--password-badidea PASSWORD_ARG]
              [--password] [--snmp-community SNMP_COMMUNITY]
              [--snmp-port SNMP_PORT] [--snmp-version SNMP_VERSION]
              [--snmp-user SNMP_USER] [--snmp-auth SNMP_AUTH] [--snmp-force]
              [-t TIME] [-w] [-f PROCESS_FILTER] [--process-short-name]
              [--hide-kernel-threads] [--tree] [-b] [-1] [--fs-free-space]
              [--theme-white]
```

```text
 optional arguments:
 -h, --help            show this help message and exit
 -V, --version         show program's version number and exit
 -d, --debug           Enable debug mode
 -C CONF_FILE, --config CONF_FILE
                       path to the configuration file
 --disable-network     disable network module
 --disable-diskio      disable disk I/O module
 --disable-fs          disable filesystem module
 --disable-sensors     disable sensors module
 --disable-left-sidebar
                       disable network, disk io, FS and sensors modules
 --disable-process     disable process module
 --disable-log         disable log module
 --disable-bold        disable bold mode in the terminal
 --enable-process-extended
                       enable extended stats on top process
 --enable-history      enable the history mode
 --path-history PATH_HISTORY
                       Set the export path for graph history
 --output-csv OUTPUT_CSV
                       export stats to a CSV file
 -c CLIENT, --client CLIENT
                       connect to a Glances server by IPv4/IPv6 address or
                       hostname
 -s, --server          run Glances in server mode
 --browser             start the client browser (list of servers)
 --disable-autodiscover
                       disable autodiscover feature
 -p PORT, --port PORT  define the client/server TCP port [default: 61209]
 -B BIND_ADDRESS, --bind BIND_ADDRESS
                       bind server to the given IPv4/IPv6 address or hostname
 --password-badidea PASSWORD_ARG
                       define password from the command line
 --password            define a client/server password from the prompt or
                       file
 --snmp-community SNMP_COMMUNITY
                       SNMP community
 --snmp-port SNMP_PORT
                       SNMP port
 --snmp-version SNMP_VERSION
                       SNMP version (1, 2c or 3)
 --snmp-user SNMP_USER
                       SNMP username (only for SNMPv3)
 --snmp-auth SNMP_AUTH
                       SNMP authentication key (only for SNMPv3)
 --snmp-force          force SNMP mode
 -t TIME, --time TIME  set refresh time in seconds [default: 3 sec]
 -w, --webserver       run Glances in web server mode
 -f PROCESS_FILTER, --process-filter PROCESS_FILTER
                       set the process filter pattern (regular expression)
 --process-short-name  force short name for processes name
 --hide-kernel-threads
                       hide kernel threads in process list
 --tree                display processes as a tree
 -b, --byte            display network rate in byte per second
 -1, --percpu          start Glances in per CPU mode
 --fs-free-space       display FS free space instead of used
 --theme-white         optimize display for white background
```

Vous trouverez un tutoriel complet de l'auteur sur [cette page](http://blog.nicolargo.com/2011/12/presentation-complete-de-glances.html).

### Mettre à jour Glances avec PIP

```bash
pip install --upgrade Glances
```

ou avec sudo :

```bash
sudo pip install --upgrade Glances
```

### Installation avec Github

Avant de commencer, nous mettons à jour la machine :

```bash
apt update && apt upgrade
```

ou avec sudo :

```bash
sudo apt update && sudo apt upgrade
```

On télécharge Glances (ceci nous permettra de garder à jour la version ultérieurement) :

```bash
git clone https://github.com/nicolargo/glances.git
```

ou avec sudo :

```bash
sudo git clone https://github.com/nicolargo/glances.git
```

une fois installé, il vous suffira d'exécuter **glances** en SSH pour voir les différentes informations.

### Mettre à jour Glances avec Github

R `cd /chemin_glances && git pull`

ou avec sudo :

```bash
cd /chemin_glances && sudo git pull
```

## Monit

### Introduction

Monit est un logiciel qui surveillera les instances (processus, fichiers, charge cpu etc...) de votre machine. Il est efficace et puissant.<br />
Dans ce tutoriel, nous vous proposerons deux installations différentes, la première consistera à installer <br />Monit via apt-get et la seconde via Bitucket (ce qui vous permettra de garder Monit à jour facilement).

### Installation Monit via paquet

Sachez quand même que la version installé sera la 5.4 et que Monit est en version 5.11 donc si vous êtes comme moi (toujours avoir la dernière version), descendez au tutoriel via Bitbucket. ;)

Avant de commencer, nous commençons par mettre à jour notre Debian en [ROOT](/administration/systeme/comment-se-connecter-en-root/).

```bash
apt update && apt upgrade -y
```

On installe Monit :

```bash
apt install monit -y
```

Côté configuration, je préfère vous laissez regarder car chaque SysAdmin aura sa propre configuration et vu qu'elle n'a rien de complexe.

J'y reviendrais prochainement pour détailler la configuration mais pour le moment, cela attendra. :)

### Ajouter un processus à surveiller

Avec votre éditeur de texte, éditez le fichier **/etc/monit/monitrc**.

```bash
nano /etc/monit/monitrc
```

Rechercher **## Check filesystem permissions** et dans une nouvelle ligne, copier/coller :

```text
 check process proftpd with pidfile /var/run/proftpd.pid
  start program = "/etc/init.d/proftpd start"
  stop program  = "/etc/init.d/proftpd stop"
  if failed port 21 protocol ftp then restart
  if 5 restarts within 5 cycles then timeout
```

Ceci proviens de la [mmonit.com/wiki/Monit/ConfigurationExamples documentation officielle] que je vous invite à consulter pour ajouter d'autres processus.

### Configuration Monit pour Nginx

Avec votre éditeur de texte, éditez le fichier **/opt/monit-5.11/monitrc**.

```bash
nano /opt/monit-5.11/monitrc
```

Rechercher **set httpd port 2812** (ligne 118 dans la version 5.11) puis au dessus de **## Services**, copier/coller :

```php
  set httpd port 2812
    use address ADRESSE_IP_DEDIE  # accepte uniquement les connexions localhost
    allow 0.0.0.0/0.0.0.0        # Autorise localhost à se connecter au serveur
    allow admin:monit      # On protège l'accès de l'interface web avec l'utilisateur admin qui a pour mot de passe '''monit'''
```

Sauvegarder la modification puis on recharge Monit :

```bash
monit reload
```

Accéder avec votre navigateur, identifier vous et c'est fini. :)

L'inconvénient est qu'il ne peut gérer qu'un serveur, après il vous faudra installer [M/Monit](https://mmonit.com/) et payer une https://mmonit.com/shop licence].

### Instalaltion Monit via les sources

Ce tutoriel vas vous montrer comment installer Monit depuis les sources.

Avant de commencer, nous commençons par mettre à jour notre Debian en [ROOT](/administration/systeme/comment-se-connecter-en-root/).

```bash
apt update && apt upgrade -y
```

#### Requis

- Le paquet build-essentials libpam0g-dev

#### Installation

On télécharge et on décompresse l'archive :

```text

```bash
cd /opt && wget http://mmonit.com/monit/dist/monit-5.11.tar.gz && tar -xvzf monit-5.11.tar.gz
```

```

:::caution[Avertissement]

Avant de copier/coller ce que vous lisez à la lettre, vous pouvez configurer l'installation de Monit ! Faites **./configure --help** pour avoir les options de configuration.

:::

On installe Monit :

```bash
cd monit-5.11 && ./configure
```

puis :

```bash
make && make install
```

On fixe les permissions :

```bash
chown root monitrc /opt/monit-5.11
```

L'exécutable de monit est placé dans **/usr/local/bin/** ce qui fait que lorsqu'on exécute **monit** dans un terminal :

```text
 bash: /usr/bin/monit: Aucun fichier ou dossier de ce type
```

Nous allons créer un lien symbolique tout simplement :

```bash
ln -s /usr/local/bin/monit /usr/bin/
```

#### Configuration Monit pour Nginx
Avec votre éditeur de texte, éditez le fichier **/opt/monit-5.11/monitrc**.

```bash
nano /opt/monit-5.11/monitrc
```

Rechercher **set httpd port 2812** (ligne 118 dans la version 5.11) puis au dessus de **## Services**, copier/coller :

```php
  set httpd port 2812
    use address ADRESSE_IP_DEDIE  # accepte uniquement les connexions localhost
    allow 0.0.0.0/0.0.0.0        # Autorise localhost à se connecter au serveur
    allow admin:monit      # On protège l'accès de l'interface web avec l'utilisateur admin qui a pour mot de passe '''monit'''
```

Sauvegarder la modification puis on recharge Monit :

```bash
monit reload
```

Accéder avec votre navigateur, identifier vous et c'est fini. :)

L'inconvénient est qu'il ne peut gérer qu'un serveur, après il vous faudra installer [M/Monit](https://mmonit.com/) et payer une https://mmonit.com/shop licence].

On vérifie :

```bash
monit
```

```text
 Monit daemon with PID 19256 awakened
```

Pour la configuration, veuillez vous référer à la [documentation de Monit](http://mmonit.com/wiki/Monit/HowTo) en attendant que je le fasse en Français.

## Systat
### Introduction

## Icinga
### Introduction

## Cacti

### Introduction

Cacti est un logiciel parmi tant d'autres qui vous permettra de surveiller les ressources systèmes de votre serveur avec une interface graphique.
Sachez tout de même qu'il est complexe à mettre en œuvre mais beaucoup moins que son confrère Nagios qui lui est une horreur à configurer (encore plus, si comme moi, l'anglais n'est pas votre fort ^^).

Vous trouverez dans cette section quelques logiciels qui vous permettrons de surveiller votre serveur dédié / vps avec une interface graphique qui pourra être visualisé depuis votre navigateur ou soit depuis votre terminal.

:::caution[Avertissement]

Pensez à sauvegarder vos fichiers avant d'effectuer une modification.

:::

:::note[Note]

Pour sauvegarder un fichier avec **nano** ![Icon11](/images-wiki/Icon11.gif) combiner les touches **CTRL** + **O** puis **Entrée**.

:::

:::caution[Avertissement]

Free 4 Funs ne pourra être tenue responsable d’une instabilité du système résultant d’une mauvaise installation du système d’exploitation.

:::

### Requis

- RRDTool 1.0.49 ou supérieur mais la version 1.4 (ou supérieur) est recommandé

- MySQL 5.x ou supérieur

- PHP 5.1 ou supérieur (register_argc_argv On et safe_mode off)

- Net-snmp

- snmpd snmp-mibs-downloader

- Serveur web avec php et les modules php-mysql et php-snmp (Apache2, Nginx etc...)

### Facultatif

- LDAP si vous souhaitez gérer les authentifications avec LDAP

- GD uniquement pour des plugins tiers

### Installation

Avant de commencer l'installation, nous mettons à jour notre machine :

```bash
apt update && apt upgrade -y
```

 ou 

```bash
aptitude update && aptitude upgrade -y
```

On procède à l'installation (sachez que la version de Cacti est là 0.8.8a sous Debian Wheezy 64 bits).

:::note[Note]

Assurez d'avoir installé les dépendances avant de procéder à son installation

:::

```bash
apt-get install snmp snmpd rrdtool
```

 ou 

```bash
aptitude install snmp snmpd rrdtool
```

On Télécharge cacti dans le répertoire du serveur web (nginx ici)

```bash
cd /usr/share/nginx/html && wget http://www.cacti.net/downloads/cacti-0.8.8c.tar.gz
```

On décompresse et on renomme en **cacti** :

```bash
tar -xvzf cacti-0.8.8c.tar.gz && mv cacti-0.8.8c cacti
```

L'archive est devenue inutile, on supprime :

```bash
rm cacti-0.8.8c.tar.gz
```

On créer l'utilisateur **cacti** (ou celui que vous voulez cependant il faudra lui refuser l'accès au shell).

```bash
useradd -s /bin/false -d /dev/null -g www-data cacti
```

Maintenant, on vas créer la base de donnée :

Si vous avez mis un utilisateur différent de cacti, pensez à le modifier tout au long du tutoriel et pensez à définir le mot de passe de l'utilisateur MySQL.

```sql
mysql -u root -p 
mysql> create database cacti;
mysql> GRANT ALL ON cacti.* TO cacti@localhost IDENTIFIED BY 'VOTRE_MOTDEPASSE';
mysql> flush privileges;
mysql> exit
```

On vas pouvoir importer la base de donnée mais assurez vous d'être à la racine du dossier cacti (**/usr/share/nginx/html/cacti**):

```bash
mysql -u root -p -D cacti < cacti.sql
```

Il nous reste à configurer le fichier **config.php** pour que la connexion MySQL se fasse :

```bash
nano ./include/config.php
```

Modifier les champs et sauvegarder le fichier.

```php
$database_type = "mysql";
$database_default = "cacti";
$database_hostname = "localhost";
$database_username = "cactiuser";
$database_password = "cactiuser";
$database_port = "3306";
```

:::note[Note]

Si l'accès à phpmyadmin st sécurisé avec le protocole ssl, pensez à définir la valeur **$database_ssl** à **true**.

:::

On arrive presque à la fin, courage... :)

On vas attribuer les droits au dossiers, n'oubliez pas cette étape, elle est IMPORTANTE dans le bon fonctionnement de cacti :

```bash
chown -R cacti:www-data *<br />
chown -R cacti rra/ log/
```

On vas ajouter une tâche planifier pour que cacti génère des graphs à intervalle de 5 minutes :

```bash
crontab -e
```

```bash
*/5 * * * * /usr/bin/php /usr/share/cacti/site/poller.php >/dev/null 2>/var/log/cacti/poller-error.log
```

On créer le répertoire :

```bash
mkdir -p /var/log/cacti
```

On modifie la variable **date.timezone** dans le fichier **/etc/php-fpm/php.ini** (si vous ne l'avez pas définis) :

```bash
nano /etc/php5/fpm/php.ini
```

Enlevez le **#** et après le **= **, mettez **date.timezone = "Europe/Paris"** ce qui donne au final :

```php
date.timezone = "Europe/Paris"
```

On redémarre Nginx et php5-fpm :

```text
service nginx restart
service php5-fpm restart
```

Dans votre navigateur, tapez [http://votredomaine.net/cacti](http://votredomaine.net/cacti/) puis procéder à l'installation...

Cliquez sur **Next**...
![f4f cacti step1](/images-wiki/f4f_cacti_step1.jpg)

Choisissez **New install** puis continuer en cliquant sur **Next**...
![f4f cacti step2](/images-wiki/f4f_cacti_step2.jpg)

Cliquez sur **Next** en vérifiant que tout soit affiché en vert...<br />

![f4f cacti step3](/images-wiki/f4f_cacti_step3.jpg)

<br /><br /><br /><br />
Renseignez les identifiants qui sont **admin** et pour le mot de passe **admin**.
![f4f cacti step4](/images-wiki/f4f_cacti_step4.jpg)

Mettez votre mot de passe et cliquer sur le bouton ![f4f cacti save](/images-wiki/f4f_cacti_save.jpg)<br />
![f4f cacti step5](/images-wiki/f4f_cacti_step5.jpg)

Voici la page d'accueil de Cacti :
![f4f cacti step6](/images-wiki/f4f_cacti_step6.jpg)

:::caution[Avertissement]

Supprimer le dossier **install** de votre FTP !

:::

Cacti est installé, il ne vous reste plus qu'à attendre quelques minutes le temps que les graphs se génèrent.

Après 5 minutes, vous devriez voir **localhost** avec le status Up dans l'onglet **Management** ![icon11](/images-wiki/icon11.gif) **Device**.

Dans l'onglet **SNMP Options**, assurez-vous que **SNMP Version** soit bien définis sur **1** ou plus puis pensez à sauvegarder en cliquant sur ![f4f cacti save](/images-wiki/f4f_cacti_save.jpg).

:::note[À faire]

Détailler la configuration, l'ajout de template etc...

:::
