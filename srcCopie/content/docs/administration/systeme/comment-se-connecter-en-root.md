---
title: "Comment se connecter en root"
---

## Introduction

:::caution[Avertissement]

Par mesure de sécurité, nous ne vous recommandons pas de laisser la connexion à root dans la configuration de votre serveur ssh. Utilisez plutôt Sudo[Sudo.
Concernant le choix du mot de passe, nous vous recommandons :
Minimum 16 caractères
Majuscules, minuscules, chiffres, caractères spéciaux
Unique (jamais utilisé ailleurs)
Pas plus de 4 caractères consécutifs de la même catégorie

:::

:::note

Lors de modification concernant la configuration du serveur SSH, tâchez d'avoir toujours une fenêtre PuttY ouverte et connecté !<br />
En cas de mésaventure, vous aurez toujours accès pour revenir en arrière.<br />
C'est pour cela qu'avant de redémarrer le service, tester la configuration, exécutez la commande : sudo sshd -t 2>&1 >/dev/null et testez avec votre seconde session car même si aucune erreur n'est détecté, cela ne veut pas dire qu'il n'y en a pas.

:::

Ce Tutoriel a été réalisé afin de vous montrer comment il faut faire pour se connecter en **ROOT SSH** à un serveur dédié.<br />
Si vous avez achetez un serveur dédié chez online.net par exemple, l'accès SSH vous sera donné donc vous n'aurez pas à installer le serveur ssh, cependant, si vous installer manuellement votre système d'exploitation, pensez à installer le serveur ssh (openssh-server).

Le compte **ROOT** pourra exécuter n'importe quel commande et celle-ci pourra être critique en cas de mauvaise utilisation (vécu :D).

## Prérequis

- Debian

- [puTTY](http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe)

Vous pouvez également utiliser WinSCP, SuperPutty, KiTTY ou tout autres logiciels permettant la connexion SSH à distance mais dans ce tutoriel, cela n'en fera pas l'objet.

## Installer puTTY

Après avoir téléchargé puTTY, lancer le.

![f4f putty](/images-wiki/f4f_putty.jpg)

## Configurer puTTY

Remplissez les champs cité avec les informations qui conviennent :

Les informations ci-dessous vous ont été envoyés par email lors de l'achat de votre machine ou via votre manager.

**Host Name (or IP address)** metter l'adresse IP de votre serveur dédié.<br />
**Port** Mettez le port.<br />
**Saved Sessions** Sa sera le nom de votre configuration, par exemple **Dedibox SC**<br />

puis cliquez sur le bouton **Save** pour sauvegarder les données.

Sélectionner votre serveur (clique gauche sur le nom en dessous de **Default Settings**).

![f4f putty conf](/images-wiki/f4f_putty_conf.jpg)

Pour vous connecter à votre serveur GDS, cliquez sur le bouton **Open** ou effectuer un double clique sur le nom de la configuration.

Une fenêtre **PuTTY Security Alert** s'ouvre, cliquez simplement sur **Oui** pour autoriser.

![f4f putty connexion](/images-wiki/f4f_putty_connexion.jpg)

![warning](/images-wiki/warning.png) Le mot de passe saisis ne s'affichera pas donc écriver le d'une seule traite.

Écrivez votre identifiant qui correspond à **root** et validez avec le touche **Entrée**.

L'étape suivante consiste à saisir votre mot de passe.

![f4f putty connexion pass](/images-wiki/f4f_putty_connexion_pass.jpg)

Une fois le mot de passe saisis, valider par votre **touche Entrée**
Si vous ne vous êtes pas trompé dans les informations de connexions, un message d'accueil s'affiche ainsi que la date de la dernière connexion du compte root ainsi que l'adresse IP de la personne s'étant connecté.

![f4f putty connexion ok](/images-wiki/f4f_putty_connexion_ok.jpg)

Vous voilà connecté à votre serveur dédié, ce tutoriel prend donc fin. :P

Pour y voir plus claire pour la suite de nos différents tutoriaux, vous pouvez écrire la commande **clear** puis appuyez sur la touche **Entrée**, cela vous donnera une fenêtre propre.

## Sécurisez l'accès ROOT

:::caution[Avertissement]

C'est vraiment une protection minimale, il vous faudra vous documenter pour mieux sécurisez l'accès ou vous pouvez consulter [ce site](https://blog.stephane-robert.info/docs/securiser/durcissement/ssh/).

:::

Se connecter en **ROOT** n'est pas recommandé !

```bash
nano /etc/ssh/sshd_config
```

On vas désactiver la connexion de ROOT en SSH.
Par défaut, la valeur est sur **yes**, pensez à la modifier en mettant **no**.

```text
 PermitRootLogin no
```

Cette option permet de définir le nombre de tentatives par IP avant de bannir l'adresse IP.
En voici un exemple :

```text
 MaxStartups 5:15:20
```

Le 5 correspond au nombre de tentatives avant d'avoir droit à une nouvelle chance.<br />
Le 15 correspond au pourcentage de chance pour avoir une nouvelle tentative.<br />
Et le 20 correspond au nombre de connexions maximal.<br />
[Source](http://www.commentcamarche.net/faq/29784-securiser-son-acces-ssh#le-coup-de-chance)

Désactive la connexion par mot de passe

```text
 PasswordAuthentication no
```

Recharger la configuration :

```bash
systemctl reload sshd
```

Pour vous identifiez en **ROOT** après cette modification, vous devrez faire :

```bash
su -
```

mettre le mot de passe et vous serez alors en **ROOT**.

Vous êtes un parano de la protection ?wbr>
Vous désirez recevoir un mail à chaque connexion de l'utilisateur **ROOT** ?

Je l'utilisais personnellement lorsque je possédais mes serveurs dédiés.

Voici les étapes à suivre, avec votre éditeur de texte préféré (nano sera utilisé dans notre tutorial) :

```bash
nano /root/.bashrc
```

Veuillez remplacer l'adresse mail :

```bash
  echo 'Connexion Root le ' `date` `who` | mail -s `hostname` Connexion Root de `who | cut -d"(" -f2 | cut -d")" -f1` votre_nom@votre_domaine.fr
```

Sauvegarder le fichier après avoir terminé.

Il existe d'autres façon de sécuriser l'accès **root** mais nous pensons qu'il y assez de tutoriels qui en parle donc nous n'allons pas nous attarder sur ce point.

## F.A.Q

Q : Les accents ne sont pas pris en compte lorsque puTTY est ouvert.

R : Il faut définir l'encodage de puTTY en UTF-8 pour ne pas avoir de caractères bizarre lors de la connexion au serveur.

Q : Les accents ne sont pas pris en compte lorsque puTTY est ouvert.

R : Il faut définir l'encodage de puTTY en UTF-8 pour ne pas avoir de caractères bizarre lors de la connexion au serveur.

Dans l'onglet **Window** ![icon11](/images-wiki/icon11.gif) **Translation** ![icon11](/images-wiki/icon11.gif) dans le menu déroulant, définisssez sur **UTF-8**.

![f4f putty conf utf8](/images-wiki/f4f_putty_conf_utf8.jpg)

Retournez dans l'onglet **Session** ![icon11](/images-wiki/icon11.gif) sélectionnez votre serveur puis cliquez sur le bouton **Save**.

Let&#39;s Go (Modifié le 26/09/2026 )
