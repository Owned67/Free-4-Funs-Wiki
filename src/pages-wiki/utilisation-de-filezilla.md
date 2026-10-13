---
title: "Utilisation de Filezilla"
---

## Description

FileZilla propose un client FTP libre et simple d'utilisation qui permettra aux débutants comme aux utilisateurs confirmés de se connecter à distance sur un serveur afin d'y télécharger des fichiers. Cette application particulièrement riche en fonctionnalités supporte le glisser-déposer, les protocoles SSL et SSH et permet de reprendre les mises à jour et téléchargements interrompus y compris pour les fichiers de taille conséquente (supérieurs à 4 Go). Grâce au gestionnaire de sites intégré, vous pouvez accéder plus rapidement aux adresses auxquelles vous vous connectez de façon régulière. Dans la nouvelle mouture de FileZilla on retrouve de nouvelles fonctionnalités, notamment l'affichage de la quantité de données transférées et le temps de transfert dans la fenêtre de log. FileZilla dispose également d'un accès plus rapide à la fonction de limitation de vitesse des transferts et ajoute le support du bouton retour arrière sur les souris qui en disposent. Enfin FileZilla propose un rafraîchissement de l'interface avec des icônes mises au goût du jour.

[Source](http://www.01net.com/telecharger/windows/Internet/ftp/fiches/17966.html)

**Note** : Ce tutoriel n'a pas été réalisé dans le but de vous montrer toutes les fonctionnalités de FileZilla mais uniquement pour vous montrez comment ajouter un serveur FTP et comment vous y connectez.

## Installation

Allez sur le site [Filezilla](https://filezilla-project.org/download.php?show_all=1) puis téléchargez la dernière version.

Il est compatible avec les versions de Windows suivantes :<br />

- Windows 10 et 11 (32 et 64 bits)

Après avoir téléchargé, double cliquez sur le fichier **FileZilla_3.71.1_win64-setup.exe** puis suivez les étapes une à une jusqu'à la fin...

Si vous avez des doutes, cliquez sur **suivant** jusqu'à la fin...<br />
L'installation sera réalisé pour tous les utilisateurs de votre PC, le logiciel vas créer une icône sur le bureau, dans la barre de lancement rapide et placer un raccourcis dans le **Menu Démarrer** puis lancer le logiciel à la fin de l'installation.

## Comment ajouter un serveur FTP / SFTP

Nous ne détaillerons pas sur comment ajouter et/ou se connecter en SFTP via FileZilla car le principe est le même que pour le FTP sauf qu'il vous faudra sélectionner le mode SFTP à la place du FTP.

L'avantage du SFTP, vous n'installez pas de serveur FTP sur votre dédié.
L'inconvénient, les utilisateurs pourront se déplacer dans tout les répertoires et selon l'accès donné (je parle d'un compte **root** ou un utilisateur ayant [**sudo**](/pages-wiki/sudo)), ils pourront effacer des fichiers qui pourront être fatale au fonctionnement du système donc avant de donner ses accès, réfléchissez correctement à qui vous les confiés.

## Ajouter un serveur FTP / SFTP

- Allez dans votre boîte mail pour commencer et noter sur un bout de papier l'identifiant et le mot de passe reçu lors de la création de votre compte.

Mettez la fenêtre du logiciel en premier plan puis suivez le guide en image...

Dans l'onglet **Affichage** décochez les deux cases suivantes :

- Arborescence des dossiers locaux et

- Arborescence des dossiers distants

- Au-lieu de passer par le menu, vous pouvez également utiliser les raccourcis du clavier : **CTRL** + **S**.
![f4f filezilla](/images-wiki/f4f_filezilla.jpg)

Cela ouvrira le **Gestionnaire de Sites** :

![f4f filezilla gestionnaire](/images-wiki/f4f_filezilla_gestionnaire.jpg)

Cliquez sur le bouton **Nouveau Site** :

![f4f filezilla gestionnaire newsite](/images-wiki/f4f_filezilla_gestionnaire_newsite.jpg)

**Légende** :

**1** ![icon11](/images-wiki/icon11.gif) Mettez un nom (Exemple : Serveur War F4F)

**2** ![icon11](/images-wiki/icon11.gif) Correspond au nom d'hôte du serveur FTP F4F

**3** ![icon11](/images-wiki/icon11.gif) Numéro du port du serveur FTP F4F (Cette partie n'a pas besoin d'être modifié.)

**4** ![icon11](/images-wiki/icon11.gif) Choisissez le Type d'authentification ![icon11](/images-wiki/icon11.gif) Sélectionnez **Normale** dans le menu déroulant.

**5** ![icon11](/images-wiki/icon11.gif) Correspond à votre identifiant.

**6** ![icon11](/images-wiki/icon11.gif) Correspond au mot de passe de votre identifiant.

**7** ![icon11](/images-wiki/icon11.gif) Cette option ne vous servira à rien. :P

**8** ![icon11](/images-wiki/icon11.gif) Vous pouvez ajouter un commentaire *

![warning](/images-wiki/warning.png) * Nous vous déconseillons de mettre en commentaire votre identifiant et son mot de passe dans cette partie. Ces données sont sauvegardés dans le fichier **sitemanager.xml** du répertoire ![icon11](/images-wiki/icon11.gif)

:::note

%AppData%\FileZilla

:::

```text
donc si attrapez une infection et que celle-ci transmet ce fichier, l'utilisateur vous ayant infectés aura accès à votre/vos serveur(s) FTP.
```

Voilà comment vous devrez remplir les informations :

![f4f filezilla gestionnaire newsite ok](/images-wiki/f4f_filezilla_gestionnaire_newsite_ok.jpg)

Il ne vous reste plus qu'a enregistrer le nouveau site en cliquant sur le bouton ![f4f filezilla ok](/images-wiki/f4f_filezilla_ok.jpg).

## Comment se connecter à un serveur FTP

![f4f filezilla gestion](/images-wiki/f4f_filezilla_gestion.jpg)

Cliquez sur la petite flèche noir ![icon11](/images-wiki/icon11.gif) sélectionnez le site puis faite un clique gauche de votre souris.

![f4f filezilla gestion connexion](/images-wiki/f4f_filezilla_gestion_connexion.jpg)

Vous voilà connecté à votre serveur FTP :

![f4f filezilla gestion connexion ok](/images-wiki/f4f_filezilla_gestion_connexion_ok.jpg)

**Légende** :

1 ![icon11](/images-wiki/icon11.gif) Correspond au chemin du répertoire local (votre disque dur).

2 ![icon11](/images-wiki/icon11.gif) Correspond à l'emplacement local (votre disque dur).

3 ![icon11](/images-wiki/icon11.gif) Correspond au chemin du répertoire distant (votre serveur FTP).

4 ![icon11](/images-wiki/icon11.gif) Correspond à l'emplacement distant (votre serveur FTP).

Dans la colonne de gauche (Site Local) vous voyez :

- le nom des fichiers, la taille,

- le type de fichier et

- la date de la dernière modification.

Dans la colonne de droite (Site Distant) vous voyez :

- le nom des fichiers, la taille,

- le type de fichier,

- la date de la dernière modification,

- droits d'accès (cela correspond au CHMOD) et

- le Propriétaire/Groupe.

5 ![icon11](/images-wiki/icon11.gif) Correspond à la file d'attente des fichiers lors d'un transfert.

6 ![icon11](/images-wiki/icon11.gif) Correspond à la liste des fichiers dont le transfert a échoué.

7 ![icon11](/images-wiki/icon11.gif) Correspond à la liste des fichiers dont le transfert a réussi.

## Comment transférer des fichiers ?

Connectez-vous à votre serveur FTP, rechercher le/les fichiers sur votre disque dur dans la colonne **Site Local** puis faite la même chose dans la colonne de droite (alias **Site Distant**) puis une fois arrivé au bon endroit, faite un clique droit puis **Envoyer**.

Pour transférer un ou plusieurs fichiers, il vous suffit de le/les sélectionnez ![icon11](/images-wiki/icon11.gif) clique droit puis **Envoyer**.

## Comment attribuer un chmod

![warning](/images-wiki/warning.png) Si vous ne savez pas ce que vous faites, tenez vous en à la documentation de votre script php !

![warning](/images-wiki/warning.png) Nous ne pourrons pas être tenu responsable en cas d'une mauvaise manipulation de votre pars.

Pour effectuez cette opération, vous devrez être connecté à votre serveur FTP.

Vous avez plusieurs possibilités :

- **1** ![icon11](/images-wiki/icon11.gif) attribuer un chmod à un dossier / fichier,

- **2** ![icon11](/images-wiki/icon11.gif) attribuer un chmod à un dossier et à tous ses sous dossiers,

- **3** ![icon11](/images-wiki/icon11.gif) attribuer un chmod à un dossier et à tous ses fichiers,

- **4** ![icon11](/images-wiki/icon11.gif) attribuer un chmod à un dossier et à l'ensemble des dossiers / fichiers.

Les trois dernier listés correspondent à un chmod récursif.

Voici les différents chmod :

**1** :

Sélectionnez le dossier et/ou fichier ![icon11](/images-wiki/icon11.gif) faite un clique droit et choisissez '''Droits d'accès au fichier...''':

![f4f filezilla chmod](/images-wiki/f4f_filezilla_chmod.jpg)

Modifiez la valeur **755** par la valeur qui doit être mise dans le champ **Valeur numérique**, ici nous devons appliquer un **chmod 777**.

puis cliquez sur **Ok**. Voilà le dossier avec un chmod 777 non récursif.

**2** :

Sélectionnez le dossier ![icon11](/images-wiki/icon11.gif) faite un clique droit et choisissez '''Droits d'accès au fichier...''', c'est le même principe que pour les fichiers.

**3** :

Sélectionnez le dossier ![icon11](/images-wiki/icon11.gif) faite un clique droit et choisissez '''Droits d'accès au fichier...''':

![f4f filezilla chmod](/images-wiki/f4f_filezilla_chmod.jpg)

Modifiez la valeur **755** par la valeur qui doit être mise dans le champ **Valeur numérique**, ici nous devons appliquer un chmod 777 puis cocher la case **Récursion dans les sous-dossiers** puis sélectionner **Appliquer uniquement aux dossiers**.

**4** :

Sélectionnez le dossier ![icon11](/images-wiki/icon11.gif) faite un clique droit et choisissez '''Droits d'accès au fichier...''':

![f4f filezilla chmod](/images-wiki/f4f_filezilla_chmod.jpg)

Modifiez la valeur **755** par la valeur qui doit être mise dans le champ **Valeur numérique**, ici nous devons appliquer un chmod 777 puis cocher la case **Récursion dans les sous-dossiers** puis sélectionner **Appliquer à tous les fichiers et dossiers**.

Voilà, ce n'était pas si compliqué :P Pensez à lire les fichiers d'instructions qui sont généralement fournis dans l'archive du script php à installer sur votre serveur web.

## Augmenter le nombre maximum de transfert de fichier

Allez dans l'onglet **Edition** ![icon11](/images-wiki/icon11.gif) **Paramètres...**, descendez jusqu'à la partie **Transferts** puis modifier la valeur dans la case appropriée.

![f4f filezilla edition valeur](/images-wiki/f4f_filezilla_edition_valeur.jpg)

puis terminer en cliquant sur le bouton **Ok**.

## Forcer l'affichage des fichiers cachés

![f4f fillezilla fichiercache](/images-wiki/f4f_fillezilla_fichiercache.jpg)

Cocher la case comme ci-dessus sur la capture d'écran.

Voilà, c'est terminé :P
