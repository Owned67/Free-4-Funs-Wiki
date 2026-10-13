---
title: "Kickloadstuckers"
---

## Présentation

Kickloadstuckers permet de kicker les joueurs qui mettent trop de temps à rejoindre le serveur.
Les admins ayant le flag **ROOT** sont immunisés (ajout personnel).

## Téléchargement

[KickLoadStuckers](https://tutocss.pages-perso.free.fr/wiki/l4d_kickloadstuckers.zip)

## Installation

- 1. Téléchargez l'archive
- 2. Décompressez l'archive sur votre ordinateur (avec un logiciel de décompression...)

- 3. Envoyez le contenu des dossiers **addons** dans le répertoire **/games/l4d2/left4dead2** de votre serveur FTP

- 4. Redémarrez votre serveur

## Configuration

Personnellement, j'ai réglé la valeur à **75** autrement il y a trop de kick...

`cvarDuration = CreateConVar("l4d_kickloadstuckers_duration", 	"60", 			" How long before a connected but not ingame player is kicked. (default 60) ", 	FCVAR_PLUGIN|FCVAR_NOTIFY);`

**l4d_kickloadstuckers_duration** ![icon11](/images-wiki/icon11.gif) Durée en seconde pour que le joueur soit kické si il n'est pas en jeu.

Vous voulez ajouter des admins pour les immuniser ?

Éditez le fichier **l4d_kickloadstuckers.sp** :

Rechercher :

```text
 if (GetAdminFlag(id, Admin_Root))
```

Remplacer par :

```text
 if (GetAdminFlag(id, Admin_Kick) || GetAdminFlag(id, Admin_Ban) || GetAdminFlag(id, Admin_Reservation) || GetAdminFlag(id, Admin_Root))
```

Maintenant, il ne vous reste plus qu'à compiler votre plugin et de l'uploader sur votre FTP.

Redémarrez votre serveur et Enjoy.

## Vérification de l'installation

- 1. Tapez la commande suivante dans la console de votre serveur (par RCON ou via le logiciel  [HLSW](/pages-wiki/hlsw)) :<br />

- Rcon ![icon11](/images-wiki/icon11.gif) **rcon_password votre_passe_rcon** ![icon11](/images-wiki/icon11.gif) **rcon sm plugins list**

- [HLSW](/pages-wiki/hlsw) ![icon11](/images-wiki/icon11.gif) **sm plugins list**

Cette commande sert à afficher la liste des plugins SourceMod installés sur votre serveur :

```text
 "L4D Kick Load Stuckers" (1.0.8) by AtomicStryker
```

[Source du plugin](https://forums.alliedmods.net/showthread.php?p=928684)
