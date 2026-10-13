---
title: "Comment créer un serveur web Nginx (version complète)"
---

## Introduction

:::caution[Avertissement]

Free 4 Funs ne pourra être tenue responsable d’une instabilité du système résultant d’une mauvaise installation.

:::

:::note

Pensez à faire une sauvegarde de chaque fichier AVANT d'effectuer toute modification !

:::

Ce tutoriel a été réalisé afin de vous montrer comment créer un serveur web avec nginx, PHP, MySQL, phpMyAdmin  vec [sudo](/administration/systeme/sudo/).

Au final, vous pourrez installer votre site web, CMS etc...

## Prérequis

- Système d’exploitation : Ubuntu, Debian

- [Accès root](/administration/systeme/comment-se-connecter-en-root/) ou [sudo](/administration/systeme/sudo/) sur la machine

- Pare-feu actif : iptables, nftables selon votre distribution

- Systemd : requis pour l’intégration des journaux systemd (journald) selon votre distribution

- curl gnupg2 ca-certificates lsb-release debian-archive-keyring

## Installation nginx

Nous mettons à jour la machine :

```bash
sudo apt update && sudo apt upgrade -y
```

Installation des dépendances :

```bash
sudo apt install curl gnupg2 ca-certificates lsb-release debian-archive-keyring -y
```

Obtenir la dernière version de nginx :

```bash
curl -fsSL https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
```

```bash
. /etc/os-release
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/mainline/$ID $VERSION_CODENAME nginx" | sudo tee /etc/apt/sources.list.d/nginx.list
```

Vérification de la clé (l’empreinte 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62 doit apparaître) :

```bash
gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
```

Mise à jour des paquets et installation de Nginx :

```bash
sudo apt update && sudo apt install nginx -y
```

L'installation du paquet automatise le démarrage du service lors du boot du système d'exploitation.

On vérifie que tout fonctionne, dans votre navigateur, taper [http://votre_ip_ou_domaine.fr](http://votre_ip_ou_domaine.fr)

Vous devriez voir :

```text
Welcome to nginx!

If you see this page, the nginx web server is successfully installed and working. Further configuration is required.

For online documentation and support please refer to nginx.org.
Commercial support is available at nginx.com.

Thank you for using nginx.
```

Nginx a été installé avec succès !

Vérification de la version de Nginx :

```bash
sudo nginx -V
```

Ouvrir le port 80 avec iptables

nous aurons besoin du paquet **iptables-persistent ** pour préserver la règle de façon permanente sur le serveur. Lors de l'installation, il vous demande si vous voulez sauvegarder les règles IPv4/IPv6 actuelles, répondez **Oui**.

```bash
sudo apt install iptables-persistent -y
```

Obtenir l'adresse IP et l'interface de votre serveur :

```bash
ip a
```

```ini
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: ens18: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether bc:24:11:b9:2b:a6 brd ff:ff:ff:ff:ff:ff
    altname enp0s18
    inet 45.145.166.112 peer 45.145.166.1/32 brd 45.145.166.255 scope global ens18
       valid_lft forever preferred_lft forever
    inet6 2a04:ecc0:8:a8:4567:830:0:1/64 scope global
       valid_lft forever preferred_lft forever
    inet6 fe80::be24:11ff:feb9:2ba6/64 scope link
       valid_lft forever preferred_lft forever
```

Ici l'interface est **ens18**, c'est ce nom qu'on réutilise dans la règle ci-dessous.
Pour ouvrir le port 80 :

```bash
sudo iptables -A INPUT -i ens18 -p tcp --dport 80 -m conntrack --ctstate NEW -j ACCEPT
```

Cette ligne autorise simplement le trafic vers le port 80 à traverser l'interface.
Il existe des façons de renforcer cette protection (n'autoriser que les nouvelles connexions, bloquer tout le reste par défaut, etc.), mais ce n'est pas l'objet de ce tutoriel.

Sauvegarder la règle, ainsi, même après redémarrage du serveur, la règle sera initialisée :

```bash
sudo netfilter-persistent save
```

## Configuration Nginx

Voici ce qu'il faut savoir sur les différentes configuration :

- nginx.conf: C'est le fichier de configuration du serveur, c'est ici que tout se jouera sur la stabilité de votre serveur hormis votre machine bien entendu.

- sites-available: Fichier de configuration pour les vhosts qui par défaut sont ignoré par Nginx.

- sites-enabled: C'est un lien symbolique du fichier de configuration qui sera dans **sites-available**

- conf.d : Utilisé pour faire une configuration commun aux divers sites, pour désactiver un fichier **.conf**, il faudra le renommer en **.disabled**.

On active la redirection en cas d'erreur de type 50X :<br />
Chercher :

```ini
#error_page 500 502 503 504 /50x.html;
        #location = /50x.html {
        #root /usr/share/nginx/html;
        #}
```

Remplacer par :

```ini
error_page 500 502 503 504 /50x.html;
            location = /50x.html {
            root /usr/share/nginx/html;
        }
```

On ajoute la lecture des fichiers de type ***.php**.

Chercher **index index.html index.htm;**, ajouter après **index.htm** et avant **;** :

```ini
index.php
```

Ceci doit ressembler à :

```ini
index index.html index.htm index.php;
```

On ajoute un système de cache pour les fichiers dits **statiques** (images, css, js etc...). On crée pour cela un fichier de configuration dédié, il sera inclus dans chaque site qui doit en bénéficier.

```bash
sudo nano /etc/nginx/snippets/nginx-caches.conf
```

```ini
location ~* \.(?:rss|atom)$ {
                expires 1h;
        }

        location ~* \.(?:jpe?g|gif|png|webp|avif|ico|svgz?|woff2?|ttf|otf)$ {
                expires 30d;
                access_log off;
        }

        location ~* \.(?:mp3|wav|mp4|ogg|ogv|webm)$ {
                expires 30d;
                access_log off;
        }

        location ~* \.css$ {
                expires 1d;
                access_log off;
        }

        location ~* \.js$ {
                expires 7d;
                access_log off;
        }

        location = /favicon.ico {
                expires 30d;
                access_log off;
                log_not_found off;
        }

        # interdit l'acces aux fichiers caches (.htaccess, .git...) sauf .well-known
        location ~ /\.(?!well-known) {
                deny all;
        }
```

On inclut ce fichier dans le bloc **server \{** de votre site :

```bash
sudo nano /etc/nginx/sites-available/votre_domaine.fr
```

Ajouter dans le bloc **server \{** :

```ini
# caches nginx
       include snippets/nginx-caches.conf;
```

Ne pas inclure ce fichier dans **nginx.conf** (bloc **http**) : les blocs **location** n'y sont pas valides.
Cette configuration suppose que les fichiers statiques sont servis directement par nginx (directive **root** du site). Si votre site est un reverse proxy (**proxy_pass**), ajoutez le **proxy_pass** dans chaque bloc.

Pour limiter les abus (rafales de requêtes depuis une même IP), on utilise **limit_req** et **limit_conn**. Ceci ne remplace pas un firewall ou un CDN face à une véritable attaque par déni de service.

Sauvegarde :

```bash
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.origine
```

```bash
sudo nano /etc/nginx/nginx.conf
```

Chercher **worker_processes** et remplacer par :

```ini
worker_processes  auto; # egal au nombre de coeurs du processeur
```

Ajouter après :

```ini
worker_rlimit_nofile 4096; # au moins 2 x worker_connections
```

Dans le block **events \{** :

Chercher :

```ini
worker_connections 768;
```

Remplacer par :

```ini
worker_connections 1024;
```

Dans le block **http \{** :

Chercher :

```ini
# Basic Settings
        ##
```

Ajouter après :

```ini
server_tokens off;

        client_header_timeout 10;
        client_body_timeout   10;
        keepalive_timeout     15;
        send_timeout          30;

        limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;
        limit_req_zone  $binary_remote_addr zone=req_limit_per_ip:10m rate=10r/s;
        limit_conn_status 429;
        limit_req_status  429;
```

Si **keepalive_timeout** (ou **server_tokens**) existe déjà dans le bloc **http**, le supprimer ou le commenter, sinon nginx refusera la configuration (**directive is duplicate**).

Ne pas modifier les tailles de buffers (client_max_body_size, client_header_buffer_size, large_client_header_buffers etc.) : les valeurs par défaut conviennent, les réduire provoque des erreurs 400, 413 ou 414. Pour autoriser des envois de fichiers plus gros, augmenter **client_max_body_size** dans le bloc **server** concerné.

On applique ensuite les limites dans le bloc **server \{** de votre site, uniquement sur les requêtes dynamiques (pas sur les fichiers statiques) :

```ini
limit_conn conn_limit_per_ip 20;

        location / {
                limit_req zone=req_limit_per_ip burst=20 nodelay;
                # ... votre configuration existante
        }
```

Si le site utilise PHP, ajouter la même ligne **limit_req** dans le bloc **location ~ \.php$ \{**.
Les requêtes refusées renvoient une erreur 429 et sont journalisées dans **error.log**.

Compression gzip : chercher le bloc **# Gzip Settings** et remplacer par :

```ini
gzip on;
        gzip_vary on;
        gzip_proxied any;
        gzip_comp_level 6;
        gzip_min_length 256;
        gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml application/rss+xml image/svg+xml;
```

Ne pas descendre **error_log** au niveau **crit** et ne pas désactiver **access_log** : fail2ban, logwatch et la détection des refus **limit_req** en dépendent. Pour réduire les écritures disque, on bufferise les logs :

Chercher :

```ini
access_log /var/log/nginx/access.log;
```

Remplacer par :

```ini
access_log /var/log/nginx/access.log combined buffer=32k flush=5s;
```

Vous pouvez également désactiver la variable **access_log** si vous souhaiter avoir de meilleur performance, ceci aura pour effet de ne plus sauvegarder les informations de vos visiteurs, soit vous supprimez la ligne, soit la mettre en commentaire :

Chercher **access_log /var/log/nginx/access.log;** et remplacer par :

```ini
#access_log /var/log/nginx/access.log;
```

Faite **CTRL** + **X** puis **O** pour sauvegarder la modification.

On vérifie la configuration puis on la recharge :

```bash
sudo nginx -t && sudo systemctl reload nginx
```

```ini
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

## Hotlinking

Je vous conseil fortement de mettre en place cette astuce si votre bande passante est limitée, ceci empêchera tout webmaster de prendre le lien de vos images.

Deux exemples, bien entendu, vous pouvez modifier cet exemple:

```text
   location ~ .(gif|png|jpe?g|tga|bmp)$ {
       valid_referers none blocked .votre_domaine.fr;
       if ($invalid_referer) {
           return 403;
       }
   }
```

Ici, le "voleur" aura une joli erreur 403.

Vous pouvez également effectuer une redirection avec le module rewrite.

Placer l'image de votre choix dans votre FTP puis insérer ce code dans votre vhost :

```text
   location ~ .(gif|png|jpe?g|tga|bmp)$ {
       valid_referers none blocked .votre_domaine.fr;
       if ($invalid_referer) {
           rewrite (.*)\.(jpg|jpeg|png|gif)$ https://votre_domaine.fr/chemin_de_votre_images/no-hotlink.jpg;
       }
   }
```

Ici, le "voleur" aura votre image qui s'affichera sur son site à la place de l'image.

## Protéger un répertoire

Nous allons générer le fichier .htpasswd avec le mot de passe pour protéger l'accès au site :

Veillez à remplacer **votre_utilisateur** par votre utilisateur !

```bash
printf 'votre_utilisateur:%s\n' "$(openssl passwd -apr1)" | sudo tee /usr/share/nginx/html/test/.htpasswd
```

Vous devrez saisir votre mot de passe (et le confirmer) :

```text
Password:
Verifying - Password:
```

Editer le vhost nginx et copier/coller :

```bash
sudo nano /etc/nginx/sites-available/votre_domaine.fr
```

```text
    location /test {
        index index.html index.htm index.php;
        auth_basic "Accès Restreint !";
        auth_basic_user_file /usr/share/nginx/html/test/.htpasswd;
        autoindex on; #Affiche l'index du dossier si aucun fichier, a retirer si vous voulez cacher vos fichiers
    }
```

On vérifie qu'aucune erreur n'a été faite et on redémarre Nginx :

```bash
sudo nginx -t &>/dev/null || sudo nginx -t && sudo systemctl restart nginx
```

Maintenant, dans votre navigateur, essayer d'entrer dans [votre dossier](http://votre_domaine.fr/test) :

![nginx htpasswd](/images-wiki/nginx_htpasswd.jpg)

et si vous n'indiquez pas le bon identifiant :

![nginx 401 htpasswd](/images-wiki/nginx_401_htpasswd.jpg)

## URL rewriting

Nous n'allons pas expliquer en détails mais vous montrez quelques exemples de réécriture d'URL.

Créer une page **test.html** avec un peu de contenu :

```html
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Test rewrite Nginx</title>
  </head>
  <body>
    Test du module rewrite
  </body>
</html>
```

Maintenant, éditons notre vhost :

```bash
sudo nano /etc/nginx/sites-enabled/default
```

Ajouter après **server \{** :

```text
 

```nginx
location /trouver { rewrite ^/trouver\.html$ /test.html break; }
```

```

Sauvegarder la modification puis redémarrer nginx.

Maintenant, dans votre navigateur, entrer [votre_domaine.fr/trouver.html](http://votre_domaine.fr/test.html)

Il devrait afficher **Test du module rewrite**. Si toutefois, cela ne fonctionnais pas, vider le cache du navigateur et actualiser la page.

## Installation de PHP

Nous mettons à jour la machine :

```bash
sudo apt update && sudo apt upgrade -y
```

Nous utiliserons les dépôts surry pour avoir php.

Copier/coller la commande dans Putty :

```bash
ObtenirCodeName=$(. /etc/os-release && echo "${VERSION_CODENAME}")
echo "deb [signed-by=/usr/share/keyrings/debsuryorg-archive-keyring.gpg] https://packages.sury.org/php/ $ObtenirCodeName main" | sudo tee /etc/apt/sources.list.d/php.list
```

Mise à jour des paquets :

```bash
sudo apt update
```

:::note[Note]

Si vous voulez une version différente de php ou juste la base, adaptez la ligne avant de l'exécuter !

:::

```bash
sudo apt install php8.4-{common,cli,fpm,gd,mysql,mbstring,bcmath,intl,xml,fpm,curl,zip} -y
```

Nous avons installé le minimum mais vous pouvez inclure les modules php que vous souhaitez, obtenir la liste des modules PHP :

```bash
apt list 'php*-*' 2>/dev/null | grep -E '^php[0-9.]+-[a-z0-9]'
```

## Configuration php8.4-fpm

Mettez à jour les valeurs ci-dessous dans le fichier **www.conf** si elle sont commentées :

```ini
listen = /run/php/php8.4-fpm.sock
listen.owner = www-data
listen.group = www-data
listen.mode = 0660
```

```bash
sudo nano /etc/php/8.4/fpm/pool.d/www.conf
```

On sauvegarde le fichier.

```bash
sudo cp /etc/nginx/sites-available/default{,.bak}
```

On édite le fichier :

```bash
sudo nano /etc/nginx/sites-available/default
```

Chercher :

```ini
#location ~ \.php$ {
	#	include snippets/fastcgi-php.conf;
	#
	#	# With php-fpm (or other unix sockets):
	#	fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
	#	# With php-cgi (or other tcp sockets):
	#	fastcgi_pass 127.0.0.1:9000;
	#}
```

Remplacer par :

```ini
location ~ \.php$ {
		fastcgi_buffer_size 32k;
        fastcgi_buffers 16 16k;
        fastcgi_connect_timeout 180;
        fastcgi_send_timeout 180;
        fastcgi_read_timeout 180;
        include snippets/fastcgi-php.conf;
		fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
	}
```

Sauvegarder puis on recharge nginx :

```bash
sudo systemctl reload nginx
```

Vérifions que PHP soit fonctionnel :

```bash
sudo nano /usr/share/nginx/html/info.php
```

Ajouter :

```ini
echo "<?php
 phpinfo();
?>" >> /usr/share/nginx/html/info.php
```

Faite **CTRL** + **X** puis **O** pour sauvegarder la modification.<br />

Dans votre navigateur, taper [http://votre_ip_ou_domaine.fr/info.php](http://votre_ip_ou_domaine.fr/info.php)

Veuillez vérifier que PHP8.4 apparaît bien sur la page !

## Configuration fcgiwrap

Vous devez avoir Nginx d'installé avant de commencer !

Installation et configuration de **fcgiwrap**.

```bash
sudo apt install fcgiwrap
```

```bash
cp /usr/share/doc/fcgiwrap/examples/nginx.conf /etc/nginx/fcgiwrap.conf
```

Sauvegarde :

```bash
cp /etc/php5/fpm/pool.d/www.conf{,.origine}
```

On édite le fichier **www.conf**:

```bash
sudo nano /etc/php5/fpm/pool.d/www.conf
```

Chercher :

```nginx
listen = /var/run/php5-fpm.sock
```

Remplacer par :

```nginx
listen = 127.0.0.1:9000
```

On édite notre virtualhost:

```bash
sudo nano /etc/nginx/sites-available/default
```

Chercher :

```nginx
#       fastcgi_pass 127.0.0.1:9000;
```

Remplacer par :

```nginx
       fastcgi_pass 127.0.0.1:9000;
```

Chercher :

```nginx
       fastcgi_pass unix:/var/run/php7.5-fpm.sock;
```

Remplacer par :

```nginx
#       fastcgi_pass unix:/var/run/php7.5-fpm.sock;
```

On copie le fichier de configuration dans le répertoire de Nginx :

```bash
sudo cp /usr/share/doc/fcgiwrap/examples/nginx.conf /etc/nginx/fcgiwrap.conf
```

Maintenant on vas déclarer la prise en compte des fichiers de type **.cgi**.

On édite notre virtualhost:

```bash
sudo nano /etc/nginx/sites-enabled/default
```

Avant **# deny access to .htaccess**, ajouter :

```nginx
        location /cgi-bin/ {
                # Disable gzip (it makes scripts feel slower since they have to complete
                # before getting gzipped)
                gzip off;<br />
                # Set the root to /usr/lib (inside this location this means that we are
                # giving access to the files under /usr/lib/cgi-bin)
                root        /usr/share/nginx/html;
                # Fastcgi socket
                fastcgi_pass        unix:/var/run/fcgiwrap.socket;
                # Fastcgi parameters, include the standard ones
                include /etc/nginx/fastcgi_params;
                # Adjust non standard parameters (SCRIPT_FILENAME)
                fastcgi_param SCRIPT_FILENAME        $document_root$fastcgi_script_name;
        }
```

Faite **CTRL** + **X** puis **O** pour sauvegarder la modification.

On vérifie que tout est ok:<br />

```bash
sudo nginx -t
```

```nginx
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Création du répertoire **cgi-bin**:<br />

```bash
sudomkdir -p /usr/share/nginx/html/cgi-bin
```

On créer un fichier test.cgi :<br />

```bash
sudonano /usr/share/nginx/html/cgi-bin/test.cgi
```

```ini
#!/usr/bin/perl -w
# Tell perl to send a html header.
# So your browser gets the output
# rather then <stdout>(command line
# on the server.)
print "Content-type: text/html\n\n";
# print your basic html tags.
# and the content of them.
print "<html><head><title>Hello World!! </title></head>\n";
print "<body><h1>Hello world</h1></body></html>\n";
```

Faite **CTRL** + **X** puis **O** pour sauvegarder la modification.<br />

```bash
sudo chmod 755 /usr/share/nginx/html/cgi-bin/test.cgi
```

On recharge et redémarre nginx ainsi que php-fpm:

```bash
sudo systemctl reload nginx
```

```bash
sudo systemctl restart php7.5-fpm
```

```bash
sudo systemctl restart nginx
```

## Installation du serveur MySQL

`apt install mysql-server php7.5-mysql`

Mettez un mot de passe puis confirmer celui-ci et la configuration sera terminée.

Définisser un mot de passe pour le compte administrateur **root** de MySQL.

![f4f mysql](/images-wiki/f4f_mysql.jpg)

![f4f mysql confirm](/images-wiki/f4f_mysql_confirm.jpg)

On installe les tables Mysql:

A exécuter en root :

`mysql_install_db`

Il faudra créer un utilisateur, n'oublier pas qu'on a choisis de ne pas utiliser la base de donnée de phpmyadmin (dbconfig-common) :

A exécuter en root :

`mysql -p`

après :

`use mysql;`

ensuite :

**NOTE**: Penser à modifier **votreutilisateur** avant de copier/coller...

`GRANT ALL PRIVILEGES ON *.* TO votreutilisateur@localhost IDENTIFIED BY 'votre_mot_de_passe' WITH GRANT OPTION;`

`flush privileges;`

`exit`

![Warning](/images-wiki/Warning.png) Concernant l'étape ci-dessous, nous vous recommandons de répondre **y** à ces questions :

```text
* Remove anonymous users,
* Remove test database and access to it
```

Après, ce n'est qu'une recommandations, vous faites comme bon vous semble. ;)

## Sécurisation du serveur MySQL

`/usr/bin/mysql_secure_installation`

```text
NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MySQL
      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!

In order to log into MySQL to secure it, we'll need the current
password for the root user.  If you've just installed MySQL, and
you haven't set the root password yet, the password will be blank,
so you should just press enter here.

Enter current password for root (enter for none):
OK, successfully used password, moving on...

Setting the root password ensures that nobody can log into the MySQL
root user without the proper authorisation.

You already have a root password set, so you can safely answer 'n'.

Change the root password? [Y/n] n
 ... skipping.

By default, a MySQL installation has an anonymous user, allowing anyone
to log into MySQL without having to have a user account created for
them.  This is intended only for testing, and to make the installation
go a bit smoother.  You should remove them before moving into a
production environment.

Remove anonymous users? [Y/n] y
 ... Success!

Normally, root should only be allowed to connect from 'localhost'.  This
ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? [Y/n] n
 ... skipping.

By default, MySQL comes with a database named 'test' that anyone can
access.  This is also intended only for testing, and should be removed
before moving into a production environment.

Remove test database and access to it? [Y/n] y
 - Dropping test database...
 ... Success!

Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.

Reload privilege tables now? [Y/n] y
 ... Success!

Cleaning up...

All done!  If you've completed all of the above steps, your MySQL
installation should now be secure.

Thanks for using MySQL!
```

## Installation du MariaDb

MariaDb est une copie amélioré et optimisé de MySQL donc préférez son installation.

Mise à jour de la machine :

```bash
sudo apt update && sudo apt upgrade -y
```

Installation :

```bash
sudo apt install mariadb-server mariadb-client -y
```

Le paquet **mariadb-client** sers uniquement à l'utilisation en ligne de commande.

Quelques commandes utiles pour gérer le service :

```bash
sudo systemctl status mariadb
```

Si le service est stoppé, démarrez-le manuellement :

```bash
sudo systemctl start mariadb
```

MariaDB se charge automatiquement au démarrage du système, vérifiez avec :

```bash
sudo systemctl is-enabled mariadb
```

Si le résultat ne retourne pas **enabled**, exécutez la commande ci-dessous :

```bash
sudo systemctl enable mariadb
```

## Configuration/Sécurisation MariaDb

Sécurisation :

```bash
sudo mariadb-secure-installation
```

Vous aurez toute une série de questions, voici les réponses que nous avons faites :

```bash
NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MariaDB
      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!
In order to log into MariaDB to secure it, we'll need the current
password for the root user.  If you've just installed MariaDB, and
you haven't set the root password yet, the password is blank,
so you should just press enter here.
Enter current password for root (enter for none): 
OK, successfully used password, moving on...
Setting the root password ensures that nobody can log into the MariaDB
root user without the proper authorisation.
You already have a root password set, so you can safely answer 'n'.
Change the root password? [Y/n] n
 ... skipping.
By default, a MariaDB installation has an anonymous user, allowing anyone
to log into MariaDB without having to have a user account created for
them.  This is intended only for testing, and to make the installation
go a bit smoother.  You should remove them before moving into a
production environment.
Remove anonymous users? [Y/n] y
 ... Success!
Normally, root should only be allowed to connect from 'localhost'.  This
ensures that someone cannot guess at the root password from the network.
Disallow root login remotely? [Y/n] y
 ... Success!
By default, MariaDB comes with a database named 'test' that anyone can
access.  This is also intended only for testing, and should be removed
before moving into a production environment.
Remove test database and access to it? [Y/n] y
 - Dropping test database...
 ... Success!
 - Removing privileges on test database...
 ... Success!
Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.
Reload privilege tables now? [Y/n] y
 ... Success!
Cleaning up...
All done!  If you've completed all of the above steps, your MariaDB
installation should now be secure.
Thanks for using MariaDB!
```

Configuration :
Autoriser l'accès distant :

```bash
sudonano /etc/mysql/mariadb.conf.d/50-server.cnf
```

Chercher **bind-address** et assurez que la valeur soit :

```bash
bind-address            = 0.0.0.0
```

Voici la configuration que nous utilisons sur ntre VPS :

```bash
# Allouer 256 Mo de la RAM
innodb_buffer_pool_size         = 256M
# Une instance par tranche de 1 Go (max 8)

# Si l'espace disque n'est pas un soucis, vous pouvez augmentez à 512/64
innodb_log_file_size            = 256M
innodb_log_buffer_size          = 32M

# Adaptez au nombre de cœurs (multiplié le nom de coeur X2 pour la valeur)
innodb_read_io_threads          = 4
innodb_write_io_threads         = 4
innodb_io_capacity              = 400

# Connexions
max_connections                 = 50
max_connect_errors              = 50000
connect_timeout                 = 10

# limites maximales par requête
tmp_table_size                  = 32M
max_heap_table_size             = 32M

# MyISAM
key_buffer_size                 = 26M

# Journaux d'erreurs et requêtes lentes
slow_query_log                  = 1
slow_query_log_file             = /var/log/mysql/slow.log
long_query_time                 = 3
log_slow_verbosity              = query_plan,explain
```

Création et attribution de la permission au fichier **/var/log/mysql/slow.log** :

```bash
sudosudo touch /var/log/mysql/slow.log
sudo chown mysql:mysql /var/log/mysql/slow.log
sudo chmod 660 /var/log/mysql/slow.log
```

## Installation de PhpMyAdmin

```bash
sudo apt install phpmyadmin -y
```

Lors de la question **Serveur web à reconfigurer automatiquement**, ne rien sélectionner et appuyez sur **Entrée**.<br />
A la question

:::note

Faut-il configurer la base de données de phpmyadmin avec │
│ dbconfig-common

:::

```text
, répondre '''Oui'''.
```

On créer un lien symbolique:

```bash
sudo ln -s /usr/share/phpmyadmin /usr/share/nginx/html
```

On redémarre Nginx :

`service nginx restart`

A ce stade tout est prêt, vous pouvez accéder a votre base de donnée via http://votre-site.com/phpmyadmin.

### Protéger l'accès à PhpMyAdmin

```bash
sudo nano /etc/nginx/sites-available/default
```

```ini
location /phpmyadmin {
    alias /usr/share/nginx/html/phpmyadmin/;
    allow VOTRE_IP;
    allow IP_ADMIN1;
    ## Pour afficher un message personnalise
    rewrite ^(.*)$ http://i.imgur.com/11LyTX1.png redirect;
    ## On interdit l'acces a tout le monde sauf a nous
    deny all;
    index index.php index.html index.htm;
  }
```

### Création d'une base de donnée

Accéder à PhpMyAdmin avec votre navigateur.

[http://votredomaine.net/phpmyadmin](http://votredomaine.net/phpmyadmin)

## F.A.Q

Q J'ai l'erreur **24: Too many open files**, que faire ?

R Vous devez augmenter la valeur **worker_rlimit_nofile** en conséquence.

Q Vous avez un problème lors de l'upload d'un fichier ?

R Si vous avez modifié **upload_max_filesize** et **post_max_size** dans php, il vous faudra augmenter la variable **client_max_body_size**;

Q J'ai l'erreur **Headers and client library minor version mismatch**, que faire ?

R Vous devez installer le paquet **php5-mysqlnd** [Source](https://www.dotdeb.org/2014/04/04/about-the-mysql_connect-headers-and-client-library-minor-version-mismatch-warning-2/).

Q Comment tester les performances de Nginx ?

R [Siege](http://www.joedog.org/siege-home), [Weighttp](http://redmine.lighttpd.net/projects/weighttp/wiki) et bien d'autres présent sur la toile.
