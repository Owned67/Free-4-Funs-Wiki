---
title: "Crown Statistic"
---

## Présentation

Crown Statistic permet d'afficher vos statistiques ou le top10 sur le nombre de witch qui ont été tué (oneshot ou crowned) sur votre serveur.

## Téléchargement

[Crown Statistic](https://tutocss.pages-perso.free.fr/wiki/l4d2_crown_statistic.zip)

## Installation

- 1. Téléchargez l'archive
- 2. Décompressez l'archive sur votre ordinateur (avec un logiciel de décompression...)

- 3. Envoyez le contenu des dossiers **addons** dans le répertoire **/games/l4d2/left4dead2** de votre serveur FTP

- 4. Redémarrez votre serveur

## Configuration

`cvar_welcomemsg = CreateConVar("l4d2_crownstat_welcomemsg", "1", "Witch crown statistic - welcome message enable/disable", CVAR_FLAGS);<br /> 	 	RegConsoleCmd("sm_crowns_own", Command_Crowns_Own, "Shows your own crown count.");<br /> 	RegConsoleCmd("sm_crowns_top", Command_Crowns_Top, "Shows the top 5 crowners.");<br /> 	RegAdminCmd("sm_crowns_reset_all", Command_Reset_All, ADMFLAG_BAN, "Only Admins: Reset the whole crown database.");<br /> 	RegAdminCmd("sm_crowns_reset_one", Command_Reset_One, ADMFLAG_BAN, "Only Admins: Reset the crowns of one client. Parameter: Steam_id");`<br />

**l4d2_crownstat_welcomemsg** ![icon11](/images-wiki/icon11.gif) 0 : désactive; Affiche un message aux joueurs sur l'utilisation du plugin<br />

**sm_crowns_own** ![icon11](/images-wiki/icon11.gif) Affiche le nombre de witch que vous avez crowned.<br /> Utilisation console : **sm_crowns_own**<br /> .Utilisation chat : **!crowns_own**<br />
**sm_crowns_top** ![icon11](/images-wiki/icon11.gif) Affiche le top10 de witc qui ont été crowned.<br /> Utilisation console : **sm_crowns_top**.<br /> Utilisation chat : **!top**<br />
**sm_crowns_reset_all** ![icon11](/images-wiki/icon11.gif) Réinitialise toutes les statistiques.<br />
**sm_crowns_reset_one** ![icon11](/images-wiki/icon11.gif) Réinitialise les statistiques d'un joueur (bug).<br />

Redémarrez votre serveur après avoir terminé les modifications.

Le fichier contenant les statistiques pourra être trouvé dans **/games/l4d2/left4dead2/cfg/** ![icon11](/images-wiki/icon11.gif) **witch_crown_database.txt**.

## Vérification de l'installation

- 1. Tapez la commande suivante dans la console de votre serveur (par RCON ou via le logiciel [HLSW](/divers/hlsw/)) :<br />

- Rcon ![icon11](/images-wiki/icon11.gif) **rcon_password votre_passe_rcon** ![icon11](/images-wiki/icon11.gif) **rcon sm plugins list**

- [HLSW](/divers/hlsw/) ![icon11](/images-wiki/icon11.gif) **sm plugins list**

Cette commande sert à afficher la liste des plugins SourceMod installés sur votre serveur :

```text
 "Witch crown statistic" (1.0.2) by Die Teetasse
```

[Source du plugin](http://forums.alliedmods.net/showthread.php?t=123433)
