---
title: "Nuked-Klan"
---

## Nuked-Klan

## Introduction

Nuked-Klan est un CMS open source.
Il permet d'installer et d'administrer un site web de manière simple et interactive.
Il nécessite simplement un hébergement PHP/MySQL pour fonctionner.

Nuked-Klan est spécialisé dans les jeux en réseaux et la gestion des clans avec sa version Gamer, cependant une version généraliste nommée SP existe.

[Source](http://www.nuked-klan.org/)

## Requis

- 1 logiciel de transfert ([FileZilla](/pages-wiki/utilisation-de-filezilla) pour notre tutoriel)

- 1 Serveur Web [Apache2](/pages-wiki/comment-creer-un-serveur-web-apache2) ou [Nginx](/pages-wiki/comment-creer-un-serveur-web-nginx-version-complete)

- Les droits d'écritures (CHMOD) doivent être activés

- Un peu de patience :)

## Téléchargement

Télécharger la dernière version sur le [site officiel NK 1.7.9 RC6 Version Gamer](http://www.nuked-klan.org/index.php).

## Installation

Décompressez l'archive avec un logiciel de décompression.

:::note[Note]

Vous pouvez renommer le dossier **UPLOAD** pour pouvoir l'uploader sur votre FTP. Dans ce tutoriel, nous l'avons renommé en **nk**.

:::

Connectez vous à votre FTP, allez à l'emplacement ou l'archive a été extraite.

Dans la colonne de droite, placez vous dans votre espace web ****¹****  puis faite un clique droit sur le dossier **nk** et sélectionner **Envoyer** :

**¹**: Le chemin distant peut-être différent selon les hébergeurs.

Selon votre connexion ADSL, il vous faudra patienter le temps du transfère... Un bon petit café avec une cigarette tout comme moi lorsque je rédige ce tutoriel. :P

:::caution[Avertissement]

NE COCHER PAS LA CASE **Récursion dans les sous-dossiers** !

:::

Appliquer le chmod 777 aux répertoires suivants :

- /nk

Dans ce cas, appliquer le chmod puis cliquer sur le bouton **Réinitialiser** pour recommencer la procédure.

Faite la même chose pour les répertoires cités ci-dessous en cochant bien la case **Récursion dans les sous-dossiers** :

- images/icones

- upload/Download

- upload/Gallery

Ouvrez votre navigateur et saisissez [http://mon_domaine.net/nk/](http://mon_domaine.net/nk).

![nk install](/images-wiki/nk_install.jpg)

Choisissez dans le menu déroulant la langue puis cliquer sur le bouton ![valid nk](/images-wiki/valid_nk.jpg) (qui passera en vert ![valid nk ok](/images-wiki/valid_nk_ok.jpg) lorsque la souris passera dessus) et continuer en faisant pareil sur le bouton ![demarrer install nk](/images-wiki/demarrer_install_nk.jpg) (qui lui aussi changera de couleur lorsque la souris passera dessus ![demarrer install nk ok](/images-wiki/demarrer_install_nk_ok.jpg).

Une erreur de chmod devrait faire son apparition :

![nk error chmod](/images-wiki/nk_error_chmod.jpg)

![warning](/images-wiki/warning.png) : NE COCHER PAS LA CASE **Récursion dans les sous-dossiers** !! ![warning](/images-wiki/warning.png)

comme la documentation est mal foutu, voici la solution :
Appliquer un chmod 777 au répertoire :

- /nk

Ensuite, cliquer sur le bouton **Réinitialiser** pour recommencer la procédure.

Voici comment devra être votre fenêtre :

![nk chmod1 ok](/images-wiki/nk_chmod1_ok.jpg)

Cliquez sur le bouton ![nk continuer](/images-wiki/nk_continuer.jpg)...

Avant d’aller plus loin, vous pouvez autoriser ou non l'envoi de statistiques anonymes à Nuked-Klan, pour cela décocher la case selon votre envie puis continuer en cliquant sur le bouton ![valid nk](/images-wiki/valid_nk.jpg) (qui passera en vert ![valid nk ok](/images-wiki/valid_nk_ok.jpg) lorsque la souris passera dessus).

Dans ce tutoriel, nous décochons cette case :

![nk disable anonymous](/images-wiki/nk_disable_anonymous.jpg)

Il y a deux possibilités d'installer Nuked-Clan :

![nk choix install](/images-wiki/nk_choix_install.jpg)

- Installation rapide,

- Installation assistée.

Dans ce tutoriel, nous avons choisis l'installation assistée donc avant tout, il vous faudra créer la base de donnée via phpmyadmin.

Cliquez sur le bouton ![nk continuer](/images-wiki/nk_continuer.jpg) et voici en image comment remplir les informations requises :

![nk infos sql](/images-wiki/nk_infos_sql.jpg)

1 ![icon11](/images-wiki/icon11.gif) Le plus souvent, localhost est passe partout<br />
2 ![icon11](/images-wiki/icon11.gif) Nom de l'utilisateur MySQL<br />
3 ![icon11](/images-wiki/icon11.gif) Mot de passe de l'utilisateur MySQL<br />
4 ![icon11](/images-wiki/icon11.gif) Préfixe de la base de donnée<br />
5 ![icon11](/images-wiki/icon11.gif) Nom de la base de donnée **²**<br />

**²** Selon les hébergeurs, il vous faudra modifier ce champ qui correspondra à votre base de donnée.

Si toutefois, vous avez oublié de créer la base de donnée, Nuked-klan vous rapplera à l'ordre lors de la validation du formulaire :

```text
<font color="red">
Connexion à la base de données impossible !
Veuillez contrôler le nom de la base de données.</font>
```

Cliquez sur le bouton ![valid nk](/images-wiki/valid_nk.jpg) et faite de même pour le bouton ![nk boutton demarrer](/images-wiki/nk_boutton_demarrer.jpg).

Voici une image sur comment se déroule le procédé :

![nk ceate table](/images-wiki/nk_ceate_table.jpg)

Veillez bien à vérifier qu'il n'y a eu aucune erreur pendant le processus, vous devriez voir ce message à la fin :
'''L'installation est terminée ! Toutes les tables ont bien été créées'''

Poursuivez l'installation en cliquant sur ![nk continuer](/images-wiki/nk_continuer.jpg) pour arriver à l'étape concernant la création du compte Administrateur :

![nk create admin](/images-wiki/nk_create_admin.jpg)

Rien de bien compliquer à faire...

Pour effectuer la création du compte, cliquez sur le bouton ![valid nk](/images-wiki/valid_nk.jpg)

Pour accéder à votre site, cliquer sur le bouton ![nk access](/images-wiki/nk_access.jpg)

Un aperçu une fois l'installation terminée :

![nk site terminee](/images-wiki/nk_site_terminee.jpg)

Félicitation, votre site est installé mais le tutoriel n'est pas totalement terminé héhéhé...

Veuillez **SUPPRIMER** le dossier **INSTALL** de votre FTP !!!

Maintenant, vous pouvez remettre le dossier **nk** en chmod **755**.

Voici la fin de ce tutoriel. :P

## Comment installer un Module

Voici la procédure pour installer un module Nuked_Klan.

## Téléchargement

[Module](http://www.nuked-klan.org/index.php?file=Download&op=categorie&cat=44)

Choisissez le thème qui vous plaît. Dans ce tutoriel, nous choisissons le module **Module dons Paypal**.

Sélectionner le module puis cliquer sur le bouton **Télécharger ce fichier** en bas de la page et enregistrez l'archive sur votre disque dur.

## Installation

- Décompressez l'archive **733811a074.rar** avec un logiciel de décompression.

- Connectez vous à votre FTP, placez vous dans le répertoire **/** et transférer le contenu du dossier **Module dons Paypal** sur votre FTP sauf le fichier **A lire.txt** qui n'est pas utile.

Une fois l'upload terminé, ouvrez votre navigateur et saisissez l'url (http://mon_domaine.net/nk/install.php http://mon_domaine.net/nk/install.php]

Cliquez sur le bouton **Installer**, un message de confirmation s'affichera pendant quelques secondes puis vous serez rediriger sur votre site.

Supprimer le fichier **install.php** une fois l'installation terminée.

Pour gérer le module, allez dans **Administration** ![icon11](/images-wiki/icon11.gif) **Contenu** ![icon11](/images-wiki/icon11.gif) **Paypal** ![icon11](/images-wiki/icon11.gif) **Options du block** puis configurer les différents champs.

## Comment installer un Block

Voici la procédure pour installer un block Nuked_Klan.

## Téléchargement

[Traduction](http://www.nuked-klan.org/index.php?file=Download&op=categorie&cat=46)

Dans ce tutoriel, nous choisissons le module **Traduction**.

Sélectionner le module puis cliquer sur le bouton **Télécharger ce fichier** en bas de la page et enregistrez l'archive sur votre disque dur.

## Installation

- Décompressez l'archive **0f95d50095.zip** avec un logiciel de décompression. Une fois décompressé, vous obtiendrez le dossier **Module Replay V3.0**.

- Connectez vous à votre FTP, placez vous dans le répertoire **/nk/** et transférer le contenu du dossier **Traduction** sur votre FTP sauf le fichier **Lisez-Moi.txt** qui n'est pas utile.

Pour ajouter le block **Traduction** ![icon11](/images-wiki/icon11.gif) cliquez sur **Administration** ![icon11](/images-wiki/icon11.gif) **Gestions** ![icon11](/images-wiki/icon11.gif) **Blocks** ![icon11](/images-wiki/icon11.gif) **Ajouter un Block** :

**Titre du Block** ![icon11](/images-wiki/icon11.gif) Mettez un titre.<br />
**Type** ![icon11](/images-wiki/icon11.gif) sélectionnez **Traduction**<br />
**Niveau** ![icon11](/images-wiki/icon11.gif) Niveau d'accès pour les admins<br />
'''Sélectionnez les pages où vous voulez que le block s'affiche''' ![icon11](/images-wiki/icon11.gif) Permet de gérer la visibilité sur le site du block.<br />

et terminer en cliquant sur **Créer un block** :

![nk create block](/images-wiki/nk_create_block.jpg)

Maintenant, on doit activer le block :

![nk block activate](/images-wiki/nk_block_activate.jpg)

Choisissez la position à l'aide du menu déroulant, configurer le niveau d'accès ainsi que la position puis terminer en cliquant sur le bouton **modifier le block**.

Retourner sur le site et admirez le résultat :P

![warning](/images-wiki/warning.png) Selon le thème et l'emplacement du block, il se peut qu'il ne s'affichera pas correctement. Vous avez deux possibilités :

- avertir l'auteur du bug pour une éventuelle correction,

- vous maîtriser le langage php etc.., vous le faites vous même...

## Comment installer un Thème

Voici la procédure pour installer un thème Nuked_Klan.

## Téléchargement

[Thème](http://www.nuked-klan.org/index.php?file=Theme)

Choisissez le thème qui vous plaît. Dans ce tutoriel, nous choisissons le thème **Dark_BF3**.

![warning](/images-wiki/warning.png) : Pensez à bien vérifier que le thème est compatible avec votre version de Nuked_Klan autrement vous vous retrouverez avec des erreurs.

Ces informations sont disponibles en dessous de l'image de présentation du thème.

Sélectionner le thème puis cliquer sur le bouton **Télécharger le thème** en bas de la page et enregistrez l'archive sur votre disque dur.

## Installation

- Décompressez l'archive **be1b82ddba.zip** avec un logiciel de décompression. Une fois décompressé, vous obtiendrez le dossier **Absolut**.

- Connectez vous à votre FTP, placez vous dans le répertoire **/nk/themes** et uploader tout le dossier **Dark_BF3** sur votre FTP.

![nk theme upload](/images-wiki/nk_theme_upload.jpg)

Une fois l'upload terminé, ouvrez votre navigateur et connectez vous à votre site, dans menu de gauche, cliquez sur **Administration** ![icon11](/images-wiki/icon11.gif) **Paramètres** ![icon11](/images-wiki/icon11.gif) **Préférences Générales** ![icon11](/images-wiki/icon11.gif) vers le milieu de page vous trouverez **Thème par défaut** ![icon11](/images-wiki/icon11.gif) mettez votre thème à l'aide du menu déroulant et valider en cliquant sur le bouton **Modifier** tout en bas de la page.

Retourner sur le site pour admirer votre nouveau thème.
