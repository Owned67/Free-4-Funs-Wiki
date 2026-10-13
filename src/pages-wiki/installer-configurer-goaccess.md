---
title: "Installer Configurer GoAccess"
---

## Introduction

:::caution[Avertissement]

Free 4 Funs ne pourra être tenue responsable d’une instabilité du système résultant d’une mauvaise installation.

:::

:::note

Sauvegardez chaque fichier avant toute modification !
Comme dans tous nos tutoriels, on utilise **votre_domaine.fr** pour le nom de domaine et **votre_utilisateur** ou **serveur** pour l'utilisateur, remplacez-les bien par les vôtres à chaque copier/coller.

:::

Ce tutoriel a été réalisé afin de vous montrer comment analyser vos logs Nginx depuis le navigateur.

## Prérequis

- Système d’exploitation : Ubuntu, Debian

- [Accès root](/pages-wiki/comment-se-connecter-en-root) ou [sudo](/pages-wiki/sudo) sur la machine

- Nom de domaine avec un certificat LetsEncrypt

- Pare-feu actif : iptables, nftables selon votre distribution

- Systemd : requis pour l’intégration des journaux systemd (journald) selon votre distribution

- [Serveur Web Nginx](/pages-wiki/comment-crc3a9er-un-serveur-web-nginx)

- ncurses, gcc, autoconf, gettext, autopoint, base-devel, build-essential

## Installation GoAccess

Cela est repris du [site officiel](https://goaccess.io/download), ce n'est qu'une explication en Français.

```bash
su - serveur && && wget https://tar.goaccess.io/goaccess-1.12.tar.gz
tar -xzvf goaccess-1.12.tar.gz |tar -xzvf -
cd goaccess-1.12/
./configure --enable-utf8 --enable-geoip=mmdb --with-zlib
sudo make
sudo make install
```

Nous devons configurer Nginx pour que GoAccess puisse obtenir les logs :

```bash
sudo nano /etc/nginx/nginx.conf
```

remplacer tout le bloc **log_format** par :

```nginx
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for" '
                      '"$host" sn="$server_name" '
                      'rt=$request_time '
                      'ua="$upstream_addr" us="$upstream_status" '
                      'ut="$upstream_response_time" ul="$upstream_response_length" '
                      'cs=$upstream_cache_status' ;
```

et assurez-vous que **access_log** corresponde à ceci :

```nginx
access_log /var/log/nginx/access.log main;
```

ce qui permettra d'obtenir les logs d'accès, les visiteurs, les hôte virtuel (virtualhost)

## Configuration GoAccess

Sauvegarde par sécurité :

```bash
sudo cp /usr/local/etc/goaccess/goaccess.conf{,.bak}
```

Edition du fichier **/usr/local/etc/goaccess/goaccess.conf**

```bash
sudo nano /usr/local/etc/goaccess/goaccess.conf
```

Rechercher **tz** et remplacer **Berlin** par **Paris**.

et tout à la fin, ajouter :

```ini
time-format %H:%M:%S
date-format %d/%b/%Y:%H:%M:%S %z
log-format %h %^ [%d:%t] "%r" %s %b "%R" "%u" "%^" "%v" sn="%^" rt=%T ua="%^" us="%^" ut="%^" ul="%^" cs=%^
```

## Persistance des données (On-Disk Storage)
Pour éviter de perdre vos statistiques à chaque redémarrage de GoAccess ou du serveur, nous allons activer la persistance sur disque. GoAccess utilise une base de données interne intégrée à la mémoire pour sauvegarder l'état.

Éditez à nouveau le fichier de configuration :

```bash
sudo nano /usr/local/etc/goaccess/goaccess.conf
```

Décommentez ces lignes tout à la fin :

```ini
#db-path /tmp
```

, 

```ini
#persist true
```

 et 

```ini
#restore true
```

Vous devriez avoir :

```ini
db-path /var/lib/goaccess
```

, 

```ini
persist true
```

 et 

```ini
restore true
```

Sauvegarder et fermer le fichier.

:::caution[Avertissement]

Pourquoi nous n'utilisons pas le dossier /tmp ?
Il est automatiquement vidé par le système à chaque redémarrage de la machine ou par des scripts de nettoyage automatique (comme systemd-tmpfiles sous Debian par exemple).

:::

Création du dossier et attribution des permissions :

```bash
sudo mkdir -p /var/lib/goaccess && sudo chmod 755 /var/lib/goaccess
```

**persist true** ||Fichier:icon11.gif]] Dit à GoAccess de sauvegarder les données sur le disque lors de sa fermeture.
**restore true** ||Fichier:icon11.gif]] Dit à GoAccess de recharger les données existantes au démarrage, permettant de simplement compléter les statistiques avec les nouvelles lignes de logs sans tout recalculer depuis le début.

## Ajouter GoAccess en tant que service

Ajouter GoAccess en tant que service systemd, veuillez remplacer **votre_domaine.fr** par le votre :

```bash
sudo nano /etc/systemd/system/goaccess.service
```

```ini
# /etc/systemd/system/goaccess.service

[Unit]
Description=GoAccess real-time web log analysis
After=network.target

[Service]
Type=simple

ExecStart=/usr/local/bin/goaccess -f /var/log/nginx/access.log \
          --real-time-html --ws-url=wss://votre_domaine.fr:443/ws \
          -o /var/www/goaccess/reportaccess.html --port=7890 \
          --config-file=/usr/local/etc/goaccess/goaccess.conf \
          --origin=https://log.rusty-familly.eu

ExecStop=/bin/kill -9 ${MAINPID}
WorkingDirectory=/tmp

NoNewPrivileges=true
PrivateTmp=true
ProtectHome=read-only
ProtectSystem=strict
SystemCallFilter=~@clock @cpu-emulation @debug @keyring @memlock @module \
                  @mount @obsolete @privileged @reboot @resources @setuid \
                  @swap @raw-io

ReadOnlyPaths=/
ReadWritePaths=/proc/self
ReadWritePaths=/var/www/goaccess

PrivateDevices=yes
ProtectKernelModules=yes
ProtectKernelTunables=yes

[Install]
WantedBy=multi-user.target
```

1. Recharger :

```bash
sudo systemctl daemon-reload
```

2. Activer le service :

```bash
sudo systemctl enable goaccess.service
```

3. Démarrer le service :

```bash
sudo systemctl start goaccess.service
```

4. Vérifier le statut

```bash
sudo systemctl status goaccess.service
```

## Configuration du Pare-feu (iptables)

Vu que nous allons utiliser nginx en tant que proxy, nous pouvons fermer le port de GoAccess (7890 par défaut).

1. Autoriser d'abord Nginx à communiquer avec GoAccess en local (localhost) :

```bash
sudo iptables -A INPUT -p tcp -s 127.0.0.1 --dport 7890 -j ACCEPT
```

2. Bloquer l'accès au port 7890 pour tout le monde (internet) :

```bash
sudo iptables -A INPUT -p tcp --dport 7890 -j DROP
```

Rendre la règle persistante, les règles iptables sont effacées à chaque redémarrage si elles ne sont pas sauvegardées.

Installez le paquet de persistance si ce n'est pas déjà fait :

```bash
sudo apt install iptables-persistent -y
```

puis sauvegardez :

```bash
sudo netfilter-persistent save
```

## Sécurisation avec un Proxy Nginx

Avant de créer l'hôte virtuel (virtualhost), vous devrez créer un sous domaine chez votre prestataire qui devra être configuré avec un enregistrement de type A (qui pointe directement vers l'adresse IP de votre VPS).

Pensez à adapter les lignes avant de copier/coller, notamment pour **log.votre_domaine.fr**.

Nous créons un hôte virtuel (virtualhost) :

```nginx
upstream gwsocket {
    server 127.0.0.1:7890;
}

# Redirection HTTP vers HTTPS
server {
    listen 80;
    server_name log.votre_domaine.fr;
    return 301 https://log.votre_domaine.fr$request_uri;
}

# Serveur HTTPS sécurisé
server {
    listen 443 ssl;
    http2 on;

    server_name log.votre_domaine.fr;
    root /var/www/goaccess;

    # Certificats SSL/TLS
    ssl_certificate     /etc/letsencrypt/live/log.votre_domaine.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/log.votre_domaine.fr/privkey.pem;
    
    # Paramètres de sécurité SSL
    ssl_session_cache         shared:SSL:10m;
    ssl_protocols             TLSv1.2 TLSv1.3;
    ssl_ciphers               "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384";
    ssl_prefer_server_ciphers on;

    # Restrictions d'accès par adresses IP
    # L'adresse IP ajouté ci-dessous doit être fixe
    allow VOTRE_IP;
    allow AUTRE_IP;
    deny all;

    # Journaux de logs Nginx dédiés à GoAccess
    access_log /var/log/nginx/goaccess-access.log;
    error_log  /var/log/nginx/goaccess-error.log warn;

    # Racine du site et chargement du rapport HTML
    location / {
        try_files $uri /reportaccess.html =404;
    }

    # Reverse Proxy pour le flux de mise à jour en temps réel (WebSocket)
    location /ws {
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection $connection_upgrade;
        proxy_pass         http://gwsocket;
        proxy_buffering    off;
        proxy_read_timeout 7d;
    }
}
```

Nous allons éditer /etc/nginx/nginx.conf pour que

```bash
sudo nano /etc/nginx/nginx.conf
```

Dans le bloc **http \{**, ajouter après **access_log** :

```nginx
map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
    }
```

Redémarrer le service nginx :

```bash
sudo systemctl restart nginx
```

Vérifier que tout soit correct :

```bash
sudo systemctl status nginx
```

## Lancement de GoAccess

Création du dossier dans **/var/www/** :

```bash
sudo mkdir /var/www/goaccess && cd /var/www/goaccess
```

Pour que GoAccess génère le rapport HTML interactif et mette à jour les statistiques en temps réel de manière sécurisée à travers notre reverse proxy Nginx, exécutez la commande suivante :

```bash
sudo goaccess /var/log/nginx/access.log -o /var/www/goaccess/reportaccess.html --real-time-html --ws-url=wss://log.votre_domaine.fr:443/ws
```

Tout est prêt !
Vous pouvez maintenant ouvrir votre navigateur et vous rendre sur votre sous-domaine **https://log.votre_domaine.fr**

Vous y trouverez votre tableau de bord GoAccess interactif, mis à jour en temps réel et entièrement sécurisé.

## Bonus : Script de mise à jour automatique

[[Comment_configurer_Exim4_en_SmartHost|Avoir un serveur mail]

Pour finir en beauté, voici un script Bash complet à exécuter en tant que root (via une tâche Cron).
Il va vérifier automatiquement si une nouvelle version de GoAccess est disponible sur GitHub, la télécharger, la compiler avec le support GeoIP, couper proprement le service le temps de l'installation, puis le relancer.

Créez le fichier  :

```bash
sudo nano /usr/local/sbin/update-goaccess.sh
```

Collez-y le script suivant (pensez à adapter la variable **MAIL_TO** avec votre nom d'utilisateur ou votre e-mail pour recevoir les alertes en cas d'échec).

Rendez le script exécutable :

```bash
sudo chmod +x /usr/local/sbin/update-goaccess.sh
```

Pour automatiser la vérification (par exemple, tous les lundis à 3h00 du matin), ouvrez la crontab de root :

```bash
sudo crontab -e
```

Ajoutez la ligne suivante tout à la fin du fichier :

```ini
0 3 * * 1 /usr/local/sbin/update-goaccess.sh > /dev/null
```

Si vous exécutez le script sous un utilisateur classique (autre que root), vous devez autoriser cet utilisateur à installer GoAccess et à gérer le service sans demande de mot de passe.

Ouvrez le fichier de configuration sudo :

```bash
sudo visudo
```

Ajoutez la ligne suivante tout à la fin (remplacez tanki par votre nom d'utilisateur) :

```ini
votre_utilisateur ALL=(ALL) NOPASSWD: /usr/bin/make install, /usr/bin/systemctl *
```
