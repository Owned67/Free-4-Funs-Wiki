---
title: "SourceBans 1.4.11 FR"
---

![sourcebans](/images-wiki/sourcebans.png)

## Présentation

Sourcebans est un plugin de gestion des bans via une interface web. Lorsque vous bannissez quelqu'un de votre serveur, le banni se retrouve ajouté sur la partie web avec le détail de son ban. Il peut protester son ban. Des joueurs peuvent faire une demande de ban via la partie web avec vidéo etc. SI vous possédez plusieurs serveurs, si vous bannissez quelqu'un, il sera banni de tout vos serveurs. Avec Sourcebans vous pouvez également créer plusieurs groupes et attribuer des droits différents pour chaque groupe. Pour faire un système VIP c'est idéal. Pour utiliser Sourcebans il vous faut donc un serveur de jeux et un hébergement web. Attention car chez certains hébergeur web tel que OVH pour du mutualisé Sourcebans ne fonctionne pas.

## Téléchargement

[SourceBans 1.4.11 FR](https://tutocss.pages-perso.free.fr/wiki/SourceBans-1.4.11_FR.zip)

## Requis

- [Sourcemod](/jeux/counter-strike-source/plugins/sourcemod/)

- [Apache2, MySQL, php](/administration/web-et-ftp/comment-creer-un-serveur-web-apache2/)

## Installation Web

- 1. Téléchargez l'archive
- 2. Décompressez l'archive sur votre ordinateur (avec un logiciel de décompression... Pour WinRar, clique droit et **Extraire vers SourceBans_1.4.10_fr**)

Une fois décompressé vous êtes face a ceci :

```text

```text
 |-- SourceBans_1.4.10_fr
 |
 |-- SourceBans_1.4.10_fr\game_upload
 |
 |-- SourceBans_1.4.10_fr\web_upload
 |
 |-- SourceBans_1.4.10_fr\changelog.txt
 |
 |-- SourceBans_1.4.10_fr\readme.txt
```

```

Renommez le dossier **web_upload** en **sourcebans** par exemple et envoyez le dossier sur votre serveur FTP à la racine de votre FTP Myriapulse **/**.

Pendant que le transfert se fasse, vous pouvez prendre un bon café :P.

Vous allez [attribuer un chmod](https://wiki.rusty-familly.eu/Filezilla#Comment_attribuer_un_chmod) 777 sur les dossiers/fichiers suivant :

- /demos,

- /images/games,

- /images/maps,

- /themes_c

Vous allez [attribuer un chmod](https://wiki.rusty-familly.eu/Filezilla#Comment_attribuer_un_chmod) 666 sur le fichier suivant :

- /config.php

Vous allez maintenant vous dirigez sur l'installation de Sourcebans via votre navigateur. Pour se faire vous allez sur http://votre_domaine.myriapulse.com/install ou si vous avez mis Sourcebans dans un dossier comme par exemple sourcebans votre lien sera http://votre_domaine.myriapulse.com/sourcebans/install.

Vous allez avoir ceci a l'écran :

![f4f sb install](/images-wiki/f4f_sb_install.jpg)

Vous allez **cocher la case** qui indique que vous avez lu et acceptez les termes de la licence puis cliquez sur le bouton ![f4f sb ok](/images-wiki/f4f_sb_ok.jpg).

Sur la page suivante vous allez rentrer vos informations de base de donnée que vous retrouverez en consultant [http://www.myriapulse.com/controlpanel/spdetails/XXXX](http://www.myriapulse.com/controlpanel/spdetails/XXXX) cette page puis onglet **Hébergement Web**.

Les **XXXX** représentent l'ID de votre serveur.

![f4f sb install sql](/images-wiki/f4f_sb_install_sql.jpg)

Voici en image le formulaire rempli :

![f4f sb install sql ok](/images-wiki/f4f_sb_install_sql_ok.jpg)

Cliquez sur le bouton ![f4f sb ok](/images-wiki/f4f_sb_ok.jpg) pour passer à l'étape suivante...

![f4f sb install check](/images-wiki/f4f_sb_install_check.jpg)

Tout est correct, cliquez sur le bouton ![f4f sb ok](/images-wiki/f4f_sb_ok.jpg)...

Si toutefois vous rencontrez un problème, corriger le puis cliquez sur le bouton ![f4f sb refresh](/images-wiki/f4f_sb_refresh.jpg) et vérifiez que tout soit correct !

Vous devriez voir cette fenêtre s'ouvrir dans la page :

![f4f sb install tables succes](/images-wiki/f4f_sb_install_tables_succes.jpg)

Cliquez sur ![f4f sb okay](/images-wiki/f4f_sb_okay.jpg) puis sur [[Fichier:f4f_sb_ok.jpg]

A la prochaine étape, il faudra créer le compte administrateur :

![f4f sb create user](/images-wiki/f4f_sb_create_user.jpg)

Voici le formulaire rempli :

![f4f sb create user ok](/images-wiki/f4f_sb_create_user_ok.jpg)

![warning](/images-wiki/warning.png) Le STEAMID est obligatoire ! ![warning](/images-wiki/warning.png)

Cliquez sur le bouton ![f4f sb ok](/images-wiki/f4f_sb_ok.jpg)...

![f4f sb install final](/images-wiki/f4f_sb_install_final.jpg)

Avant d'aller plus loin, connectez-vous à votre serveur FTP de votre jeu :

- Pour Counter-Strike:Global Offensive ![icon11](/images-wiki/icon11.gif) /games/csgo/addons/sourcemod/configs/databases.cfg'''.

- Pour Counter-Strike:Source ![icon11](/images-wiki/icon11.gif) /games/css/cstrike/addons/sourcemod/configs/databases.cfg'''.

- Pour Left 4 Dead 2 ![icon11](/images-wiki/icon11.gif) **/games/l4d2/left4dead2/addons/sourcemod/configs/databases.cfg**.

- Pour DoD:Source ![icon11](/images-wiki/icon11.gif) /games/dod/addons/sourcemod/configs/databases.cfg'''.

- Pour TF2 ![icon11](/images-wiki/icon11.gif) /games/tf/addons/sourcemod/configs/databases.cfg'''.

Le fichier **databases.cfg** ressemble à ceci :

```text
"Databases"
{
    "driver_default"        "mysql"

    
    // When specifying "host", you may use an IP address, a hostname, or a socket file path

    
    "default"
    {
        "driver"            "default"
        "host"                "localhost"
        "database"            "sourcemod"
        "user"                "root"
        "pass"                ""
        //"timeout"            "0"
        //"port"            "0"
    }

    
    "storage-local"
    {
        "driver"            "sqlite"
        "database"            "sourcemod-local"
    }

    "clientprefs"
    {
        "driver"            "sqlite"
        "host"                "localhost"
        "database"            "clientprefs-sqlite"
        "user"                "root"
        "pass"                ""
        //"timeout"            "0"
        //"port"            "0"
    }
}
```

Faite un clic droit puis **Afficher / Editer** sous FileZilla :

celui-ci s'ouvrira dans votre éditeur de texte par défaut et ajoutez-y le contenu en dessous de cette ligne **"driver_default"        "mysql"**.

Sauvegarder le fichier (CTRL + S pour les raccourcis de Windows), fermer votre éditeur de texte puis acceptez la modification, cocher la case puis accepter en cliquant sur **Oui**.

Maintenant il ne vous reste plus qu'à supprimer les répertoires **install** et **updater**.

Vous pouvez accéder au site http://votre_domaine.myriapulse.com ou si vous avez mis Sourcebans dans un dossier comme par exemple sourcebans votre lien sera http://votre_domaine.myriapulse.com/sourcebans et vous verrez que SourceBans a été installé avec succès.

## Configuration Web

Identifiez-vous au site et voici l'aperçu que vous aurez :

![f4f sb panel](/images-wiki/f4f_sb_panel.jpg)

En **rouge** la partie public.

En **vert** le menu admin.

**Ajouter un Groupe** :

Dans le menu admin vous allez cliquer sur **Groupes** ![icon11](/images-wiki/icon11.gif) **Ajouter un groupe** et vous saisissez le nom que vous désirez comme par exemple **Admin**.

En dessous vous avez le type de groupe à déterminer via un menu déroulant :

![f4f sb panel addgroupe](/images-wiki/f4f_sb_panel_addgroupe.jpg)

**Groupe admin Web** ![icon11](/images-wiki/icon11.gif) ce sera un groupe ayant accès a la partie admin de sourcebans côté web uniquement. Ce qui permettra de gérer les bans via la partie web.
**Groupe admin Serveur** ![icon11](/images-wiki/icon11.gif) ce type de groupe vous permet de créer des droits spécifique aux différents groupe que vous créer pour votre serveur de jeux. Par exemple admin, modo, VIP etc. Ce type ne gère que les droits sur serveur.
**Groupe Serveur**![icon11](/images-wiki/icon11.gif) Si vous souhaitez ajouter votre serveur a un groupe de serveur, personnellement je ne m'en suis jamais servi ^^.

Nous allons voir le **Groupe admin Web**et le **Groupe admin Serveur**.

**Groupe admin Web**:
Pour créer un groupe admin côté web, vous déterminez un nom de groupe a créer, par exemple **admin-web**.

Vous sélectionnez via le menu déroulant **Groupe admin Web** et la fenêtre s'agrandit avec les différentes options à déterminer pour ce groupe.
Vu que c'est le groupe **admin-web** je lui donne un accès totale donc je coche la 1ère case **Root Admin (Accès total)** puis je valide en cliquant sur ![f4f sb panel addgroupe save](/images-wiki/f4f_sb_panel_addgroupe_save.jpg).

Votre groupe apparait ensuite dans la liste sur la partie web. Vous pouvez créer autant de groupe que vous désirez.

Voyons le **Groupe admin Serveur** :
Vous entrez donc un nom de groupe par exemple **admin-serv** puis sélectionnez en dessous **Groupe admin Serveur**.
La fenêtre s'agrandit avec les différents droits a donner a votre groupe. Comme pour le web, comme c'est le groupe **admin** je lui donne un accès total aux droits sur serveur.

Je coche donc la 1ère case **Root Admin (Accès total)**, un peu plus bas dans la partie **Immunité** je lui met une valeur de **99** et je valide tout ça en cliquant sur ![f4f sb panel addgroupe save](/images-wiki/f4f_sb_panel_addgroupe_save.jpg).

Vous verrez qu'aucune n'est coché sauf la 1ère mais c'est normal contrairement a la partie web ou tout se coche d'un coup.
Votre groupe est donc ensuite ajouté à sourcebans.

Procédez de la même façon pour créer d'autres groupes. Concernant le **Immunité**, si vous créez un groupe avec une valeur de **80**, le groupe ne pourra rien faire contre un groupe avec une valeur de **99**.
Par contre si vous avez un groupe avec une valeur de 20 et un autre de 80, le groupe avec 80 pourra agir sur le groupe a 20.
Vos groupes sont donc créer, nous allons voir pour ajouter des joueurs a ces groupes.

**Ajouter un serveur** :

Dans un premier temps vous allez ajouter votre serveur à sourcebans. Pour cela vous allez vous loguer puis vous diriger dans le menu admin et cliquer sur **Serveurs**.

![f4f sb panel addserv](/images-wiki/f4f_sb_panel_addserv.jpg)

Vous remplissez les différents champs.

**Serveur IP/Domaine** ![icon11](/images-wiki/icon11.gif) Adresse IP du serveur
**Port serveur ** ![icon11](/images-wiki/icon11.gif) le port du serveur, par exemple 27015
**Passe Rcon ** ![icon11](/images-wiki/icon11.gif) mot de passe rcon
**Passe Rcon (Confirmer) ** ![icon11](/images-wiki/icon11.gif) confirmez le mot de passe rcon
** Mod serveur ** ![icon11](/images-wiki/icon11.gif) Choisissez votre jeu sous lequel tourne votre serveur
**Activation ** ![icon11](/images-wiki/icon11.gif) activé ou non, cochez la case
**SGroupes serveur ** ![icon11](/images-wiki/icon11.gif) Si vous souhaitez ajouter votre serveur à un groupe, mais le groupe est a créer avant.

Ensuite validez en cliquant sur ![f4f sb panel addserv bouton](/images-wiki/f4f_sb_panel_addserv_bouton.jpg) et un popup de confirmation s'affiche :

![f4f sb panel addserv succes](/images-wiki/f4f_sb_panel_addserv_succes.jpg)

Si vous ne cliquez pas sur **Ok**, vous serez automatiquement rediriger sur le serveur ajouté.

S'il n'apparait pas et qu'il vous met par exemple une erreur du type :

```text
Error connecting (188.188.188.188:27015)
```

c'est qu'il y a un soucis dans votre installation.

Maintenant que votre serveur est ajouté a sourcebans, nous allons créer un/des groupe(s) pour vos admins/modérateurs/VIP ou autre.

**Ajouter un joueur a un groupe** :

Vous allez cliquer sur le menu **Admins** Puis vous cliquez sur **Ajouter un admin**.

Vous voici face a ceci :

![f4f sb pane add admin](/images-wiki/f4f_sb_pane_add_admin.jpg)

- Pseudo admin ![icon11](/images-wiki/icon11.gif) entrez le pseudo du joueur, pas obligé qu'il ait exactement celui du jeu et évitez les charmap, un pseudo simple suffit c'est juste pour que vous sachiez qui fait quoi.

- STEAM ID Admin / ID communauté ![icon11](/images-wiki/icon11.gif) entrez son steamID

- Email de l'admin ![icon11](/images-wiki/icon11.gif) son adresse email

- Mot de passe de l'admin ![icon11](/images-wiki/icon11.gif) donnez-lui un mot de passe

- Confirmation du mot de passe ![icon11](/images-wiki/icon11.gif) confirmez le mot de passe

- Passe serveur (plus) ![icon11](/images-wiki/icon11.gif) l'admin devra entrer un mot de passe une fois sur le serveur pour jouir de ses droits. Il est conseillé de ne pas cocher cette case

**Accès admin** :

- Accès serveur ![icon11](/images-wiki/icon11.gif) cochez les serveurs sur lesquels votre admin aura les droits

**Admin persmissions** :

- Groupe admin Serveur ![icon11](/images-wiki/icon11.gif) sélectionnez le groupe sur lequel votre admin aura des droits sur le serveur

- Groupe admin Web  ![icon11](/images-wiki/icon11.gif) sélectionnez le groupe sur lequel votre admin aura des droits sur la partie web

Si vous désirez ne donner que des droits sur l'un ou l'autre, pour celui que vous ne voulez pas lui attribuer de droits sélectionnez **Aucune Permissions** et finalisez en cliquant sur ![f4f sb pane add admin bouton](/images-wiki/f4f_sb_pane_add_admin_bouton.jpg).

Votre admin est maintenant ajouté au système.

Effectuez un changement de map et votre admin devrait avoir les droits. Si ce n'est pas le cas, tentez un reboot. Si sa ne fonctionne toujours pas, vérifiez votre configuration...

'''Ajouter un Ban via l'interface Web''' :

Vous pouvez également bannir quelqu'un via l'interface web de Sourcebans. Pour se faire vous allez vous loguer sur Sourcebans avec votre compte admin puis vous allez dans le menu admin **Bans** Sur la page vous n'avez plus qu'a remplir les informations

- **Pseudo** ![icon11](/images-wiki/icon11.gif) pseudo, même approximatif ce n'est pas grave.

- **Type de ban**  ![icon11](/images-wiki/icon11.gif) soit par IP soit par steamID, je vous conseil par steamID

- **Steam ID / Community ID** ![icon11](/images-wiki/icon11.gif) son steamID

- **Adresse IP** ![icon11](/images-wiki/icon11.gif) son adresse IP si vous voulez le ban par IP uniquement.

- **Raison du Ban** ![icon11](/images-wiki/icon11.gif) la raison du ban

- **Durée du Ban** ![icon11](/images-wiki/icon11.gif) la durée du ban

- **Envoi Demo** ![icon11](/images-wiki/icon11.gif) envoyer une démo du cheateur ou insulte etc. (pas obligatoire)

Cliquez ensuite sur ![f4f sb addban](/images-wiki/f4f_sb_addban.jpg) et le joueur sera banni de tout vos serveurs. Les joueurs peuvent également soumettre une demande de ban, pour se faire ils s'inscrivent sur Sourcebans puis ils cliquent sur **Soumettre un ban**. Vous en tant qu'admin vous pouvez vérifier si une demande a été faite en allant dans le menu admin **Bans** puis dans le menu de gauche dans **Soumettre ban**.

**Protester un ban** :

Le banni peut venir protester son ban et en s'inscrivant sur votre Sourcebans il va aller dans le menu public Protest a ban Ensuite il va indiquer les détails suivant

- Type de ban''' ![icon11](/images-wiki/icon11.gif) steamID ou adresse IP

- Votre SteamID*''' ![icon11](/images-wiki/icon11.gif) son steamID (obligatoire)

- Pseudo *''' ![icon11](/images-wiki/icon11.gif) son pseudo (obligatoire)

- Raison pour laquelle vous devriez être débanni *''' ![icon11](/images-wiki/icon11.gif) invoquer une raison pour le déban (obligatoire)

- Votre Email*''' ![icon11](/images-wiki/icon11.gif) son adresse email (obligatoire)

Ensuite il cliquera sur ![f4f sb submitban](/images-wiki/f4f_sb_submitban.jpg) pour envoyer sa demande de déban.
Vous en tant qu'admin vous allez recevoir sa demande dans le menu admin **Bans** puis dans **Protester Ban** vous étudierez sa demande et prendrez une décision ^^

**Editer/supprimer un admin** :

Lorsque vous avez ajouter un joueur a votre système il vous est possible ensuite de l'éditer pour par exemple le changer de groupe ou éditer ses accès aux serveurs ou encore le retirer du système via la suppression de son compte admin. Pour se faire c'est très simple, il vous suffit de vous connecter a votre compte admin puis d'aller dans le menu admin **Admins**
Ensuite vous allez avoir la liste des admins, il vous suffira de cliquer sur l'admin que vous désirez éditer et vous aurez ceci a l'écran.

![f4f sb manageadmin](/images-wiki/f4f_sb_manageadmin.jpg)

Sur la colonne de gauche vous pouvez voir ses droits sur serveur et colonne de droite ses droits sur le web.
Ce sont les droits attribuer aux groupes crées au début.
Vous pouvez donc via la partie rouge :

- **Editer Détails** ![icon11](/images-wiki/icon11.gif) éditer les informations de l'admin, son pseudo, son mot de passe, son email ou encore son steamID

- **Editer Permissions** ![icon11](/images-wiki/icon11.gif) éditer les permissions, pour le web comme pour les serveurs donc attention a ne pas vous tromper. Mais si vous passez par la pour modifier ses droits retirez le du groupe dans lequel vous l'aviez mis

- **Editer accès serveur** ![icon11](/images-wiki/icon11.gif) éditer les accès aux différents serveur, pour retirer l'accès a un serveur il vous suffira de décocher le serveur

- **Editer Groupes** ![icon11](/images-wiki/icon11.gif) éditer le groupe de l'admin, vous pourrez le changer de groupe via ce bouton

- **Supprimer Admin** ![icon11](/images-wiki/icon11.gif) supprimer son compte admin de Sourcebans

**Configuration générale** :

Il vous ai possible d'éditer votre pas d'accueil et de la personnaliser. Pour cela vous aller vous connecter a votre compte admin et vous allez dans le menu admin **Settings Diverses** options s'offrent a vous pour éditer l'accueil. Voici quelques détails

- **Titre** ![icon11](/images-wiki/icon11.gif) le titre de votre Sourcebans

- **Chemin du logo ** ![icon11](/images-wiki/icon11.gif) le lien de l'image si vous en mettez une sinon laissez vide

- **Taille mini du passe ** ![icon11](/images-wiki/icon11.gif) nombre de caractère a mettre obligatoirement dans son mot de passe

- **Format de la date ** ![icon11](/images-wiki/icon11.gif) permet de formater la date

- **Zone  ** ![icon11](/images-wiki/icon11.gif) permet de définir la zone

- '''Heure d'été ''' ![icon11](/images-wiki/icon11.gif) permet d'activer l'heure d'été

- **Debug mode ** ![icon11](/images-wiki/icon11.gif) permet d'active le mode debug (celui-ci affichera les éventuelles erreurs etc...)

**Accueil paramètres** :

- '''Titre d'intro''' ![icon11](/images-wiki/icon11.gif) titre du texte d'introduction

- '''Texte d'intro''' ![icon11](/images-wiki/icon11.gif) le texte dans votre intro

**Importer une liste de ban** :

Vous pouvez importer une liste de banni comme par exemple si vous voulez importer les bannis qui sont dans votre fichier **banned_user.cfg** il vous suffit via le menu admin **Bans** d'aller ensuite dans Import Bans et d'aller chercher votre fichier et de l'importer.

Vous avez d'autres options de configuration de Sourcebansa pour le configurer à votre guise. Personnellement je n'ai touché a rien ^^

## Installation Serveur

Transférer le contenu du dossier **game_upload** sur votre serveur FTP à l'emplacement :

- Pour Counter-Strike:Global Offensive ![icon11](/images-wiki/icon11.gif) /games/csgo/'''.

- Pour Counter-Strike:Source ![icon11](/images-wiki/icon11.gif) /games/css/cstrike/'''.

- Pour Left 4 Dead 2 ![icon11](/images-wiki/icon11.gif) **/games/l4d2/left4dead2/**.

- Pour DoD:Source ![icon11](/images-wiki/icon11.gif) /games/dod/'''.

- Pour TF2 ![icon11](/images-wiki/icon11.gif) /games/tf/'''.

Redémarrer votre serveur et Enjoy.

Pour le jeu Left 4 Dead 2, après avoir créer les groupes, assigner le serveur et les groupes aux utilisateurs, vous devrez vous connectez au serveur et exécuter la commande :

```text
 sm_rehash
```

Ceci générera les fichiers **admin_groups.cfg** et **admins.cfg**.

## Vérification de l'installation

- 1. Tapez la commande suivante dans la console de votre serveur (par RCON ou via le logiciel [HLSW](/divers/hlsw/)) :<br />

- Rcon ![icon11](/images-wiki/icon11.gif) **rcon_password votre_passe_rcon** ![icon11](/images-wiki/icon11.gif) **rcon sm plugins list**

- [HLSW](/divers/hlsw/) ![icon11](/images-wiki/icon11.gif) **sm plugins list**

Cette commande sert à afficher la liste des plugins SourceMod installés sur votre serveur :

```text
 "SourceBans" (1.4.10) by SourceBans Development Team
```

[Source du plugin](http://forums.alliedmods.net/showthread.php?t=61000)

## F.A.Q

Q J'ai l'erreur : '''Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)'''

R Cette erreur se produit généralement lorsque le serveur de jeux et serveur web ne sont pas sur la même machine donc pour résoudre ceci, assurez-vous d'avoir mis dans **database.cfg** :
`<br />"sourcebans"<br /> 	{<br /> 		"driver"			"mysql"<br /> 		"host"				"IP_SERVEUR_WEB" // et NON localhost<br /> 		"database"			"sourcebans"<br /> 		"user"				"votre_utilisateur"<br /> 		"pass"				"votre_passe"<br /> 	}<br />`
puis sur votre serveur dédié et/ou VPS, connectez-vous à MySQL :

```bash
mysql -u root -p
```

, indiquer le mot de passe puis :

```bash
GRANT ALL ON base_de_donnee.* TO 'votre_utilisateur'@'IP_DEDIE_VPS';
```

Terminer avec la commande **exit** si le retour est affiché en **Query OK**.

Q Lors de l'import de ban, j'obtiens cette erreur :

:::note

Warning: file() [function.file]: open_basedir restriction in effect. File(/tmp/phpzLmc5Z) is not within the allowed path(s): (/var/www/site/) in /var/www/site/l4d2-funs.myriapulse.com/sourcebans/pages/admin.bans.php on line 20

Warning: file(/tmp/phpzLmc5Z) [function.file]: failed to open stream: Operation not permitted in /var/www/site/l4d2-funs.myriapulse.com/sourcebans/pages/admin.bans.php on line 20

Warning: Invalid argument supplied for foreach() in /var/www/site/l4d2-funs.myriapulse.com/sourcebans/pages/admin.bans.php on line 23

:::

R A la racine ou vous avez installez sourcebans, créer un fichier nommé **.htaccess** et ajoutez ceci :
`php_value upload_tmp_dir tmp/`

Si toutefois cela ne corrige pas le problème, contacter leur [Support](http://www.myriapulse.com/page/support) en expliquant le problème et il vous corrigeront ceci assez rapidement.
