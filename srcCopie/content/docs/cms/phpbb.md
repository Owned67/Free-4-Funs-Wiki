---
title: "PhpBB"
---

## phpBB

## Introduction

phpBB (PHP Bulletin Board) est un logiciel libre diffusé gratuitement sous licence GPL depuis l'an 2000. Il est utilisable sur tout service d'hébergement proposant une architecture de type PHP/MySQL.
phpBB est un script php permettant la création  et la gestion complète d'un forum de discussion en ligne.

:::note

Ce tutoriel a été rédigé avec la version 3.1.2 de phpBB cependant il n'y a aucun changement sur le procéder d'installation.

:::

[Source](http://www.dicodunet.com/definitions/creation-web/phpbb.htm)

## Requis

- 1 logiciel de transfert ([FileZilla](/jeux/outils-et-services/utilisation-de-filezilla/) pour notre tutoriel)

- 1 Serveur Web [Apache2](/administration/web-et-ftp/comment-creer-un-serveur-web-apache2/) ou [Nginx](/administration/web-et-ftp/comment-creer-un-serveur-web-nginx-version-complete/) à moins que vous êtes sur un hébergement mutualisé.

- Les droits d'écritures (CHMOD) doivent être activés

- Un peu de patience :)

## Téléchargement

Télécharger la dernière version ![icon11](/images-wiki/icon11.gif) [phpBB 3.1.3](https://www.phpbb.com/files/release/phpBB-3.1.3.zip).

Télécharger la traduction Française ![icon11](/images-wiki/icon11.gif) [phpBB 3.1.3 FR](http://www.phpbb-fr.com/telechargements/full/phpBB-3.1.3_FR.zip)

## Installation

Décompresser les archives avec un logiciel de décompression.

![phpbb decompresse](/images-wiki/phpbb_decompresse.jpg)

Déplacer les dossiers **styles** et **language** dans **..\phpBB-3.1.3\phpBB3**.

:::note[Note]

Vous pouvez renommer le dossier **phpBB3** pour pouvoir l'uploader sur votre FTP. Dans ce tutoriel, nous l'avons renommé en **forum**.

:::

Connectez vous à votre FTP, allez à l'emplacement où l'archive a été extraite.

Dans la colonne de droite, allez jusqu'au répertoire **/** ¹  puis faite un clique droit sur le dossier **forum** et sélectionner **Envoyer** :

¹ Selon les hébergeurs, le chemin pourra être différent donc avant d'uploader, placer vous dans le bon dossier.

![phpbb f4f upload](/images-wiki/phpbb_f4f_upload.jpg)

Selon votre connexion ADSL, il vous faudra patientez le temps du transfère... Un bon petit café avec une cigarette tout comme moi lorsque je rédige ce tutoriel. :P

Avant de commencer l'installation, nous allons appliquer les chmods requis pour le bon fonctionnement de la procédure de l'installation de notre forum.

Placez vous dans le répertoire **/forum**, faite un clique droit sur le dossier **cache** ![icon11](/images-wiki/icon11.gif) '''Droits d'accès au fichier...** et mettez la valeur **777** et validez avec **Ok''' :

![phpbb chmod install](/images-wiki/phpbb_chmod_install.jpg)

![phpbb chmod install1](/images-wiki/phpbb_chmod_install1.jpg)

Répéter l'opération pour les dossiers suivants :

- files

- store

- config.php (un chmod définis à 666 suffira)

- images/avatars/upload

Ouvrez votre navigateur et saisissez [http://mon_domaine.fr/forum/install/index.php?mode=install&language=fr/](http://mon_domaine.fr/forum/install/index.php?mode=install&language=fr/) :

![phpbb f4f install](/images-wiki/phpbb_f4f_install.jpg)

Passer à l'étape suivante en cliquant sur ![phpbb next](/images-wiki/phpbb_next.jpg)

![phpbb f4f install2](/images-wiki/phpbb_f4f_install2.jpg)

Veuillez cliquez sur ![phpbb commencer f4f](/images-wiki/phpbb_commencer_f4f.jpg) qui nous amènera à remplir les informations de connexion à la base de donnée.

- Vous retrouverez ces informations en consultant votre panel chez votre GSP (Game Server Provider).

![phpbb f4f install3](/images-wiki/phpbb_f4f_install3.jpg)

Passer à l'étape suivante en cliquant sur ![phpbb next](/images-wiki/phpbb_next.jpg).

Vous devriez avoir un joli message :

![phpbb f4f install4](/images-wiki/phpbb_f4f_install4.jpg)

Passer à l'étape suivante en cliquant sur ![phpbb next](/images-wiki/phpbb_next.jpg) pour arriver à l'étape concernant la création du compte Administrateur :

![phpbb f4f install5](/images-wiki/phpbb_f4f_install5.jpg)

Passer à l'étape suivante en cliquant sur ![phpbb next](/images-wiki/phpbb_next.jpg).

Un message de confirmation sera affiché : <br />

:::note

Vérification des paramètres de l’administrateur:    Vérifications réussies

:::

Passer à l'étape suivante en cliquant sur ![phpbb next](/images-wiki/phpbb_next.jpg).

Passer à l'étape suivante en cliquant sur ![phpbb next](/images-wiki/phpbb_next.jpg).

Normalement à cette étape, tout est correct et vous pouvez laissez la configuration par défaut sans aucun problème.

Passer à l'étape suivante en cliquant sur ![phpbb next](/images-wiki/phpbb_next.jpg).

Passer à l'étape suivante en cliquant sur ![phpbb next](/images-wiki/phpbb_next.jpg).

Voilà, votre forum phpBB a été installé avec succès !

![phpbb f4f install6](/images-wiki/phpbb_f4f_install6.jpeg)

Avant de continuer, **veuillez SUPPRIMER le dossier INSTALL de votre FTP !!!** et repasser le fichier config.php à un **CHMOD de 644** pour la sécurité de votre forum.

Maintenant que tout cela a été fait, cliquez sur le bouton **Se connecter** pour accéder au panel d'administration (ACP) votre forum :

![phpbb f4f acp](/images-wiki/phpbb_f4f_acp.jpeg)

Voilà, le tutoriel touche à sa fin...
