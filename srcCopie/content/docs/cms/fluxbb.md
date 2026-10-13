---
title: "FluxBB"
---

## Introduction

FluxBB est un forum de discussions écrit en PHP rapide et léger. Il est délivré sous la licence GNU GPL.

Ses principaux objectifs sont : d'être plus rapide, plus léger et graphiquement moins intense comparé à d'autres logiciels de forum. FluxBB a donc moins de fonctionnalités que beaucoup d'autres forums de discussion, mais il est généralement plus rapide et génère des pages plus légères. D'autre part, le code généré par FluxBB est conforme aux normes XHTML 1.0 Strict et CSS2 du W3C.

FluxBB.fr est le site de la communauté française de FluxBB. La version originale de FluxBB est disponible sur le [site officiel](http://fluxbb.org/).

## Requis

- 1 logiciel de transfert ([FileZilla](/jeux/outils-et-services/utilisation-de-filezilla/) pour notre tutoriel)

- 1 Serveur Web avec PHP 4.4.0 ou supérieur, MySQL 4.1.2 ou supérieur. A noter que Fluxbb est compatible avec PostGreSQL 7.0 (ou supérieur) et SQLite 2 (SQLite 3 n'est pas supporté !)

- Les droits d'écritures (CHMOD) doivent être activés

- Un peu de patience :)

## Téléchargement

Télécharger la dernière version ![icon11](/images-wiki/icon11.gif) [FluxBB 1.5.8](http://fluxbb.org/download/releases/1.5.8/fluxbb-1.5.8.zip)

Télécharger la traduction FR [ici](http://adf.ly/vfcRi)

## Installation

Décompressez les archives avec un logiciel de décompression (WinRar, 7zip etc...)

La traduction française **French** devra être copié dans **C:\fluxbb-1.5.8\lang**.

:::note[Note]

Vous pouvez renommer le dossier **fluxbb-1.5.8** pour pouvoir l'uploader sur votre FTP.

:::

Connectez vous à votre FTP, allez à l'emplacement où l'archive a été extraite.

Dans la colonne de droite, allez jusqu'au répertoire **/** ¹ puis faite un clique droit sur le dossier **fluxbb** et sélectionner **Envoyer**.

¹ Selon les hébergeurs, le chemin pourra être différent donc avant d'uploader, placer vous dans le bon dossier.

Selon votre connexion ADSL, il vous faudra patientez le temps du transfère... Un bon petit café avec une cigarette tout comme moi lorsque je rédige ce tutoriel. :P

Avant de commencer l'installation, nous allons appliquer les chmods requis pour le bon fonctionnement de la procédure de l'installation de notre forum.

[Appliquez un CHMOD 777](http://adf.ly/vfdaX) sur les répertoires suivants :

```text
* cache
* img/avatars
```

Nous allons créer la base de donnée avant de commencer.

Connectez-vous à PhpMyAdmin, cliquer sur **Bases de données** puis dans ** Créer une base de données**
**, indiquer le nom de la base de donné que vous voulez ^^ **fluxbb** dans ce tutoriel puis terminer en cliquant sur **Créer'''.

Ouvrez votre navigateur et saisissez [http://mon_domaine.net/fluxbb](http://mon_domaine.net/fluxbb) :

![f4f fluxbb install](/images-wiki/f4f_fluxbb_install.png)

Modifiez la langue en **French** et cliquez sur le bouton ![f4f changelang](/images-wiki/f4f_changelang.jpg) puis dans le champ **Type de base de données**, définisser sur **MySQL Improved**.

Voici comment doit être rempli le formulaire :

![f4f fluxbb install ok](/images-wiki/f4f_fluxbb_install_ok.png)

Vous modifiez le thème dans le champ **Style par défaut**.

Cliquez sur ![f4f fluxbb start](/images-wiki/f4f_fluxbb_start.jpg)...

![f4f fluxbb finish](/images-wiki/f4f_fluxbb_finish.jpg)

Cliquez sur le bouton ![f4f fluxbb dl](/images-wiki/f4f_fluxbb_dl.jpg) puis transférer le sur le FTP à l'emplacement ![icon11](/images-wiki/icon11.gif) **/fluxbb/**.

Il ne vous reste plus qu'à cliquez sur le lien '''vous rendre à la page d'accueil des forums''' pour accéder à votre forum :

![f4f fluxbb site](/images-wiki/f4f_fluxbb_site.jpg)

![Warning](/images-wiki/Warning.png) Pensez à effacer le fichier **install.php** après avoir uploadé le fichier de configuration.

Voilà, le tutoriel touche à sa fin...

## Personnaliser FluxBB

- [Les Mods](http://fluxbb.fr/mods/mods.php)<br />,

- [Les Thèmes](http://fluxbb.fr/styles/styles.php)
