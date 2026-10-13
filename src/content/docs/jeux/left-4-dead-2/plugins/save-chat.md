---
title: "Save Chat"
---

## Présentation

Le plugin permet de sauvegarder toutes les discussions écrites (par map) des joueurs dans un fichier **.log**. (compatible L4D1 et L4D2).

## Téléchargement

[Save Chat v1.2.1](https://tutocss.pages-perso.free.fr/wiki/SaveChat.zip)

## Installation / Configuration

## Comment installer le plugin ?

- 1. Téléchargez l'archive
- 2. Décompressez l'archive sur votre ordinateur (avec un logiciel de décompression...)

- 3. Envoyez le contenu du dossier addons dans le dossier **/games/l4d2/left4dead2** de votre serveur FTP

- 4. Redémarrez le serveur

## Comment configurer le plugin ?

Avec un éditeur de texte, ouvrez le fichier **savechat.sp** situé dans le répertoire **X:\addons\sourcemod\scripting**, la configuration s'effectue de la ligne 189 à 193 :

```text
     		sc_record_detail = CreateConVar("sc_record_detail", "1", 
		"Record player Steam ID and IP address",
		FCVAR_PLUGIN)
```

**sc_record_detail** ![icon11](/images-wiki/icon11.gif) 0 = désactivé, 1 = sauvegarde l'adresse IP et le STEAMID du joueur<br />
<br /><br />

Sauvegarder les modifications puis compiler le plugin sur votre PC.

N'oubliez pas de transférer le fichier **savechat.smx** via votre FTP après la compilation.

Redémarrer votre serveur et Enjoy.

## Vérification de l'installation

- 1. Tapez la commande suivante dans la console de votre serveur (par RCON ou via le logiciel [HLSW](/divers/hlsw/)) :<br />

- Rcon ![icon11](/images-wiki/icon11.gif) **rcon_password votre_passe_rcon** ![icon11](/images-wiki/icon11.gif) **rcon sm plugins list**

- [HLSW](/divers/hlsw/) ![icon11](/images-wiki/icon11.gif) **sm plugins list**

Cette commande sert à afficher la liste des plugins SourceMod installés sur votre serveur :

```text
 "SaveChat" (SaveChat_1.2.1) by citkabuto
```

[Source du plugin](https://forums.alliedmods.net/showthread.php?t=117116)
