---
title: "Black and White Notifier"
---

## Présentation

Black and White Notifier est un plugin qui affiche un message dans le HUD ou dans le Chat lorsqu'un joueur est en noir et blanc (black and White en anglais).
Cela signifie qu'il est proche de la mort donc n'attendez pas qu'un survivant ou que lui même se soigne, TUEZ LE !!!

## Téléchargement

[Black and White Notifier](https://tutocss.pages-perso.free.fr/wiki/l4d_black_and_white.zip)

## Installation / Configuration

## Comment installer le plugin ?

- 1. Téléchargez l'archive
- 2. Décompressez l'archive sur votre ordinateur (avec un logiciel de décompression...)

- 3. Envoyez le contenu du dossier addons dans le dossier **/games/l4d2/left4dead2** de votre serveur FTP

- 4. Redémarrez le serveur

## Comment configurer le plugin ?

Avec un éditeur de texte, ouvrez le fichier **l4d_blackandwhite.sp** situé dans le répertoire **X:\addons\sourcemod\scripting**, la configuration s'effectue de la ligne 43 à 45 :

```text
	h_cvarNoticeType = CreateConVar("l4d_bandw_notice", "2", "0 turns notifications off, 1 notifies survivors, 2 notifies all, 3 notifies infected.", FCVAR_PLUGIN, true, 0.0, true, 3.0);
	h_cvarPrintType = CreateConVar("l4d_bandw_type", "1", "0 prints to chat, 1 displays hint box.", FCVAR_PLUGIN, true, 0.0, true, 1.0);
	h_cvarGlowEnable = CreateConVar("l4d_bandw_glow", "0", "0 turns glow off, 1 turns glow on.", FCVAR_PLUGIN, true, 0.0, true, 1.0);
```

**l4d_bandw_notice** ![icon11](/images-wiki/icon11.gif) la valeur à 0 désactivera la notification. A 1, seuls les survivants seront notifiés. A 2, les survivants et les infectés seront notifiés. A 3, seuls les infectés seront notifiés.<br />
**l4d_bandw_type** ![icon11](/images-wiki/icon11.gif) la valeur à 0 affichera dans le chat. A 1, elle sera affiché dans le HUD.<br />
**l4d_bandw_glow** ![icon11](/images-wiki/icon11.gif) la valeur à 0 ne fera rien. A 1, elle donnera un effet au joueur qui seront en noir et blanc. (Désolé si la traduction n'est pas correcte...)<br />

Sauvegarder les modifications puis compiler le plugin, cliquez sur le lien de téléchargement donné puis enregistrez le dans **X:\addons\sourcemod\plugins** en écrasant l'ancienne version.

**Comment modifier la phrase de notification ?**

Avec un éditeur de texte, ouvrez le fichier **l4d_blackandwhite.sp** situé dans le répertoire **X:\addons\sourcemod\scripting**

- X représente la lettre de votre disque dur et/ou partition.

la modification s'effectue de la ligne **131** à **132** et de **141** à **142** :

Rechercher :
`PrintHintTextToAll("%s (\x04%s\x01) est en NOIR et BLANC ! Dépêchez vous pour l'achever !"`

et modifier comme vous le désirer. :P Refaite la même manipulation pour toutes les autres lignes indiquées ci-dessus.

- **%s** ![icon11](/images-wiki/icon11.gif) représente le pseudo du joueur.

- **\x04%s\x01** ![icon11](/images-wiki/icon11.gif) représente le nom du survivant. Les valeurs **\x04** et **\x01** sont les couleurs utilisés pour formater le texte en jeu.

![warning](/images-wiki/warning.png) Faite bien attention lorsque vous modifier le fichier, une simple erreur de manipulation peut engendrer une erreur à la compilation.

Sauvegarder les modifications puis [compiler le plugin](http://www.sourcemod.net/compiler.php), cliquez sur le lien de téléchargement donné puis enregistrez le dans **X:\addons\sourcemod\plugins** en écrasant l'ancienne version.

N'oubliez pas de transférer le fichier **l4d_blackandwhite.smx** via votre FTP après la compilation.

Redémarrer votre serveur et Enjoy.

## Vérification de l'installation

- 1. Tapez la commande suivante dans la console de votre serveur (par RCON ou via le logiciel  [HLSW](/pages-wiki/hlsw)) :<br />

- Rcon ![icon11](/images-wiki/icon11.gif) **rcon_password votre_passe_rcon** ![icon11](/images-wiki/icon11.gif) **rcon sm plugins list**

- [HLSW](/pages-wiki/hlsw) ![icon11](/images-wiki/icon11.gif) **sm plugins list**

Cette commande sert à afficher la liste des plugins SourceMod installés sur votre serveur :

```text
 "L4D Black and White Notifier" (1.31) by DarkNoghri, madcap
```

[Source du plugin](https://forums.alliedmods.net/showthread.php?t=105380)
