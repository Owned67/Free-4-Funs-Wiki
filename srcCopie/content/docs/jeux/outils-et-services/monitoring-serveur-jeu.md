---
title: "Monitoring Serveur Jeu"
---

![munin](/images-wiki/munin.jpg)

## Introduction

:::caution[Avertissement]

Free 4 Funs ne pourra être tenue responsable d’une instabilité du système résultant d’une mauvaise installation.

:::

:::note

Pensez à faire une sauvegarde de chaque fichier AVANT d'effectuer toute modification !

:::

Nous allons vous expliquer comment générer des graphs qui vous permettront de voir la consommation cpu, ram, internet etc... de votre serveur de jeu.
Les jeux supportés sont :

:::note

- Team Fortress 2,

- Counter-Strike: Source,

- Day of Defeat: Source

```text
et de tous les mods sur la base de ces jeux..
```

:::

## Prérequis

- Système d’exploitation : Ubuntu, Debian

- [Serveur web Apache](/administration/web-et-ftp/comment-creer-un-serveur-web-apache2/)

- munin-node

- [Accès root](/administration/systeme/comment-se-connecter-en-root/) ou [sudo](/administration/systeme/sudo/) sur la machine

- Pare-feu actif : iptables, nftables selon votre distribution

- Systemd : requis pour l’intégration des journaux systemd (journald) selon votre distribution

## Installation

Nous ouvront le port **4949** en TCP pour que le serveur et munin puisse communiquer entre eux :

```bash
sudo iptables -A INPUT -p tcp --dport 4949 -j ACCEPT
sudo iptables -A OUTPUT -p tcp --dport 4949 -j ACCEPT
```

Nous mettons à jour la machine :

```bash
sudo apt update && sudo apt upgrade -y
```

Installation de munin :

```bash
sudo apt install munin munin-node munin-plugins-extra git
```

On active munin-node au démarrage de la machine :

```bash
sudo systemctl enable --now munin-node
```

On vérifie qu'il est bien démarré, vous devriez avoir : **Active: active (running)**

```bash
sudo systemctl status munin-node
```

Dans le fichier **/etc/munin/munin.conf**, enlevez les **#** pour activer la configuration :

```ini
dbdir	/var/lib/munin
  htmldir /var/cache/munin/www
  logdir /var/log/munin
  rundir  /var/run/munin
```

Si vous souhaitez laisser l'accès à tout le monde, dans le fichier ** /etc/munin/apache24.conf**, chercher :

```ini
Require local
```

remplacer par :

```ini
#Require local
    Require ip IP_MACHINE
```

Placez vous dans un répertoire, comme dans tous nos tutoriels, nous utilisons l'utilisateur **serveur** :

```bash
su - serveur && cd ~
```

On clone munin-contrib qui contient les fichiers nécessaires pour le moteur srcds :

```bash
git clone https://github.com/munin-monitoring/contrib.git
```

On cherche où sont les fichiers :

```bash
find contrib -iname '*srcds*'
```

qui nous retourne :

```ini
contrib/plugins/sourceds/srcds_cpu
contrib/plugins/sourceds/srcds_players
contrib/plugins/sourceds/srcds_uptime
contrib/plugins/sourceds/srcds_inout
contrib/plugins/sourceds/srcds_fps
```

On copie les fichiers dans le dossier **plugins** de munin :

```bash
cd contrib/plugins/sourceds/ && sudo cp -R * /usr/share/munin/plugins/ && cd ~
sudo chmod -R 755 /usr/share/munin/plugins/srcds_*
```

Vous aurez besoin du fichier [Rcon.pm](https://tutocss.pages-perso.free.fr/wiki/Rcon.pm) qui devra être placé dans le répertoire **/usr/share/munin/plugins/**.

On édite le fichier **/etc/munin/plugin-conf.d/munin-node** :

```bash
sudo nano /etc/munin/plugin-conf.d/munin-node
```

ajouter à la fin :

```ini
[srcds_*]
  env.srcdspass votre_pass_rcon
```

puis sauvegarder la modification (CTRL + X puis O).

Création des liens symboliques :

```bash
sudo mv /usr/share/munin/plugins/srcds_cpu /usr/share/munin/plugins/srcds_cpu_
sudo mv /usr/share/munin/plugins/srcds_fps /usr/share/munin/plugins/srcds_fps_
sudo mv /usr/share/munin/plugins/srcds_inout /usr/share/munin/plugins/srcds_inout_
sudo mv /usr/share/munin/plugins/srcds_players /usr/share/munin/plugins/srcds_players_
sudo mv /usr/share/munin/plugins/srcds_uptime /usr/share/munin/plugins/srcds_uptime_
```

```bash
cd /etc/munin/plugins/
  sudo ln -s /usr/share/munin/plugins/srcds_cpu_ srcds_cpu_VOTRE.IP_VOTRE_PORT
  sudo ln -s /usr/share/munin/plugins/srcds_fps_ srcds_fps_VOTRE.IP_VOTRE_PORT
  sudo ln -s /usr/share/munin/plugins/srcds_inout_ srcds_inout_VOTRE.IP_VOTRE_PORT
  sudo ln -s /usr/share/munin/plugins/srcds_players_ srcds_players_VOTRE.IP_VOTRE_PORT
  sudo ln -s /usr/share/munin/plugins/srcds_uptime_ srcds_uptime_VOTRE.IP_VOTRE_PORT
```

Remplacez **VOTRE_IP** par l'IP du serveur et **VOTRE_PORT** par le port du serveur CS:S.

Exemple :

```ini
cd /etc/munin/plugins/ 
  sudo ln -s /usr/share/munin/plugins/srcds_cpu_ srcds_cpu_192.168.1.49_27015
  sudo ln -s /usr/share/munin/plugins/srcds_fps_ srcds_fps_192.168.1.49_27015
  sudo ln -s /usr/share/munin/plugins/srcds_inout_ srcds_inout_192.168.1.49_27015
  sudo ln -s /usr/share/munin/plugins/srcds_players_ srcds_players_192.168.1.49_27015
  sudo ln -s /usr/share/munin/plugins/srcds_uptime_ srcds_uptime_192.168.1.49_27015
```

Redémarrer Munin :

```bash
sudo systemctl restart munin-node
```

Vérification :
La commande **munin-node-configure** devrait vous donner ceci :

```ini
Plugin                     | Used | Extra information
 ------                     | ---- | -----------------
 ...<br />
 srcds_cu_                 | yes  | VOTRE.IP_VOTRE_PORT
 srcds_fps_                 | yes  | VOTRE.IP_VOTRE_PORT
 srcds_inout_               | yes  | VOTRE.IP_VOTRE_PORT
 srcds_players_             | yes  | VOTRE.IP_VOTRE_PORT
 srcds_uptime_              | yes  | VOTRE.IP_VOTRE_PORT
```

Si vous obtenez un message d'erreur pour les plugins :

```ini
# Got junk from srcds_cpu_: Could not parse server address from filename.
```

Ceci signifie que le nom du lien symbolique est mal formé et donc vous n'avez pas suivi le tutoriel :( ^^

On redémarre munin :

```bash
sudo systemctl restart munin-node
```

Maintenant on regarde si il nous retourne bien les FPS du serveur de jeu :

```bash
munin-run srcds_fps_VOTRE.IP_VOTRE_PORT
```

Il nous retourne => **fps.value 537**. (Tout dépend de la machine et de sa configuration...)

Pour finalisez, on doit modifier la configuration Apache pour ne pas tomber sur un joli 403 ^^

```bash
sudo sed -i '23s/Require local/Require all granted/' /etc/apache2/conf-enabled/munin.conf
sudo sed -i '23s/Require local/Require all granted/' /etc/apache2/conf-available/munin.conf
sudo systemctl reload apache2
```

Patientez cinq minute puis dans votre navigateur, entrer le lien suivant :
[http://votre_domaine.com/munin](http://votre_domaine.com/munin) et regardez la partie **Sourceds**.

Vous avez plusieurs serveurs et vous souhaitez obtenir la même chose ?

Suivez le guide xD :

On ré-édite le fichier **/etc/munin/plugin-conf.d/munin-node** :

```bash
nano /etc/munin/plugin-conf.d/munin-node
```

Supprimer cette partie :

```text
 [srcds_*]
 env.srcdspass votre_pass_rcon
```

Ajouter  :

```text
 [srcds_fps_VOTRE.IP_27015]
 env.srcdspass pass
```

```text
 [srcds_cpu_VOTRE.IP_27015]
 env.srcdspass pass
```

```text
 [srcds_players_VOTRE.IP_27015]
 env.srcdspass pass
```

```text
 [srcds_inout_VOTRE.IP_27015]
 env.srcdspass pass
```

```text
 [srcds_uptime_VOTRE.IP_27015]
 env.srcdspass pass
```

```text
 [srcds_fps_VOTRE.IP_27025]
 env.srcdspass pass2
```

```text
 [srcds_cpu_VOTRE.IP_27025]
 env.srcdspass pass2
```

```text
 [srcds_players_VOTRE.IP_27025]
 env.srcdspass pass2
```

```text
 [srcds_inout_VOTRE.IP_27025]
 env.srcdspass pass2
```

```text
 [srcds_uptime_VOTRE.IP_27025]
 env.srcdspass pass2
```

Création des liens symboliques :

```text
 cd /etc/munin/plugins/
 ln -s /usr/share/munin/plugins/srcds_cpu_ srcds_cpu_VOTRE.IP_VOTRE_PORT<br />
 ln -s /usr/share/munin/plugins/srcds_fps_ srcds_fps_VOTRE.IP_VOTRE_PORT<br />
 ln -s /usr/share/munin/plugins/srcds_inout_ srcds_inout_VOTRE.IP_VOTRE_PORT<br />
 ln -s /usr/share/munin/plugins/srcds_players_ srcds_players_VOTRE.IP_VOTRE_PORT<br />
 ln -s /usr/share/munin/plugins/srcds_uptime_ srcds_uptime_VOTRE.IP_VOTRE_PORT<br />
```

Remplacez **VOTRE_IP** par l'IP du serveur et **VOTRE_PORT** par le port du serveur CS:S.

Exemple :

```text
 ln -s /usr/share/munin/plugins/srcds_cpu_ srcds_cpu_192.168.1.2_27025<br />
 ln -s /usr/share/munin/plugins/srcds_fps_ srcds_fps_192.168.1.2_27025<br />
 ln -s /usr/share/munin/plugins/srcds_inout_ srcds_inout_192.168.1.2_27025<br />
 ln -s /usr/share/munin/plugins/srcds_players_ srcds_players_192.168.1.2_27025<br />
 ln -s /usr/share/munin/plugins/srcds_uptime_ srcds_uptime_192.168.1.2_27025<br />
```

Vous pouvez ajouter tout les serveurs que vous voulez en respectant notre exemple ci-dessus cependant il semblerais qu'après un certains nombres (> 5), munin semble ne plus fonctionner correctement.

VOTRE.IP correspond à l'IP LAN du serveur de jeux (ifconfig sous linux) :

192.168.1.2 par exemple

**Astuce** :

Dans la ligne de commande, ajouter cette ligne :

```text
 +rcon_password votre_pass_rcon
```

et supprimer la ligne correspondant dans le fichier **server.cfg**, cela sécurisera en même temps votre mot de passe rcon !

On redémarre munin :

```text
 /etc/init.d/munin-node restart
```

Un petit aperçu :<br />
![munin srcds players 27020](/images-wiki/munin_srcds_players_27020.png)

Lien source :
[css.setti.info/code/munin-srcds](http://css.setti.info/code/munin-srcds/)

Licence du tutoriel :
[by-nc-nd](http://creativecommons.org/licenses/by-nc-nd/3.0/fr/)
