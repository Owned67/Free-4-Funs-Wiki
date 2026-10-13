---
title: "Comment créer un serveur de jeu Counter-Strike Source"
---

## Introduction

Installer un serveur Counter-Strike Source sur Linux 64 bits.

:::caution[Avertissement]

Le tutoriel a été réalisé sous la distribution Debian et Ubuntu donc si la votre est différente, veuillez consulter la documentation de Valve à propos de celle-ci ! Il se peut que les paquets demandés soit différents !

:::

## Prérequis

Si vous n'avez pas installer les librairies 32 bits, veuillez suivre cette étape :<br />

- Système d’exploitation : Ubuntu, Debian

- [Accès root](/pages-wiki/comment-se-connecter-en-root) ou [sudo](/pages-wiki/sudo) sur la machine

- Pare-feu actif : iptables, nftables, ufw selon votre distribution

- Systemd : requis pour l’intégration des journaux systemd (journald) selon votre distribution

- Processeur >= 3.0 Ghz

- 2 Go de mémoire minimum (un serveur consomme 1Go de mémoire environ...)

- Prévoir 10 Go d'espace disque disponible (par défaut, comptez plus avec plugins/extensions/maps)

- Une protection Dos/Ddos

## Installation des dépendances

Les librairies 32 bits sont requises donc si vous ne les avez pas, vérification :

```bash
sudo dpkg --print-foreign-architectures | grep -q "i386"
```

Si le retour est vide, exécuter :

```bash
sudo apt update && sudo apt upgrade -y
sudo dpkg --add-architecture i386
sudo apt update
sudo apt install gcc gdb libc6:i386 lib32z1 lib32stdc++6 libstdc++6:i386 libncurses6:i386 screen git -y
```

Corriger les éventuelles erreur au démarrage malgré l'installation des dépendances faites :
**WARNING: Failed to load 32-bit libtinfo.so.5 or libncurses.so.5. Please install (lib32tinfo5 / ncurses-libs.i686 / equivalent) to enable readline.**

```bash
sudo ln -s /usr/lib/i386-linux-gnu/libtinfo.so.6 /usr/lib/i386-linux-gnu/libtinfo.so.5
sudo ln -s /usr/lib/i386-linux-gnu/libncurses.so.6 /usr/lib/i386-linux-gnu/libncurses.so.5
```

Corriger l'erreur **steamclient.so** et **steamreporter** :

```bash
ln -s "$HOME/steamcmd/linux32/steamclient.so" "$HOME/.steam/sdk32/steamclient.so" || mkdir -p "$HOME/.steam/sdk32" && ln -s "$HOME/steamcmd/linux32/steamclient.so" "$HOME/.steam/sdk32/steamclient.so"
```

```bash
ln -sf "$HOME/steamcmd/linux32/steamerrorreporter" "$HOME/serv_01/bin/steamerrorreporter"
```

Nous allons créer l'utilisateur **serveur**, si celui-ci existe, passez cette étape ou adapter selon vos connaissances.

```bash
adduser serveur && adduser serveur sudo && login
wget -O - http://media.steampowered.com/client/steamcmd_linux.tar.gz | tar -xvzf - | mkdir steamcmd && cd steamcmd
chmod +x steamcmd.sh
```

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

Dans la case **App ID du jeu de base** remplissez avec **240**.<br />
Vous pouvez inclure un mémo pour vous rappeler de quel serveur il s'agit puis finalisez en cliquant sur le bouton **Créer**.

Pour utiliser le token, ajoutez le dans la ligne de lancement :

```bash
+sv_setsteamaccount VOTRETOKEN
```

## Installation du Serveur

```bash
~/steamcmd/steamcmd.sh +force_install_dir ~/serv_01 +login anonymous +@NoPromptForPassword 1 +@ShutdownOnFailedCommand 1 +app_update 232330 validate +quit
```

Pour le mettre à jour :

```bash
~/steamcmd/steamcmd.sh +force_install_dir ~/serv_01 +login anonymous +@NoPromptForPassword 1 +@ShutdownOnFailedCommand 1 +app_update 232330 +quit
```

Pour le mettre à jour et valider les fichier :

```bash
cd steamcmd && ./steamcmd.sh +force_install_dir ~/serv_01 +login anonymous +@NoPromptForPassword 1 +@ShutdownOnFailedCommand 1 +app_update 232330 validate +quit
```

Vous pouvez consulter la [Documentation officielle](https://valvesoftware.com) fournit par Valve.

## Démarrage du serveur

```bash
cd ~/serv_01 && ./srcds_run -console -game cstrike +map de_dust2 +maxplayers 12
```

Si il démarre, vous devriez voir à la fin :

```text
Connection to Steam servers successful.
   Public IP to Steam is XX.XX.XXX.XXX.
Assigned anonymous gameserver Steam ID [A:1:1564812293:51585].
VAC secure mode is activated.
```

Quelques paramètres de lancement à ajouter :

```text showLineNumbers
-console                 -> S'exécutera en mode console
-debuglog nom_du_fichier -> Enregistre le debug dans le fichier
-high                    -> Priorité maximum pour le processus du serveur
-nohltv                  -> Désactive la SourceTV
-nobots                  -> Désactive les bots
-insecure                -> Désactive la protection VAC donc porte ouverte au tricheur
```

Pour obtenir toute la liste :

```bash
./srcds_run -help
```

## Script de lancement du serveur dédié

## Mettre à jour automatiquement

Dans le répertoire **/home/serveur/serv_01**, créer le fichier **serv01_update.txt**:<br />

```text
@ShutdownOnFailedCommand 1
@NoPromptForPassword 1
login anonymous
force_install_dir /home/serveur/serv_01
app_update 232330
quit
```

Ajouter ceci dans la ligne de lancement du serveur :

```bash
-steam_dir /home/serveur/steamcmd_linux -steamcmd_script /home/serveur/serv_01/serv01_update.txt -autoupdate
```

Un exemple :<br />

```bash
./srcds_run -console -game cstrike +maxplayers 18 +map de_dust2 -steam_dir /home/serveur/steamcmd_linux -steamcmd_script /home/serveur/serv_01/serv01_update.txt -autoupdate
```

## Les commandes

![Warning](/images-wiki/Warning.png)En cours de modification !![Warning](/images-wiki/Warning.png)

Placez vous dans le répertoire **/etc/init.d** en ROOT :

- ./css.sh start  Démarre le serveur (Faite le uniquement si il n'est pas lancé.)

- ./css.sh stop Stop le serveur

- ./css.sh restart  Redémarre le serveur

## Astuces

- Dans le répertoire **/home/serveur/serv_01**, un fichier **screenlog.0** sera créé et il contiendra tout les logs du serveur.

## F.A.Q

Q: Quels sont les ports à ouvrir ?

R: Port à ouvrir :

```bash
iptables -A INPUT -p udp -m udp --sport 27000:27030 --dport 1025:65355 -j ACCEPT
iptables -A INPUT -p udp -m udp --sport 4380 --dport 1025:65355 -j ACCEPT
```

[Ports nécessaires à Steam](https://help.steampowered.com/fr/faqs/view/2EA8-4D75-DA21-31EB)

Q: Le serveur ne redémarre pas lorsque j'exécute la commande **quit**.

R: Il vous faudra [faire ceci](/pages-wiki/page-sans-titre#mettre-a-jour-automatiquement)<br />

Q: J'obtiens le message '''/home/serveur/steamcmd/linux32/steamcmd: Permission non accordée
''' lors de l'exécution de **./steamcmd.sh**.

R: Appliquez un chmod : 

```bash
chmod +x /home/serveur/steamcmd/linux32/steamcmd && chmod +x /home/serveur/steamcmd/steamcmd.sh
```

Q: Mon serveur reste figé sur **Network: IP MON_IP, mode MP, dedicated Yes, ports MON_PORT SV / 27005 CL**

R: Je n'ai pas réellement la solution mais vous pouvez vérifier que le port ne soit pas utilisé :

```bash
sudo lsof -i:VOTRE_PORT
```

Si le port n'est pas utilisé, je ne peux pas vous en dire d'avantage ^^

Q: J'ai le message '''WARNING: setlocale('en_US.UTF-8') failed, using locale: 'C'. International characters may not work.'''

R: En soit, ce n'est pas un réel soucis mais si vous voulez corriger, exécutez :

```bash
sudo locale-gen en_US.UTF-8
sudo update-locale LANG=en_US.UTF-8
```

Q: Certains utilisateurs peuvent obtenir une erreur ulimit (no permission/can not open file)

R: Pour corriger, vous devez définir **ulimit** à une valeur égale à 2048 recommandé par Valve.

```bash
sudoulimit -n 2048
```
