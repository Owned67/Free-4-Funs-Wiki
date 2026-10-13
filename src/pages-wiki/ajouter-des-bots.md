---
title: "Ajouter des bots"
---

Voici une liste avec les éléments essentiels.

- **bot_join_after_player 0** = va autoriser les bots sur votre serveur même si aucun joueur n'est présent

- **bot_difficulty 2** = niveau de jeu des bots. 1 = facile, 2 = normal, 3 = difficile

- **bot_chatter off** = configurer sur off les bots ne parlent pas. radio = certaines commandes radio. minimal = certaines commandes radio et audio. normal = toutes les commandes radio et audio.

- **bot_quota 2** = nombre de bot présent sur le serveur. Dans l'exemple il y en a 2. Attention car suivant où vous louez votre serveur le nombre de bots est limité.

- **bot_prefix [Free 4 Funs]** = le tag que porteront les bots.

- **bot_quota_mode fill** = pour qu'il y ait toujours un nombre de joueur déterminé par bot_quota.

- **bot_auto_vacate 1** = sur 1 autorise les bots a quitté le serveur si des joueurs se connectent.

- **bot_auto_follow 1** = sur 1 autorise les bots a suivre les joueurs, sur 0 les bots feront ce qu'ils veulent sur la map.

- **bot_allow_rogues 1** = sur 1 donne la permission aux bots de faire ce qu'ils veulent sans suivre les ordres donner par radio etc.

- **bot_defer_to_human 1** = sur 1 ordonne aux bots de remplir leur mission jusqu'au bout.

- **bot_join_team any** = sur "any" les bots rejoindront l'équipe qui a besoin de joueur, sur "t" les bots rejoindront uniquement les terros, sur "ct" les bots rejoindront uniquement les CT.

La partie suivante concerne les armes. Vous pouvez autoriser ou non les bots a avoir certaines armes.

- **bot_all_weapons** = aucune arme ne sera restreinte

- **bot_allow_grenade 1** = sur 1 autorise les bots a prendre des grenades

- **bot_allow_machine_guns 1** = sur 1 autorise les bots a prendre les machines guns

- **bot_allow_pistols 1** = sur 1 autorise les bots a prendre les armes de poing

- **bot_allow_rifles 1** = sur 1 autorise les bots a prendre les armes type fusils

- **bot_allow_shotguns 1** = sur 1 autorise les bots a prendre les armes type fusil a pompe

- **bot_allow_snipers 1** = sur 1 autorise les bots a prendre les armes type snipers

- **bot_allow_sub_machine_guns 1** = sur 1 autorise les bots a prendre les armes type sub machine guns

Voici un exemple :

```text
bot_join_after_player 0
bot_difficulty 2
bot_chatter off
bot_quota 2
bot_prefix [Free 4 Funs]
bot_quota_mode fill
bot_auto_vacate 1
bot_auto_follow 1
bot_allow_rogues 1
bot_defer_to_human 1
bot_join_team any
bot_all_weapons
```

Cette configuration aura pour effet :

```text
[[Fichier:icon11.gif]] Ajout de 2 bots en permanence,<br />
[[Fichier:icon11.gif]] Pas de communication radio,<br />
[[Fichier:icon11.gif]] Aucune restrictions d'armes,<br />
[[Fichier:icon11.gif]] Leur niveau sera '''normal'''
```

Donc une fois votre fichier **bots.cfg** terminé, uploader le sur votre ftp serveur dans **/games/css/cstrike/cfg/** puis éditer le fichier **server.cfg** pour y ajouter cette ligne :

```text
// Configuration des bots
exec bots.cfg
```

Un changement de map suffira pour appliquer les changements.

Quelques commandes utiles (nécessitera l'accès au rcon) :

```text
Kick un bot [[Fichier:icon11.gif]] rcon bot_kick
Kicker tout les bots [[Fichier:icon11.gif]] rcon bot_kick all
Ajouter un bot [[Fichier:icon11.gif]] rcon bot_add
Ajouter un bot CT [[Fichier:icon11.gif]] rcon bot_add_ct
Ajouter un bot T [[Fichier:icon11.gif]] rcon bot_add_t
```
