---
title: "Release Infected's Victim"
---

## Présentation

Release Infected's Victim permet aux infectés spéciaux (hunter, jockey et charger) de relâcher la victime lors d'une attaque.

## Téléchargement

[Release Infected's Victim](https://tutocss.pages-perso.free.fr/wiki/l4d2_infected_release.zip)

## Installation

- 1. Téléchargez l'archive
- 2. Décompressez l'archive sur votre ordinateur (avec un logiciel de décompression...)

- 3. Envoyez le contenu des dossiers **addons** dans le répertoire **/games/l4d2/left4dead2** de votre serveur FTP

- 4. Redémarrez votre serveur

## Configuration

Après avoir redémarre votre serveur, le fichier **l4d2_infected_release.cfg** sera créé dans le répertoire **/games/l4d2/left4dead2/cfg/sourcemod**.

`g_hConVar_JockeyReleaseOn = CreateConVar("l4d2_jockey_dismount_on", "1", "Jockey dismount is on or off. 1 = on", FCVAR_PLUGIN|FCVAR_NOTIFY);<br /> 	g_hConVar_HunterReleaseOn = CreateConVar("l4d2_hunter_release_on", "1", "Hunter release is on or off. 1 = on", FCVAR_PLUGIN|FCVAR_NOTIFY);<br /> 	g_hConVar_ChargerReleaseOn = CreateConVar("l4d2_charger_release_on", "1", "Charger release is on or off. 1 = on", FCVAR_PLUGIN|FCVAR_NOTIFY);<br /> 	g_hConVar_JockeyAttackDelay = CreateConVar("l4d2_jockey_attackdelay", "3.0", "After dismounting with the jockey, how long can the player not use attack1 and attack2", FCVAR_PLUGIN|FCVAR_NOTIFY, true);<br /> 	g_hConVar_HunterAttackDelay = CreateConVar("l4d2_hunter_attackdelay", "3.0", "After dismounting with the hunter, how long can the player not use attack1 and attack2", FCVAR_PLUGIN|FCVAR_NOTIFY, true);<br /> 	g_hConVar_ChargerAttackDelay = CreateConVar("l4d2_charger_attackdelay", "3.0", "After dismounting with the charger, how long can the player not use attack1 and attack2", FCVAR_PLUGIN|FCVAR_NOTIFY, true);<br />`<br />

**l4d2_jockey_dismount_on** ![icon11](/images-wiki/icon11.gif) 0 : désactive; 1 permet au jockey de relâcher la victime (boutton correspondant au bash MOUSE2).<br />
**l4d2_jockey_attackdelay** ![icon11](/images-wiki/icon11.gif) Durée en secondes que le jockey doit attendre avant de ré attaquez un joueur après l'avoir lâché.<br />
**l4d2_hunter_release_on** ![icon11](/images-wiki/icon11.gif)  0 : désactive; 1 permet au hunter de relâcher la victime.<br />
**l4d2_hunter_attackdelay_on** ![icon11](/images-wiki/icon11.gif) Durée en secondes que le hunter doit attendre avant de ré attaquez un joueur après l'avoir lâché.<br />
**l4d2_charger_release_on** ![icon11](/images-wiki/icon11.gif)  0 : désactive; 1 permet au charger de relâcher la victime.<br />
**l4d2_charger_attackdelay_on** ![icon11](/images-wiki/icon11.gif) Durée en secondes que le charger doit attendre avant de ré attaquez un joueur après l'avoir lâché.<br />

Vous voulez utiliser le plugin uniquement pour des admins ou V.I.P :

Éditez le fichier **l4d2_infected_release.sp** :

Rechercher :

```text
 if (buttons & IN_ATTACK2 && !g_ButtonDelay[client])
```

Ajouter au-dessus :

```text
 if (!IsClientMembre(client))
return Plugin_Stop;
```

Ajouter tout en bas :
`bool:IsClientMembre(client)<br /> {<br /> 	new AdminId:id = GetUserAdmin(client);<br /><br /> 	  	if (id == INVALID_ADMIN_ID)<br /> 		return false;<br /> 	 	// Ici, seul les joueurs ayant le flag (a et z) pourront utiliser le plugin<br /> 	if (GetAdminFlag(id, Admin_Reservation)||GetAdminFlag(id, Admin_Root))<br /> 		return true;<br /> 	else<br /> 	return false;<br /> }`

Maintenant, il ne vous reste plus qu'à compiler votre plugin et de l'uploader sur votre FTP.

Redémarrez votre serveur et Enjoy.

## Vérification de l'installation

- 1. Tapez la commande suivante dans la console de votre serveur (par RCON ou via le logiciel [HLSW](/divers/hlsw/)) :<br />

- Rcon ![icon11](/images-wiki/icon11.gif) **rcon_password votre_passe_rcon** ![icon11](/images-wiki/icon11.gif) **rcon sm plugins list**

- [HLSW](/divers/hlsw/) ![icon11](/images-wiki/icon11.gif) **sm plugins list**

Cette commande sert à afficher la liste des plugins SourceMod installés sur votre serveur :

```text
 "[L4D2] Infected Release" (1.3a) by Thraka
```

[Source du plugin](http://forums.alliedmods.net/showthread.php?t=109715)
