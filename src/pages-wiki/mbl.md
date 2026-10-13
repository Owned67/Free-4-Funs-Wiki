---
title: "Mbl"
---

## Gérer votre serveur mumble coté client

Nous partons du principe que le logiciel soit déjà installé sur PC pour tout le tutoriel.

## Requis

- [Avoir créé un serveur Mumble](/pages-wiki/comment-creer-un-serveur-mumble) ou être chez un GSP ([Myriapulse](http://www.myriapulse.com/?i=40700), [Verygames](http://www.verygames.net/247578) etc...).

## Comment ajouter mon serveur ?

Démarrer Mumble après l'installation, suivez les différentes étapes...

Une fois le logiciel démarré et configuré (assistant audio au premier démarrage), vous devriez retrouvez la fenêtre de Mumble et la liste des serveurs, pour la cacher, cliquez sur ![f4f icon mbl](/images-wiki/f4f_icon_mbl.jpg) à gauche de **Internet Public**.

![f4f mumble](/images-wiki/f4f_mumble.jpg)

Cliquez sur ![f4f mumble add new](/images-wiki/f4f_mumble_add_new.jpg) :

![f4f mumble add serv](/images-wiki/f4f_mumble_add_serv.jpg)

**Légende** :

**1** ![icon11](/images-wiki/icon11.gif) Permet de définir le nom de votre serveur affiché dans les **Favoris**.<br />
**2** ![icon11](/images-wiki/icon11.gif) Adresse ou IP ou votre nom de domaine de votre mumble.<br />
**3** ![icon11](/images-wiki/icon11.gif) Port du serveur Mumble<br />
**4** ![icon11](/images-wiki/icon11.gif) Votre pseudo.<br />

Les informations **2** et **3** pourront être retrouvés dans votre panel d'administration chez votre GSP (Game Server Provider) ou tout simplement dans le log serveur de votre installation.

Validez en cliquant sur le bouton ![f4f mbl ok](/images-wiki/f4f_mbl_ok.jpg).

Votre serveur apparaît dans la rubrique des ![f4f mumble favoris](/images-wiki/f4f_mumble_favoris.jpg) **Favoris**.

Cliquez sur ![f4f mbl connex](/images-wiki/f4f_mbl_connex.jpg) pour vous connecter à votre serveur.

## Comment se mettre admin de mon serveur ?

Avant toute chose, vous devrez créer un compte si cela n'est pas fait puis identifiez-vous au site avec vos identifiants.

Lancer le logiciel puis cliquez sur ![f4f mbl connex](/images-wiki/f4f_mbl_connex.jpg) pour vous connecter à votre serveur.

Accepter le certificat ![f4f4 mbl certificat](/images-wiki/f4f4_mbl_certificat.jpg) en cliquant sur **Oui**.

![f4f mumble connect](/images-wiki/f4f_mumble_connect.jpg)

En faisant un clic droit sur le nom du serveur, on constate qu'on ne peut ni créer un channel, ni l'éditer et ni le supprimer.
C'est également valable si vous essayez sur votre pseudo, vous n'aurez aucun droit !

![f4f mumble connect noprivilege](/images-wiki/f4f_mumble_connect_noprivilege.jpg)

Avant d'aller plus loin, nous allons enregistrer notre pseudo sur le serveur.

Clique droit sur le pseudo et cliquez sur '''S'enregistrer''' :

![f4f mumble connect register](/images-wiki/f4f_mumble_connect_register.jpg)

Validez l'enregistrement en cliquant sur **Oui**.

Déconnecter vous de votre serveur ![icon11](/images-wiki/icon11.gif) **Serveur** ![icon11](/images-wiki/icon11.gif) **Déconnexion**.

![Warning](/images-wiki/Warning.png) Ne fermer pas le logiciel ! ![Warning](/images-wiki/Warning.png)

Clique droit sur **Serveur** ![icon11](/images-wiki/icon11.gif) **Editer** :

![f4f mumble connect editsuperuser](/images-wiki/f4f_mumble_connect_editsuperuser.jpg)

Nom d'utilisateur ![icon11](/images-wiki/icon11.gif) Mettez **SuperUser** à la place de votre pseudo.

Mettez [le mot de passe](https://wiki.rusty-familly.eu/Comment_cr%C3%A9er_un_serveur_Mumble#Ajouter_le_SuperUser_2) puis validez en cliquant sur le bouton ![f4f mbl ok](/images-wiki/f4f_mbl_ok.jpg).

![Warning](/images-wiki/Warning.png) Le SuperUser ne pourra jamais parlé sur votre serveur, il ne sers qu'à gérer les admins, groupes au début.

Connectez-vous à votre serveur puis faite un clique droit sur le nom de votre serveur et répéter l'opération sur **Editer** :

![f4f mumble connect privilege](/images-wiki/f4f_mumble_connect_privilege.jpg)

Allez dans l'onglet **Groupes** ![icon11](/images-wiki/icon11.gif), dans le menu déroulant, sélectionner **admin** :

![f4f mumble connect privilege addmember](/images-wiki/f4f_mumble_connect_privilege_addmember.jpg)

à côté du bouton **Ajouter**, mettez votre pseudo puis cliquez sur **Ajouter** et terminez en cliquant sur ![f4f mbl ok](/images-wiki/f4f_mbl_ok.jpg).

Reconnectez vous et vous voilà admin de votre serveur.

## Comprendre **Les LCA** ?

[Comprendre Les LCA](http://mumble.sourceforge.net/ACL_and_Groups/Francais#Les_LCA)
