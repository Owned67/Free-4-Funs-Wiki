---
title: "SourceTV"
---

Editer votre fichier **server.cfg**<br />

Vous allez ajouter :

```text
tv_enable 1
tv_delay 90
tv_autorecord 0
tv_maxclients 20
tv_name "Free 4 Funs : TV"
```

Explication des variables :

- **tv_enable 1** = active la sourceTV, sur 0 désactive

- **tv_delay 90** = c'est le temps en secondes du différé, c'est a dire entre ce que voit les visiteurs et la réalité du jeu. Selon les ligues le temps peut varié.

- **tv_autorecord 0** = 0 désactive l'enregistrement automatique, 1 active l'enregistrement automatique.

- **tv_maxclients 20** = nombre de spectateurs pouvant regarder la sourcetv

- **tv_name "Free 4 Funs TV"** = nom de votre sourcetv

Sauvegarde le fichier puis uploader le sur votre FTP, un changement de map suffira pour appliquer les changements.

Il existe d'autres cvar pour la SourceTV mais nous trouvons que l'essentielle a été donné si toutefois vous souhaitez avoir des explications sur une cvar que vous ne comprenez pas, contacter moi par mail : leftfordead (at) sfr (point) fr.
