---
title: "Sourcemod L4D2"
---

![Sourcemod](/images-wiki/Sourcemod.png)

## Introduction

SourceMod est un plugin d'administration et contient des plugins pour rendre agréable votre serveur de jeu.

![Warning](/images-wiki/Warning.png) Les arborescences FTP sont différents selon le prestataire chez lequel vous avez souscrit un contrat de location. C'est à vous d'adapter en fonction de votre FTP.

## Requis

Metamod doit être installé sur votre serveur, si tel n'est pas le cas, référez vous à notre tutoriel :<br />

- [Metamod L4D2](/jeux/left-4-dead-2/plugins/metamod-l4d2/)

## Téléchargement

- [Sourcemod 1.6.3](http://www.sourcemod.net/downloads.php)

## Installation

1 - Décompressez l'archive et uploadez son contenu sur votre serveur FTP en **RESPECTANT** l'arborescence.

2 - Redémarrer le serveur

3 - Pour vérifier que l'installation s'est bien passée, tapez **sm version list** dans HLSW. La ligne suivante doit apparaitre:

```text
 -Id- Name                  Version     Author           Status <br /> 
 [XX] SourceMod             1.x.x   AlliedModders,   RUN <br />
```

----

## Configuration

Le premier fichier où vous pouvez configurer SourceMod est: **../left4dead2/addons/sourcemod/sourcemod/configs/core.cfg**

Voici les variables que vous retrouvez dans ce fichier :<br /><br />

```text
/**
* Cette option détermine si on permet l'enregistrement de fichier pour SourceMod
* "on"- On permet l'enregistrement(option par défaut)/Logging is enabled (default)
* "off"- On ne permet pas l'enregistrement/Logging is disabled
*/

  "Logging""on"

/**
* Cette option détermine comment l'enregistrement des log de SourceMod devrait être fait
* "daily"- Le nouveau fichier de logs est créé chaque jour (mode par dédaut)/New log file is created  for each day (default)
* "map"- Le nouveau fichier de logs est créé a chaque map /New log file is created for each map   change
* "game"- Utilisez les fichiers de logs du jeu/Use game's log files
*/
 "LogMode""daily"

/**
* La langue que les plugins et les extensions utiliseront pour imprimer des messages(si il n'y a aucune traduction cela s'affichera en anglais).
* Seul les langues lister dans le fichier languages.cfg sont valide
* la valeur par défaut est "en" pour english "fr" pour francais etc
*/
 "ServerLang""fr"

 /**
 syntaxe pour une commande en say en public vu par tout le monde
/
 "PublicChatTrigger""!"

/**
* syntaxe pour une commande en say en privé non vu par le reste des joueurs
*/
 "SilentChatTrigger""/"

/**
* If a say command is a silent chat trigger, and is used by an admin
, 
* but it does not evaluate to an actual command, it will be displayed 
* publicly.This setting allows you to suppress accidental typings.
*
* The default value is "no".A value of "yes" will supress.
*/

/**
* La variable permet de rendre ou non les commandes executes par un admin dans le chat
* Valeur par defaut est "no"
* Valeur a "yes" permet de reprimer
 "SilentFailSuppress""no"

/**
* Password setinfo key that clients must set.You must change this in order for
* passwords to work, for security reasons.
*/
 "PassInfoVar""_password"

/**
* Spécifie le son qui est joué quand on utilise le menu admin
*/
 "MenuItemSound""buttons/button14.wav"

/**
* spécifie le son qui est joué quand on sort du menu
*/
 "MenuExitSound""buttons/combine_button7.wav"

/**
* Spécifie le son joué lorsque l'ont choisis le retour en arrière dans le menu 
*/
 "MenuExitBackSound""buttons/combine_button7.wav"

/**
* active ou non le mode pour forcer le client css dans la meme langue que le serveur
* "on"- utilise le langage steam du joueur (mode par défaut )/Translate using the client's language  (default)
* "off"- force le joueur a avoir la méme langue que la langage serveur / Translate using default  server's language
*/
 "AllowClLanguageVar""On"

/**
* active ou non la mise à jour automatique de SourceMod
* par défaut la valeur est sur "no" si vous mettez "yes" cela bloquera mise à jour automatique
*/
 "DisableAutoUpdate""no"

/**
* si la valeur est "yes", une mise à jour du gamedata réussie essayera de redémarrer SourceMod.
* SourceMod est déchargé et rechargé et la map est changée.
* Les mises à jour arrivent quand les charges de serveur sont minime, l'impact devrait être  minimal.
* Mais être sûr, cette option est mise hors de service par défaut.
* forcer le serveur as redemareez aprés un update de sourcemode(par défaut sur non)
*/
 "ForceRestartAfterUpdate""no"

/**
* URL utilisé pour les update de sourcemode.
* SSL ce mode n'est pas supporter pour les updates.
*/
 "AutoUpdateURL""http://update.sourcemod.net/update/"

/**
* cree un log détaillez du gamedata durant le jeu (déconseiller sauf en cas du bug non resolu)
*/
 "DebugSpew""no"
```

Le deuxième fichier est: **../left4dead2/cfg/sourcemod/sourcemod.cfg**

Ce fichier sera exécuté à chaque changement de map.

```text
// Spécifie comment l'activité d'admim devrait être relayée aux utilisateurs. Additionnez les valeurs
// Ci-dessous pour obtenir la fonctionnalité que vous voulez.
// 1: Activité de l'admin vue sans le nom par tous.
// 2: Si 1 est spécifié, on montrera le nom de l'admin.
// 4: Activité d'admin en anonyme vu seulment par les autres admins.
// 8: Si 4 est spécifié, on montrera le nom de l'admin.
// 16: Toujours montr l'activité administrateur avec le nom  au admins root .
// --
// Default: 13 (1+4+8)
sm_show_activity 13

// Spécifie si on permet des sons de menu pour des menus créés par SourceMod.
// Les sons de menu peuvent être nouveaux configurés dans '''../left4dead2/addons/sourcemod/configs/core.cfg'''.
// --
// Default: 1
sm_menu_sounds 1

// Spécifie la durée en secondes entre deux vote public du méme utilisateur 
// Si vraiment on obéit à ce retard 
//Dépend du  the menu/command.
// --
// Default: 30
sm_vote_delay 30

// Format de l'heure du jour du mois de l'année quie st vu par l'utilisateur.
//pour toute les options voir ici: http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html
// --
// Default: %m/%d/%Y - %H:%M:%S
// 12 hour format: %m/%d/%Y - %I:%M:%S %p
sm_datetime_format "%m/%d/%Y - %H:%M:%S"

//Indique comment  SourceMod devrait vérifier des niveaux d'immunité entre les admins
// (voteban ou autre entre admins)
// 0: Ignorez des niveaux d'immunité (à part l'immunité de groupe spécifique).
// 1: Protégez des admins d'accès inférieur seulement.
// 2: Protégez des admins de méme niveau ou inférieur.
// 3: Même que 2, sauf que des admins sans immunité peuvent s'affecter.
// --
// Default: 1
sm_immunity_mode 1

// Correction en secondes sur SourceMod pour  ajuster les valeurs horaire afficher par le serveursi elle sont
// incorrectes. Cela peut être positif ou négatif et affectera chaque  système 
// dans SourceMod, y compris l'enregistrementdes logs.
// note: pour éviter cela vérifier que son serveur est bien regler a l'heure sous linux taper date en root
// --
// Default: 0
sm_time_adjustment 0

// Spécifie le temps que l'on permet entre des messages de chat. Cela 
// inclut le say et des commandes de say_team. Si un client envoie un message plus rapidement 
// que ce temps, il enregistre un message pour flood sur le serveur. Quand le client a accumulé
// 3 valeur de flood, On montre un message d'alerte de flood au lieu du message de chat.
// --
// Requires: antiflood.smx
// Default: 0.75
sm_flood_time 0.75

//Spécifie comment les slot réservées  fonctionnent. Les valeurs sont :
// 0 : Des slots publiques sont utilisées de préférence pour les slot réservées. Les slot Réservées sont libérées avant des slot publiques.
// 1 : Si quelqu'un avec un slot reserver rejoint le serveur,le joueur avec la latence(ping) la plus haute et 
// qui n'as pas de slot reservé (les joueurs qui sont en spectateur sont kicker d'abord) est kicker du serveur. Ainsi, les slots
// réservées restent toujours libres. La seule situation où le ou les slots réservée peut  occupée est 
// si le serveur est complet avec le slot remplaçant pour les clients.
// --
// Requis: reservedslots.smx
// Default: 0
sm_reserve_type 0

// Spécifie le nombre de slot de joueur réservées. Les utilisateurs avec le slot reservé 
// en flag  d'admins seront capables de rejoindre le serveur quand il n'y a aucun slot publique 
// maintenu. Si quelqu'un n'a pas ce flag, on le kick du serveur.
// (Des slot Publiques sont définies comme ceci : maxplayers -nombre de slot réservées)
//exemple si sm_reserved_slots 2 on auras que 22joueurs sur un serveur de 24 (2slotpv reservé)
// --
// Requis: reservedslots.smx
// Default: 0
sm_reserved_slots 0

// Spécifie si les slot réservées seront cachées (soustrait de Maxplayer) 
// Les valeurs valables sont 0 (visibles) ou 1 (cachées)
// exemple : sm_hide_slots 2 sur un serveur de 24joueurs sur hlsw ou steam le serveur apparaitra en 22slot maxi sur 24
// mais le serveur peut avoir 24 joueurs on pourra donc avoir 24/22 d'afficher
// Requires: reservedslots.smx
// Default: 0
sm_hide_slots 0

// Spécifie si vraiment les joueur public peuvent envoyer des messages à l'utilisation d'admins
// say_team @<message>. Les valeurs sont 0 (desactiver) or 1 (actif)
// exemple: en sayteam on envoie @bonjour l'admin recois en dialogue bonjour du joueur
// Requis: basechat.smx
// Default: 1
sm_chat_mode 1

// Spécifie si "timeleft" sera automatiquement déclenché chaque 
// x secondes. Des valeurs valables sont 0 (desactiver) à 1800 secondes.
//exemple: sm_timeleft_interval 160 le timeleft de la map apparaitra toutes les 160 secondes
// Requis: basetriggers.smx
// Default: 0
sm_timeleft_interval 0

// Spécifie si les demandes d'info en chat (say ou say team) apparaisse juste pour 
//le joueur qui a demandé le ou les renseignements.
// Les valeurs valables sont 0 (desactiver) ou 1 (activer)
// exemple: sm_trigger_show 1 (le joueur seul voit les infos recommandé)
// Requis: basetriggers.smx
// Default: 1
sm_trigger_show 1

// Indique s'il faut ou non afficher la progression de vote à ses clients
// en bas de l'ecran dans la plupart des jeux).
// 0 Desactive ou 1 Active.
// --
// Default: 0
sm_vote_progress_hintbox 0

// Indique s'il faut ou non afficher la progression des votes aux joueurs dans le chat. 
// 0 Desactive ou 1 Active.
// --
// Default: 0
sm_vote_progress_chat 0

// Indique s'il faut ou non afficher la progression des votes dans la console du serveur
// 0 Desactive ou 1 Active.
// --
// Default: 0
sm_vote_progress_console 0

// Indique s'il faut ou non afficher la progression des votes dans la console du joueur
// 0 Desactive ou 1 Active.
// --
// Default: 0
sm_vote_progress_client_console 0
```

## Ajouter un admin

Les droits peuvent être consultés dans le fichier  **../left4dead2/addons/sourcemod/configs/admin_levels.cfg**.

**Droits** :

a : Acces au slot réservé.<br />
b : Admin generique.<br />
c : Kicker d'autre joueur.<br />
d : Bannir d'autre joueur.<br />
e : Débannir.<br />
f : Slayer/tuer d'autres joueurs.<br />
g : Changer de map.<br />
h : Modifier les cvars.<br />
i : Executer les fichiers de configs (.cfg).<br />
j : Privilèges pour discuter.<br />
k : Créer ou lancer un vote.<br />
l : Mettre un mot de passe sur le serveur.<br />
m : Utiliser les commandes RCON.<br />
n : Modifier la commande sv_cheats ou utiliser des commandes pour tricher.<br />
z : Affecte tous les droits ci-dessus.<br />

1 - Editez le fichier **../left4dead2/addons/sourcemod/configs/admins_simple.ini**

2 - Ajoutez votre SteamID ou IP entre guillemets suivis des flags de droits entre guillemets.

3 - Sauvegardez le fichier et envoyer le sur le serveur ftp.

4 - Redémarrer le serveur

**Exemple :**

"STEAM_0:1:XXXXX"    "bce"		 // Droit de kicker, bannir, et slayer<br />
"127.0.0.1"          "z"		 // Tous les droits autorisés<br />
"STEAM_0:1:XXXXX"    "99:z"              // Tous les droits autorisés avec l'immunité totale<br />

## Liste des commandes

**Commandes console** :

Les &lt;> signifie que le paramètre est obligatoire. <br />
Les [] signifie que le paramètre est optionnel.<br />

Il y a plusieurs facons de désigner un joueur:<br />

```text
- name : Ceci peut être une partie du pseudo du joueur. Par exemple pour bannir MagicYan on peut tapez : sm_ban Magic (si plusieurs joueurs ont Magic dans leur pseudo, un message d'erreur sera retourné).<br />
- #userid : Le IDJoueur peut être trouvé en tapant "users" dans la console).<br />
- #name : Si on met # devant le nom du joueur alors il faut spécifier le pseudo exact du joueur.<br />
```

sm_kick &lt;#ID Joueur|pseudo> [raison] (Kicker un joueur)<br />
sm_map &lt;map> (Changes la map en cours)<br />
sm_rcon &lt;commande> (Execute la commande via le rcon)<br />
sm_cvar &lt;cvar> [valeur]	(Recherche ou modifie la valeur de la cvar)<br />
sm_execcfg &lt;nom_du_fichier> (Execute le fichier de config, le chemin n'est pas obligatoire mais l'extension oui)<br />
sm_who [#IDJoueur|pseudo] (Liste tous les joueurs et leurs droits)<br />
sm_ban &lt;#IDJoueur|pseudo> &lt;minutes|0> [raison] (Bannir un joueur)<br />
sm_unban &lt;SteamID> (Débannir un steamID)<br />
sm_addban &lt;temps> &lt;SteamID> [raison] (Ajoute un steamID à la liste de bannis)<br />
sm_banip &lt;temps> &lt;IP> [raison] (Ajoute une IP à la liste de bannis)<br />

Toutes ces commandes peuvent être taper dans le chat. Il faut juste remplacer sm_ par **!** ou **/**.<br />

Pour bannir le joueur Owned, je taperai donc dans le chat: **!ban Owned**
Et si vous souhaitez que la commande ne soit pas vu par les autres joueurs, il faut tapez: **/ban Owned**

D'autres commandes permettent d'avoir des infos sur le plugin SourceMod :<br />

```text
sm version (affiche la version du plugin)
sm exts list (affiche les extensions du plugin installées)
sm plugins list (affiche les plugins de sourceMod installé)
sm cmds #id_plugin (affiche les commandes d'un plugin de sourceMod, on récupère l'id avec la commande sm plugins list)
```

Il existe bien d'autres cvar que nous ne détaillerons pas car elles sont simples à comprendre.

## Les Plugins

Vous pouvez retrouver des plugins compatibles SourceMod :<br /> [Plugins SourceMod L4D & L4D2](http://www.sourcemod.net/plugins.php?cat=0&mod=6&title=&author=&description=&search=1)

Pensez à bien vérifier pour quel version a été réalisé le plugin tout comme pour l'extension. En effet certains ne sont que compatible avec L4D1 et vice-versa.

## Compilation d'un plugin

Décompresser le contenu de l'archive dans le dossier **X:\chemin_ou_a_ete_extrait_sourcemod\sourcemod-1.5.2-windows\**.

![warning](/images-wiki/warning.png) Tous les plugins listés dans la catégorie L4D2 contiennent les extensions requises donc si vous télécharger l'archive ailleurs, pensez également à télécharger les fichiers requis.

Ouvez l'explorateur Windows ![icon11](/images-wiki/icon11.gif) **X:\chemin_ou_a_ete_extrait_sourcemod\sourcemod-1.5.2-windows\addons\sourcemod\scripting** ![icon11](/images-wiki/icon11.gif) clique gauche sur le fichier **l4d2_bwa_teamspanel.sp** et déplacer le sur l'exécutable **compile.exe** :

Appuyer sur la touche **Entrée** et le dossier **compiled** a été créé contenant notre fichier compilé.

Celui-ci devra être transférer dans le dossier **plugins**.

Vous pouvez également utiliser le [web pour compiler](http://www.sourcemod.net/compiler.phpsite) mais celui-ci risque de poser des problèmes si le plugin requiert des extensions...

[compiler le plugin](http://www.sourcemod.net/compiler.php), cliquez sur le lien de téléchargement donné puis enregistrez le dans **X:\addons\sourcemod\plugins** en écrasant l'ancienne version.

## Installation d'un plugin

1) Télécharger votre plugin et décompresser l'archive, dans la majorité des cas, le plugin est fournis compilé (.smw) et avec le code source (.sp), si toutefois le plugin ne contient que le fichier **.sp** alors il vous faudra la compiler vous même (cf un peu plus bas).

Le fichier **.smx** devra être placé dans le répertoire: **../left4dead2/addons/sourcemod/plugins/**

2) Selon le plugin, il pourra y avoir des fichiers supplémentaires, vous devrez respecter l'emplacement sur votre FTP. Généralement les auteurs de plugins respecte l'arborescence de base :

```text
 ../left4dead2/addons/sourcemod/configs
 ../left4dead2/addons/sourcemod/data
 ../left4dead2/addons/sourcemod/extensions
 ../left4dead2/addons/sourcemod/gamedata
 ../left4dead2/addons/sourcemod/plugins
 ../left4dead2/addons/sourcemod/scripting
 ../left4dead2/addons/sourcemod/translations
 ../left4dead2/cfg/sourcemod
```

3) Redémarrer le serveur.

4) Vérifier que le plugin est bien chargé en tapant **sm plugins list** dans la console ou via [HLSW](/divers/hlsw/).

**NOTE** :  Certains plugins auront besoin d'une extension pour fonctionner correctement donc veillez à télécharger l'extension requise !

![warning](/images-wiki/warning.png) Les plugins suivants sont incompatibles avec L4D2 :

- [Automatic Steam Update](https://forums.alliedmods.net/showthread.php?t=170532),

- [SteamTools Game Description Override](https://forums.alliedmods.net/showthread.php?t=170527)

Liste non exhaustive.

Liste de plugins incompatible avec les offres serveurs mutualisés :

- [Shutdown Countdown](https://forums.alliedmods.net/showthread.php?t=165840)

Liste non exhaustive.

## Activer ou Désactiver un plugin

Activer un plugin :
Le simple faite d'uploader le plugin suffit à l'activer :-)

Désactiver un plugin :

Vous devrez déplacer le fichier **.smx** du répertoire **../left4dead2/addons/sourcemod/plugins/** dans le dossier **../left4dead2/addons/sourcemod/plugins/disabled/**

Il vous faudra redémarrer votre serveur !

## Liste de Plugins

Quelques plugins parmi tant d'autres.... A note que les plugins sont à jour, les fichiers du dossier gamedata aussi donc pensez à bien vérifier lors de la mise à jour, selon le plugin, il serait préférable de supprimer l'ancienne version et d'uploader la nouvelle en conservant le fichier de configuration !

- [Anti Ping Mask](/jeux/left-4-dead-2/plugins/anti-ping-mask/) Permet de kicker ou de bannir les joueurs qui s'amuse à modifier leur rates pour avoir un faux ping (compatible L4D, L4D2 et tous les autres jeux).

- [Anti Rate Hack](/jeux/left-4-dead-2/plugins/anti-rate-hack/) Permet de kicker les joueurs qui s'amuse à modifier leur rates trop souvent (compatible L4D, L4D2 et tous les jeux).

- [Black and White Notifier](/jeux/left-4-dead-2/plugins/black-and-white-notifier/) Affiche un message dans le HUD lorsqu'un joueur est en noir et blanc (proche de la mort :P) (compatible L4D et L4D2).

- [Crown Statistic](/jeux/left-4-dead-2/plugins/crown-statistic/) Permet d'afficher vos statistiques ou le top10 sur le nombre de witch qui ont été tué (oneshot ou crowned) sur votre serveur.

- [Custom Player Stats v1.4B121](/jeux/left-4-dead-2/plugins/custom-player-stats-v14b121/) Permet d'avoir des statistiques détaillés selon les différents mode de jeux (compatible L4D et L4D2).

- Kick Load Stuckers Permet de kicker les joueurs qui mettent trop de temps à se connecter au serveur. (compatible L4D et L4D2).

- [Knife Unlock](/jeux/left-4-dead-2/plugins/knife-unlock/) Permet de débloquer le couteau. Le couteau a été bloqué par défaut car il se trouve que c'est l'arme la puissante du jeu (compatible uniquement L4D2).

- [MOTDgd Advertisements](/jeux/left-4-dead-2/plugins/motdgd-advertisements/) Ce plugin vous permet de rentabiliser vos serveurs, lors de la transition du joueur dans la fenêtre du Motd, une publicité aléatoire s'affichera (vidéo avec et/ou sans son, bannière) (compatible L4D et L4D2).

- [Gear Transfer](/jeux/left-4-dead-2/plugins/gear-transfer/) Permet de donner les équipements (kit de soin, adré, pipe, molo etc...) entre survivants et on peut autoriser les bots à faire de même (compatible L4D et L4D2).

- [Player Switch Menu and Team Panel v1.2.1](/jeux/left-4-dead-2/plugins/player-switch-menu-and-team-panel-v121/) Permet de swapper un ou deux joueurs ainsi que d'autoriser les joueurs à avoir le menu pour permettre de se swapper. (compatible L4D1 et L4D2).

- [Release Infected's Victim 1.3a](/jeux/left-4-dead-2/plugins/release-infecteds-victim/) Permet aux infectés spéciaux de relâcher la victime pendant une attaque (compatible uniquement L4D2).

- [Save Chat 1.2.1](/jeux/left-4-dead-2/plugins/save-chat/) Permet de sauvegarder toute les discussions écrites dans un fichier **.log**.

- [SourceBans v1.4.11 FR](/jeux/counter-strike-source/plugins/sourcebans-1411-fr/) Sourcebans est un plugin de gestion des bans via une interface web (compatible L4D, L4D2 et tous les jeux).

- [Take Over Bot](/jeux/left-4-dead-2/plugins/take-over-bot/) Permet de prendre le contrôle d'un bot mort lorsque vous êtes mis à terre ou mort (compatible uniquement L4D2).

- [Tank Damage Announce by griffin](/jeux/left-4-dead-2/plugins/tank-damage-announce-by-griffin/) Affiche les dégâts infligés au Tank. (compatible uniquement L4D2).

- [Thirdpersonshoulder Block](/jeux/left-4-dead-2/plugins/thirdpersonshoulder-block/) Permet de bloquer les joueurs ayant activé la variable **Thirdpersonshoulder**. (compatible uniquement L4D et L4D2).

- [Very Basic High Ping Kicker](/jeux/left-4-dead-2/plugins/very-basic-high-ping-kicker/) Permet de kicker les joueurs ayant un ping assez élevés (compatible L4D et L4D2 et tous les autres jeux).

- [Vote Blocker 1.3.1](/jeux/left-4-dead-2/plugins/vote-blocker/) Ce plugin permet d'immuniser vos admins contre le vote kick, immuniser le tank, empêcher le changement du AllTalk, le retour Lobby et bien d'autres options...

## Les Extensions

Vous pouvez retrouver des extensions compatibles SourceMod dans ce forum :<br /> [Extensions SourceMod](http://forums.alliedmods.net/forumdisplay.php?f=112).

**NOTE** :  Pensez à bien faire attention lorsque vous prenez une extension pour qu'elle soit compatible avec le jeu Left 4 Dead 2 !

![warning](/images-wiki/warning.png) Les extensions suivantes sont incompatibles avec L4D2 :

- [SteamTools](https://forums.alliedmods.net/forumdisplay.php?f=147)

Liste non exhaustive.

## Installation d'une extension

1) Une fois l'extension téléchargé, il vous suffit juste alors de mettre le fichier .ext.so (Linux) dans le répertoire: **../left4dead2/addons/sourcemod/extensions/**.<br /> Les fichiers .ext.dll peuvent être supprimés !

2) Il peut y avoir d'autres fichiers, il vous suffit d'uploader le contenu de l'archive sur votre ftp.

3) Redémarrer le serveur.

4) Vérifier que l'extension est bien chargée en tapant **sm exts list** dans la console.

La traduction française de SourceMod a été prise du site de Papy__.
