---
title: "Windows"
---

## Introduction

Installer un serveur Rust sur Windows.

## Requis

```text
* Processeur avec 4 coeurs à 3.2 Ghz
* 6 Go de mémoire minimum
* un débit ascendant égale ou supérieur à 25mb/s (ce qui correspond environ à 2 à 3 Mo/s)
* Un logiciel de décompression (WinRar, 7Zip etc..)
* 15 Go d'espace disque libre (SSD de préférence)
* [http://wget https://gnuwin32.sourceforge.net/packages/wget.htm]
```

## Installation

Télécharger puis extraire l'archive [SteamCMD](https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip)

Double cliquez sur le fichier **steamcmd.exe** se situant dans le dossier **steamcmd**.

SteamCMD se met à jour :

```text
Redirecting stderr to 'B:\steamcmd\logs\stderr.txt'
ILocalize::AddFile() failed to load file "public/steambootstrapper_english.txt".
ILocalize::AddFile() failed to load file "public/steambootstrapper_french.txt".
[  0%] Checking for available update...
[----] Downloading update (0 of 9,642 KB)...
[  0%] Downloading update (210 of 9,642 KB)...
[  2%] Downloading update (648 of 9,642 KB)...
[  6%] Downloading update (1,046 of 9,642 KB)...
[ 10%] Downloading update (1,394 of 9,642 KB)...
[ 14%] Downloading update (1,843 of 9,642 KB)...
[ 19%] Downloading update (2,212 of 9,642 KB)...
[ 22%] Downloading update (2,586 of 9,642 KB)...
[ 26%] Downloading update (3,002 of 9,642 KB)...
[ 31%] Downloading update (3,372 of 9,642 KB)...
[ 34%] Downloading update (3,788 of 9,642 KB)...
[ 39%] Downloading update (4,181 of 9,642 KB)...
[ 43%] Downloading update (4,597 of 9,642 KB)...
[ 47%] Downloading update (4,966 of 9,642 KB)...
[ 51%] Downloading update (5,337 of 9,642 KB)...
[ 55%] Downloading update (5,732 of 9,642 KB)...
[ 59%] Downloading update (6,101 of 9,642 KB)...
[ 63%] Downloading update (6,517 of 9,642 KB)...
[ 67%] Downloading update (6,924 of 9,642 KB)...
[ 71%] Downloading update (7,283 of 9,642 KB)...
[ 75%] Downloading update (7,623 of 9,642 KB)...
[ 79%] Downloading update (8,015 of 9,642 KB)...
[ 83%] Downloading update (8,387 of 9,642 KB)...
[ 86%] Downloading update (8,739 of 9,642 KB)...
[ 90%] Downloading update (9,153 of 9,642 KB)...
[ 94%] Downloading update (9,524 of 9,642 KB)...
[ 98%] Downloading update (9,642 of 9,642 KB)...
[100%] Download Complete.
[----] Applying update...
[----] Extracting package...
[----] Extracting package...
[----] Extracting package...
[----] Extracting package...
[----] Extracting package...
[----] Installing update...
[----] Installing update...
[----] Installing update...
[----] Cleaning up...
[----] Update complete, launching...
Redirecting stderr to 'B:\steamcmd\logs\stderr.txt'
[  0%] Recherche de nouvelles mises à jour...
[----] Vérification de l'installation...
[  0%] Téléchargement de la mise à jour...
[  0%] Recherche de nouvelles mises à jour...
[----] Téléchargement : (0 sur 6,216 Ko)
[  0%] Téléchargement : (151 sur 6,216 Ko)
[  2%] Téléchargement : (153 sur 6,216 Ko)
[  2%] Téléchargement : (153 sur 6,216 Ko)
[  2%] Téléchargement : (416 sur 6,216 Ko)
[  6%] Téléchargement : (911 sur 6,216 Ko)
[ 14%] Téléchargement : (1,316 sur 6,216 Ko)
[ 21%] Téléchargement : (1,650 sur 6,216 Ko)
[ 26%] Téléchargement : (1,985 sur 6,216 Ko)
[ 31%] Téléchargement : (2,378 sur 6,216 Ko)
[ 38%] Téléchargement : (2,728 sur 6,216 Ko)
[ 43%] Téléchargement : (3,107 sur 6,216 Ko)
[ 49%] Téléchargement : (3,687 sur 6,216 Ko)
[ 59%] Téléchargement : (4,095 sur 6,216 Ko)
[ 65%] Téléchargement : (4,441 sur 6,216 Ko)
[ 71%] Téléchargement : (4,839 sur 6,216 Ko)
[ 77%] Téléchargement : (5,200 sur 6,216 Ko)
[ 83%] Téléchargement : (5,548 sur 6,216 Ko)
[ 89%] Téléchargement : (5,940 sur 6,216 Ko)
[ 95%] Téléchargement : (6,216 sur 6,216 Ko)
[100%] Téléchargement terminé.
[----] Extraction du package...
[----] Extraction du package...
[----] Extraction du package...
[----] Extraction du package...
[----] Extraction du package...
[----] Installation de la mise à jour...
[----] Installation de la mise à jour...
[----] Installation de la mise à jour...
[----] Nettoyage des fichiers...
[----] Mise à jour terminée. Lancement de Steamcmd...
Redirecting stderr to 'B:\steamcmd\logs\stderr.txt'
[  0%] Recherche de nouvelles mises à jour...
[----] Vérification de l'installation...
Steam Console Client (c) Valve Corporation
-- type 'quit' to exit --
Loading Steam API...OK.

Steam>
```

On définit le chemin du serveur (peut être différent pour vous)

```text
 

```bash
force_install_dir B:\ServeurRust
```

```

On se connecte à Steam

```text
 

```bash
login anonymous
```

```

On met à jour le serveur

```text
 

```bash
app_update 258550 validate
```

```

Quand c'est terminé, on quitte

```text
 

```bash
quit
```

```

Pour le mettre à jour :

```text
 

```bash
app_update 258550
```

```

## Démarrer le serveur / Configuration

:::caution[Avertissement]

Pensez à modifier les valeurs qui sont mises en caractère **gras**.

:::

```bash
start RustDedicated.exe -batchmode +server.ip '''VOTREIP''' +server.port '''VOTREPORT''' +rcon.ip '''VOTREIP''' -queryport '''QUERYPORT'''  +rcon.port '''PORT_RCON''' +server.hostname '''NOMDUSERVEUR''' +server.level "'''Procedural Map'''" +server.identity '''my_server_identity''' +server.maxplayers '''20''' +rcon.password '''MOTDEPASSERCON''' +server.saveinterval '''900''' +server.seed '''36980''' +server.worldsize '''3000'''
```

- **VOTREIP** ![icon11](/images-wiki/icon11.gif) Mettez l'adresse IP de votre PC (si votre routeur / modem le permet, préférez de mettre l'adresse IP WAN)<br />

- **PORT_RCON** ![icon11](/images-wiki/icon11.gif) Définissez le port rcon<br />

- **NOMDUSERVEUR** ![icon11](/images-wiki/icon11.gif) Définissez le nom de votre serveur<br />

- **MOTDEPASSERCON** ![icon11](/images-wiki/icon11.gif) Définissez le mot de passe rcon (évitez un mot de passe trop basique comme 123456)<br />

- **QUERYPORT** ![icon11](/images-wiki/icon11.gif) Définissez le query port (port par défaut +1: 28015 + 1 = 28016<br />

Vous pouvez également utiliser ce fichier .bat : [https://github.com/OxideMod/Oxide.Rust/blob/develop/resources/_start-example.bat](http://Start%20rust%20serveur), il vous faudra ajouter  **-queryport QUERYPORT**.

***Les commandes en détails*** :

```text
-batchmode [[Fichier:icon11.gif]] Permet de lancer le serveur dans un mode fenêtré
-nographics [[Fichier:icon11.gif]] Existe mais je ne trouve pas la vraie description
-cfg server.cfg [[Fichier:icon11.gif]] Permet d'exécuter le fichier server.cfg
+server.maxplayers 6 [[Fichier:icon11.gif]] Règle le nombres de joueurs maximums
+server.hostname "[FR] Serveur priv‚e" [[Fichier:icon11.gif]] Définis le nom du serveur
+server.identity "my_server_identity" [[Fichier:icon11.gif]] Définis l'idendité du serveur
+server.level "Procedural Map"  [[Fichier:icon11.gif]] Définis la map
+server.seed 36980 [[Fichier:icon11.gif]] Correspond à l'id de la carte
+server.worldsize 4000 [[Fichier:icon11.gif]] Définis la taille de la map, valeur comprises entre 1000 et 6000 (peut causer des lags et/ou crash si la valeur est trop grande)
+server.saveinterval 900 [[Fichier:icon11.gif]] Définis la fréquence de la sauvegarde du serveur (en secondes)
+server.globalchat true [[Fichier:icon11.gif]] Prend la valeur false ou true. Si true, le chat sera diffusé à TOUS les joueurs
+rcon.web 1 [[Fichier:icon11.gif]] Permet d'utiliser le rcon depuis une interface web (1: active le websocket rcon, 0: désactivé)
+server.description "Powered by Let's Go" [[Fichier:icon11.gif]] Permet de mettre une description de votre serveur
+server.headerimage "http://i.imgur.com/xNyLhMt.jpg" [[Fichier:icon11.gif]] Permet de mettre une images/bannière personnalisée
+server.url "http://oxidemod.org" [[Fichier:icon11.gif]] Permet d'insérer le lien de votre site web
+server.tickrate [[Fichier:icon11.gif]] Définis le tickrate du serveur (la valeur par défaut est suffisante)
-logfile gamelog.txt [[Fichier:icon11.gif]] Enregistre tout ce qui ce passe sur le serveur dans un fichier texte
-silent-crashes	[[Fichier:icon11.gif]] Aucune boîte de dialogue lors d'un crash
```

## Ajouter le propriétaire / Modérateur

:::caution[Avertissement]

Si le pseudo contient des caractères spéciaux, des espaces, veuillez l'insérer entre des **"  "**.

:::

Vous aurez besoin de connaître le steamID64 ![icon11](/images-wiki/icon11.gif) [Connaître son SteamID](/pages-wiki/steamid).

```bash
ownerid 12345678901234567 "Pseudo du joueur"
```

*Exemple* :

```bash
ownerid 76561197984580089 Tanki
```

ou

```bash
ownerid 76561197984580089 "Super Tanki"
```

Pour ajouter un modérateur :

Vous aurez besoin de connaître le steamID64 ![icon11](/images-wiki/icon11.gif) [Connaître son SteamID](/pages-wiki/steamid).

```bash
moderatorid 12345678901234567 "Pseudo du joueur"
```

*Exemple* :

```bash
moderatorid 76561198071811946 "Bob-Jo"
```

Pour supprimer le propriétaire :

```bash
removeowner 76561197984580089
```

Pour supprimer un modérateur :

```bash
removemoderator 12345678901234567
```

Pour valider, vous devrez exécuter la commande :

```bash
writecfg
```

## Script de lancement du serveur

:::note[Notes]

Pensez à regarder **Les commandes en détails** pour modifier le fichier

:::

[Script de lancement du serveur dédié](http://skamason.com/6TDH)

## Mettre à jour automatiquement

Dans le répertoire **C:\Rust**, créer les fichiers **maj_rust.bat** et **maj_rust.txt**:<br />
**maj_rust.bat**<br />
`@ECHO OFF<br /> set _path_steamcmd=C:\steamcmd<br /> set _path_server=C:\ServeurRust<br /> cd /d %_path_steamcmd%<br /> cmd /c steamcmd.exe +runscript %_path_server%\maj_rust.txt<br /> exit<br />`

**maj_rust.txt**<br />
`@ShutdownOnFailedCommand 1<br /> @NoPromptForPassword 1<br /> login anonymous<br /> force_install_dir C:\Rust<br /> app_update 258550 validate<br /> quit<br />`

Ajouter **-autoupdate** dans la ligne de lancement du serveur :

Un exemple :<br />
`start RustDedicated.exe -batchmode +server.ip 192.168.1.10 +server.port 28015 +rcon.ip 192.168.1.10 +rcon.port 28025 +server.hostname "Tutoriel Free 4 Funs"  +server.identity my_server_identity +server.maxplayers 20 +rcon.password 123456 +server.saveinterval 900 +server.level "Procedural Map" +server.seed 36980 +oxide.directory "server/my_server_identity/oxide" -cfg server.cfg -autoupdate`

==Map personallisée==<br />

en cours de rédaction

## Télécharger Oxide

Télécharger la dernière version sur le [site officiel](https://umod.org/)

Vous pouvez également copier/coller ¹ ce code batch pour récupérer la dernière version directement depuis github :

```text
 @echo off<br><br>
 setlocal<br>
 :_download<br>
 if exist latest del /q/f latest<br>
 echo Download latest oxide for Rust server<br>
 wget --no-check-certificate https://api.github.com/repos/OxideMod/Oxide.Rust/releases/latest<br>
 for /f "tokens=2 delims=:" %%a in ('findstr /c:tag_name latest') do set link=%%a<br>
 set link=%link:~1%<br>
 set link=%link:~0,-1%<br>
 set link=%link:"=%<br>
 if exist Oxide.Rust.zip del /q/s Oxide.Rust.zip<br>
 wget -N https://github.com/OxideMod/Oxide.Rust/releases/download/%link%/Oxide.Rust.zip --no-check-certificate<br>
 for %%A in (Oxide.Rust.zip) do set len=%%~zA<br>
 if %len% LSS 10000000 (<br>
 cls<br>
 Color 0C<br>
 echo /!\ ERROR /!\, archive is corrupted, retry again later... &pause)<br>
 goto :_download<br> 
 <br>
 endlocal<br>
 exit<br>
```

## Installer Oxide

Veuillez extraire le contenu de l'archive avec un logiciel de décompression (WinRar, 7zip etc...) puis copier/coller le dossier **RustDedicated_Data** à la racine de votre serveur.
Si une version précédente est détectée, veuillez simplement accepter le remplacement de tous les fichiers.

Si vous avez oxide et que vous souhaitez modifier son répertoire :

```bash
start RustDedicated.exe -batchmode +server.ip 0.0.0.0 +server.port 28015 +rcon.ip 0.0.0.0 +rcon.port 28025 +server.hostname "Tutoriel Free 4 Funs"  +server.identity my_server_identity +server.maxplayers 20 +rcon.password 123456 +server.saveinterval 900 +server.level "Procedural Map" +server.seed 36980 +oxide.directory "server/my_server_identity/oxide" -cfg server.cfg -autoupdate
```

Par défaut, le dossier **oxide** se situe dans le répertoire **C:\rust**.

## Configurer Oxide

Vous avez un fichier nommé **oxide.config.json** dans le répertoire **C:\rust\server\my_server_identity\oxide**
  \{

```text
 "Options": {
   "Modded": true,
   "DefaultGroups": {
     "Players": "default",
     "Administrators": "admin"
   }
 },
 "OxideConsole": {
   "Enabled": true,
   "MinimalistMode": true,
   "ShowStatusBar": true,
   "ShowStacktraces": true
 },
 "OxideRcon": {
   "Enabled": true,
   "Port": 25580,
   "Password": "130705",
   "ChatPrefix": "[Server Console]"
 }
 }
```

**DefaultGroups** ![icon11](/images-wiki/icon11.gif) Groupe éxistant par défaut<br />
**Players** ![icon11](/images-wiki/icon11.gif) Tous les joueurs se connectant auront le groupe **default** d'attribué<br />
**Administrators** ![icon11](/images-wiki/icon11.gif) Chaque administrateurs ajoutés aura pour groupe **admin**<br />

## Les permissions

Giving an individual player a permission

Sometimes you just want a single player to have permission to a command or feature.

**Ajoute la permission au joueur Tanki de recharger les plugins**

```bash
o.grant user Tanki oxide.reload
```

<br />

**Supprimer la permission de recharger les plugins**

```bash
o.revoke user Tanki oxide.reload
```

**Donner la permission à un groupe complet**

```bash
o.grant group admin oxide.reload
```

**Supprimer la permission du groupe**

```bash
o.revoke group admin oxide.reload
```

**Ajouter un joueur à un groupe éxistant**

```bash
oxide.usergroup add Tanki admin
```

**Révoquer le joueur du groupe**

```bash
oxide.usergroup remove Tanki admin
```

**Ajouter un nouveau groupe**

```bash
o.group add vip
```

**Ajouter un nouveau groupe**

```bash
o.group add vip VIP 0
```

**Supprimer un groupe**

```bash
o.group remove vip
```

'''Définir le titre ou un rang d'un groupe'''

```bash
o.group set vip "[VIP Membre]"
```

```bash
o.group set vip "[VIP Membre]" 1
```

'''Définir le groupe parent d'un autre groupe'''

```bash
oxide.group parent admin default
```

'''Afficher les permissions d'un joueur'''

```bash
o.show user Tanki
```

'''Afficher les membres d'un groupe'''

```bash
o.show group admin
```

'''Afficher les permissions d'un joueur ou d'un groupe

```bash
o.show perm oxide.reload
```

'''Afficher toutes les permissions d'un groupe'''

```bash
o.show groups
```

**Afficher toutes les permissions des plugins**

```bash
o.show perms
```

A faire: les wildcards *

## F.A.Q

Q: Quels sont les ports à ouvrir ?

R: Voici la liste :

:::note

UDP 28015 = port par défaut
TCP 28016 = port rcon

:::

Si vous utilisez Rust:IO:

:::note

TCP 28015

:::
