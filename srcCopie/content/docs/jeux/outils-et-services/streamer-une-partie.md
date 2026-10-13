---
title: "Streamer une partie"
---

## Introduction

Nous allons vous expliquer comment streamer une partie de Left 4 Dead 2.

Streamer = enregistrer une partie en direct sur un site tiers ([twitch.tv](http://www.twitch.tv/) par exemple).

Il existe plusieurs logiciels pour streamer une partie, après c'est une question de goûts et de couleurs ^^

## Requis

```text
* [https://tutocss.pages-perso.free.fr/wiki/OBS.exe Open Broadcaster Software]
```

```text
* [https://obsproject.com/download Open Broadcaster Software (site de l'auteur)]
```

Notre version a été faite dans le but de s'installer silencieusement, libre à vous de l'utiliser ou non.

```text
* Une connexion avec une émission supérieur ou égale à 2 Mo/s.
```

## Installation

Double cliquez sur l'exécutable et procéder à son installation (si vous avez choisis de télécharger la version officielle).

## Configuration

## Changer la langue

Ouvrez le logiciel :

![obs](/images-wiki/obs.jpg)

Allez dans l'onglet **Settings** ![icon11](/images-wiki/icon11.gif) **Settings** ![icon11](/images-wiki/icon11.gif) **General** :

![obs settings](/images-wiki/obs_settings.jpg)

Modifier la langue en mettant **français, langue française**, il faudra redémarrer l'application pour que la langue soit changée.

## Ajouter la source

Avant d'aller plus loin dans cette étape, vous devrez lancer **Left 4 Dead 2** en mode fenêtré pour pouvoir continuer... Une fois fait, réduiser le processus ou déplacer la fenêtre sur votre bureau pour pouvoir configurer correctement.

Dans **Source**, faite un clique droit puis sélectionner **Ajouter** ![icon11](/images-wiki/icon11.gif) **Capture de jeu** :
![obs capture jeu](/images-wiki/obs_capture_jeu.jpg)

```text
mettez '''l4d2''' par exemple :
```

![obs source nom](/images-wiki/obs_source_nom.jpg)

Si le processus n'est pas détecté, cliquez sur **Rafraîchir** puis dans la liste déroulante, chercher le processus **[left4dead2]: Left 4 Dead 2** et valider en cliquant sur **Ok**.

## Ajuster le flux réseau

Nous vous recommandons d'utiliser leur [utilitaire](https://obsproject.com/estimator) qui vous permettra de bien configurer le logiciel selon votre PC, connexion ADSL (cable, fibre etc..).

## Ajuster les paramètres de streaming

![obs streaming](/images-wiki/obs_streaming.jpg)

**Légende** :

1 **Mode** ![icon11](/images-wiki/icon11.gif) Deux options présentent ![icon11](/images-wiki/icon11.gif) **Stream en direct ¹** ou **Sortir vers un fichier ²**<br />
¹ Ce mode consistera à transmettre en direct votre partie.<br />
² Ce mode enregistrera votre partie sur votre disque dur.<br />

2 **Service de Stream** Plusieurs sites vous sont présentés.<br />

3 **FMS URL** N'ayant pas trop compris son fonctionnement, je laisse par défaut (nous y reviendrons ultérieurement...)<br />

4 **Clef du Stream** Pour twitch.tv, elle vous sera nécessaire et accessible ici : http://www.twitch.tv/votre_pseudo/dashboard/streamkey<br />

Pensez à cocher '''Minimiser l'impact sur le réseau''' et terminer la configuration...

## Réglage de la résolution de sortie du stream

**Vidéo** ![icon11](/images-wiki/icon11.gif) puis choisissez la résolution de sortie voulue. Si vous voulez de la HD, sélectionnez le 1280X720 ce qui vous fera du 720p. Si vous n'avez pas un très bon PC et la fibre optique, n'essayez pas d'allez au-dessus de nos recommandations !<br /><br />

Pour une meilleur optimisation de votre stream, choisissez un format qui soit du même ratio que votre écran.<br /><br />

![warning](/images-wiki/warning.png) Rappel des différents ratio par type d’écran :<br />

Les résolutions pour le 4/3 sont : 320*240, 512*384, 640*480, 1024*768, 1600*900<br />

Les résolutions pour le 16:9 sont : 640*360, 854*480, 960*540, 1024*576, 1280*720, 1366*768, 1600*900, 1920*1080, 2048*1152, 2560*1440, 3840*2160, 4096*2304<br />

Les résolutions pour le 16/10 sont : 1280*800, 1440*900, 1680*1050, 1920*1200, 2560*1600

## Réglage du nombre de FPS

(nombre d'images par secondes de notre stream).

Une valeur de 25 semble être un bon compromis cependant à vous d'ajuster en effectuant quelques tests.

Pour améliorer la qualité, vous pouvez cocher **Désactiver Aéro au démarrage**.

## Réglage Audio

Dans **Antiparasite microphone**, pensez à l'optimiser en vous aidant avec l'aperçu en temps réel des différents échos pouvant être entendu lors de votre streaming, cette étape est à faire avec beaucoup de précision.

Bien entendu, le logiciel offre beaucoup plus de fonctionnalités mais ici, vous avez l'essentiel pour réussir un bon stream de votre partie.
