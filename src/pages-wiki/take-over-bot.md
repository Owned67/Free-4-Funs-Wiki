---
title: "Take Over Bot"
---

## Présentation

Take Over Bot permet de prendre le contrôle d'un bot mort lorsque vous êtes mis à terre ou mort (compatible uniquement L4D2).

## Téléchargement

[Take Over Bot](https://tutocss.pages-perso.free.fr/wiki/TakeOverBot.zip)

## Installation

- 1. Téléchargez l'archive
- 2. Décompressez l'archive sur votre ordinateur (avec un logiciel de décompression...)

- 3. Envoyez le contenu des dossiers **addons** dans le répertoire **/games/l4d2/left4dead2** de votre serveur FTP

- 4. Redémarrez votre serveur

## Configuration

Après avoir redémarre votre serveur, le fichier **l4d_takeover.cfg** sera créé dans le répertoire **/games/l4d2/left4dead2/cfg/sourcemod**.

`cvar_ManualTO = CreateConVar("l4d_takeover_manual", "1", "Allow dead survivor players to execute console command \"sm_takeover\" to takeover a survivor bot.", FCVAR_PLUGIN, true, 0.0, true, 1.0);<br /> 	cvar_ManualTOIncap = CreateConVar("l4d_takeover_manualincap", "0", "Allow incapped survivor players to execute console command \"sm_takeover\" to takeover a survivor bot.", FCVAR_PLUGIN, true, 0.0, true, 1.0);<br /> 	cvar_AutoTOIncap = CreateConVar("l4d_takeover_autoincap", "0", "Execute a takeover automatically when a player incaps.", FCVAR_PLUGIN, true, 0.0, true, 1.0);<br /> 	cvar_AutoTODeath = CreateConVar("l4d_takeover_autodeath", "1", "Execute a takeover automatically when a player dies. Enabling this will disable the takeover voting.", FCVAR_PLUGIN, true, 0.0, true, 1.0);<br /> 	cvar_RequestTOConfirmation = CreateConVar("l4d_takeover_requestconf", "1", "Request confirmation from the player before executing a takeover.", FCVAR_PLUGIN, true, 0.0, true, 1.0);<br /> 	cvar_EnableTOVoting = CreateConVar("l4d_takeover_votingenabled", "0", "Initiate a vote for a takeover when a player dies.", FCVAR_PLUGIN, true, 0.0, true, 1.0);<br /> 	cvar_TOVotingTime = CreateConVar("l4d_takeover_votingtime", "20", "Time to cast a takeover vote.", FCVAR_PLUGIN, true, 10.0, true, 60.0);<br /> 	cvar_TOChoosingTime = CreateConVar("l4d_takeover_choosingtime", "10", "Time to cast a takeover choice.", FCVAR_PLUGIN, true, 10.0, true, 60.0);<br /> 	cvar_TODelay = CreateConVar("l4d_takeover_delay", "5", "Delay after a possible takeover is found and before showing any panels to anyone.", FCVAR_PLUGIN, true, 0.0);<br /> 	cvar_FinaleOnly = CreateConVar("l4d_takeover_finaleonly", "0", "Allow takeovers only in finale maps.", FCVAR_PLUGIN, true, 0.0, true, 1.0);<br /> 	cvar_DisplayBotName = CreateConVar("l4d_takeover_displaybotname", "1", "Display the bot name when a takeover executes.", FCVAR_PLUGIN, true, 0.0, true, 1.0);`<br />

**l4d_takeover_manual** ![icon11](/images-wiki/icon11.gif) 0 : désactive; 1 : permet aux joueurs morts d'exécuter la commande **sm_takeover** à partir de la console pour prendre le contrôle d'un bot<br />
**l4d_takeover_autoincap** ![icon11](/images-wiki/icon11.gif) Exécute automatiquement la prise de contrôle lorsqu'un joueur est mis à terre.<br />
**l4d_takeover_autoindeath** ![icon11](/images-wiki/icon11.gif) Exécute automatiquement la prise de contrôle lorsqu'un joueur est mort.<br />
**l4d_takeover_requestconf** ![icon11](/images-wiki/icon11.gif) Demande une confirmation au joueur avant qu'il ne prenne le contrôle.<br />
**l4d_takeover_votingenabled** ![icon11](/images-wiki/icon11.gif) Initialise un vote pour une prise de contrôle quand un joueur est mort.<br />
**l4d_takeover_votingtime** ![icon11](/images-wiki/icon11.gif)Time to cast a takeover vote.<br />
**l4d_takeover_choosingtime** ![icon11](/images-wiki/icon11.gif) Time to cast a takeover choice.<br />
**l4d_takeover_delay** ![icon11](/images-wiki/icon11.gif) Délai en secondes pour autoriser à prendre le contrôle.<br />
**l4d_takeover_finaleonly** ![icon11](/images-wiki/icon11.gif) Autorise la prise de contrôle uniquement sur la finale.<br />
**l4d_takeover_displaybotname** ![icon11](/images-wiki/icon11.gif) Affiche le nom du bot.<br />

Redémarrez votre serveur après avoir terminé les modifications.

## Vérification de l'installation

- 1. Tapez la commande suivante dans la console de votre serveur (par RCON ou via le logiciel [HLSW](/pages-wiki/hlsw)) :<br />

- Rcon ![icon11](/images-wiki/icon11.gif) **rcon_password votre_passe_rcon** ![icon11](/images-wiki/icon11.gif) **rcon sm plugins list**

- [HLSW](/pages-wiki/hlsw) ![icon11](/images-wiki/icon11.gif) **sm plugins list**

Cette commande sert à afficher la liste des plugins SourceMod installés sur votre serveur :

```text
 "Survivor Bot Takeover" (0.8) by Mikko Andersson (muukis)
```

[Source du plugin](https://www.sourcemod.net/showthread.php?t=83869)
