---
title: "Thirdpersonshoulder Block"
---

## Présentation

Thirdpersonshoulder Block permet de kicker les joueurs ayant activé la variable **Thirdpersonshoulder**.
Les admins ayant le flag **ROOT** sont immunisés (ajout personnel).

## Téléchargement

[Thirdpersonshoulder Block](https://tutocss.pages-perso.free.fr/wiki/l4d_thirdpersonshoulderblock.zip)

## Installation

- 1. Téléchargez l'archive
- 2. Décompressez l'archive sur votre ordinateur (avec un logiciel de décompression...)

- 3. Envoyez le contenu des dossiers **addons** dans le répertoire **/games/l4d2/left4dead2** de votre serveur FTP

- 4. Redémarrez votre serveur

## Configuration

Vous voulez ajouter des admins pour les immuniser ?

Éditez le fichier **l4d_thirdpersonshoulderblock.sp** :

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

- 1. Tapez la commande suivante dans la console de votre serveur (par RCON ou via le logiciel [HLSW](/divers/hlsw/)) :<br />

- Rcon ![icon11](/images-wiki/icon11.gif) **rcon_password votre_passe_rcon** ![icon11](/images-wiki/icon11.gif) **rcon sm plugins list**

- [HLSW](/divers/hlsw/) ![icon11](/images-wiki/icon11.gif) **sm plugins list**

Cette commande sert à afficher la liste des plugins SourceMod installés sur votre serveur :

```text
 "Thirdpersonshoulder Block" (1.3) by Don
```

[Source du plugin](https://forums.alliedmods.net/showthread.php?t=159582)
