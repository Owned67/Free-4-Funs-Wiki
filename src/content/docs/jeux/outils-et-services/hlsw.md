---
title: "HLSW"
---

![hlsw](/images-wiki/hlsw.png)

## Description

HLSW est un logiciel permettant de contrôler un serveur à distance.

## Téléchargement

[HLSW v1.4.0.2](http://www.hlsw.org/download/mirrors/77/HLSW_v1.4.0.2)

## Installation

- 1. Double cliquer sur **hlsw_1_4_0_2_setup.exe** pour lancer le processus d'installation...

## Utilisation

![warning](/images-wiki/warning.png) Ce tutoriel ne vous montrera pas toutes les possibilités qu'offre HLSW !

Après avoir installé, vous aurez cette petite fenêtre :

![hlsw login](/images-wiki/hlsw_login.jpg)

donc soit vous créer un compte ou vous cliquez sur le bouton **Offline**.

Si vous utilisez le mode **OffLine** ou que le serveur HLSW est indisponible, pensez à ajouter ceci dans **server.cfg**:

```text
   logaddress_add "VOTRE_IP:PORT_HLSW"
```

Pour obtenir le port :

Dans **HLSW** ![icon11](/images-wiki/icon11.gif) **Paramètres** ![icon11](/images-wiki/icon11.gif) **Paramètres** ![icon11](/images-wiki/icon11.gif) **Proxy** et prenez le port indiqué.

Nous allons vous montrez comment s'en servir :

![hlsw pres](/images-wiki/hlsw_pres.jpg)

Cliquez sur **Classic** ![icon11](/images-wiki/icon11.gif) ![hlsw amis](/images-wiki/hlsw_amis.jpg) ![icon11](/images-wiki/icon11.gif) ![hlsw rules](/images-wiki/hlsw_rules.jpg)

Nous voilà avec un HLSW plus propre.

![hlsw clean](/images-wiki/hlsw_clean.jpg)

**Légende** :

**Liste des serveurs (Custom server list)** ![icon11](/images-wiki/icon11.gif) Votre liste de serveurs personnalisé (tous les serveurs qui seront insérés dans cette partie seront sauvegardés).

**1** ![icon11](/images-wiki/icon11.gif) Mettez l'adresse IP de votre serveur.

**2** ![icon11](/images-wiki/icon11.gif) Vous verrez le Nom du serveur, le type du jeu, la map en cours, le nombre de joueurs en ligne et le ping.

**3** ![icon11](/images-wiki/icon11.gif) Affiche les informations du serveur.

**4** ![icon11](/images-wiki/icon11.gif) Informations sur les joueurs connecté sur le serveur :

- pseudo,

- le nombre de tué(s),

- le temps de jeu,

- steamid (ID Mondiale),

- latence (ping),

- Rate du joueur,

- l'équipe dans laquelle il se trouve et

- les statistiques (ratio tués/morts)

**5** ![icon11](/images-wiki/icon11.gif) Informations sur les plugins et scripts ainsi que les différentes variables activé sur votre serveur. En faisant un clic droit, vous pourrez modifier la valeur.

**6** ![icon11](/images-wiki/icon11.gif) Centre de gestion de votre serveur.

Nous allons vous détailler la partie 6 car c'est celle si la plus importante pour gérer un serveur.

**Configuration du RCON** :

Dans la case **Mot de passe rcon**, mettez votre pass rcon et cliquez sur test ce qui devrais vous afficher **OK** en vert claire à côté de **STATUS**.

Pour recevoir les logs du serveur, cliquez sur les deux boutons  :

- Obtenir le log Internet,<br />

- Obtenir le log LAN

Cocher la case **Mises à jour automatique du status**.

**Console** :

- **Console** => vous informent de tout ce qui se passe dans le jeu, les achats d'armes, les tués, les morts etc ...ainsi que les pseudos des joueurs plus leur steamid.

**Chat** :

- **Chat** => vous informe uniquement de tout les messages tapés dans le chat par les joueurs ( aussi bien le say et le say_team).

**Liste de bans** :

par défaut, la liste est vide mais lorsque l'ont clique sur **Mise à jour**, vous voyez tout les steam_id bannis sur votre serveur grâce aux fichiers fournis de Clan-France, ESl et d'autres encore...(encadrer en rouge)

Pour bannir un steam_id ou une ip, il vous suffit de l'ajouter dans le cadre bleu puis de cliquer sur **BAN**

Pour dé bannir faite la même chose mais en cliquant sur le bouton **DEBANNIR**.

Après chaque modification, cliquez sur le bouton **Mise à jour**.

**Changer la carte** :

Par défaut la liste est vide donc on vas cliquez sur **Mettre à jour** (encadrer en rouge) puis vous devriez voir apparaître toutes les maps présentent sur votre serveur comme ceci :

Pour changer la map, double cliquez sur celle que vous voulez et vous verrez ceci s'afficher :

cliquez sur **OK** et le change map s'effectuera de suite.

## Les commandes Cvars

Vous pouvez entrer n'importe quelle commande cvars dans l'onglet **Console** mais **SANS** le préfixe rcon.

**Exemple :**

Disons que vous voyez dans le chat que quelqu'un se plaint de l'awp et si vous avez un plugin d'administration (SourceMod (nécessite un plugin supplémentaire) etc...)

Allez dans l'onglet **Console** et tapez ceci :

- SourceMod :

```text
sm_restrict awp 0
```

'''Kick et ban d'un joueur'''

Nous avons vu précédemment que nous pouvions bannir un joueur mais voici une autre solution pour bannir un joueur en indiquant le temps de ban.

Partie 4 de notre capture d'écran.

Lorsqu'un joueur est connecté sur votre serveur, vous pouvez le kicker ou le bannir, comment faire ?

Faite un clic droit sur le joueur et choisissez l'action désirée.

Les petites flèches à côté de Bannir vous affichent un sous menu qui ce passe de commentaires. ;)

Un nouvel élément est apparu avec la version 1.2.0, lorsque vous avez des joueurs de connecté et que vous avez installé Mani admin plugin, il est possible de gérer le plugin via hlsw.
Ceci étant très simple à comprendre, aucune information en image ne sera faite.

Si toutefois, vous ne comprenez pas, faite la demande sur notre forum et nous essayeront d'ajouter les éléments.

## Les commandes HLSW

Voici quelques commandes utiles :

- plugin_print ![icon11](/images-wiki/icon11.gif) Affiche les différents plugins installé et leurs versions

- status ![icon11](/images-wiki/icon11.gif) Affiche les informations du serveur (IP, maps, versions, sécurisé etc..)

- stats ![icon11](/images-wiki/icon11.gif) Affiche les informations sur l'utilisation du processeur, fps, l'uptime du serveur etc..

- _restart ou quit ![icon11](/images-wiki/icon11.gif) Selon les hébergeurs, cette commande fait crasher le serveur.

**Note :**
En aucun cas, HLSW ne vous identifie au rcon si vous vous connecter à votre serveur. Vous devrez vous identifiez comme vous le faisiez auparavant.
