---
title: "Anti Ping Mask"
---

## Présentation

Anti Ping Mask Permet de kicker ou de bannir les joueurs qui s'amuse à modifier leur rates pour avoir un faux ping.

## Téléchargement

[Anti Ping Mask](https://tutocss.pages-perso.free.fr/wiki/AntiPingMask.zip)

## Installation / Configuration

- 1. Téléchargez l'archive
- 2. Décompressez l'archive sur votre ordinateur (avec un logiciel de décompression...)

- 3. Envoyez le contenu du dossier addons dans le dossier **/games/l4d2/left4dead2** de votre serveur FTP

- 4. Redémarrez le serveur

## Comment configurer le plugin ?

Avec un éditeur de texte, ouvrez le fichier **antipingmask.sp** situé dans le répertoire **/games/l4d2/left4dead2/addons/sourcemod/scripting** :

```text
g_Cvar_Handler 			= CreateConVar( "apm_handler", "0", "Determines how Anti-Ping Mask should handle ping masked clients.", 0, true, 0.0, true, 2.0 );
g_Cvar_BanLength 		= CreateConVar( "apm_banlength", "30", "The length in minutes that a player is banned for ping masking.", 0 );
g_Cvar_TimerInterval 	= CreateConVar( "apm_timerinterval", "15", "The interval time, in seconds, that the timer should tick at to check for ping masking clients.", 0 );
```

**apm_handler** ![icon11](/images-wiki/icon11.gif) Définis si le joueur sera kické ou banni (0 = kick, 1 = ban)<br />
**apm_banLength** ![icon11](/images-wiki/icon11.gif) Définis la durée du ban (apm_handler doit être à 1 !)<br />
**apm_timerinterval** ![icon11](/images-wiki/icon11.gif) Durée (en secondes) entre chaque vérification<br />

Sauvegarder les modifications puis [compiler le plugin](http://www.sourcemod.net/compiler.php), cliquez sur le lien de téléchargement donné puis enregistrez le dans **X:\addons\sourcemod\plugins** en écrasant l'ancienne version.

N'oubliez pas de transférer le fichier **antipingmask.smx** via votre FTP (**/games/l4d2/left4dead2/addons/sourcemod/plugins**) après la compilation.

Pour modifier la traduction française de ce plugin, il vous faudra éditer le fichier **antipingmask.phrases.txt** du dossier **/games/l4d2/left4dead2/addons/sourcemod/translations/fr/**.

Sauvegarder les modifications puis redémarrer votre serveur.

## Vérification de l'installation

- 1. Tapez la commande suivante dans la console de votre serveur (par RCON ou via le logiciel [[Hlsw|HLSW]) :<br />

- Rcon ![icon11](/images-wiki/icon11.gif) **rcon_password votre_passe_rcon** ![icon11](/images-wiki/icon11.gif) **rcon sm plugins list**

- [[Hlsw|HLSW]) ![icon11](/images-wiki/icon11.gif) **sm plugins list**

Cette commande sert à afficher la liste des plugins SourceMod installés sur votre serveur :

```text
 "Anti-Ping Mask" (1.6.1) by atom0s
```

[Source du plugin](http://forums.alliedmods.net/showthread.php?t=98195)
