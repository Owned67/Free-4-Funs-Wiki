---
title: "Modifier le fond d'écran du jeu"
---

## Introduction

Ici, vous allez voir comment modifier le fond d'écran de votre menu CS:S.

## Prérequis

- [VTFEdit 1.3.3](https://tutocss.pages-perso.free.fr/css-ressource/vtfedit133.exe)

- .NET Framework v2.0

- Un logiciel de retouche photos (PhotoFiltre Studio X, PhotoShop, Paint shop Pro etc...)

- Une image de la taille de votre écran

## Installation

Installer le logiciel VTFEdit... rien de bien compliqué...

## Modification du fond d'écran

Ouvrez votre image avec PhotoFiltre Studio (MAL + CTRL + S pour le raccourci clavier) et faite ![icon11](/images-wiki/icon11.gif) **Enregistrer sous...** ![icon11](/images-wiki/icon11.gif) **Type** ![icon11](/images-wiki/icon11.gif) choisissez le format **Targa (.tga)** ![icon11](/images-wiki/icon11.gif) puis cliquez sur **Enregistrer**.

L'image devra faire 1024/1024 px au minimum !

Ouvrez le logiciel **VTFEdit** et cliquez sur l'icône ![icone css](/images-wiki/icone_css.jpg) et recherchez votre fichier .tga précédemment enregistré.

Patientez un peu le temps que le logiciel affiche l'image (selon varie selon la taille de l'image) puis validez en cliquant sur **OK** si vous ne souhaitez pas modifier puis enregistrez votre logo ![icon11](/images-wiki/icon11.gif) **File** ![icon11](/images-wiki/icon11.gif) **Save As** (MAL + CTRL + S pour le raccourci clavier) ![icon11](/images-wiki/icon11.gif) mettez le nom **background01** et validez en cliquant sur **Enregistrer**.

Inutile de mettre l'extension dans le nom du fichier, le logiciel le fera automatiquement.

Avant de continuer, nous vous recommandons de fermer l'application Steam (Processus steam.exe).

Maintenant que votre fond d'écran est prêt, allez dans le dossier d'installation de votre jeux, par défaut il se situe dans :

```ini
C:\Program Files\Valve\Steam\SteamApps\nom_du_compte\counter-strike source\cstrike
```

Double cliquez sur le dossier **materials**, voyez si vous avez un dossier **console** et si il n'existe pas alors vous devrez le créer.
Après ceci, faite un copier de votre image et coller la dans le répertoire.

En résumer vous devriez avoir :

```ini
C:\Program Files\Valve\Steam\SteamApps\nom_du_compte\counter-strike source\cstrike\materials\console\background01.vtf
```

Si vous avez un écran large, la taille de l'image devra être de 2048/1024 px, convertissez là et il vous faudra la nommer en :

```ini
background01_widescreen.vtf
```

Démarrer Steam et lancer le jeu et admirer le résultat. :-)

## Ajouter plusieurs fond d'écrans

Rechercher le fichier **autoexec.cfg** se situant dans le répertoire **C:\Program Files\Valve\Steam\SteamApps\nom_du_compte\counter-strike source\cstrike\cfg\**, si celui-ci n'existe pas alors créer le...

Ajoutez cette ligne :

```text
 //Permet d'afficher plusieurs fond d'ecrans
 sv_unlockedchapters 99
```

Créer le fichier **ChapterBackgrounds.txt** que vous placerez dans **C:\Program Files\Valve\Steam\SteamApps\nom_du_compte\counter-strike source\cstrike\scripts**.

L'arborescence de ce fichier devra être :

```text
"chapters"
{
               1	"background01"
               2	"background02"
               3	"background03"
               4	"background04"
               5	"background05"
               6	"background06"
               7	"background07"
               8	"background08"
               9	"background09"
               10	"background10"
               11	"background11"
               12	"background12"
}
```

Inutile de tout détailler, cela se passe de commentaire vu la simplicité, non ? :P ;)

Si toutefois, vous ne comprenez pas, demander l'ajout d'explication, nous le feront avec un grand plaisir !

## F.A.Q

**Q** : Mon d'écran ne s'affiche pas ?

**R** : Il y a deux solutions possible, la première est que vous êtes sur un serveur utilisant la variable **sv_pure 2** et là, je ne pourrais rien faire pour vous...

La seconde pourra peut-être vous permettre de corriger ce problème...

Ouvrez votre éditeur de texte et copier/coller ceci :

```text
"UnlitGeneric"
{
        //"$translucent" 1
	"$basetexture" "console/background01_widescreen"
	"$vertexcolor" 1
	"$no_fullbright" 1
	"$ignorez" 1
}
```

Faite **Fichier** ![icon11](/images-wiki/icon11.gif) **Enregistrer sous...** et rechercher le répertoire **materials** de votre jeu ![icon11](/images-wiki/icon11.gif) et nommer le **background01_widescreen.vmt**.

--Let&#39;s Go (discussion) 6 avril 2014 à 11:38 (CEST)
