---
title: "Comment chrooter les utilisateurs"
---

## Introduction

Si vous ne souhaitez pas installez un serveur FTP tout en voulant restreindre l'accès de certains répertoire, nous allons vous expliquez comment chrooter les utilisateurs dans leur répertoire %home%.

## Requis

- serveur SSH (qui de base est installé sur n'importe quel serveur dédié, VPS etc...)

- [Configurer puTTY](http://wiki.free4funs.fr/wiki/Comment_se_connecter_en_root#Configurer_puTTY)

## Configuration

Connectez vous en **ROOT** à votre serveur dédié puis éditez le fichier **sshd_config**:

```text
 nano /etc/ssh/sshd_config
```

ou

```text
 sudo nano /etc/ssh/sshd_config
```

Trouver (CTRL + K pour supprimer la ligne, le curseur doit être placé sur la ligne ou mettez un **#** devant.) :

```text
 Subsystem sftp /usr/lib/openssh/sftp-server
```

Remplacer par:

```text
 Subsystem sftp internal-sftp
```

Trouver :

```text
 X11Forwarding yes
```

Remplacer par :

```text
 X11Forwarding no
```

Trouver :

```text
 UsePAM yes
```

Remplacer par :

```text
 #UsePAM yes
```

Ajouter tout à la fin :

```text
 Match user votre_utilisateur,votre_utilisateur1,votre_utilisateur2,etc...
 ChrootDirectory /home/%u
```

Fermer en faisant **CTRL** + **X** et confirmer avec **O** puis on redémarre le service SSH :

```text
 service ssh restart
```

ou

```text
 sudo service ssh restart
```

Il ne nous reste plus qu'à redéfinir les permissions :

```text
 chown root:votre_utilisateur /home/votre_utilisateur
 chown root:votre_utilisateur1 /home/votre_utilisateur1
 chown root:votre_utilisateur2 /home/votre_utilisateur2
```

Vérifiez que le dossier **/home/votre_utilisateur** est bien en chmod 755.

## F.A.Q

=Q= Filezilla me retourne l'erreur : 

```text
Erreur :	Server unexpectedly closed network connection
Erreur :	Impossible d'établir une connexion au serveur
```

=R= Vous avez oubliez de faire la dernière étape...

=Q= Filezilla me retourne l'erreur : 

```text
Erreur :	Directory /home/votre_utilisateur: no such file or directory
Erreur :	Impossible de récupérer le contenu du dossier
```

=R= Fermer la connexion actuelle et ouvrez une nouvelle connexion.
