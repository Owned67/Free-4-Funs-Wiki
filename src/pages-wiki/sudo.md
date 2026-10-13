---
title: "Sudo"
---

## Introduction

Sudo est un très bon compromis pour autoriser certains utilisateurs à exécuter des commandes qui demande les droits de **ROOT**.

## Requis

- [Comment se connecter en ROOT ?](/pages-wiki/comment-se-connecter-en-root)

## Installer Sudo

L'installation est assez simple :

```text
 apt-get install sudo
```

## Configurer Sudo

Cette étape est primordiale et recommandé car visudo vas vérifier le fichier **/etc/sudoers**.

```text
 visudo
```

contenu par défaut du fichier :

```text
  #
  # This file MUST be edited with the 'visudo' command as root.
  #
  # Please consider adding local content in /etc/sudoers.d/ instead of
  # directly modifying this file.
  #
  # See the man page for details on how to write a sudoers file.
  #
  Defaults        env_reset
  Defaults        mail_badpass
  Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:$

  # Host alias specification

  # User alias specification

  # Cmnd alias specification

  # User privilege specification
  root    ALL=(ALL:ALL) ALL

  # Allow members of group sudo to execute any command
  %sudo   ALL=(ALL:ALL) ALL

  # See sudoers(5) for more information on "#include" directives:

  #includedir /etc/sudoers.d
```

## Autoriser uniquement un utilisateur à avoir les droits d'exécutions

Exécuter la commande **visudo** puis ajoutez ceci en dessous de **Defaults        env_reset** :

```text
 Defaults:votre_utilisateur tty_tickets
```

Lorsqu'un utilisateur qui n'a pas été autorisé, il aura ce message :

```text
 votre_utilisateur is not in the sudoers file.  This incident will be reported.
```

## Autoriser un utilisateur a exécuter toute les commandes

```text
 adduser wiki sudo
```

L'utilisateur **wiki** pourra exécuter n'importe quelle commande **root** avec sudo.

## Ajouter un utilisateur avec un mot de passe

Exécuter la commande **visudo** puis ajoutez ceci en dessous de **root    ALL=(ALL:ALL) ALL** :

```text
 wiki    ALL=(ALL:ALL) ALL
```

**wiki** est l'utilisateur de notre tutoriel donc pensez à le modifier et non à simplement copier/coller. ;)

Cette méthode aura pour effet que lorsqu'un utilisateur exécutera une commande root, il devra saisir son mot de passe pour que l'exécution se fasse.

## Ajouter un utilisateur sans mot de passe

Exécuter la commande **visudo** puis ajoutez ceci en dessous de **root    ALL=(ALL:ALL) ALL** :

```text
 wiki    ALL=NOPASSWD: ALL
```

Cette méthode aura pour effet que lorsqu'un utilisateur exécutera une commande root, il n'aura pas à saisir son mot de passe.

## Afficher des astérisques lors de la saisie du mot de passe

Exécuter la commande '*visudo*, chercher la la ligne :

```text
 Defaults env_reset
```

REMPLACER PAR :

```text
 Defaults    env_reset,pwfeedback
```

## Les alias

Cette partie se compose de trois étapes :

Cette option vous permet de copier le fichier de configuration sur des machines présentes sur le même réseau et ainsi retrouver les mêmes autorisations, personnellement, je n'utilise pas ceci donc elle ne sera pas expliqué de façon détaillée.

```text
 # Host alias specification
```

Cette option vas permettre aux utilisateurs que vous allez définir d'exécuter certaines commandes.

```text
 # User alias specification
 User_Alias HeadAdmin=letsgo,superg2,warhack
```

Cette option fonctionne avec celle cité précédemment, elle contiendra les commandes pouvant être utilisés par les utilisateurs définis dans la catégorie ci-dessus.

```text
 # Cmnd alias specification
 CMD_ALLOW=/bin/ping,/usr/bin/traceroute,/usr/bin/ftp,/usr/sbin/iftop
```

puis dans la section , on vas ajouter la configuration que l'ont souhaite :

```text
 HeadAdmin ALL=(ALL) CMD_ALLOW
```

## Vérification des erreurs

Pensez à exécuter la commande **sudo visudo -c** après chaque modification pour vérifier que le fichier de configuration ne comporte pas d'erreurs.

```text
 sudo visudo -c
 /etc/sudoers: parsed OK
 /etc/sudoers.d/README: parsed OK
```
