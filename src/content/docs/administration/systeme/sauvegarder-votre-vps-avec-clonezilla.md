---
title: "Sauvegarder votre VPS avec Clonezilla"
---

## Introduction

Ce tutoriel a été réalisé pour sauvegarder votre VPS hébergé chez [https://www.hostmyservers.fr](http://Hostmyservers.fr) sur un hôte distant (Windows).

## Prérequis

Vous avez commandé une offre VPS active dans votre espace client.

Un espace de stockage externe sous Windows supérieure ou égale à votre espace disque du VPS (tutoriel réalisé avec Windows 11 et Clonezilla Live 3.3.3-15 — septembre 2026)

Un accès en SSH ou partage de fichiers (SSH est recommandé)

Une bonne connexion internet (FTTH de préférence)

De la patience... car selon la taille du disque, cela peut prendre du temps...

## Procédure

- La sauvegarde est une image complète du disque incluant les données système, partitions utilisateurs, chargeur de démarrage etc...

:::note

Au moment de la rédaction du tutoriel, je ne savais pas qu'on pouvait directement utiliser le DHCP donc il vous est inutile de la configurer manuellement, choisissez le mode DHCP

:::

Avant de commencer, sur votre VPS, notez les informations réseau qui vous seront demandées ultérieurement.

Exécutez la commande suivante :

```bash
ip a
```

Repérez l'interface réseau principale (par exemple `ens18`) et sa ligne **inet**.

Dans l'exemple ci-dessous :

```bash
inet 45.145.166.112 peer 45.145.166.1/32
```

relevez les informations suivantes :

- **IP du VPS** : `XX.XXX.XXX.XXX`

- **Netmask** : `` 255.255.255.255` `` (correspondant à /32)

- **Passerelle** : `` XX.XXX.XXX.1` ``

La passerelle correspond généralement à l'adresse indiquée après **peer**. Elle est souvent obtenue en remplaçant le dernier nombre de l'adresse IP par `.1`, mais cette valeur peut varier selon l'hébergeur et la configuration du VPS.

:::caution[Avertissement]

ne prenez pas l'adresse **127.0.0.1** de l'interface **lo** ; utilisez l'adresse **inet** de l'interface réseau principale.

:::

Connectez-vous à votre panel Hostmyserver.fr, sélectionnez votre instance... Dans l'onglet **Vue générale**, cliquez sur ![opera hbMTgfB5nF](/images-wiki/opera_hbMTgfB5nF.png)

Dans '''Télécharger l'URL, copier/coller ce lien : https://unlimited.dl.sourceforge.net/project/clonezilla/clonezilla_live_stable/3.3.3-15/clonezilla-live-3.3.3-15-amd64.iso

Ceci téléchargera la dernière version stable de Clonezilla (3.3.3.15) lors de la rédaction du tutoriel.

Cliquez sur le bouton Ajouter ![1n6KLgLb6s](/images-wiki/1n6KLgLb6s.png)

Veuillez patienter pendant le téléchargement de l'ISO...
![qK6eelUXtv](/images-wiki/qK6eelUXtv.png)

Cliquez sur les trois petits points ![QqdkpBhWBq](/images-wiki/QqdkpBhWBq.png)
) et sélectionnez **Monter**. Note : lorsque vous montez une image ISO sur votre instance active, celle-ci ne démarre pas immédiatement sur l'ISO. Cependant, si vous redémarrez votre VPS, celui-ci démarrera sur l'ISO montée et tous vos services seront temporairement indisponibles.

Vérifier que votre image ISO est bien affiché en monté ![HJwB83BnUw](/images-wiki/HJwB83BnUw.png)

Redémarrer votre serveur en validant l'opération ![1n6KLgLb6s](/images-wiki/1n6KLgLb6s.png)

Une fois votre VPS redémarré, il vous faudra accéder à la console VNC, cliquez sur **Accéder à la console VNC** et choisissez NoVNC Console graphique.
![opera vq5iO0zL00](/images-wiki/opera_vq5iO0zL00.png)

Validez en cliquant sur **Ok**

Il ne vous reste plus qu'à valider avec Connecter : ![LcpSXvkUTq](/images-wiki/LcpSXvkUTq.png)

Vous voilà dans l'instance CloneZilla ![H7MCjiMJoo](/images-wiki/H7MCjiMJoo.png), sélectionnez le premier choix (si aucune action dans le délai imparti, il démarrera sur ce mode, pas d'inquiétude !)

Avant de continuer, vous devrez ajouter une règle pour router l'adresse IP sinon vous n'aurez aucune connexion internet...
Allez dans **Enter_Shell** Passer en ligne de commande :

Se connecter en tant que **root**

```text
 

```bash
sudo -i
```

```

Activez l'interface réseau eth0

```text
 

```bash
ip link set eth0 up
```

```

Ajoutez l'adresse IPv4 :

```text
 

```bash
ip addr add XX.XXX.XXX.XXX/24 dev eth0
```

```

Vérifiez que eth0 est bien up :

```text
 

```bash
ip link
```

```

Configurez la route réseau

```text
 

```bash
ip route add XX.XXX.XXX.1 dev eth0
```

 

```bash
ip route add default via XX.XXX.XXX.1 dev eth0 onlink
```

```

XX.XXX.XXX correspond à l'IP du VPS.

Tapez deux fois 

```bash
exit
```

 pour revenir au menu principal !

:::caution[Avertissement]

NE REDEMARREZ SURTOUT PAS à cet instant sinon vous devrez recommencer les étapes précédentes de la configuration de l'IP et le routage !

:::

Étape par étape jusqu'au bouton **Start_Filezilla** :
![fr-FR](/images-wiki/fr-FR.png)
![klplOlNIH4](/images-wiki/klplOlNIH4.png)
![IbkfUgMukI](/images-wiki/IbkfUgMukI.png)
![QBWPH1He6K](/images-wiki/QBWPH1He6K.png)
![dWuMtReWYV](/images-wiki/dWuMtReWYV.png)
![A5Hs0YYoTQ](/images-wiki/A5Hs0YYoTQ.png)
![IdRqp0hts2](/images-wiki/IdRqp0hts2.png)
![i04En7ztBf](/images-wiki/i04En7ztBf.png)
![m8miGj7AoW](/images-wiki/m8miGj7AoW.png)
![1eepZCcICq](/images-wiki/1eepZCcICq.png)

:::caution[Avertissement]

Une erreur de ma pars, le chemin doit être complet, pour reprendre de notre tutoriel, ce sera : /C:\Users\Eric\vps2026

:::

```text
pour la capture d'écran ci-dessous.
```

Auteur du tutoriel: Eric B. Toutes mes excuses pour la capture éronnée et j'ai oublié de la refaire lors du second passage...
![JXkYYcBPnV](/images-wiki/JXkYYcBPnV.png)
![eWxeJVHOEH](/images-wiki/eWxeJVHOEH.png)

![UF5VgoaoRg](/images-wiki/UF5VgoaoRg.png)
![s6rc8NvhYz](/images-wiki/s6rc8NvhYz.png)
![rzskXzTxV2](/images-wiki/rzskXzTxV2.png)
![yeqmy5ECcl](/images-wiki/yeqmy5ECcl.png)
![Lo04ALxs42](/images-wiki/Lo04ALxs42.png)
![WMrVaH3Z0u](/images-wiki/WMrVaH3Z0u.png)
![Guvm7c6SgV](/images-wiki/Guvm7c6SgV.png)
![2N1BS02Hcf](/images-wiki/2N1BS02Hcf.png)
![Di1BPoNcOy](/images-wiki/Di1BPoNcOy.png)
![GZ6r9Heqdh](/images-wiki/GZ6r9Heqdh.png)
![XwvcxIpGH5](/images-wiki/XwvcxIpGH5.png)
![D8SZQ8YwCL](/images-wiki/D8SZQ8YwCL.png)

![iz1LGbLsHz](/images-wiki/iz1LGbLsHz.png)
![O19b9wPANb](/images-wiki/O19b9wPANb.png)
![wob4U2ZOVb](/images-wiki/wob4U2ZOVb.png)
![tAo6KKjemL](/images-wiki/tAo6KKjemL.png)
![Zw8S98gAYp](/images-wiki/Zw8S98gAYp.png)

Votre sauvegarde a été vérifiée et transférée avec succès sur votre hôte Windows.

## Restauration de la sauvegarde

:::caution[Avertissement]

Pour effectuer la restauration, l'ISO de Clonezilla doit être identique à celle qui a servi à sauvegarder votre serveur !
L'espace disque doit être égal ou supérieur à celui du disque sauvegardé !<br />
Si vous restaurez chez un autre prestataire ou sur une machine virtuelle, utilisez le même hyperviseur (Proxmox/KVM) et le même type de disque virtuel (contrôleur), faute de quoi le système risque de ne pas démarrer.

:::

Pour la restauration de la sauvegarde, répéter les mêmes opérations jusqu'à l'étape ou vous avez **Beginner, Expert**.
Choisissez **Beginner** puis restoredisk...

Voici les étapes lorsque vous avez passé le mode **Beginner** :

![restauration-img](/images-wiki/restauration-img.png)
![restauration-img1](/images-wiki/restauration-img1.png)
![restauration-img2](/images-wiki/restauration-img2.png)
![restauration-img3](/images-wiki/restauration-img3.png)
![restauration-img4](/images-wiki/restauration-img4.png)
![restauration-img5](/images-wiki/restauration-img5.png)
![restauration-img6](/images-wiki/restauration-img6.png)
![restauration-img7](/images-wiki/restauration-img7.png)
![restauration-img8](/images-wiki/restauration-img8.png)
![restauration-img9](/images-wiki/restauration-img9.png)
![restauration-img10](/images-wiki/restauration-img10.png)

Vous avez terminé avec succès la restauration de votre VPS !
