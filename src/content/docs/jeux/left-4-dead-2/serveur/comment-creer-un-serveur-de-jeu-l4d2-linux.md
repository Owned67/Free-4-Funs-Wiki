---
title: "Comment créer un serveur de jeu L4D2 (linux)"
---

## Introduction

Installer un serveur L4D2 sur Ubuntu 22.04.

## Prérequis

- Système d’exploitation : Ubuntu, Debian

- [Accès root](/administration/systeme/comment-se-connecter-en-root/) ou [sudo](/administration/systeme/sudo/) sur la machine

- Pare-feu actif : iptables, nftables, ufw selon votre distribution

- Systemd : requis pour l’intégration des journaux systemd (journald) selon votre distribution

- Processeur >= 3.0 Ghz

- 2 Go de mémoire minimum (un serveur consomme 1Go de mémoire environ...)

- Prévoir 10 Go d'espace disque disponible (par défaut, comptez plus avec plugins/extensions/maps)

- Une protection DoS/DDoS est recommandée

## Installation

Avant de commencer, nous allons mettre à jour le machine et préparer les dépendances pour l'installation du serveur avec **[Sudo](/administration/systeme/sudo/)** !

- Mise à jour de la machine :

```bash
sudo apt update && sudo apt upgrade -y
```

- Activation de l'architecture 32 bits et installation des bibliothèques :

```bash
sudo dpkg --add-architecture i386
sudo apt update && sudo apt upgrade -y
sudo apt install libc6:i386 lib32z1 screen git
```

- Création de l'utilisateur **letsgo** et ajout au groupe sudo

```bash
sudo adduser letsgo && adduser letsgo sudo && login
```

- Téléchargement de SteamCmd et installation du serveur

```bash
wget -qO- https://media.steampowered.com/installer/steamcmd_linux.tar.gz | tar -xzvf -
```

```bash
./steamcmd.sh +force_install_dir ./serv_l4d2 +login anonymous +@NoPromptForPassword 1 +@ShutdownOnFailedCommand 1 +@sSteamCmdForcePlatformType windows +app_update 222860 validate +quit && ./steamcmd.sh +force_install_dir ./serv_l4d2 +login anonymous +@NoPromptForPassword 1 +@ShutdownOnFailedCommand 1 +@sSteamCmdForcePlatformType linux +app_update 222860 validate +quit
```

Pour mettre à jour le serveur :

```bash
./steamcmd.sh
@ShutdownOnFailedCommand 1
@NoPromptForPassword 1
force_install_dir ./serv_l4d2
login anonymous
app_update 222860 validate
quit
```

Si votre serveur nécessite une connexion, alors modifiez **login anonymous** en **login votre_utilisateur votre_mot_de_passe**.<br />
Si vous avez plusieurs serveurs, la valeur de **ShutdownOnFailedCommand ** devra être défini à 0.<br />

- @NoPromptForPassword signifie que l'utilisateur n'aura pas à définir son mot de passe.<br />

- @ShutdownOnFailedCommand provoquera l'arrêt instantané de la mise à jour en cas d'erreur.<br />

- @sSteamCmdForcePlatformType force le téléchargement des fichiers d'un serveur dédié pour une plateforme spécifique (comme Windows ou Linux).<br />
Vous allez me dire, on est sur linux, il nous mets windows !<br />
Alors techniquement non, c'est que tu as loupé la seconde commande intégré qui télécharge la version linux.<br />
Il faut savoir que Valve à bloqué le téléchargement du binaire linux pour les utilisateurs anonymes depuis quelques années donc soit vous utilisez la commande windows/linux, soit vous devrez vous identifier avec votre compte.<br />

```bash
./steamcmd.sh +force_install_dir ./serv_l4d2 +login votre_compte_steam votre_mot_de_passe +@ShutdownOnFailedCommand 1 +@sSteamCmdForcePlatformType windows +app_update 222860 validate +quit
```

Ajouter le paramètre ** +set_steam_guard_code VOTRE_CODE** si votre compte est protégé par l'authentificateur Steam.<br />

## Configuration server.cfg

Nous vous proposons un **[server.cfg](http://Tutocss.pages-perso.free.fr/wiki/server.cfg)** que vous pouvez modifiez à votre guise.<br />
Chaque variable est expliquée et la configuration est basé sur vanilla.

## Configuration Confogl

Vous voulez un serveur compétitif ou du moins sans armes lourdes comme l'AK ?

Nous allons vous expliquez comment faire.

## Démarrer le serveur

:::caution[Avertissement]

Pensez à modifier les valeurs qui sont mises en caractère **gras**.

:::

Avec ou sans screen :

```bash
./srcds_run -game left4dead2 -ip VOTREIP -port VOTREPORT -timeout 10 +map c1m1_hotel -maxplayers 32
```

```bash
screen -AdmSL serv_l4d2 srcds_run -game left4dead2 -ip VOTREIP -port VOTREPORT -timeout 10 +map c1m1_hotel -maxplayers 32
```

- **VOTREIP** ![icon11](/images-wiki/icon11.gif) Mettez l'adresse IP de votre machine<br />

- **VOTREPORT** ![icon11](/images-wiki/icon11.gif) Définissez le port<br />

:::note

Il n'est pas obligatoire mais recommandé, pour que votre serveur soit listé dans les serveurs public de Steam, il vous faudra générer un token GSLT (Game Server Login Token).

:::

Pour le générer, connectez-vous à votre compte Steam et accédez à la [Gestion du compte des serveurs de jeu Steam](https://steamcommunity.com/dev/managegameservers).

La création du token à quelques prérequis :

- Votre compte Steam ne doit pas être banni de la communauté ou verrouillé.

- Votre compte Steam ne doit pas être limité.

- Votre compte Steam doit avoir un numéro de téléphone enregistré.

- Votre compte Steam doit posséder le jeu pour lequel vous créez un compte de serveur de jeu.

- Votre compte Steam peut créer jusqu'à 1000 comptes de serveur de jeu.

Dans la case **App ID du jeu de base** remplissez avec **550**.<br />
Vous pouvez inclure un mémo pour vous rappeler de quel serveur il s'agit puis finalisez en cliquant sur le bouton **Créer**.

Pour utiliser le token, ajoutez dans la ligne de lancement :

```bash
+sv_setsteamaccount VOTRETOKEN
```

ce qui au final vous donnera :

```bash
./srcds_run -game left4dead2 -ip VOTREIP -port VOTREPORT -timeout 10 +map c1m1_hotel -maxplayers 32 +sv_setsteamaccount VOTRETOKEN
```

N'oubliez pas de remplacer **VOTRETOKEN** par celui généré sur la page steam !

TODO: A FINIR
***Les commandes en détails*** :

```text
un fichier texte
-silent-crashes	[[Fichier:icon11.gif]] Aucune boîte de dialogue lors d'un crash
```

## Script de lancement du serveur

:::note[Notes]

Pensez à regarder **Les commandes en détails** pour modifier le fichier

:::

[Script de lancement du serveur dédié](http://skamason.com/6TDH)

## Mettre à jour automatiquement

:::caution[Avertissement]

Pensez à adapter les valeurs données ci-dessous !

:::

Dans le répertoire **/home/votre_utilisateur/l4d2/serv_01**, créer les fichiers **maj_rust.sh** et **maj_rust.txt** :

**maj_l4d2.sh** :

```bash
#!/bin/bash
_path_steamcmd=/home/votre_utilisateur/l4d2/steamcmd
_path_server=/home/votre_utilisateur/l4d2/serv_01
cd "$_path_steamcmd"
./steamcmd.sh +runscript $_path_server/maj_l4d2.txt
```

**maj_l4d2.txt** :

```text
@ShutdownOnFailedCommand 1
@NoPromptForPassword 1
login anonymous
force_install_dir /home/votre_utilisateur/l4d2/serv_01
app_update 222860
quit
```

Ajouter **-autoupdate** dans la ligne de lancement du serveur :

Exemple :

```bash
./srcds_run -nowatchdog -game left4dead2 -console -maxplayers 10 -port VOTRE_PORT +ip VOTRE_IP +map c1m1_hotel -steam_dir /home/votre_utilisateur/l4d2/steamcmd -steamcmd_script /home/votre_utilisateur/l4d2/maj_l4d2.txt -autoupdate
```

## Configuration / Explication des cvars

Nous allons vous expliquez les principales cvar à utiliser dans votre **server.cfg**.

:::note

Certaines seront préfixés de la commande **sm_cvar** ce qui signifie que SourceMod est obligatoire pour que la commande s'exécute.

:::

## F.A.Q

Q : Quels sont les ports à ouvrir ?

R : Voici la liste :

```text
UDP 27015 = port par défaut (Autoriser la connexion entrante et sortante dans le pare-feu)
TCP 27015 = port rcon (Attention, n'exposez pas le port sur internet pour éviter les attaques)
```

Q : J'obtiens l'erreur **[[S_API FAIL] SteamAPI_Init() failed](https://developer.valvesoftware.com/wiki/SteamCMD#SteamCMD_Startup_Errors)**?

R : Il vous suffira de créer un lien symbolique avec l'utilisateur **letsgo** : 

```bash
mkdir -p "$HOME/.steam/sdk32" && ln -s steamcmd/linux32/steamclient.so ~/.steam/sdk32/steamclient.so
```

Chemin à adapter si l'installation diffère du tutoriel !

Q : Peux t'on activer la SourceTV ?

R : Officiellement oui mais techniquement, je ne vous recommande pas car Valve n'a jamais corrigé ce problème avec la SourceTV qui provoque de gros décalage dans l'enregistrement cependant si vous voulez tester par vous même, cliquez sur [ce lien](https://github.com/shqke/sourcetvsupport).
