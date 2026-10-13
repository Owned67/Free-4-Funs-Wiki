---
title: "Steambans"
---

![logo Steambans](/images-wiki/Top_logo.png)

## Prérequis

[Metamod Source](/pages-wiki/metamod-css)

Il est obligatoire pour installer Steambans.

## Téléchargement

Vous devez vous enregistrer sur [le site](http://sf.steambans.com) en indiquant le nom de votre team ainsi que le lien du site pour pouvoir bénéficier de Steambans.
Une fois qu'un admin aura validé votre compte, vous pourrez télécharger Steambans dans votre panel **Manage Server(s)** puis **Half-Life 2 Mods Download** qui vous propose une version pour **Linux** et l'autre pour **Windows**.

## Installation Windows/Linux

Les ports 1809 et 80 en TCP doivent être ouvert dans votre pare feu et routeur.

## Lexique

- 1- Voici à quoi correspondent les dossiers :

   |-- goldsrc = CS 1.6, DOD 1.3, ...
   |
   |-- source_nd = Nuclear Dawn
   |
   |-- source_ep2-valve = CS:S, DOD:S, TF2, HL2DM etc... (Tous les jeux basé sur le moteur OrangeBox)

Pour un serveur sous Windows :

**1-** Décompressez l'archive et vous obtiendrez cette arborescence :

   |-- steambans_4.4.0\
   |
   |---- goldsrc
   |
   |---- goldsrc\sbsrv_mm.dll
   |
   |---- source_nd
   |
   |---- source_nd\sbsrc.dll
   |
   |---- source_ep2-valve
   |
   |---- source_ep2-valve\sbsrc.dll

Pour un serveur sous Linux :

**1-** Décompressez l'archive et vous obtiendrez cette arborescence :

   |-- steambans_4.4.0\
   |
   |---- goldsrc
   |
   |---- goldsrc\sbsrv_mm_i386.so
   |
   |---- source_nd
   |
   |---- source_nd\sbsrc.so
   |
   |---- source_ep2-valve
   |
   |---- source_ep2-valve\sbsrc.so

On note que SteamBans n'a pas encore développé de version pour Mac.

**Installation**

**1.)** Créer le répertoire et son dossier parent ![icon11](/images-wiki/icon11.gif) **cstrike\addons\steambans\sbsrc\**  et uploadez le fichier selon le jeu installé sur votre machine :

Pour Windows ![icon11](/images-wiki/icon11.gif) **sbsrc.dll**

Pour Linux ![icon11](/images-wiki/icon11.gif)   **sbsrc.so**

**2.** Maintenant on vas déclarer à [Metamod Source](/pages-wiki/metamod-css) le plugin **sbsrc** en éditant le fichier **metaplugins.ini** et vous y ajoutez cette ligne :

Pour windows ![icon11](/images-wiki/icon11.gif) addons\steambans\sbsrc\sbsrc.dll

Pour Linux ![icon11](/images-wiki/icon11.gif)   addons\steambans\sbsrc\sbsrc.so

**3-** Retournez dans votre panel sur Steambans ![icon11](/images-wiki/icon11.gif) **Manage Server(s)** et vous apercevrez ceci ![icon11](/images-wiki/icon11.gif) **SBSRV License Info**.

Cliquez sur détails et il vous proposera de télécharger le fichier **steambans.cfg**.

**steambans.cfg** :

```text
  //**************************************************************
  //This is a file that shows your teams unique accesscodes for
  //your license. If you comprimise these by showing them to
  //people outside your team, you risk losing your license.
```

```text
  //File created 26th May 2009
```

```text
  //(c) steambans.com all rights reserved
  //**************************************************************
```

```text
  //Save this file as "steambans.cfg", and place it next to your server.cfg
  //The plugin will automatically execute it on load.
```

```text
  sb_licenseid 	13419
  sb_licensecode 	code_de_votre_licence
  sb_action ar
```

Uploader le fichier dans le répertoire où se trouve le fichier [b]server.cfg[/b].

**4-** Maintenant, éditez le fichier **server.cfg** et allez dans la fenêtre que nous venons d'ouvrir précédemment, sélectionnez les 3 dernières lignes qui ressembleront à ceci :

```text
  sb_licenseid 	13419
  sb_licensecode 	iYASXU9SNC5M3BCkMD45287Q5VqwXw
  sb_action ar
```

En dessous de **sb_action ar**, ajoutez cette ligne :

```text
  sb_advert 111
```

**Les commandes :**

```text
  sb_info - Shows plugin information
  sb_licenselock - Locks the steambans license id and core
  sb_status - Shows sb_status text, only for SourceTV
```

```text
  sb_action - Action being taken when player was found positive
  sb_advert - Advert control
  sb_amxbansurl - AMXBans URL
  sb_authtimeout - Timeout for a steam validation. 0 = disabled.
  sb_autoupdate - Enable auto update (0=off, 1=only download, 2=download and restart)
  sb_customkick - Custom kick message
  sb_customurl - Custom check URL for Silver or bigger licenses
  sb_licensecode - Sets/gets the steambans license code
  sb_licenseid - Sets/gets the steambans license id
```

Redémarrez votre serveur et Enjoy !
