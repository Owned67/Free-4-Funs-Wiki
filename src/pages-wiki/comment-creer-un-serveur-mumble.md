---
title: "Comment créer un serveur Mumble"
---

![Mumble-icon](/images-wiki/Mumble-icon.png)

## Introduction

Nous allons vous montrer comment installer un serveur Mumble.

## Prérequis

- Le package pour linux n'est plus fourni par Mumble donc installation via le système de paquet de votre système d'exploitation.

- Système d’exploitation : Ubuntu, Debian

- [Accès root](/pages-wiki/comment-se-connecter-en-root) ou [sudo](/pages-wiki/sudo) sur la machine

- Pare-feu actif : iptables, nftables selon votre distribution

- Systemd : requis pour l’intégration des journaux systemd (journald) selon votre distribution

## Installation Standalone du Serveur

Nous ne feront pas de tutoriel concernant Dbus vu que celui-ci est amené à disparaitre au profit de Ice.

:::caution[Avertissement]

Parmi les distributions proposant des paquets officiels, on trouve Debian, Ubuntu, Fedora, openSUSE, Arch Linux et Mandriva/ROSA/Unity.

:::

Si la commande ne renvoie rien, le paquet n'existe pas dans vos dépôts : il faudra en ajouter un qui le fournit.

Avec l'utilisateur **serveur**:

Si vous êtes sous Debian BullEyes, éditez le fichier **source.list** :

```bash
sudo nano /etc/apt/sources.list
```

chercher `deb http://security.debian.org/debian-security bullseye-security main` et remplacer par `deb [check-valid-until=no] http://snapshot.debian.org/archive/debian-security/20260903T220410Z bullseye-security main`.

Sauvegardez et fermez puis mettez à jour :

```bash
su - serveur
```

```bash
sudo apt update && sudo apt install mumble-server
```

On vérifie que le port 64738 est bien ouvert :

```bash
sudo netstat -laptn | grep -E '64738'
```

Si rien ne vous ai envoyé alors vous devrez ouvrir les port  **64738** en TCP dans votre pare feu et/ou routeur.

Ouverture des ports :

```bash
sudo iptables -t filter -A INPUT -p tcp --dport 64738 -j ACCEPT
sudo iptables -t filter -A OUTPUT -p tcp --dport 64738 -j ACCEPT
```

Puis faite un **sudo iptables -L -v** :

```ini
Chain INPUT (policy ACCEPT 4 packets, 264 bytes)
  pkts bytes target     prot opt in     out     source               destination  
     0     0 ACCEPT     tcp  --  any    any     anywhere             anywhere             tcp dpt:64738

Chain FORWARD (policy ACCEPT 0 packets, 0 bytes)
  pkts bytes target     prot opt in     out     source               destination

Chain OUTPUT (policy ACCEPT 3 packets, 292 bytes)
 pkts bytes target     prot opt in     out     source               destination
    0     0 ACCEPT     tcp  --  any    any     anywhere             anywhere             tcp dpt:64738
```

:::note

Si vous changez la valeur des ports dans le fichier **murmur.ini**, pensez à adapter la commande ci-dessus.

:::

## Configuration du serveur

Pour configurer votre serveur, vous devrez éditer le fichier **murmur.ini** avec votre éditeur de texte préféré.

```bash
sudo nano /etc/mumble-server.ini
```

Les lignes a modifier sont celle-ci :

```text
#French
# Combien de tentatives de connexion sera tolérer pour une IP dans un temps donné avant le ban ?
# Ceci compte les connexions réussi ou échoué donc méfiance lors du paramétrage.
# 0 pour désactiver.
<font color="#FF0000">'''#'''</font>autobanAttempts = 10
<font color="#FF0000">'''#'''</font>autobanTimeframe = 120
<font color="#FF0000">'''#'''</font>autobanTime = 300
```

Enlever le **#** mis en rouge pour activer la gestion des bannissements.

```text
<font color="FF0000">'''#'''</font>logfile=murmur.log
```

Ceci vous permet d'enregistrer tout ce qu'il ce passe sur votre serveur et les éventuelles erreurs rencontrées dans le fichier **murmur.log** à la racine de l'installation. Il peut être éditer avec le bloc note, wordpad ou un autre logiciel de texte...

```text
welcometext="Welcome to this server running Murmur.Enjoy your stay!"
```

C'est le message de bienvenue affiché sur votre serveur lorsqu'un joueur ou amis s'y connecte. Vous pouvez le modifier comme vous le souhaitez.
Vous pouvez y inclure un logo en utilisant le langage HTML.

```text
welcometext="<a href='http://motdgd.com/motd/?user=47' title='Bienvenue sur notre serveur Mumble'><img src='http://votre_domaine.fr/chemin_de_votre_image.jpg'></a>"
```

Cependant pour que la modification fonctionne, n'incluez pas '** />** et mettez les liens entre des simples quotes et non des " à la fin de la balise, respecter bien le modèle ci-dessus.

```text
port=64738
```

Pensez à ouvrir le port dans votre pare feu et/ou routeur pour que vos amis puissent s'y connecter.

Enlever le **#** mis en rouge pour activer la fonction host

```text
<font color="#FF0000">'''#'''</font>host=
```

Ceci vous permet d'attribuer une IP à votre serveur, en effet, nous avons pu constater que selon les routeurs, la connexion peut être refusé avec l'IP **192.168.X.X** donc modifiez uniquement votre IP par **127.0.0.1**.

Exemple :

```text
host=127.0.0.1
```

```text
serverpassword=
```

Ceci est le mot de passe du serveur, par défaut il n'y en a pas.

```text
bandwidth=5000
```

C'est la bande passante par client. **ATTENTION à votre upload, si il est trop petit, vous rencontrerez des problèmes de lags...**

```text
users=100
```

Ceci vous permet de régler le nombre d'utilisateur maximum pouvant rejoindre votre serveur. 100 est la valeur par défaut.

Enlever le **#** mis en rouge pour activer la fonction #

1. Autorise les caractères spéciaux dans les titres

1. Pour ajouter d'autres caractères, suivez l'exemple fait (ajout de . et :)

1. Ex: channelname=[ \\-=\\w\\#\\[\\]\\\{\\\}\\(\\)\\@\\|\\.\\:]+

```text
 #channelname=[ \\-=\\w\\#\\[\\]\\{\\}\\(\\)\\@\\|]+
```

Enlever le **#** mis en rouge pour activer la fonction username

1. Autorise les caractères spéciaux dans les pseudos

1. Pour ajouter d'autres caractères, suivez l'exemple fait (ajout de . et :)

```text
 #username=[-=\\w\\[\\]\\{\\}\\(\\)\\@\\|\\.]+
```

Enlever le **#** mis en rouge pour activer la fonction logdays.

```text
<font color="#FF0000">'''#'''</font>logdays=31
```

Ceci vous permet de définir la durée que les logs soient sauvegardés.

## Ajouter le SuperUser

```bash
sudo /usr/sbin/murmurd -supw tutocss
```

Vous devriez avoir une confirmation :

```text
<X>2026-09-19 20:04:18.185 SSL: OpenSSL version is 'OpenSSL 1.1.1w  11 Sep 2023'
<W>2026-09-19 20:04:18.185 Initializing settings from /etc/mumble-server.ini (basepath /etc)
<W>2026-09-19 20:04:18.468 MetaParams: TLS cipher preference is

"TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:AES256-SHA:AES128-SHA"
<C>2026-09-19 20:04:18.469 Successfully switched to uid 125
<W>2026-09-19 20:04:18.506 ServerDB: Opened SQLite database /var/lib/mumble-server/mumble-server.sqlite
<W>2026-09-19 20:04:18.506 ServerDB: Using SQLite's default rollback journal.
<X>2026-09-19 20:04:18.528 Superuser password set on server 1
```

**Note** : **tutocss** correspond au mot de passe donc pensez à le modifier par mesure de sécurité !

## Installation du Serveur et Configuration de Ice

## Prérequis

- Système d’exploitation : Ubuntu, Debian

- [Accès root](/pages-wiki/comment-se-connecter-en-root) ou [sudo](/pages-wiki/sudo) sur la machine

- Pare-feu actif : iptables, nftables selon votre distribution

- Systemd : requis pour l’intégration des journaux systemd (journald) selon votre distribution

- Le paquet : lzma

- php 7.4

## Installation de Ice

Avec l'utilisateur **serveur**:

Nous mettons à jour la machine et installons les dépendances requises :

```bash
sudo apt install lzma php7.4 zeroc-ice-compilers php-zeroc-ice speex libspeex1 -y
```

On édite le fichier de configuration du Mumble :

Avec l'utilisateur **serveur**:

Avant, on en fait une sauvegarde :

```bash
su - serveur
cp -R sudo nano /etc/mumble-server.ini sudo nano /etc/mumble-server.ini.save
sudo nano sudo nano /etc/mumble-server.ini
```

Commenter la ligne **dbus=session** et enlever le symbole **#** de la ligne **ice="tcp -h 127.0.0.1 -p 6502"**.

Modifiez ce que vous souhaitez et sauvegarder le fichier en faisant CTRL + X puis O lorsque vous aurez terminé.

On vérifie que le port 6502 est bien ouvert en local :

```bash
sudo netstat -laptn | grep -E '6502'
```

Si rien ne vous ai envoyé alors vous devrez ouvrir le port  **6502** en TCP dans votre pare feu et/ou routeur.

Ouverture du port uniquement pour local :

```bash
sudo iptables -I INPUT -p tcp --dport 6502 ! -i lo -j DROP
```

:::note

Si vous changez la valeur du port dans le fichier **murmur.ini**, pensez à adapter la commande ci-dessus.

:::

Pour finaliser, redémarrer le serveur :

```bash
sudo systemctl restart mumble-server.service
```

Vérification qu'il est démarré sans erreur :

```bash
sudo systemctl status mumble-server.service
```

## Obtenir un certificat SSL

Nous allons vous expliquer comment générer et attribuer un certificat SSL à votre serveur Mumble afin d'éviter à vos utilisateurs d'avoir un avertissement lors de la connexion au serveur.
![Mumble certnonsigne](/images-wiki/Mumble_certnonsigne.png)

Pour obtenir un certificat SSL reconnu automatiquement par les clients Mumble, vous devez disposer d'un nom de domaine ou d'un sous-domaine.

Un certificat auto-signé, même s'il contient l'adresse IP du serveur, ne sera pas reconnu comme certificat de confiance par défaut et provoquera donc toujours un avertissement lors de la première connexion.

Nous utiliserons donc un nom de domaine ou un sous-domaine, par exemple :

```text
mumble.votre_domaine.fr
```

Le certificat devra correspondre à ce nom et le serveur Mumble devra être configuré pour l'utiliser.

Génération du certificat Let's Encrypt pour Mumble utilisant nginx.

Avant d'exécuter la commande, remplacez les valeurs correspondant à votre domaine et à votre adresse e-mail :

```bash
sudo certbot certonly --nginx --agree-tos --no-eff-email --email votre_nom@votre_mail.eu -d mumble.votre_domaine.fr
```

:::caution[Avertissement]

les certificats Let's Encrypt ont une durée de validité limitée. Après chaque renouvellement, les fichiers copiés dans /etc/mumble-server/ssl/ doivent être mis à jour.

:::

Le certificat généré par Certbot est stocké dans **/etc/letsencrypt/** et les fichiers privés sont protégés afin qu'ils soient accessibles uniquement aux utilisateurs autorisés. Or, le serveur Mumble s'exécute avec l'utilisateur **mumble-server**.

Pour éviter de modifier les permissions du répertoire **/etc/letsencrypt/**, nous allons copier le certificat et sa clé privée dans un répertoire dédié à Mumble :

```bash
sudo mkdir -p /etc/mumble-server/ssl
sudo cp -L /etc/letsencrypt/live/mumble.votre_domaine.fr/fullchain.pem /etc/mumble-server/ssl/mumble.crt
sudo cp -L /etc/letsencrypt/live/mumble.votre_domaine.fr/privkey.pem /etc/mumble-server/ssl/mumble.key
sudo chown root:mumble-server /etc/mumble-server/ssl/mumble.crt /etc/mumble-server/ssl/mumble.key
sudo chmod 640 /etc/mumble-server/ssl/mumble.crt /etc/mumble-server/ssl/mumble.key
```

```bash
sudo nano /etc/mumble-server.ini
```

Chercher :

```ini
;sslCert=
;sslKey=
```

Remplacer par :

```ini
sslCert=/etc/mumble-server/ssl/mumble.crt
sslKey=/etc/mumble-server/ssl/mumble.key
```

Redémarrez le serveur :

```bash
sudo systemctl restart mumble-server.service
```

Voilà le résultat :
![Mumble SSL](/images-wiki/Mumble_SSL.png)

## Utiliser une base de donnée MySQL

### Prérequis

- Un serveur Mumble configuré avec ice

- Avoir un serveur Mumble avec Ice

- Serveur web avec nom de domaine + SSL

## Installation du panel MumPi

## Prérequis

- Un serveur Mumble configuré avec ice

- php7.4-fpm (php8.x est incompatible, vous obtiendrez une page blanche)

## Installation / Configuration

Installation de php7.4-fpm :

```bash
sudo apt install php7.4-fpm
```

Modification de la configuration de php7.4-fpm,

```bash
sudo nano /etc/php/7.4/fpm/pool.d/www.conf
```

cherchez **listen = **, remplacer par **listen = 127.0.0.1:9075**.

Téléchargement du panel :

```bash
wget https://github.com/Kissaki/MumPI/archive/master.zip -O MumPi.zip
```

Décompression, renommage et on se place dans le dossier :

```bash
unzip MumPi.zip && mv MumPI-master MumPI && cd MumPI
```

Création du dossier **tmp**, correction des permissions pour nginx :

```bash
sudo mkdir tmp && sudo chown -R www-data:www-data /home/votre_utilisateur/MumPI && sudo chmod 755 /home/votre_utilisateur/MumPI/{tmp,data}
```

On renomme le fichier de configuration :

```bash
cp settings.inc.default.php settings.inc.php
```

Avant de procéder à l'édition du fichier **settings.inc.php**, nous allons générer un mot de passe secret qui devra être défini dans ce fichier et dans **icesecretwrite=** du fichier **/etc/mumble-server.ini**.

```bash
openssl rand -hex 32
```

Dans **settings.inc.php**, chercher ''''secret' => ''''' et coller le mot de passe généré précédemment.
Sauvegarder le fichier en faisant CTRL + X puis O lorsque vous aurez terminé.

Création du vhost pour nginx :

:::caution[Avertissement]

Pensez à modifier les valeurs avant de copier/coller le vhost !

:::

```ini
server {
    listen 80;
    server_name votre_domaine.fr;
    return  301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    http2 on;
    server_name votre_domaine.fr;

    root /home/votre_utilisateur/MumPi/;
    error_log /var/log/nginx/mumble-error.log;
    access_log /var/log/nginx/mumble-access.log;

    client_max_body_size 5m;
    client_body_timeout 120s;

    location / {
        try_files $uri $uri/ =404;
        index index.php;
    }

    ssl_trusted_certificate /etc/letsencrypt/live/votre_domaine.fr/chain.pem;
    ssl_certificate /etc/letsencrypt/live/votre_domaine.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votre_domaine.fr/privkey.pem;
    ssl_session_cache shared:SSL:10m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:TLS_AES_128_CCM_8_SHA256:TLS_AES_128_CCM_SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
    ssl_prefer_server_ciphers on;

    add_header Strict-Transport-Security "max-age=31536000; always;";
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Robots-Tag none;
    add_header Content-Security-Policy "frame-ancestors 'self'";
    add_header X-Frame-Options DENY;
    add_header Referrer-Policy same-origin;

    location ~ \.php$ {
        try_files $uri = 404;
        fastcgi_pass 127.0.0.1:9075;
        fastcgi_index  index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_ignore_client_abort on;
        fastcgi_param SERVER_NAME $http_host;

    }
    # Securisation des fichiers/dossiers sensible
    location ~ (~|\.bak|\.old|\.orig)$ {
        deny all;
    }

    location ^~ /data/ {
        deny all;
    }

    location ~ /\.env {
        deny all;
    }
    location ~ /\.ht {
        deny all;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        try_files $uri /index.php;
        expires max;
        log_not_found off;
    }

    location = /_.gif {
       expires max;
        empty_gif;
    }
}
```

Ouvrez votre navigateur puis accéder à [https://votre_domaine.fr](https://votre%20domaine.fr), cliquez sur **Admin**, cela procédera à l'installation...

```ini
settings.inc.php seems to be in place. Skipping…

admins.dat created.
creating admin groups file…
creating admin group permissions file…
creating admin group assoc file…
creating admin group server assoc file…
You’re done.
You may now want to further configure your server(s) and the interface in the admin section,
or go straight to the user section.
```

Maintenant, cliquez sur le lien [admin section](https://votre%20domaine.fr/admin/?page=login) et créer le compte **Admin**.
![MumPI admin](/images-wiki/MumPI_admin.png)

Pour finaliser supprimer le dossier **install** après avoir terminé le tutoriel avec succès !

```bash
sudo rm -rf /home/votre_utilisateur/MumPI/install
```

Redémarrer Mumble, Nginx et php7.4-fpm :

```bash
sudo systemctl reload nginx && sudo systemctl restart php7.4-fpm && sudo systemctl restart mumble-server
```

## F.A.Q

**Q** Si vous obtenez l'erreur que le module php Ice n'est pas installé.

**R** Veuillez reprendre l'étape d'installation du serveur avec Ice.

**Q** : J'obtiens le message suivant avec le SuperUSer :

```text
 Refusé : SuperUser not allowed to Mute/Deafen in Root
```

**R** : Ceci est normal que le SuperUSer sert uniquement à configurer votre serveur.

**Q** J'ai une page blanche lors de l'accès à MumPI ?

**R** On vous à dit au début du tutoriel que php8.x n'était pas compatible...

--[Let&#39;s Go](/pages-wiki/utilisateurlet-and#39s-go) ([discussion](/pages-wiki/discussion-utilisateurlet-and#39s-go)) 24 Septembbre 2026 à 10:30 (CET)
