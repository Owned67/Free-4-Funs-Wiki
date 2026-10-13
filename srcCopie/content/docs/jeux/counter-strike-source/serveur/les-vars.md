---
title: "Les vars"
---

## Introduction

Voici la notice d'utilisation des commandes **rcon** pour un serveur:

Tout d'abord pour pouvoir entrer les commandes, il faut utiliser la console (cf => [Afficher sa console](/jeux/counter-strike-source/joueurs/afficher-sa-console/))

Première étape : s'identifier !
Si vous êtes sur le serveur, il faut se munir du mot de passe rcon et rentrer dans la console:

```text
  rcon_password votremotdepassercon
```

Si vous n'êtes pas sur le serveur il faut donc faire au préalable:

```text
  rcon_adress votreipserver:leport
```

puis

```text
  rcon_password votremotdepassercon
```

Voilà ! Maintenant il faudra précéder toutes les commandes destinées au serveur par rcon.
Par exemple pour changer la map, il faudra écrire :

```text
  rcon changelevel lenomdelamap
```

*Attention:* Toutes les commandes exécutées en cours de partie ne seront prise en compte que pendant cette partie et au changement de map, le serveur redémarrera avec les valeurs du server.cfg !

Citer toutes les cars est impossible car elle sont bien trop nombreuses donc voici une liste qui sont le plus souvent utilisés :

## Les commandes sv_ :

```text
  sv_cheats 0                // Fixé à (1) active la possibilité de tricher (Donc laissez à 0).
  sv_gravity 800            // permet de modifiez la gravité au cours du jeu (défaut:800).
  sv_maxspeed 320       // Vitesse Max d'un joueur quand il se déplace (320 par défaut). 
  sv_pausable 0            // Activer (1) la fonction Pause du Serveur.
  sv_timeout 65            // temps Max (en s) avant d'être kické par le serveur pour cause d'inactivité.
  sv_alltalk                   // (0) ou (1) (Sur 1, Permet à tout les joueurs, mort, vivant, toutes équipes .
  sv_password xxx        // Change le mot de passe du serveur (remplacer les xxx par le nouveau mot de pass ou laisser libre pour l'enlever).
```

## Les bots :

```text
  bot_add_ct                // Permet d'ajouter un bot en CT.
  bot_add_t                 // Permet d'ajouter un bot en T.
  bot_add                    // Permet d'ajouter un bot en automatique.
  bot_difficulty             // (0) Facile / (1) moyen / (2) Difficile / (3) Surhumain.
  bot_kick                   // Enlever tout les bots de votre serveur.
  bot_kill                    //  Tue tout les bots de votre serveur.
  bot_prefix "votre_prefix"       // Défini un préfixe pour tous les noms de bots.
  bot_quota 2              // Règle le minimum de bot sur un serveur (ici 2 bots seront sur le serveur).
  bot_auto_vacate 1    // Retrait automatique des bots quand des joueurs se connecte (0 = désactivé).
```

## Les commandes mp_ :

```text
  mp_allowspectators 1      // Activer (1) autorise les spectateurs sur le serveur (0=pas de spectateur).
  mp_autokick 0               // Activer (1) Autokick des AFK et TK (joueur inactifs et TeamKiller). 
  mp_autoteambalance 1   // Activer (1) l'équilibrage automatique des équipes. 
  mp_buytime 0.5             // Temps (en Min) pour acheter des armes (0.5 min = 30 sec). 
  mp_chattime 8               // Temps à la fin de la map pour parler avant la map suivante (en secondes).
  mp_c4timer 35               // Nombre de seconde avant l'explosion de la bombe (en secondes).
  mp_flashlight 1              // Activer (1) les flash. 
  mp_footsteps 1             // Activer (1) le son des bruits de pas. 
  mp_forcerespawn 0       // Activer la renaissance des joueurs apres avoir été tué. 
  mp_fraglimit 0              // Nb de frags limite avant le Changement de Map  
  mp_freezetime 4          // Temps (en s) où les joueurs sont bloqués au début d'un Round, à 0 permet
                                  de démarrer le round sans attendre (évite les respawn killer). 
  mp_friendlyfire 1          // Activer (1) les tirs sur ces coéquipiers sont pris en compte.
  mp_hostagepenalty 0    // Nb d'otages tués avant d'être kickés. 
  mp_limitteams 1           // Ecart max de joueurs entre les 2 Teams. 
  mp_logfile 1                 // Activer (1) le dossier log .
  mp_maxrounds 0          // Nb max de rounds avant le changement de map. 
  mp_restartgame X         // Permet d'effectuer un restart X seconde après avoir activée la commande.
  mp_roundtime 3            // Temps limite des rounds (en minutes).
  mp_spawnprotectiontime 5  // Protége pendant X secondes des TK.
  mp_startmoney 16000         // Montant en $ que possède le joueur au démarrage du jeu (défaut: 800, max: 16000). 
  mp_timelimit 30           // La limite de temps avant un changement de map (en minutes).
  mp_weaponstay 1         // Les Armes restent au sol quand le round commence (pour les maps Fy...).
  mp_winlimit 0             // Nb Max de Round Gagnés par la même Team avant le Changement de Map.
```

## Les commandes inclassables :

```text
  changelevel XXXX     // Change la map avec le nom de la map à la place de XXXX.
  hostname ""        // Change le nom du serveur à la place de XXXX.
```

## Plus de Cvars ?

Connecter vous à votre serveur (n'installer rien, laisser le serveur vierge) et identifier vous au rcon puis taper :

```text
 rcon cvarlist
```

ou par [HLSW](/divers/hlsw/) :

```text
 cvarlist
```

[Cvar CSS 2013](https://tutocss.pages-perso.free.fr/wiki/cvar_list_css.txt)
