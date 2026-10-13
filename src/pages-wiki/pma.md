---
title: "PMA"
---

![Preds Match Admin](/images-wiki/pma.png)

## Description

Preds Match Admin (alias PMA) est un plugin de gestion des matchs pour Counter-Strike:Source et CS:GO.

## Téléchargement

[PMA5.2](http://www.preds-match-admin.co.uk/PMA5.2.zip)

## Installation

***Comment installer le plugin ?***

1. Téléchargez le plugin<br />
2. Décompressez le fichier sur votre ordinateur (avec 7Zip par exemple)<br />
3. Envoyez le contenu du dossier **addons** dans le dossier **addons** de votre serveur *<br />
4. Envoyez le contenu du dossier **cfg** dans le dossier **cfg** de votre serveur<br />
5. Redémarrez le serveur<br />

* Selon le système d'exploitation de votre serveur (Windows ou Linux), supprimer le fichier :

- **match_admin.dll** pour un serveur Linux

- **match_admin.so** pour un serveur Windows

## Vérification de l'installation

- Tapez la commande suivante dans la console de votre serveur (par RCON ou via le logiciel HLSW) : plugin_print . Cette commande sert à afficher la liste des plugins installés sur votre serveur.

- Vérifiez que cette liste contient bien :

```text
 '''"CS:S Match Admin Plugin, Version 5.0B2, http://Preds-Match-Admin.co.uk, Edmund 'Predator'"'''
```

## Configuration

***Comment configurer le plugin ?***

Le plugin se configure par l'intermédiaire de vos fichiers de configuration de match.

## Comment configurer un match ?

1. Allez dans le dossier **cfg/preds_match_admin/config**. Ce dossier contient toutes les configurations de match. Les fichiers .cfg présents dans ce dossier sont automatiquement listés dans le menu du plugin.<br />
2. Ouvrez le fichier **pmamr9.cfg**, **pmamr12.cfg** ou **pmamr15.cfg**. Ces fichiers sont des exemples de configuration de match pour 9, 12 ou 15 rounds.<br />

- Ajoutez/Modifiez/Supprimez les variables du jeu comme vous le souhaitez tout en respectant les règlements des ladders auxquelles vous jouez.<br />

## Ajouter des fichiers de configuration

Utilité : Principalement avoir le choix en MR12 et MR15. Mais si vous jouez pour une ligue, celle-ci vous imposera probablement une configuration. Il est utile de pouvoir choisir entre cette configuration et votre configuration habituelle dans le menu.

Comme dit plus haut, les fichiers .cfg présents dans le dossier **cfg/preds_match_admin/config** sont automatiquement listés dans le menu du plugin lors du lancement d'un match.

Pour ajouter un fichier de configuration personnel :

1. Créer un nouveau fichier dans un éditeur de texte<br />
2. "Enregistrez-le sous" avec le nom que vous voulez, et ajoutez au bout ".cfg"<br />
3. Les fichiers .cfg peuvent être ouvert avec n'importe quel éditeur de texte, ouvrez le fichier .cfg créé<br />
4. Ouvrez également le fichier **pmamr15.cfg**<br />
5. Copiez/collez les variables spécifiques au plugin dans votre nouveau fichier de configuration (elles sont préfixées par "pac")<br />
6. Ajoutez la configuration du serveur à la suite du fichier<br />
7. Enregistrez puis envoyez le fichier sur le serveur dans le dossier **cfg/preds_match_admin/config**<br />
8. Vous devrez ajouter le fichier **configs.txt** le nom de votre fichier sans l'extension .cfg<br />
9. Changez de map ou redémarrer votre serveur <br />

Pour ajouter un fichier de configuration d'une ligue :<br />

Dans le principe ce n'est pas différent, sauf que ce n'est pas à vous de créer ou modifier le contenu du fichier fourni par votre ligue. Mais même si vous n'avez pas le droit de modifier la configuration imposée par la ligue, vous pouvez ajouter les variables "pac..." cependant assurez-vous avant que PMA soit autorisé et si tel est le cas, la ligue propose un fichier de configuration.<br />

'''Mon fichier n'apparaît pas dans la liste des fichiers au moment de lancer le match'''

- Vérifiez que le fichier est bien dans le dossier **cfg/preds_match_admin/** configurations de votre serveur

- Vérifier que l'extension du fichier est bien ".cfg", s'il faut "enregistrez-le à nouveau sous" en ajoutant ".cfg" au bout du nom du fichier.

- Assurez-vous d'avoir bien changé de map ou redémarrer le serveur depuis l'envoi du fichier (s'il faut refaites le)

## Comment gérer les maps ?

Vous devrez éditer le fichier **maplist.txt**.<br />
Enregistrez puis envoyez le fichier sur le serveur dans le dossier **cfg/preds_match_admin/**.<br />
Changez de map ou redémarrer votre serveur<br />

## Comment gérer les mots de passes ?
Vous devrez éditer le fichier **passwords.txt**.<br />
Enregistrez puis envoyez le fichier sur le serveur dans le dossier **cfg/preds_match_admin/**.<br />
Changez de map ou redémarrer votre serveur<br />

## Comment exécuter un fichier de configuration rapidement ?

1. Ouvrez le fichier **bindconfigs.txt** situé dans le dossier **cfg/preds_match_admin/**<br />
2. Respectez la syntaxe parmi les exemples en y ajoutant les vôtres<br />
3. Enregistrez puis envoyer le fichier sur votre serveur.<br />
4. Redémarrer le serveur<br />
5. Connectez-vous à votre serveur et tapez dans la console **mr15** pour exécuter la config **pmamr15.cfg**.<br />
Le fichier sera exécuté et le match pourra commencer (15 rounds de chaque côté).<br />

## Comment modifier les phrases lors des divers scripts exécutés ?

1. Pour modifier la phrase écrite lors de l'exécution du script, ouvrez le fichier **pma_ko3.cfg** situé dans le répertoire **cfg/preds_match_admin/** :<br />
`pa_msg "Good Luck and Have Fun"`

Modifiez ce qu'il y a entre les " ".<br />

Enregistrez puis envoyer le fichier modifié sur votre serveur.<br /><br />
2. Pour modifier la phrase écrite lors de l'exécution du script lo3, ouvrez le fichier **pma_lo3.cfg** situé dans le répertoire **cfg/preds_match_admin/** :<br />
`pa_msg "Good Luck and Have Fun"`

Modifiez ce qu'il y a entre les " ".<br />

Enregistrez puis envoyer le fichier modifié sur votre serveur.

## Comment organiser des matchs automatiquement ?

Ce système est identique aux différentes explications fournis précédemment.

- Dans le dossier **cfg/autowar/configs/** vous retrouverez des exemples de configuration selon le match joué.

- Dans le dossier **cfg/autowar/** vous retrouverez un exemple de configuration (autowar_server.cfg) qui sera exécuté lorsque le match sera terminé.

- Les fichiers **autowar_lo3.cfg** et **autowar_ko3.cfg** contiennent les phrases écrites après l'exécution des scripts.

## Présentation du menu admin

![pma menu admin](/images-wiki/pma_menu_admin.jpg)

1 ![icon11](/images-wiki/icon11.gif) Permet de lancer le match selon les fichiers de configuration placé dans le dossier **../cfg/preds_match_admin/configs**.

2 ![icon11](/images-wiki/icon11.gif) Lance l'enregistrement de la SourceTV. Assurez-vous que celle-ci soit activé. Vous pourrez l'activer dans **Server Control**.

3 ![icon11](/images-wiki/icon11.gif) Lance le round au couteau et effectue 3 restart.

4 ![icon11](/images-wiki/icon11.gif) Lance le match et effectue 3 restart.

5 ![icon11](/images-wiki/icon11.gif) Stop l'enregistrement de la SourceTV.

6 ![icon11](/images-wiki/icon11.gif) Vous pourrez définir le mot de passe de connexion au serveur (**../cfg/preds_match_admin/passwords.txt**)

7 ![icon11](/images-wiki/icon11.gif) Gérer les joueurs (kick, ban, swap)

8 ![icon11](/images-wiki/icon11.gif) Permet d'exécuter des commandes serveurs.

9 ![icon11](/images-wiki/icon11.gif) Permet de changer la map (**../cfg/preds_match_admin/maplist.txt**).

## Utilisation

Comment se mettre admin ?

1. Ouvrez le fichier **admins.txt** situé dans le dossier **cfg/preds_match_admin/**<br />
2. Ajoutez votre **STEAMID # pseudo** à la fin de ce fichier<br /> :
`STEAM_0:1:12157180 #blablabla`<br />
3. Changer de map ou redémarrer votre serveur<br />

Vérifier que l'on est admin et utilisation du menu d'arbitrage :

1. Bindez la touche suivante dans votre **config.cfg** ou via votre console :<br />
`pa_match`<br />

- Exemple de bind sur la touche "e" de votre clavier : **bind "e" "pa_match"**<br />

- Note : si vous ne voulez pas binder une touche, il est possible d'accéder au menu d'arbitrage en tapant **!match** dans le TCHAT.<br />

2. Connectez-vous à votre serveur, puis appuyez sur la touche que vous avez bindé.<br />

- Si vous voyez le menu, vous êtes bien admin.<br />

- Si un message apparaît comme quoi vous n'êtes pas admin, votre steamID n'est pas le bon, vous n'avez pas envoyé le fichier sur le serveur, ou vous n'avez ni changé de map ni redémarrer votre serveur après édition du fichier **admins.txt**.<br />
3. Si vous ne voyez aucun message, le plugin est mal installé.<br />

**Note** : si des steamID sont déjà présents dans votre **admins.txt** au moment de l'installation du plugin, supprimez les du fichier par prudence.<br />

## Les commandes

Les commandes du Chat sont des commandes à taper dans la zone de dialogue.

(Le préfix par défaut est '!'):

- &lt;Prefix>match (Ouvre le menu Admin)

- &lt;Prefix> &lt;Msg> (Ecris un message en Admin aux joueurs)

- &lt;Prefix>rcon &lt;Command> (Exécute une commande rcon)

- &lt;Prefix>kick &lt;Filter> (Kick un ou des joueur(s))

- &lt;Prefix>ban &lt;Filter> (Bans un ou des joueur(s))

- &lt;Prefix>swap &lt;Filter> (Swap un ou des joueur(s))

- &lt;Prefix>map &lt;MapName> (Change de map)

- &lt;Prefix>lo3 (Exécute le script lo3)

- &lt;Prefix>ko3 (Exécute le script_Ko3)

- &lt;Prefix>rr (Exécute la cvar mp_restartgame 1)

Les commandes RCON sont des commandes à taper dans la console (Identification au rcon obligatoire !).

- pa_match (Ouvre le menu Admin)

- pa_help (Liste toutes les commandes)

- pa_say &lt;Text> (Ecris un message en Admin aux joueurs)

- pa_rcon &lt;Command> (Exécute une commande rcon)

- pa_kick &lt;Filter> (Kick un ou des joueur(s))

- pa_ban &lt;Filter> (Bans un ou des joueur(s))

- pa_swap &lt;Filter> ((Swap un ou des joueur(s))

- pa_map &lt;MapName> (CChange de map)

- pa_lo3 (Exécute le script lo3

- pa_ko3 (Exécute le script Ko3)

- pa_rr (Exécute la cvar mp_restartgame 1)

Liste des commandes clientes :

- pa_help (Liste toutes les commandes)

- pa_version (Affiche la version actuel)

- pa_teamcash (Affiche le Teams Cash + armes)

- pa_showcash (Bascule l'affichage du Teamcash)

- pa_weapons (Affiche les armes et l'armure des joueurs)

Liste des Variables du plugin :

- pa_chat (Active / Désactive le chat)

- pa_lo3autorecord (Enregistrement auto quand la cfg pma_lo3 est lancé)

- pa_ko3autorecord (Enregistrement auto quand la cfg pma_ko3 est lancé)

- pa_autostoprecord (Arrête automatiquement l'enregistrement )

- pa_allowshowcash (Active / Désactive pa_showcash)

- pa_allowteamcash (Active / Désactive pa_teamcash)

- pa_allowweapons (Active / Désactive pa_weapons)

- pa_allowpredcash (Active / Désactive pa_predcash)

- pa_chatcmdprefix (Définis le préfixe devant les commandes)

- pa_autoenabletv (Activer automatiquement la SourceTV)

- pa_showteamcashtoteam (Afficher les résultats de pa_teamcash et pa_showcash à toute l'équipe)

- pa_authmsg (Active / Désactive le message d'autentification)

- pa_joinmsg (Active / Désactive le message de bienvenue)

- pa_adminmsg (Active / Désactive le message lorsqu'un admin rejoins le serveur)
