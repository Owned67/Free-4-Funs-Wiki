---
title: "Cvar"
---

## Introduction

Voici la notice d'utilisation des commandes **rcon** pour un serveur :

Tout d'abord pour pouvoir entrer les commandes, il faut utiliser la console (cf => [Afficher sa console](/jeux/counter-strike-source/joueurs/afficher-sa-console/))

## Comment s'identifier au rcon ?

Si vous êtes sur le serveur, il faut se munir du mot de passe rcon et rentrer dans la console:

```text
  rcon_password votremotdepassercon
```

## Comment changer de map ?

![Warning](/images-wiki/Warning.png) Il faut savoir que pour exécuter une commande rcon, vous devrez vous identifier au rcon !

Par exemple pour changer la map, il faudra écrire :

```text
  rcon changelevel lenomdelamap
```

## Comment modifier une variable ?

La valeur par défaut de la cvar ci-dessous est à **0**.

```text
 rcon sv_alltalk 1
```

Certaines variables sur L4D2 ont besoin de sourcemod pour être modifié donc voici comment procéder :

```text
 rcon sm_cvar ammo_shotgun_max 750 (valeur par défaut 650)
```

**Attention :** Toutes les commandes exécutées en cours de partie ne seront prise en compte que pendant cette partie !

Citer toutes les cars est impossible car elle sont bien trop nombreuses sur L4D2...

## Liste de toutes les Cvars

Connecter vous à votre serveur (n'installer rien, laisser le serveur vierge) et identifier vous au rcon puis taper :

```text
 rcon cvarlist
```

ou par [HLSW](/divers/hlsw/) :

```text
 cvarlist
```

[Cvar L4D2 2013](https://tutocss.pages-perso.free.fr/wiki/cvar_list_l4d2.txt)

![Warning](/images-wiki/Warning.png) Certaines cvar ne pourront être qu'exécutées avec **sv_cheats** à **1** ou en utilisant la commande (sourcemod requis) :

```text
 sm_cvar commande valeur
```

Dans le fichier .txt fournis, celle-ci sont facilement repérable grâce à l'indication donnée : **cheat**.
