---
title: "Se connecter a son server"
---

Allez dans le répertoire **X:\Program Files (x86)\Steam\SteamApps\common\left 4 dead 2\left4dead2\cfg**

**X** ![icon11](/images-wiki/icon11.gif) représente la lettre de la partition où vous avez installez le jeu.

Vérifier que vous avez un fichier nommé **autoexec.cfg** sinon créer le avec un éditeur de texte (notepad++ de préférence...) et copié/collé ceci dedans :
`// Permet d'ouvrir la console n'importe quand<br />  // Attention les touches de A à Z ne fonctionne pas et je n'ai pas testé les touches du pavé numérique<br />  // La touche F3 est inutile pour L4D2<br /><br />  bind "F3" "toggleconsole"<br /> alias _serv "mm_dedicated_force_servers IP_DU_SERVEUR:PORT"<br /><br />`

Créer votre lobby, appuyez sur la touche **F3**, écrivez **"_serv"** sans les quotes et démarrer la partie. <br />

Selon la disponibilité *****, il vous connectera au serveur. <br />

***** Si votre serveur est configuré en publique (sv_steamgroup_exclusive 0), si il y a des joueurs de connectés dessus, vous ne pourrez pas le rejoindre, vous devrez kicker tout le monde avant de pouvoir rejoindre votre serveur, a noter qu'entre le kick et la connexion, d'autres pourront rejoindre votre serveur...)

Enjoy.
