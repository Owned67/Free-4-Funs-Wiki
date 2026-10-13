---
title: "Alias rate interp"
---

Salut,

je vais pas vous expliquer en détails par contre cela vous permettra de modifier vos rates/lerp facilement.

Allez dans le répertoire **C:\Program Files (x86)\Steam\SteamApps\common\left 4 dead 2\left4dead2\cfg**

Vérifier que vous avez un fichier nommé **autoexec.cfg** sinon créer le avec un éditeur de texte (notepad++ de préférence...) et copié/collé ceci dedans :

```text
// Permet de changer de lerp de 0 a 100
alias _interp "interp0"
alias interp0 "cl_interp 0.00;cl_interp_ratio 0; alias _interp interp15"
alias interp15 "cl_interp 0.0152; alias _interp interp33"
alias interp33 "cl_interp 0.0333; alias _interp interp67"
alias interp67 "cl_interp 0.067;cl_interp_ratio 1; alias _interp interp100"
alias interp100 "cl_interp 0.100;cl_interp_ratio 1; alias _interp interp0"
bind "TA_TOUCHE" "_interp"
```

```text
// Permet de changer le cl_cmdrate,cl_updaterate et rate de 30 a 100
alias _rates "t30"
alias t30 "cl_cmdrate 30; cl_updaterate 30; cl_interp_ratio -1; rate 30000; alias _rates t60"
alias t60 "cl_cmdrate 60; cl_updaterate 60; cl_interp_ratio -1; rate 60000; alias _rates t100"
alias t100 "cl_cmdrate 100; cl_updaterate 100; cl_interp_ratio -1; rate 100000; alias _rates t30"
bind "TA_TOUCHE" "_rates"
```

Après avoir définis votre touche, il vous suffira d'appuyer dessus pour switcher entre les différents paramètres.

**Exemple Rates** : la première fois permet de switcher pour un tickrate 60, la seconde pour un tickrate 100 et la troisième fois, retour au tickrate 30.
