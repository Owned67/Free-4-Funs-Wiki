---
title: "Comment mettre à jour son serveur"
---

## Introduction

Ce Tutoriel a été réalisé afin de vous montrer :

- comment mettre à jour les paquets de votre serveur,

- comment mettre à jour la distribution

## Prérequis

- Système d’exploitation : Debian

- [Se connecer avec Root](/administration/systeme/comment-se-connecter-en-root/) ou [Se connecter avec Sudo](/administration/systeme/sudo/)

- Systemd : requis pour l’intégration des journaux systemd (journald) selon votre distribution

- 2 à 4 Go pour un serveur minimal et 5 à 10Go pour un serveur avec interface graphique d'espace disque libre (df -h /)

- Faire une sauvegarde complète de la machine ou un snapshot selon votre hébergeur.

## Sauvegarde du nécessaire

On sauvegarde par sécurité :

```bash
sudo cp -ra /etc/apt/ /root/apt
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
sudo mysqldump --all-databases --single-transaction --routines --events > ~/all-dbs.sql
sudo cp -a /etc/mysql ~/mysql-etc.bak
sudo cp -ra /etc/apt/ /root/apt
```

Vérifiez que la sauvegarde est bien là et de bonne taille :

```bash
ls -lh ~/all-dbs.sql
```

## Mettre à jour votre Debian Bulleye vers Debian Bookworm
## Mise à jour

```bash
sudo apt update && sudo apt upgrade -y
```

Vérification du full-upgrade avant d'exécuter (ici pas de casse apriori)

```bash
sudo apt full-upgrade -s
```

Retour sur notre machine :

```text
Les paquets suivants ont été installés automatiquement et ne sont plus nécessaires :
  libmbedcrypto3 libraqm0 php8.3-pspell python3-acme python3-configargparse python3-distro python3-icu python3-josepy
  python3-parsedatetime python3-requests-toolbelt python3-rfc3339 python3-tz python3-zope.component python3-zope.event
  python3-zope.hookable python3-zope.interface
Veuillez utiliser « sudo apt autoremove » pour les supprimer.
Les paquets suivants seront ENLEVÉS :
  php-pspell
Les paquets suivants ont été conservés :
  dotnet-host
Les paquets suivants seront mis à jour :
  php-common
1 mis à jour, 0 nouvellement installés, 1 à enlever et 7 non mis à jour.
Remv php-pspell [2:8.3+95+0~20240927.54+debian11~1.gbpe0084c]
Inst php-common [2:95+0~20240927.54+debian11~1.gbpe0084c] (2:101~+0~20260503.72+debian11~1.gbp7da167 bullseye [all])
Conf php-common (2:101~+0~20260503.72+debian11~1.gbp7da167 bullseye [all])
```

Vérifier les paquets figé :

```bash
dpkg --get-selections | grep hold
```

On les enlève de ce mode pour éviter tout soucis pour la mise à jour :

```bash
sudo apt-mark unhold dotnet-host
```

```bash
sudo apt full-upgrade -y
```

```bash
sudo apt --purge autoremove -y
```

Purge du sources.list :

```bash
sudo tee /etc/apt/sources.list <<EOF
deb http://deb.debian.org/debian/ bookworm main contrib non-free
deb http://security.debian.org/debian-security bookworm-security main contrib non-free
deb http://deb.debian.org/debian/ bookworm-updates main contrib non-free
EOF
```

si votre matériel en à besoin (Wi-Fi, certaines cartes réseau, GPU, contrôleurs RAID), exécuez :  non-free-firmware

```bash
sudo tee /etc/apt/sources.list <<EOF
deb http://deb.debian.org/debian/ bookworm main contrib non-free non-free-firmware
deb http://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware
deb http://deb.debian.org/debian/ bookworm-updates main contrib non-free non-free-firmware
EOF
```

Modification des fichiers dans sources.list.d :

```bash
sudo sed -i 's/bullseye/bookworm/g' /etc/apt/sources.list.d/*.list
```

non-free.list est devenu redondant : le nouveau sources.list contient déjà non-free, on le désactive pour éviter les doublons :

```bash
sudo mv /etc/apt/sources.list.d/non-free.list /etc/apt/sources.list.d/non-free.disabled
```

Si vous avez MariaDB en version 10.5, avant de commencez la mise à jour :

```bash
sudo sed -i 's/^\[mariadb-10.5\]/[mariadb-10.11]/' /etc/mysql/mariadb.conf.d/50-server.cnf
```

Vérification :

```bash
grep -n 'mariadb-10' /etc/mysql/mariadb.conf.d/50-server.cnf
```

On met à jour les paquets et on procède à la mise à jour sans installer de nouveaux paquets :

```bash
sudo apt update
```

```bash
sudo apt upgrade --without-new-pkgs -y
```

Pendant cette phase, vous obtiendrez un écran noir textuel (l'outil apt-listchanges) pour vous montrer les nouveautés, appuyez simplement sur la touche q de votre clavier pour en sortir.
Cependant, vous aurez également des questions concernant les changements de fichier de configuration :

- Tapez D pour voir les différences (q pour revenir à la question) ;

- **N** (ou **O**) = garder TA version : la nouvelle est copiée à côté en .dpkg-dist ;

- **Y** (ou **I**) = installer la version du paquet : la tienne est sauvegardée en .dpkg-old.
En cas de doute, pas de panique, faites le choix par défaut et **Entrée**.
Un fichier sera créé à côté de celui-ci et vous pourrez ensuite vérifier tranquillement (diff fichier fichier.dpkg-dist) et appliquera ou non les changements manuellement.

:::caution[Avertissement]

Ne prenez jamais la version du paquet pour : sudoers, nftables.conf, fail2ban/jail.conf, fichiers nginx/mariadb personnalisés.

:::

Avant le grand saut final, vérification de ce qui sera supprimé :

```bash
sudo apt full-upgrade -s
```

Le grand saut final, lancez avec screen en cas de coupure SSH (rare mais peu arriver) :

```bash
screen -S upgrade
```

Sans le **-y** pour pouvoir relire la liste des paquets supprimés et confirmer par vous même.

```bash
sudo apt full-upgrade -y
```

Vérifier que tout se soit bien passé et redémarrer :

```bash
sudo apt list --upgradable
```

```bash
sudo dpkg -l | grep -E '^.[^i]'
```

```bash
sudo reboot
```

Après redémarrage :

```bash
cat /etc/debian_version
```

retourne :

```text
12.15
```

Vérifiez que MariaDB n'a pas de soucis :

```bash
sudo mariadb -e "SHOW PLUGINS" | grep -i audit
```

Vous ne devez avoir qu'une seule ligne : 

```text
SERVER_AUDIT    ACTIVE  AUDIT   server_audit.so GPL
```

Vérifie qu'aucun service n'a échoué ;

```bash
sudo systemctl list-units --state=failed
```

Un pti dernier nettoyage, là aussi, en cas de doute, retirer le **-y** si vous voulez vérifier avant :

```bash
sudo apt --purge autoremove -y
```

Vous avez réussi la mise à jour de votre Debian, félicitation !
<br />

## Mettre à jour votre Debian Wheezy vers Jessie

Ce tutoriel vous montre comment mettre à jour votre distribution vers une version plus récente (Wheezy vers Jessie).

:::note

Si vous avez configuré **sudo**, veuillez l'utiliser plutôt que de vous connecter en **root**.
Aux questions de confirmation, répondez **O** (oui) sur un système en français, **Y** sur un système en anglais.
Nous vous recommandons de faire une sauvegarde complète de votre machine avant de continuer la procédure, en effet, la mise à jour est difficilement réversible.

:::

:::caution[Avertissement]

Si votre version est archivée (ici, c'est le cas de Wheezy et de Jessie), vos lignes doivent pointer vers **archive.debian.org**, et il faut ajouter dans **/etc/apt/apt.conf** la ligne suivante, car les fichiers *Release* archivés sont expirés :

:::

```bash
Acquire::Check-Valid-Until "false";
```

Connectez-vous en **root** exceptionnellement.

On fait une sauvegarde de notre fichier **sources.list** :

```bash
cp /etc/apt/sources.list{,.old}
```

On met d'abord à jour la version actuelle.

Simulation :

```bash
apt update && apt upgrade -s
```

Mise à jour :

```bash
apt update && apt upgrade -y
```

On remplace l'ancienne version par la nouvelle (ici **wheezy** par **jessie**) :

```bash
sed -i 's/wheezy/jessie/g' /etc/apt/sources.list
```

On met à jour la liste des paquets pour la nouvelle version, puis on fait la mise à jour minimale :

```bash
apt update && apt upgrade -y
```

Pour vérifier les modifications qui seront effectuées avant d'appliquer la mise à jour complète.

Simulation :

```bash
apt -s dist-upgrade
```

Pour effectuer la mise à jour de Wheezy à Jessie :

```bash
apt dist-upgrade -y
```

Redémarrez ensuite la machine, puis vérifiez la version :

```bash
cat /etc/debian_version
```

## Mettre à jour les paquets de sa machine

:::note

Nous vous recommandons de faire une sauvegarde avant de continuer la procédure.

:::

## Être avertis par mails des mises à jour

Ce n'est pas la seule solution qui existe, nous tenons à le préciser.

```text
 

```bash
apt-get install apticron -y
```

```

## Savoir si l'ont doit redémarrer le dédié

Il est parfois utile de redémarrer le serveur dédié lorsque les mises à jours corrige des failles de sécurité ou autres... Pour cela il vous faudra installer le paquet **update-notifier-common**:

```text
 

```bash
apt-get install update-notifier-common
```

```

Après avoir effectué les mises à jour, exécutez ceci :

```text
 

```bash
/usr/lib/update-notifier/update-motd-reboot-required
```

```

Si le dédié doit être redémarré, le message suivant sera affiché :

```text
 *** Le système doit être redémarré ***
```

On peut également vérifier les mises à jours de sécurité principalement :

```text
 

```bash
/usr/lib/update-notifier/apt-check --human-readable
```

```

Le résultat :

```text
 2 packages can be updated.
 0 updates are security updates.
```

Il nous indique que 2 paquets peuvent être mis à jours et qu'aucune mises à jours de sécurité n'est disponible.

--Let&#39;s Go (discussion) 20 septembre 2026 à 16:57 (CEST)
