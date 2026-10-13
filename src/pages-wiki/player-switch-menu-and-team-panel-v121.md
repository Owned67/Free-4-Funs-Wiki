---
title: "Player Switch Menu and Team Panel v1.2.1"
---

## Présentation

Le plugin permet de swapper un ou deux joueurs ainsi que d'autoriser les joueurs à avoir le menu pour permettre de se swapper. (compatible L4D1 et L4D2).

## Téléchargement

[Player Switch Menu and Team Panel v1.2.1](https://tutocss.pages-perso.free.fr/wiki/PlayerSwitchMenuandTeamPanel.zip)

## Installation / Configuration

## Comment installer le plugin ?

- 1. Téléchargez l'archive
- 2. Décompressez l'archive sur votre ordinateur (avec un logiciel de décompression...)

- 3. Envoyez le contenu du dossier addons dans le dossier **/games/l4d2/left4dead2** de votre serveur FTP

- 4. Redémarrez le serveur

## Comment configurer le plugin ?

Avec un éditeur de texte, ouvrez le fichier **l4d2_bwa_teamspanel.sp** situé dans le répertoire **X:\addons\sourcemod\scripting**, la configuration s'effectue de la ligne 189 à 193 :

```text
     	allowpubs = CreateConVar("l4d2_BwA_TeamPanel_AllowPubs", "1", "Allow public access to commands [0 = No|1 = Yes]", FCVAR_PLUGIN|FCVAR_SPONLY|FCVAR_NOTIFY, true, 0.0, true, 1.0);
	selectTeamFromPanel = CreateConVar("l4d2_BwA_SelectTeam_From_Panel", "1", "Allow players to press 1,2 or 3 to select Spectator, Survivor or Infected from the Team Panel [0 = No|1 = Yes]", FCVAR_PLUGIN|FCVAR_SPONLY|FCVAR_NOTIFY, true, 0.0, true, 1.0);
	cv_PrintMsgType = CreateConVar("l4d2_BwA_Print_Chat_MsgType", "2", "Determine the type and frequency of information printed to the in game chat [0 = none|1 = simple messages|2 = verbose color coded messages]", FCVAR_PLUGIN|FCVAR_SPONLY|FCVAR_NOTIFY, true, 0.0, true, 2.0);
	showClientID = CreateConVar("l4d2_BwA_Show_ClientID", "1", "Show the clientid next to the player name in the panel [0 = No|1 = Yes]", FCVAR_PLUGIN|FCVAR_SPONLY|FCVAR_NOTIFY, true, 0.0, true, 1.0);
	cv_enablepause = CreateConVar("l4d2_BwA_TeamPanel_EnablePause", "1", "Enable/Disable this plugins pause feature (default = 1) [0 = disabled|1 = enabled]", FCVAR_PLUGIN|FCVAR_SPONLY|FCVAR_NOTIFY, true, 0.0, true, 1.0);
```

**allowpubs** ![icon11](/images-wiki/icon11.gif) 0 = désactivé, 1 = tout les joueurs pourront accéder à la commande<br />
**selectTeamFromPanel** ![icon11](/images-wiki/icon11.gif) 0 = désactivé, 1 = autorise les joueurs à pouvoir choisir leur équipe lorsqu'ils sont sur le serveur.<br />
**cv_PrintMsgType** ![icon11](/images-wiki/icon11.gif) 0 = désactivé, 1 = permet d'afficher un message dans le chat (1 = simple message, 2 = message coloré)<br />
**showClientID** ![icon11](/images-wiki/icon11.gif) 0 = désactivé, 1 = affiche l'ID du joueur dans le menu.<br />
**cv_enablepause** ![icon11](/images-wiki/icon11.gif) 0 = désactivé, 1 = autorise à mettre une pause.<br /><br />

Sauvegarder les modifications puis compiler le plugin sur votre PC.

N'oubliez pas de transférer le fichier **l4d2_bwa_teamspanel.smx** via votre FTP après la compilation.

Redémarrer votre serveur et Enjoy.

## Vérification de l'installation

- 1. Tapez la commande suivante dans la console de votre serveur (par RCON ou via le logiciel [HLSW](/pages-wiki/hlsw)) :<br />

- Rcon ![icon11](/images-wiki/icon11.gif) **rcon_password votre_passe_rcon** ![icon11](/images-wiki/icon11.gif) **rcon sm plugins list**

- [HLSW](/pages-wiki/hlsw) ![icon11](/images-wiki/icon11.gif) **sm plugins list**

Cette commande sert à afficher la liste des plugins SourceMod installés sur votre serveur :

```text
 "Jesters Players Panel and Switch Menu" (1.2.2) by -=BwA=- Jester
```

[Source du plugin](https://forums.alliedmods.net/showthread.php?p=1402881)
