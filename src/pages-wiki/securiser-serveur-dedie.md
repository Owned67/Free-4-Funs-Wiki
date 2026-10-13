---
title: "Securiser serveur dedie"
---

:::caution[Avertissement]

Pensez à faire des sauvegardes des fichiers que vous modifiez !<br />
Nous utilisons l'éditeur **nano** donc pour sauvegarder une modification, faites **CTRL** + **O** puis **Entrée**.

:::

## Introduction

C'est l'un des principaux casse-têtes des administrateurs ayant un serveur dédié : comment se protéger au mieux ?

Nous allons vous montrer, dans ce tutoriel, comment mettre en place un niveau de protection minimal grâce à Fail2Ban. En effet, Fail2Ban est un logiciel puissant, mais également assez complexe à mettre en œuvre lorsqu'on le découvre. Il surveille notamment les journaux à la recherche de tentatives d'authentification échouées et peut ensuite appliquer des règles de blocage aux adresses IP concernées.

Voici une liste des logiciels qui seront installés et configuré :

- CrowdSec,

- Fail2Ban,

- Fail2Web,

- RKHunter;

- Snort,

- SSH

## Prérequis

- Système d’exploitation : Ubuntu, Debian

- [Accès root](/pages-wiki/comment-se-connecter-en-root) ou [sudo](/pages-wiki/sudo) sur la machine

- Python : version 3.10 minimum (3.12 recommandé pour Fail2ban 1.1.0)

- Pare-feu actif : iptables, nftables selon votre distribution

- Systemd : requis pour l’intégration des journaux systemd (journald) selon votre distribution

## CrowdSec

:::caution[Avertissement]

Si vous installez CrowdSec, n'installez pas Fail2ban par derrière. CrowdSec est largement meilleur par son mécanisme de traitement et intervient plus rapidement.

:::

### Installation CrowdSec

### Configuration CrowdSec

## Fail2Ban
### Installation Fail2Ban

On met à jour les paquets et on installe Fail2Ban :

```bash
sudo apt update && sudo apt install fail2ban -y
```

### Configuration Fail2Ban

```bash
cp /etc/fail2ban/jail.conf{,.defaut}
```

```bash
cp /etc/fail2ban/fail2ban.conf{,.defaut}
```

Le fichier **fail2ban.conf** ne sera pas expliquez dans ce tutoriel car nous n'en voyons pas l'utilité.

Maintenant, comment paramétrer toutes ces variables ?

- ignoreip = 127.0.0.1/8 ![icon11](/images-wiki/icon11.gif) Ajouter votre IP si vous avez la chance d'avoir une IP fixe, ceci aura pour effet de ne pas vous bannir en cas de mauvaise manipulation.

- bantime  = 600 ![icon11](/images-wiki/icon11.gif) Durée du bannissement en cas d'échec.

- maxretry = 3 ![icon11](/images-wiki/icon11.gif) Nombre d'erreurs maximales pouvant être atteints avant d'être ban.

- destemail = root@localhost ![icon11](/images-wiki/icon11.gif) Adresse mail recevant les notifications des bans.

- action = %(action_)s ![icon11](/images-wiki/icon11.gif) devra être remplacé par **action = %(action_mwl)s** ou **action = %(action_mw)s** si la variable **destmail** est modifié.

Voici la configuration que j'utilise personnellement :

```text
 ignoreip = 127.0.0.1/8
 bantime  = 604800 (réglé à -1, le ban sera de façon permanent)
 findtime = 3600
 maxretry = 3
```

Vous pouvez coupler la variable **bantime** à **findtime** (par défaut, fixé à 10 minutes) cependant faites attention avec l'utilisateur de cette valeur car elle peut nuire aux performances de votre serveur vu qu'elle analyse en approfondi les logs. La solution la plus adaptée est de choisir un grand 'findtime' et un très grand 'bantime' : 3600 et 86400, ou encore 86400 et 604800 comme le montre ma configuration ci-dessus.

Pour le **jail-ssh** :

Activer le jail, ajouter en dessous de **[sshd]** :

```text
enabled = true
```

Il faudra modifier le numéro du port SSH si il n'écoute pas sur le port par défaut 22.

Rechercher le jail **ssh** et remplacer la ligne :

```text
 port     = ssh
```

par

```text
 port     = VOTRE_PORT
```

Regardons comment activer les différents services, prenons l'exemple du jail **ssh-ddos** :
Par défaut :

```text
 [ssh-ddos]
 enabled  = false
 port     = ssh
 filter   = sshd-ddos
 logpath  = /var/log/auth.log
 maxretry = 6
```

Remplacer **false** par **true** pour activer le jail puis redémarrez Fail2Ban.

Liste des jails pouvant être activés :

- pam-generic

- xinetd-fail

- ssh-ddos

Si vous avez un serveur web sous apache ou nginx ou un serveur FTP, activer les jails concernés.<br />

Vous pourrez ajouter ses jails dans **/etc/fail2ban/jail.conf**:

```text
<br />`[nginx-auth]<br /> 	enabled = true<br /> 	filter = nginx-auth<br /> 	action = iptables-multiport[name=NoAuthFailures, port="http,https"]<br /> 	logpath = /var/log/nginx*/*error*.log<br /> 	bantime = 600 # 10 minutes<br /> 	maxretry = 6<br />  	[nginx-login]<br /> 	enabled = true<br /> 	filter = nginx-login<br /> 	action = iptables-multiport[name=NoLoginFailures, port="http,https"]<br /> 	logpath = /var/log/nginx*/*access*.log<br /> 	bantime = 600 # 10 minutes<br /> 	maxretry = 6<br /> 	  	[nginx-badbots]<br /> 	enabled  = true<br /> 	filter = apache-badbots<br /> 	action = iptables-multiport[name=BadBots, port="http,https"]<br /> 	logpath = /var/log/nginx*/*access*.log<br /> 	bantime = 86400 # 1 day<br /> 	maxretry = 1<br /> 	  	[nginx-noscript]<br /> 	enabled = true<br /> 	action = iptables-multiport[name=NoScript, port="http,https"]<br /> 	filter = nginx-noscript<br /> 	logpath = /var/log/nginx*/*access*.log<br /> 	maxretry = 6<br /> 	bantime  = 86400 # 1 day<br /> 	  	[nginx-proxy]<br /> 	enabled = true<br /> 	action = iptables-multiport[name=NoProxy, port="http,https"]<br /> 	filter = nginx-proxy<br /> 	logpath = /var/log/nginx*/*access*.log<br /> 	maxretry = 0<br /> 	bantime  = 86400 # 1 day<br />`
```

Maintenant, nous allons déclarer les fichiers de configuration des nouveaux jails dans **/etc/fail2ban/filter.d/** :

Créer les fichiers suivants en copiant le code donné ci-dessous :

**nginx-proxy.conf**

```bash
nano -w /etc/fail2ban/filter.d/nginx-proxy.conf
```

```text
 #Proxy filter /etc/fail2ban/filter.d/nginx-proxy.conf:
 #
 # Block IPs trying to use server as proxy.
 #
 # Matches e.g.
 # 192.168.1.1 - - "GET http://www.something.com/
 #
 [Definition]
 failregex = ^<HOST> -.*GET http.*
 ignoreregex =
```

**nginx-noscript.conf**

```bash
nano -w /etc/fail2ban/filter.d/nginx-noscript.conf
```

```text
 # Noscript filter /etc/fail2ban/filter.d/nginx-noscript.conf:
 #
 # Block IPs trying to execute scripts such as .php, .pl, .exe and other funny scripts.
 #
 # Matches e.g.
 # 192.168.1.1 - - "GET /something.php
 #
 [Definition]
 failregex = ^<HOST> -.*GET.*(\.php|\.asp|\.exe|\.pl|\.cgi|\scgi)
 ignoreregex =
```

**nginx-auth.conf**

```bash
nano -w /etc/fail2ban/filter.d/nginx-auth.conf
```

```text
 #
 # Auth filter /etc/fail2ban/filter.d/nginx-auth.conf:
 #
 # Blocks IPs that fail to authenticate using basic authentication
 #
 [Definition]
 failregex = no user/password was provided for basic authentication.*client: <HOST>
       user .* was not found in.*client: <HOST>
       user .* password mismatch.*client: <HOST>
 ignoreregex =
```

**nginx-badbots.conf**

```bash
nano -w /etc/fail2ban/filter.d/nginx-badbots.conf
```

```text
 # Fail2Ban configuration file
 # Author: Patrik 'Sikevux' Greco <sikevux@sikevux.se>
 [Definition]
 # Option: failregex
 # Notes.: regex to match access attempts to setup.php
 # Values: TEXT
 failregex = ^<HOST> .*?"GET.*?\/setup\.php.*?" .*?
 # Anti w00tw00t
           ^<HOST> .*?"GET .*w00tw00t.* 400
 # try to access to directory
           ^<HOST> .*?"GET .*admin.* 403
           ^<HOST> .*?"GET .*admin.* 404
           ^<HOST> .*?"GET .*install.* 404
           ^<HOST> .*?"GET .*dbadmin.* 404
           ^<HOST> .*?"GET .*myadmin.* 404
           ^<HOST> .*?"GET .*MyAdmin.* 404
           ^<HOST> .*?"GET .*mysql.* 404
```

**nginx-login.conf**

```bash
nano -w /etc/fail2ban/filter.d/nginx-login.conf
```

```text
 #
 # Login filter /etc/fail2ban/filter.d/nginx-login.conf:
 #
 # Blocks IPs that fail to authenticate using web application's log in page
 #
 # Scan access log for HTTP 200 + POST /sessions => failed log in
 [Definition]
 failregex = ^<HOST> -.*POST /sessions HTTP/1\.." 200
 ignoreregex =
```

On peut bloquer le scan de port, éditez le fichier  **/etc/fail2ban/jail.conf** :

```text
 [portscan]  
 enabled = true  
 filter  = portscan  
 action  = iptables[name=portscan]  
 logpath = /var/log/messages  
 maxretry = 3
```

On créer la configuration pour le jail **portscan**:

**portscan.conf**

```bash
nano -w /etc/fail2ban/filter.d/portscan.conf
```

```text
 # Option: failregex
 # Notes: Looks for attempts on ports not open in your firewall. Expects the
 # iptables logging utility to be used. Add the following to your iptables
 # config, as the last item before you DROP or REJECT:
 # -A <chain_name> -j LOG --log-prefix "PORT DENIED: " --log-level 5 --log-ip-options --log-tcp-options --log-tcp-sequence
 # This will place a notice in /var/log/messages about any attempt on a port that isn't open.
 [Definition]
 failregex = PORT DENIED: .* SRC=<HOST>
```

Fail2ban permet également de bloquer les récidivistes, il nous suffira d'activer le jail **[recidive]** :

```ini
enabled = true
filter = recidive
logpath = /var/log/fail2ban.log
bantime = 1w
findtime = 1d
maxretry = 5
banaction = %(banaction_allports)s
```

Concernant la configuration de ce jail, l'adresse IP bannie 5 fois en 24 heures dans n’importe quel jail actif sera ensuite bannie pour 1 semaine (7 jours). L'action **%(banaction_allports)s** bannit l'IP sur **tous les ports**, et non plus seulement sur celui du jail qui a déclenché le ban — contrairement au comportement par défaut des autres jails

Ceci est un tutoriel basique offrant un minimum, fail2ban est un outil puissant mais aussi complexe donc si vous voulez approfondir l'outil, il vous faudra creuser les ménages comme on dit chez moi. :D

Après les modifications, redémarrez fail2ban en **root** :

```bash
systemctl restart fail2ban
```

ou avec **sudo** :

```bash
sudo systemctl restart fail2ban
```

[source des jails](http://snippets.aktagon.com/snippets/554-how-to-secure-an-nginx-server-with-fail2ban)

:::note

Sur les petits VPS, l’activation du jail fail2ban-ssh peut provoquer une forte charge CPU. Dans certains cas, notamment lors de la gestion ou de l’expiration d’un grand nombre de bannissements, cette charge peut durer plusieurs heures. Si votre VPS dispose de ressources limitées, vérifiez l’impact de Fail2Ban avant de l’activer.

:::

Les logs de Fail2Ban sont dans le répertoire **/var/log/fail2ban**.

### Les commandes Fail2Ban

Les principales commandes à retenir :

- fail2ban-client start

- fail2ban-client stop

- fail2ban-client reload

- fail2ban-client status

Pour avoir une liste plus complète, exécuter **fail2ban-client**.

### Débannir une IP avec Fail2Ban

Avant tout, vous devez vous assurez de l'adresse IP à débannir, faites :

```bash
iptables -L -n --line-numbers
```

ou si elle a été bannis avec une chaîne créé :

```bash
iptables -L NomChaine -n --line-numbers
```

Si le résultat est trop long pour le terminal, filtrez sur l'IP recherchée (remplacez 1.2.3.4 par l'adresse IP concerné).

```bash
iptables -S | grep 1.2.3.4
```

Vous pouvez aussi rediriger la sortie dans un fichier temporaire :

```bash
iptables -L -n --line-numbers > ipadeban.txt
```

La commande suivante permet de débannir une adresse IP cependant il faut respecter la syntaxe :

```bash
iptables -t filter -D NomChaine IDChaine
```

Exemple :

```text
  iptables -t filter -L -n
  Chain INPUT (policy ACCEPT)
  target     prot opt source               destination
  fail2ban-ssh  tcp  --  0.0.0.0/0            0.0.0.0/0            multiport dports 22
  Chain FORWARD (policy ACCEPT)
  target     prot opt source               destination
  Chain OUTPUT (policy ACCEPT)
  target     prot opt source               destination
  Chain fail2ban-ssh (1 references)
  target     prot opt source               destination
  DROP       all  --  MON_IP    anywhere
  RETURN     all  --  anywhere             anywhere
```

Deux méthodes permettent de révoquer un bannissement.

La première consiste à redémarrer la machine. Les règles iptables sont stockées en mémoire et disparaissent au redémarrage, sauf si vous avez configuré leur sauvegarde (iptables-persistent, script de restauration au démarrage, etc.). Dans ce cas, le bannissement est rechargé et cette méthode est sans effet.

La seconde consiste à supprimer la règle concernée. Il faut pour cela vous connecter en SSH depuis une autre adresse IP que celle bannie (partage de connexion 4G/5G de votre téléphone, autre réseau, etc.).

:::caution[Avertissement]

Si l'accès SSH est limité à une liste blanche et que l'adresse IP utilisée n'y figure pas, la connexion sera refusée. Vous devrez alors passer par le mode rescue de votre hébergeur.

:::

```bash
iptables -t filter -D fail2ban-ssh 1
```

Vous devriez pouvoir vous connectez à votre machine !

### Ban permanent et Récidive avec Fail2Ban

- dans **/etc/fail2ban/jail.local**, définissez la valeur de **bantime** à **-1** pour chaque jail activé.

```bash
sudo nano /etc/fail2ban/jail.local
```

Toujours dans **/etc/fail2ban/jail.local**, rechercher **[recidive]**, remplacez par :

```text
[recidive]
enabled  = true
logpath  = /var/log/fail2ban.log
banaction = %(banaction_allports)s
bantime  = -1
findtime = 1d
```

Redémarrer fail2ban et vérifier que tout soit ok.

```bash
sudo systemctl restart fail2ban && sudo sudo fail2ban-client -t
```

qui vous affichera :

```text
 OK: configuration test is successful
```

### Interface Web pour Fail2Ban

## Port Knocking
### Installation Snort

## RKHunter

### Installation RKHunter

Mise à jour du système :

```bash
sudo apt update && sudo apt upgrade -y
```

Installation RKHunter :

```bash
sudo apt install rkhunter -y
```

### Configuration RKHunter

Voici la configuration par défaut :

```text
 # Defaults for rkhunter automatic tasks
 # sourced by /etc/cron.*/rkhunter and /etc/apt/apt.conf.d/90rkhunter
 #
 # This is a POSIX shell fragment
 #
 # Set this to yes to enable rkhunter daily runs
 # (default: true)
 CRON_DAILY_RUN=""
 # Set this to yes to enable rkhunter weekly database updates
 # (default: true)
 CRON_DB_UPDATE=""
 # Set this to yes to enable reports of weekly database updates
 # (default: false)
 DB_UPDATE_EMAIL="false"
 # Set this to the email address where reports and run output should be sent
 # (default: root)
 REPORT_EMAIL="root"
 # Set this to yes to enable automatic database updates
 # (default: false)
 APT_AUTOGEN="false"
 # Nicenesses range from -20 (most favorable scheduling) to 19 (least favorable)
 # (default: 0)
 NICE="0"
 # Should daily check be run when running on battery
 # powermgmt-base is required to detect if running on battery or on AC power
 # (default: false)
 RUN_CHECK_ON_BATTERY="false"
```

Nous ne voyons pas l'utilité de la modifier, après libre à vous de l'adapter à vos besoins.

## Configuration serveur SSH

Cette partie ne constitue pas une sécurité à elle seule : elle durcit l'accès SSH, et le changement de port réduit surtout le bruit des scans dans les logs.

:::note

Avant de désactiver l'authentification par mot de passe, vous devez avoir [généré une clé publique](/pages-wiki/page-sans-titre#comment-creer-une-authentification-ssh-par-cle-publique).
Gardez une session ouverte pendant tous les tests.

:::

```bash
sudo cp /etc/ssh/sshd_config{,.bak}
```

```bash
sudo nano /etc/ssh/sshd_config
```

:::note

Si vous changez le port, ouvrez-le d'abord dans iptables, puis mettez-le à jour dans fail2ban (/etc/fail2ban/jail.local) et dans tout autre service qui l'utilise.

:::

Valeurs recommandées :

```bash
Port 2222
PermitRootLogin no
MaxAuthTries 3
MaxSessions 6
ClientAliveInterval 300
ClientAliveCountMax 6
PasswordAuthentication no
AllowUsers utilisateur utilisateur1
PermitEmptyPasswords no
```

- **Port** : port d'écoute SSH

- **PermitRootLogin** : interdit la connexion directe de root

- **MaxAuthTries** : tentatives d'authentification autorisées par connexion

- **MaxSessions** : sessions multiplexées autorisées par connexion

- **ClientAliveInterval** / **ClientAliveCountMax** : le serveur envoie un keepalive toutes les 300 secondes et coupe après 6 sans réponse (connexion morte)

- `PasswordAuthentication` : désactive le mot de passe (clé obligatoire)

- `AllowUsers` : seuls ces utilisateurs peuvent se connecter, tous les autres sont refusés

- `PermitEmptyPasswords` : refuse les mots de passe vides

Vérifier la configuration (aucune sortie = valide) :

```bash
sudo sshd -t
```

Vérifier les valeurs réellement appliquées :

```bash
sudo sshd -T | grep -Ei "^(port|passwordauthentication|permitrootlogin|allowusers)"
```

Appliquer, puis tester dans une nouvelle fenêtre avant de fermer la session actuelle :

```bash
sudo systemctl reload ssh
```

### Restriction des connexions par utilisateur et IP (pam_access)

Cette couche supplémentaire décide qui a le droit de se connecter en SSH, et depuis quelle adresse IP.<br />
Cela refusera toutes connexions si l'adresse IP ne sera définis dans la configuration.<br />
Elle s'applique uniquement à la connexion SSH.<br />

:::caution[Avertissement]

Avant de continuer la procédure : gardez une session ouverte et n'utilisez que des adresses IP fixes sans utiliser la notation CIDR (avec un slash comme /24) : si votre IP change, vous serez bloqué.

:::

### Activation de pam_access

Comme toujours, pensez à sauvegarder les fichiers avant de modifier quoi que ce soit !

Sauvegardez d'abord le fichier :

```bash
sudo cp /etc/pam.d/sshd{,.bak}
```

```bash
sudo nano /etc/pam.d/sshd
```

Repérez la ligne commentée et supprimez le `#` au début :

```bash
account  required     pam_access.so
```

Sauvegardez et fermer le fichier.

### Ajout des utilisateurs dans access.conf

Sauvegardez d'abord le fichier :

```bash
sudo cp /etc/security/access.conf{,.bak}
```

```bash
sudo nano /etc/security/access.conf
```

Pour ajouter les utilisateurs, veuillez respectez la syntaxe :

```ini
+:votre_utilisateur:ADRESSE_IP
+:votre_utilisateur1:ADRESSE_IP1
+:votre_utilisateur2:ADRESSE_IP2
-:ALL:ALL
```

### Configuration de /etc/ssh/sshd_config

```bash
sudo nano /etc/ssh/sshd_config
```

Vérifiez que **UsePAM** est définis sur **yes**.
Si la valeur est définis à **no**, la règle sera tout simplement ignoré.

Vérification avec une commande :

```bash
sudo sshd -T | grep -i usepam
```

Chercher **AuthenticationMethods any**, remplacez par **AuthenticationMethods publickey**.<br />

Consulter le [man page](https://man7.org/linux/man-pages/man5/sshd_config.5.html) officiel pour plus d'information.

Si vous avez modifié la configuration dans **sshd_config**, exécutez :

```bash
sudo sshd -t && sudo systemctl reload ssh
```
