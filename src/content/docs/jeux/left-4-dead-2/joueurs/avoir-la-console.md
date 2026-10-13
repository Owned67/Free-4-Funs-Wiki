---
title: "Avoir la console"
---

## Introduction

J'ai mis longtemps à trouver la solution et vu que certains m'ont demandé pourquoi leur console ne s'ouvrait pas en lobby donc je vous propose ce tutoriel.

## Requis

```text
- Le processus left4dead2.exe ne doit pas être en cours d'utilisation.
- un éditeur de texte ([http://notepad-plus-plus.org/fr/download notepad++] de préférence)
```

## Explication

Allez dans le répertoire **C:\Program Files (x86)\Steam\SteamApps\common\left 4 dead 2\left4dead2\cfg**

**NOTE**: avant d'attribuer une touche à la modification suivante, pensez à vérifier que celle-ci ne soit pas utilisée dans le fichier **config.cfg** autrement cela provoquera un conflit.

Vérifier que vous avez un fichier nommé **autoexec.cfg** sinon créer le avec un éditeur de texte (notepad++ de préférence...) et copier/coller ceci dedans :
`// Permet d'ouvrir la console n'importe quand<br />  // Attention les touches de A à Z ne fonctionne pas et je n'ai pas testé les touches du pavé numérique<br /> // Les touches F1 et F2 sont par défaut réservés aux votes.<br /> // La touche F3 est inutile pour L4D2<br /> bind "F3" "toggleconsole"<br />`

Sauvegarder (**CTRL** + **S**) et fermer le fichier.

Démarrer L4D2, créer votre lobby et appuyez sur la touche **F3**.

--Let&#39;s Go (discussion) 29 octobre 2013 à 10:19 (CET)
