---
title: "Comment configurer Exim4 en SmartHost"
---

## Introduction

Ce Tutoriel a été réalisé afin de vous montrer comment configurer Exim4 en smarthost. Ceci vous permettra d'envoyer et de recevoir des mails à partir du serveur smtp de gmail (un relay host pour résumer).
Dans notre tutoriel, le paquet **Exim4** n'est pas installé par défaut, cependant sur un système de base, celui-ci sera installé, il faudra simplement le re configurer.

## Requis

- Avoir les droits [Root](/administration/systeme/comment-se-connecter-en-root/)

- Avoir configurer le hostname

## Installation

```bash
apt install exim4
```

ou avec **sudo**

```bash
sudo apt install exim4
```

Après avoir installé **Exim** ou si il est déjà :

```bash
dpkg-reconfigure exim4-config
```

ou avec **sudo**

```bash
sudo dpkg-reconfigure exim4-config
```

Choisissez :

- Envoi par relais (smarhost) - réception SMTP ou fecthmail

- Nom de courrier du système : votre_domaine.com

- Liste d'adresses IP : Laissez par défaut

- Autres destinations dont le courrier est accepté : Laissez votre_domaine.com (ou effacer)

- Machines à relayer : Laissez vide

- Nom réseau ou adresse IP du système "smarhost" : smtp.gmail.com::587

- Faut-il cacher le nom local de courrier : Non

- Faut-il minimiser les requêtes DNS (connexions à la demande) : Non

- Méthode de distribution du courrier local : Format **mbox** dans /var/mail

- Faut-il séparer la configuration dans plusieurs fichiers : Oui

- Destinataire des courriers de **root** et **postmaster** : Laissez vide

Maintenant, on vas ajouter notre utilisateur gmail :

```bash
nano /etc/exim4/passwd.client
```

Ajouter :

```text
 *.google.com:votre_pseudo_gmail@gmail.com:votre_motdepasse_gmail
```

On sécurise :

```bash
chown root:Debian-exim /etc/exim4/passwd.client
chmod 640 /etc/exim4/passwd.client
```

Puis, faites :

```text
 nano /etc/email-addresses
```

Copier / coller :

```text
 votre_utilisateur: SMTPAccountName@gmail.com
 votre_utilisateur@localhost: SMTPAccountName@gmail.com
 votre_utilisateur@votre_domaine: SMTPAccountName@gmail.com
 votre_utilisateur@votre_domaine.localdomain: SMTPAccountName@gmail.com
```

On recharge la configuration puis on redémarre Exim :

```bash
update-exim4.conf
invoke-rc.d exim4 restart
```

Pour conclure, il nous faut tester cette configuration :

```bash
mail -s "test YESSSS" votremail.gmail.com
```

Si la commande **mail** vous retourne **non trouvé**, installer le paquet adéquate :

```bash
apt install mailutils
```

**mailutils** est mon préféré donc à vous de choisir celui qui vous conviendra au mieux !

On vérifie dans le log :

```bash
tail -f /var/log/exim4/mainlog
```

On admire :

:::note

2015-01-29 02:56:25 1YGjkm-000584-AQ Completed

:::

Ceci est une traduction de [ce site](https://wiki.debian.org/GmailAndExim4).

## Rediriger les mails locaux vers Gmail

Connectez-vous en root puis exécuter :

```text
 cd ~
 nano /etc/aliases
```

puis éditer la ligne commencant par **root** en modifiant par :

```text
 root: votre_mail@gmail.com
```

Sauvegarder (CTRL + O puis Entrée).

On vas re générer tout ça :

```text
 newaliases
```

## Les commandes à connaître

**Consulter les logs** ![icon11](/images-wiki/icon11.gif) sudo tail /var/log/exim4/mainlog<br />
'''Forcer la diffusion d'un message message-id''' ![icon11](/images-wiki/icon11.gif) sudo exim4 -M &lt;message-id><br />
'''Forcer l’exécution de la file d'attente''' ![icon11](/images-wiki/icon11.gif) sudo exim4 -qff<br />
'''Forcer l'exécution de la file d'attente et d'envoyer les messages bloqués''' ![icon11](/images-wiki/icon11.gif) sudo exim4 -qff<br />
'''Supprimer tous les messages de la file d'attente''' ![icon11](/images-wiki/icon11.gif) sudo exim4 -Mrm `ls /var/spool/exim4/input/ | grep -- -H$ | cut -c 1-16`<br />
'''Visualiser le journal d'un message ''' ![icon11](/images-wiki/icon11.gif) sudo exim4 -Mvl &lt;message-id><br />
'''Visualiser le contenu d'un message ''' ![icon11](/images-wiki/icon11.gif) sudo exim4 -Mvb &lt;message-id><br />
'''Visualiser l'entête d'un message ''' ![icon11](/images-wiki/icon11.gif) sudo exim4 -Mvh &lt;message-id><br />
'''Supprimer un messagede la file d'attente sans envoyer de message d'erreur''' ![icon11](/images-wiki/icon11.gif) sudo exim4 -Mrm &lt;message-id><br />
'''Abandonner l'envoi d'un message de la file d'attente et en informer son expediteur''' ![icon11](/images-wiki/icon11.gif) sudo exim4 -Mg &lt;message-id><br />
'''Visualiser le nombre de messages de la file d'attente''' ![icon11](/images-wiki/icon11.gif) sudo exim4 -bpr | grep "&lt;" | wc -l<br />
'''Visualiser le nombre de messages bloqués dans la file d'attente''' ![icon11](/images-wiki/icon11.gif) sudo exim4 -bpr | grep frozen | wc -l<br />
**Supprimer les messages bloqués** ![icon11](/images-wiki/icon11.gif) sudo exim -bpr | grep frozen | awk \{'print $3'\} | xargs exim -Mrm<br /><br />

## Protection contre le SPAM

`apt-get install greylistd`

ou

`aptitude install greylistd`

On copie la configuration :

```text
 cp -R /etc/exim4 /etc/exim4.pre-greylist
```

On ajoute greylist à exim :

```text
 greylistd-setup-exim4 add
```

Si vous souhaitez ajuster la configuration, le fichier est **/etc/greylistd/config**.

Vous pouvez également inclure une liste blanche dans **/etc/greylistd/whitelist-hosts**.

## F.A.Q

Q j'ai reçu un mail m'indiquant que j'ai été bloqué :

```text
Bonjour Free 4 Funs,

Vous avez récemment modifié vos paramètres de sécurité. Votre compte Google [free4funs@gmail.com] n'est donc plus protégé par les normes de sécurité modernes.
```

R Allez sur [la page](https://www.google.com/settings/security/lesssecureapps) et activer les applications puis renouveler le test.

Q j'ai l'erreur **ALERT: exim paniclog /var/log/exim4/paniclog has non-zero size, mail system possibly broken**, comment régler ce problème ?

R Toujours en **root** ![icon11](/images-wiki/icon11.gif) **netstat -ntpl |grep 25** ![icon11](/images-wiki/icon11.gif) identifier le service en question puis supprimer le (**aptitude remove paquet --purge**).

Vous pouvez simplement l'effacer/désactiver au démarrage :

```text
  update-rc.d nom_service disable (ou remove à la place de disable)
```

Puis éditer le fichier **/var/log/exim4/paniclog**, supprimer tout le contenu (pas de ligne vide !!) puis redémarrer Exim :

```text
 invoke-rc.d exim4 restart
```
