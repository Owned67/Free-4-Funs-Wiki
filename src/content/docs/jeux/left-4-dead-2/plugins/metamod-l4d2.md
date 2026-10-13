---
title: "Metamod L4D2"
---

![Metamod](/images-wiki/Metamod.jpg)

## Présentation

MetaMod est un gestionnaire d'API se reposant sur le moteur d'HL² et un MOD. Il est écrit en C++ pour intercepter, dépasser et accrocher le moteur et les DLL API. Il permet aussi les communications inter-plugin. Bref c'est énorme

Source : [http://www.sourcemm.net](http://www.sourcemm.net)

## Téléchargement

[MetaMod Source 1.10.4 Linux](http://mirror.pointysoftware.net/alliedmodders/mmsource-1.10.4-linux.tar.gz)

[MetaMod Source 1.10.4 Mac](http://csgo.fragworks.net/ftp/sourcemod/mmsource-1.10.4-mac.zip)

[MetaMod Source 1.10.4 Windows](http://mirror.capturetheprize.com/mmsource-1.10.4-windows.zip)

**NOTE** :
Par précaution, nous vous recommandons d'utiliser les versions SnapShots (version avancée de MetaMod, la différence est que celle-ci ne sont pas réellement déclarée comme stable mais généralement on ne rencontre pas de problème. C'est surtout pour éviter d'être embêté lors d'une mise à jour de Valve :P).

[MetaMod Source 1.11.1 h953 Linux](http://www.metamodsource.net/mmsdrop/1.11/mmsource-1.11.0-git953-linux.zip)

[MetaMod Source 1.11.1 h953 Mac](http://www.metamodsource.net/mmsdrop/1.11/mmsource-1.11.0-git953-mac.zip)

[MetaMod Source 1.11.1 h953 Windows](http://www.metamodsource.net/mmsdrop/1.11/mmsource-1.11.0-git953-windows.zip)

## Installation

- 1 - Décompresser l'archive téléchargée auparavant

- 2 - Uploader le dossier **addons** dans le répertoire **/cstrike**.

- 3 - Uploadez le tout sur votre FTP

- 4 - Création du fichier **metamod.vdf** :

Ouvrez votre éditeur de texte, nouveau fichier ou document.

Pour Windows et Linux, coller ces lignes dedans :

```text
 "Plugin"
```

  \{

```text
   "file"	"../left4dead2/addons/metamod/bin/server"
 }
```

Puis enregistrer le document en **metamod.vdf** et uploader le sur le serveur de jeux dans **../../left4dead2/left4dead2/addons**

**NOTE**: Les XXXX représente l'ID de votre serveur.

Si vous ne souhaitez pas le créer, vous pouvez le générer automatiquement en [cliquant ici](http://www.metamodsource.net/?go=vdf).

Dans **Games**, choisissez **Left 4 Dead 2** puis dans **Game Folder** mettez **leftfordead2** et pour terminer, cliquez sur le bouton **Generate metamod.vdf** pour le sauvegarder sur votre disque dur.

**Ne renommer pas les autres fichiers VDF présents sur le serveur**

- 5 - Redémarrer votre serveur et voilà.

- 6 - Vérification que Metamod est correctement installé

Connectez-vous à votre serveur et exécuter la commande **meta version** dans la console et observez le résultat :

Version Stable (Release) :

```text
Metamod:Source version 1.8.7
Build ID: 772:99b7a0a11fec
Loaded As: Valve Server Plugin
Compiled on: Jun 23 2011
Plugin interface version: 15:14
SourceHook version: 5:5
http://www.metamodsource.net/
```

<br />
Version Snapshots :

```text
Metamod:Source version 1.9.0-dev
 Build ID: 785:11aa8bb24378-dev
 Loaded As: Valve Server Plugin
 Compiled on: May 26 2012
 Plugin interface version: 15:14
 SourceHook version: 5:5
 http://www.metamodsource.net/
```

## Les plugins

## Liste des Commandes

```text
meta alias [nom] [valeur] => Liste ou défini un alias
```

```text
meta clear => Décharge tous les plugins
```

```text
meta force_unload <id> => Force la desactivation d'un plugin par son ID.
```

```text
meta game => Affiche des infos sur les DLL du jeux
```

```text
meta info <id> => Affiche les infos sur un plugin par ID
```

```text
meta list => Liste tous les plugins
```

```text
meta load <file or alias> => Lance un plugin
```

```text
meta pause <id> => Mets en pause un plugin via son ID.
```

```text
meta refresh => Attempts to resync the metaplugins.ini file, which only means that new entries are loaded.
```

```text
meta retry => Tente de recharger un plugin dont le chargement a échoué.
```

```text
meta unload <id or file or alias> => Tente de décharger un plugin, celui ci peut refuser
```

```text
meta unpause <id> => Enlève la pause sur un plugin via son ID
```

```text
meta version => Affiche les info de Metamod
```
