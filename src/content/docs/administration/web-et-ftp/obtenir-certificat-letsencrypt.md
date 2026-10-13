---
title: "Obtenir Certificat LetsEncrypt"
---

## Introduction

:::caution[Avertissement]

Free 4 Funs ne pourra être tenue responsable d’une instabilité du système résultant d’une mauvaise installation.

:::

:::note

Pensez à faire une sauvegarde de chaque fichier AVANT d'effectuer toutes modification !
Ce tutoriel à pour but de vous informer de comment créer un certificat SSL, il ne détail pas la totalité des options possibles avec Certbot

:::

Ce tutoriel a été réalisé afin de vous montrer comment obtenir un certificat Let's Encrypt.

## Prérequis

- Système d’exploitation : Ubuntu, Debian,

- [Accès root](/administration/systeme/comment-se-connecter-en-root/) ou [sudo](/administration/systeme/sudo/) sur la machine,

- Pare-feu actif (iptables, nftables selon votre distribution) pour les 80 et 443,

- Systemd : requis pour l’intégration des journaux systemd (journald) selon votre distribution,

- Avoir un nom de domaine pointant vers l’adresse IP publique de votre serveur (résolution DNS active et propagée),

- python3 python3-dev python3-venv libaugeas-dev gcc

## Introduction

Let's Encrypt vous permet d'obtenir un certificat SSL pour votre domaine.
Cependant, sachez qu'à l'époque où cela a été déployé, les certificats étaient payants et coûtaient assez cher.
Quand on visitait un site sécurisé, on savait qu'on pouvait avoir confiance...
Avec les années, les certificats sont devenus gratuits.
Le revers de la médaille, c'est que cela ne garantit plus du tout que le site est honnête ou sans danger. Les technologies ont évolué, les pirates aussi : restez donc très prudents lors de vos visites.

## Préparation de l'environnement Certbot

Avant de commencer, nous mettons à jour la machine :

```bash
sudo apt update && sudo apt upgrade -y
```

On installe les dépendances :

```bash
sudo apt install python3 python3-dev python3-venv libaugeas-dev gcc -y
```

- Le paquet **libaugeas-dev** est uniquement nécessaire pour Apache2. Pour Nginx, il ne vous sera d'aucune utilité mais rien ne vous empêche de l'installer.

## Installation de Certbot via Python Venv

Créer l'environnement virtuel de python :

```bash
sudo python3 -m venv /opt/certbot/
```

On met à jour pip à l'intérieur du virtualenv :

```bash
sudo /opt/certbot/bin/pip install --upgrade pip
```

On install certbot avec les plugins Nginx ou Apache :
Pour Nginx :

```bash
sudo /opt/certbot/bin/pip install certbot certbot-nginx
```

Pour Apache :

```bash
sudo /opt/certbot/bin/pip install certbot certbot-apache
```

On créer le lien symbolique :

```bash
sudo ln -s /opt/certbot/bin/certbot /usr/local/bin/certbot
```

On vérifie la version :

```bash
certbot --version
```

```bash
certbot 5.8.0
```

## Génération d'un certificat SSL

Avec Nginx et configuration automatisée.
La commande suivante permet d'obtenir le certificat et modifie automatiquement la configuration de Nginx pour activer :

- HTTPS,

- la redirection HTTP vers HTTPS et les paramètres SSL recommandés.

```bash
sudo certbot --nginx --agree-tos --email votre_utilisateur@votre_domaine.fr -d votre_domaine.fr -d www.votre_domaine.fr
```

L'ajout du paramètre **--agree-tos** vous permet de ne pas avoir les conditions d’utilisation mais exige l'ajout du paramètre **--email votre_utilisateur@votre_domaine.fr **.
L'ajout du paramètre **--email** vous permet de configurer l'adresse mail qui à l'époque permettais d'obtenir la notification avant l'expiration du certificat. Dans ce contexte, c'est une obligation demandé par certbot. Pour gérer vos certificat via un site internet, vous avez [RedSift](https://iam.redsift.cloud)

Il modifiera le bloc server Nginx correspondant et rechargera la configuration automatiquement.

Si vous êtes comme moi et que vous n'aimez pas trop les modifications automatisées qui peuvent parfois faire défaut.
Veuillez exécuter la commande ci-dessous :

```bash
sudo certbot certonly --nginx --agree-tos --email votre_utilisateur@votre_domaine.fr -d votre_domaine.fr -d www.votre_domaine.fr
```

Pour Apache, modifier simplement **--nginx** par **--apache** dans la commande.

Certbot modifie le VirtualHost Apache pour y ajouter les directives SSL, active le module **mod_ssl**, et configure la redirection HTTP vers HTTPS.

Maintenant, il faut ajouter les certificats dans l'hôte virtuel (virtualhost) :

```bash
sudo /etc/nginx/sites-available/votre_domaine.fr
```

Copier/coller ceci dans le bloc **server** ou il contient **listen 443** :

```nginx
    ssl_certificate     /etc/letsencrypt/live/votre_domaine.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votre_domaine.fr/privkey.pem;
```

Redémarrez nginx après le changement.

```bash
sudo systemctl restart nginx
```

Vous avez aussi la possibilité de passer par le mode standalone qui permet la génération du certificat même si votre site n'a pas été configuré.

On arrête temporairement le serveur web pour que certbot utilise le port 80 nécessaire à communication avec le serveur !

```bash
sudo systemctl stop nginx
```

Générer le certificat

```bash
sudo certbot certonly --agree-tos --email votre_utilisateur@votre_domaine.fr --standalone -d votre_domaine.fr -d www.votre_domaine.fr
```

On redémarre le serveur web :

```bash
sudo systemctl start nginx
```

Il existe aussi un mode appelé **webroot** qui vas placer des fichiers de validation dans le répertoire définis par votre serveur et qui permet surtout, de ne pas interrompre le processus du serveur web.

```bash
sudo certbot certonly --agree-tos --email votre_utilisateur@votre_domaine.fr --webroot -w /var/www/votre_domaine.fr -d votre_domaine.fr -d www.votre_domaine.fr
```

L'ajout du paramètre **certonly ** empêchera la modification automatisé du fichier de configuration de Nginx/Apache.

Pour les serveurs en production (Post-Hook) :
Si vous avez généré votre certificat en mode standalone ou webroot, votre serveur web (Nginx ou Apache) doit être rechargé pour appliquer le nouveau certificat.

Pour cela, pas besoin de modifier votre Cron !
Ajoutez simplement l'argument **--deploy-hook** lors de votre première génération, ou lancez cette commande une fois pour l'enregistrer :

```bash
sudo certbot renew --deploy-hook "systemctl reload nginx"
```

- Remplacez nginx par apache2 si nécessaire.

Les certificats obtenus sont visibles dans **/etc/letsencrypt/live/votre_domaine.fr/** :

```bash
ls /etc/letsencrypt/live/votre_domaine.fr/
```

```text
cert.pem       → certificat du domaine seul
chain.pem      → chaîne de certification intermédiaire
fullchain.pem  → cert.pem + chain.pem (à utiliser dans nginx/apache)
privkey.pem    → clé privée (à protéger, jamais exposée publiquement)
```

Comment renouveler automatiquement les certificats ?

Et oui, malheureusement les certificats de Let’s Encrypt ont une durée de vie limités.
Certbot peut les renouveler automatiquement quand l’expiration est proche (délai de moins de 30 jours restants).
La pratique recommandée par Let’s Encrypt est de tenter le renouvellement deux fois par jour :

```bash
echo "0 0,12 * * * root /opt/certbot/bin/certbot renew -q" | sudo tee /etc/cron.d/certbot > /dev/null
```

Concernant la commande cron :

Elle s’exécute à 00h00 et 12h00 tout les jours.
Exécute la commande **certbot renew -q** qui renouvelle que les certificats expirant et silencieusement.

Vous pouvez également faire un mode simulation concernant le renouvellement avant de valider :

```bash
sudo certbot renew --dry-run
```

Si vous souhaitez automatisé la mise à jour mensuelle de Certbot, suivez le guide :

Remplacer **certbot-nginx** par **certbot-apache** si vous utilisez Apache.

```bash
echo "0 3 1 * * root /opt/certbot/bin/pip install --upgrade certbot certbot-nginx -q" | sudo tee -a /etc/crontab > /dev/null
```

Comment afficher et voir la date d'expiration d'un certificat :

```bash
sudo certbot certificates
```

vous donnera :

```bash
Certificate Name: votre_domaine.fr
    Serial Number: caractères supprimés, comporter des lettres et des chiffres qui doivent restés privés
    Key Type: RSA
    Identifiers: votre_domaine.fr
    Expiry Date: 2026-11-29 12:05:41+00:00 (VALID: 64 days)
    Certificate Path: /etc/letsencrypt/live/votre_domaine.fr/fullchain.pem
    Private Key Path: /etc/letsencrypt/live/votre_domaine.fr/privkey.pem
```

Nous allons maintenant vérifier le site communique bien en SSL avec **openssl**:

```bash
openssl s_client -connect exemple.com:443 -servername votre_domaine.fr /dev/null | openssl x509 -noout -issuer -dates
```

## Foire Aux Questions

Comment ouvrir le port 80 ou 443 avec iptables ?

Exécuter la commande ci-dessous, Port **80** :

```bash
sudo iptables -A INPUT -p tcp --dport 80 -m conntrack --ctstate NEW -j ACCEPT
```

Port **443** :

```bash
sudo iptables -A INPUT -p tcp --dport 443 -m conntrack --ctstate NEW -j ACCEPT
```

Mais pourquoi vous n'installez pas certbot ou via snap tout simplement ?

Alors la réponse est simple, gérer certbot via un environnement virtuel dans python vous permettra de :

- Contrôler les mises à jour donc si vous ne voulez pas le mettre à jour, rien ne vous y obligera contrairement à une installation via Snap ou apt.

- Ne pas surcharger l'environnement système et de gérer les dépendances propre à Python.

- Aucun service supplémentaire lié à snap, on reste au principal daemon (systemd ou cron).

La génération du certificat en mode standalone échoue ?

Avez-vous pensez à stopper Nginx et à ouvrir les port 80 dans votre pare-feu ?!
Autre possibilité, vérifier que rien ne bloque la requête de validation sur **/.well-known/acme-challenge/**.

J'obtiens une erreur de permission :
Les certificats appartiennent à l'utilisateur **root** ! Si ce n'est pas le cas, veuillez rétablir impérativement les accès strict :

```bash
sudo chown -R root:root /etc/letsencrypt/
```

```bash
sudo chmod -R 700 /etc/letsencrypt/
```

Pour obtenir tout les commandes disponibles lié à certbot :

```bash
sudo certbot --help
```
