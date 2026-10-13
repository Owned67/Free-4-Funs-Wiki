---
title: "CSSMatch"
---

![CSSMatch par Nicolous](/images-wiki/cssmatch.png)<br />

## Qu'est-ce que CSSMatch ?

CSSMatch est un plugin simplifié de gestion des matchs pour Counter-Strike : Source.

## Objectif
Le but de ce plugin est d'offrir un système stable, simple à configurer et à utiliser, capable de gérer vos matchs.
(**Mais au fait, pourquoi utiliser un plugin pour gérer ses matchs ?**)
Principales fonctionnalités

```text
   * Si vous jouez contre des Allemands, des Anglais, des Espagnols, des Portuguais, des Russes ou des Hongrois, les joueurs étrangers verront les messages du plugin dans leur propre langue. D'autres langages peuvent être ajoutés.
```

```text
   * Lancement d'un match :
         o choix d'une configuration parmi celles présentes dans le dossier configurations
         o présentation du nouveau mot de passe aux joueurs
```

```text
   * Round au couteau (optionnel) :
         o impossible d'utiliser autre chose que le couteau (le C4 peut être autorisé)
```

```text
   * Strats / Warmup (optionnel) :
         o impossible de se blesser
         o possibilité d'interdire l'amorçage du C4
         o les teams peuvent se déclarer prêtes
```

```text
   * Match (optionnel) :
         o possibilité de déclenchement automatique d'un enregistrement SourceTV
         o affichage des scores en début de round
         o inversion des teams au demi-match
         o résumé du match
```

```text
   * Après match :
         o possibilité pour tous de consulter les scores
```

```text
   * Et bien d'autres fonctionnalités à découvrir et à venir :
```

L'allégement de la charge du serveur
Si votre serveur est dédié aux matchs, activez les options (basiques) d'administration et vous pourrez désinstaller votre système d'administration. Si vous utilisez le RCON, vous n'aurez plus à vous inquiéter de connaitre les commandes RCON nécessaires pour administrer le serveur.

CSSMatch est un plugin léger destiné aux serveurs hébergeants des matchs. Malgré qu'un serveur idéal soit un serveur sans plugin, CSSMatch ne peut normalement pas être à l'origine d'une baisse de la qualité du jeu.

## Téléchargement

Version complète :<br />
[CSSMatch 2.2.4 Complète](https://tutocss.pages-perso.free.fr/wiki/cssmatch_2_2_4.zip)

Patch 2.2.X -> 2.2.4 :<br />

[CSSMatch 2.2.4 Patch](https://tutocss.pages-perso.free.fr/wiki/cssmatch_2_2_4_patch.zip)

## Installation

Comment installer le plugin ?

```text
  1. Téléchargez le plugin
  2. Décompressez le fichier sur votre ordinateur (avec 7Zip par exemple)
  3. Envoyez le contenu du dossier '''addons''' dans le dossier '''addons''' de votre serveur
  4. Envoyez le contenu du dossier '''cfg''' dans le dossier '''cfg''' de votre serveur
  5. Redémarrez le serveur
```

Vérification de l'installation

```text
  1. Tapez la commande suivante dans la console de votre serveur (par RCON ou via le logiciel HLSW) : plugin_print . Cette commande sert à afficher la liste des plugins installés sur votre serveur.
  2. Vérifiez que cette liste contient bien le plugin CSSMatch
         * Si non, recommencez l'installation
         * Si oui l'installation est correcte
```

En cas de problème d'installation

Si vous êtes amené à poster sur le forum, merci de préciser ce que vous avez déjà fait pour installer le plugin (même si vous devez pour cela répéter ce tuto).

'''Note : Si votre serveur est hébergé sur une machine 64 bits et que vous n'arrivez pas à installer CSSMatch, une solution est présentée ici : [cssmatch 64 bits](http://www.cssmatch.com/forums/viewtopic.php?p=355#p355)'''

'''Note : Une traduction française de tous les fichiers de configuration peut être trouvée à l'adresse suivante :''' [traduction française](http://cssmatch.com/translations/french/)

## Configuration

Comment configurer le plugin ?

Le plugin se configure par l'intermédiaire de vos fichiers de configuration de match.

## Comment configurer un match ?

```text
  1. Allez dans le dossier '''cfg/cssmatch/configurations'''. Ce dossier contient toutes les configurations de match. Les fichiers .cfg présents dans ce dossier sont automatiquement listés dans le menu du plugin.
  2. Ouvrez le fichier '''mr12.cfg''' ou '''mr15.cfg'''. Ces fichiers sont des exemples de configuration de match pour 12 ou 15 rounds ([http://cssmatch.com/translations/french/configurations/mr12.cfg Vous pourrez trouver une traduction française de ce fichier ici)]. Vous y trouverez les "variables" spécifiques au plugin, toutes préfixées par "cssmatch", ainsi qu'un exemple de configuration du serveur utilisée pendant le match.
         * Modifiez les variables du plugin comme vous le souhaitez (elles sont toutes documentées dans le fichier)
         * Ajoutez/Modifiez/Supprimez les variables du jeu comme vous le souhaitez
```

## Ajouter des fichiers de configuration

Utilité : Principalement avoir le choix en MR12 et MR15. Mais si vous jouez pour une ligue, celle-ci vous imposera probablement une configuration. Il est utile de pouvoir choisir entre cette configuration et votre configuration habituelle dans le menu.

Comme dit plus haut, les fichiers .cfg présents dans le dossier **cfg/cssmatch/configurations** sont automatiquement listés dans le menu du plugin lors du lancement d'un match.

Pour ajouter un fichier de configuration personnel :

```text
  1. Créer un nouveau fichier dans un éditeur de texte
  2. "Enregistrez-le sous" avec le nom que vous voulez, et ajoutez au bout ".cfg"
  3. Les fichiers .cfg peuvent être ouvert avec n'importe quel éditeur de texte, ouvrez le fichier .cfg créé
  4. Ouvrez également le fichier '''mr15.cfg'''
  5. Copiez/collez les variables spécifiques au plugin dans votre nouveau fichier de configuration (elles sont préfixées par "cssmatch")
  6. Ajoutez la configuration du serveur à la suite du fichier
  7. Enregistrez puis envoyez le fichier sur le serveur dans le dossier '''cfg/cssmatch/configurations'''
  8. Changez de map ou redémarrer votre serveur
```

Pour ajouter un fichier de configuration d'une ligue :

Dans le principe ce n'est pas différent, sauf que ce n'est pas à vous de créer ou modifier le contenu du fichier fourni par votre ligue. Mais même si vous n'avez pas le droit de modifier la configuration imposée par la ligue, vous pouvez ajouter les variables "cssmatch...", elles sont indispensables à la configuration du plugin.

## Mon fichier n'apparaît pas dans la liste des fichiers au moment de lancer le match

```text
   * Vérifiez que le fichier est bien dans le dossier '''cfg/cssmatch/''' configurations de votre serveur
   * Vérifier que l'extension du fichier est bien ".cfg", s'il faut "enregistrez-le à nouveau sous" en ajoutant ".cfg" au bout du nom du fichier.
   * Assurez-vous d'avoir bien changé de map ou redémarrer le serveur depuis l'envoi du fichier (s'il faut refaites le)
```

Si vous n'arrivez toujours pas à ajouter de fichier dans la liste des configurations, venez poster sur le forum en donnant l'emplacement du fichier sur le serveur, et en mettant en '*pièce jointe* le fichier en question.

## Utilisation

Comment se mettre arbitre (admin) ?

```text
  1. Ouvrez le fichier '''adminlist.txt''' situé dans le dossier '''cfg/cssmatch''' ([http://cssmatch.com/translations/french/adminlist.txt Vous pourrez trouver une traduction française de ce fichier ici])
  2. Ajoutez votre '''STEAMID''' à la fin de ce fichier
  3. Changer de map ou redémarrer votre serveur
```

Vérifier que l'on est arbitre et utilisation du menu d'arbitrage :

```text
  1. Bindez la touche suivante dans votre '''config.cfg''' ou via votre console : 
     cssmatch
         * Exemple de bind sur la touche "e" de votre clavier : '''bind "e" "cssmatch"'''
         * Note : si vous ne voulez pas binder une touche, il est possible d'accéder au menu d'arbitrage en tapant cssmatch dans le TCHAT depuis la version 1.2 
  2. Connectez-vous à votre serveur, puis appuyez sur la touche que vous avez bindé.
         * Si vous voyez le menu, vous êtes bien arbitre
         * Si un message apparaît comme quoi vous n'êtes pas arbitre, votre steamID n'est pas le bon, vous n'avez pas envoyé le fichier sur le serveur, ou vous n'avez ni changé de map ni rebootez votre serveur après édition du fichier '''adminlist.txt'''. 
  3. Si vous ne voyez aucun message, le plugin est mal installé .
```

**Note** : si des steamID sont déjà présents dans votre **adminlist.txt** au moment de l'installation du plugin, supprimez les du fichier par prudence.

## Les commandes

## Introduction

Les commandes du TCHAT sont des commandes à taper dans la zone de dialogue. Ces commandes sont là pour vous simplifier la vie ou, dans de plus rare cas, pour vous donnez accès à de nouvelles fonctionnalités.

**Description**

Cette commande permet aux arbitres d'accéder au menu d'administration. Son utilisation n'apparaitra pas dans le TCHAT si elle est correctement tapée.

**!teamt Le nouveau tag de la team actuellement terroriste**

**Description**

Cette commande permet aux arbitres de personnaliser le tag de la team actuellement terroriste. Son utilité réside surtout dans le fait que la détection automatique des tags ne peut pas être parfaite dans tous les cas. Son utilisation n'apparaitra pas dans le TCHAT si elle est correctement tapée.

Exemple :

 !teamt ¤ Nirv@na ¤

**Description**

**!teamct Le nouveau tag de la team actuellement anti-terroriste**

Cette commande permet aux arbitres de personnaliser le tag de la team actuellement anti-terroriste. Son utilité réside surtout dans le fait que la détection automatique des tags ne peut pas être parfaite dans tous les cas. Son utilisation n'apparaitra pas dans le TCHAT si elle est correctement tapée.

Exemple :

  !teamct ¤ Nirv@na ¤

  !scores

**Description**

'''Cette commande permet à n'importe quel joueur de connaitre les scores du match en cours, ou du dernier match joué depuis que le serveur a démarré.'''

Exemples :

  !scores

ou

  !score

  !go

**Description**

'''Cette commande permet à n'importe quel joueur de déclarer sa team prête à commencer le match pendant le Strats Time. Cette commande ne peut être tapée qu'une fois par team. Lorsque toutes les teams sont déclarées prêtes, le Strats Time prend fin et le match commence.'''

Exemple :

  !go

ou

```text
 ready
```

  !password Nouveau mot de passe

**Description**

**Cette commande permet de modifier le mot de passe du serveur.**

Exemple :

  !password inwar

  !thetime

**Description**

Cette commande affiche la date et l'heure.
  !update

**Description**

**Cette commande affiche des informations sur la dernière version de CSSMatch disponible. **

## Lire les rapports de Match

## Introduction

A la fin de chaque match, un rapport de match est généré dans le dossier **/orangebox/cstrike/cfg/cssmatch/reports**. Le fichier ainsi généré porte dans son nom la date, l'heure et la map du match.

## Lire les rapports avec un navigateur Internet

Trois fichiers situés dans le dossier **/orangebox/cstrike/cfg/cssmatch/reports** sont indispensables pour lire un rapport :

```text
   * Le fichier cssmatch.xsl
   * Le fichier cssmatch.css
   * Le fichier du rapport
```

Ces trois fichiers doivent absolument se trouver dans le même dossier. Si c'est le cas, vous pouvez maintenant ouvrir le rapport avec un navigateur Internet.

## Lire les rapports depuis votre site Internet

Pour rendre accessible les rapports sur votre site Internet, récupérer les trois fichiers suivants du dossier **/orangebox/cstrike/cfg/cssmatch/reports** :

```text
   * Le fichier cssmatch.xsl
   * Le fichier cssmatch.css
   * Le fichier du rapport
```

Ces trois fichiers doivent absolument se trouver dans le même dossier. Envoyez donc ces trois fichiers dans un dossier de votre site Internet.

Exemple :<br /> Le dossier principal de mon site www.ma-team.fr se nomme **www**. J'envoie deux rapports dans le dossier **www/rapports**. Ce dernier contient donc les fichiers suivants :

```text
   * Le fichier cssmatch.xsl
   * Le fichier cssmatch.css
   * Le premier rapport 2009-04-03_22h24_de_dust.xml
   * Le second rapport 2009-04-04_23h23_de_prodigy.xml
```

Pour visualiser le premier rapport, je me rend à l'adresse www.ma-team.fr/rapports/2009-04-03_22h24_de_dust.xml. Pour visualiser le second, je visite l'adresse [www.ma-team.fr/rapports www.ma-team.fr/rapports]/2009-04-04_23h23_de_prodigy.xml.

Voici un aperçu de ce que ça donne : [2009-04-04_23h23_de_prodigy.xml](http://cssmatch.com/reports/2009-04-04_23h23_de_prodigy.xml)

Note : Pour que la page soit affichée en français, téléchargez la traduction française du fichier cssmatch.xsl ici : [cssmatch.xsl](http://cssmatch.com/translations/french/reports/cssmatch.xsl) (clique-droit > enregistrer la cible du lien sous).

## Donner au rapport le même style que votre site Internet

Pour modifier l'apparence des rapports, vous devrez modifier le fichier **cssmatch.css**. Il s'agit d'une [feuille de style en cascade](http://fr.wikipedia.org/wiki/Feuilles_de_style_en_cascade).
Ce fichier n'est pas compréhensible de tout le monde, mais une personne s'y connaissant un minimum en développement de sites Internet pourra facilement adapter le fichier pour vous.

Note : Si vous modifiez le fichier **cssmatch.css**, venez proposez votre modification sur ce forum. Vous aurez contribué au projet et vous aurez aidé la communauté CSSMatch :-) !

Si tout cela vous a donné envie d'apprendre à modifier vous-même le fichier cssmatch.css, ces tutoriels peuvent vous intéresser : [Apprenez à créer votre site web](http://www.siteduzero.com/tuto-3-6-0-apprenez-a-creer-votre-site-web.html).

## Automatiser la récupération des rapports

Certains systèmes seront développés pour automatiser la récupération des rapports, ainsi que des enregistrements SourceTV (et plus !). Ces systèmes en sont encore au stade de développement, comme vous aurez pu le constater sur le [forum des outils](http://www.cssmatch.com/forums/viewforum.php?f=35).
