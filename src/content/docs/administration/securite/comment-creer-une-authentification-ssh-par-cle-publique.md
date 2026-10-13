---
title: "Comment créer une authentification ssh par clé publique"
---

## Introduction

:::caution[Avertissement]

Par précaution, ne fermer pas la connexion de puTTY, attendez d'être sûr que vous avez correctement suivis notre tutoriel !

:::

Nous allons vous montrer comment renforcer d'avantage la connexion à votre serveur en créant une clé publique SSH qui vous permettra de passer outre la façon dont vous vous connectez à votre serveur (identifiant et mot de passe).

## Prérequis

- Serveur SSH (installé par défaut sur un serveur dédié)

- [Avoir sudo de configurer](/administration/systeme/sudo/)

- journald pour gérer la recharge/redémarrage du service ou équivalent

- Serveur synchronisé avec NTP

- [puTTY](http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe)

- [puttygen](http://the.earth.li/~sgtatham/putty/latest/x86/puttygen.exe)

## Génération de la clé SSH

Après l'avoir téléchargé, exécuter le logiciel puttygen.

![f4f puttygen](/images-wiki/f4f_puttygen.jpg)

Cliquez sur le bouton **Generate** puis bouger votre souris jusqu'à la fin.

![f4f puttygen generate](/images-wiki/f4f_puttygen_generate.jpg)

![f4f puttygen generate ok](/images-wiki/f4f_puttygen_generate_ok.jpg)

Dans le champ **Key Passphrases**, mettez un commentaire.<br />
![Warning](/images-wiki/Warning.png) La **passphrase** est très importante. C'est elle qui protège votre clef privée.

![f4f puttygen generate passphrases](/images-wiki/f4f_puttygen_generate_passphrases.jpg)

Sauvegarder la clef publique en cliquant sur **Save public key**, **id_rsa.pub** par exemple et faite de même pour la clef privée en ne lui donnant pas d'extension ![icon11](/images-wiki/icon11.gif) **id_rsa**, elle prendre l'extension **.ppk** par défaut !

La clef privée ne devra JAMAIS être donné !

Maintenant, nous allons importer la clef publique au serveur, connectez vous en SSH à votre serveur :

```text
 

```bash
cd ~
```

 

```bash
mkdir -p .ssh
```

 

```bash
nano .ssh/authorized_keys
```

```

La clef publique se trouve ici :
![f4f puttygen key](/images-wiki/f4f_puttygen_key.jpg)

Copier la clef entière en ignorant la dernière partie ** rsa-key-20131222** (20131222 correspond à la date de création) puis coller là dans la fenêtre pUTTY.

Vérifier que toute la clef soit sur une seule ligne !
Faite **CTRL + X** puis **O** pour sauvegarder les modifications.

Il nous reste une dernière étape avant de conclure, modifier la configuration de SSH :

```bash
sudo nano /etc/ssh/sshd_config
```

Rechercher **PasswordAuthentication yes** et remplacer par **PasswordAuthentication no**

Rechercher **PermitRootLogin yes** et remplacer par **PermitRootLogin no** ou avec prohibit-password ce qui exclus la connexion avec un mot de passe.

Vérifier que **PubkeyAuthentication ** soit définis sur **yes**.

Vérifier que la directive **AuthorizedKeysFile** est définie sur :

```bash
AuthorizedKeysFile      %h/.ssh/authorized_keys
```

Recharger la configuration ssh :

```bash
sudo systemctl reload sshd
```

Vérifier que la configuration est correct :

```bash
sudo sshd -t 2>/dev/null
```

Si aucun résultat, tout est bon !

Ouvrez une nouvelle instance de puTTY, sélectionner votre serveur puis cliquer sur **Load**, dans la colonne de gauche, allez dans l'option '*SSH* ![icon11](/images-wiki/icon11.gif) **Auth** puis sur **Browse...** et rechercher la clef privée (.ppk).

Remonter à l'onglet **Session**, mettez en survrilance votre serveur et finaliser en cliquant sur **Save**.

Lors de votre prochaine connexion, vous devriez voir s'afficher ceci :

```text
  login as: serveur
  Authenticating with public key "rsa-key-20131222"
  Passphrase for key "rsa-key-20131222":
```

Mettez la **passphrase** puis **Entrée**.

Si vous n'avez rencontrez aucun problème, redémarrer le serveur ssh :

```bash
sudo systemctl restart sshd
```

Félicitation, vous avez sécurisé un peu plus l'accès à votre serveur.

La clé publique peut être copiée sur le serveur et peut être communiquée sans compromettre l'authentification.
La clé privée, elle, ne doit jamais être communiquée.
Sa passphrase protège la clé privée en cas de vol du fichier.

## Authentification 2FA avec TOTP

:::caution[Avertissement]

Lorsque vous allez scanner le QR Code, un lien sera donné avec un avertissement qui même pour les non anglophones reste compréhensible **MAIS** surtout, n'exécutez pas ce lien dans un navigateur, cela exposerait votre clé secrète TOTP en clair sur les serveurs de Google.

:::

Vous devez avoir au préalable [créer une clé SSH](#generation-de-la-cle-ssh) de type RSA (voir explications dans le tutoriel) ou une clé de type Ed25519.

Ceci augmente considérablement la protection de la clé privée.

## Installation

Mise à jour des paquets :

```bash
sudo apt update
```

```bash
sudo apt install libpam-google-authenticator
```

Obtenir l'aide :

```bash
google-authenticator --help
```

## Génération du code barre (QR Code)

Génération du code barre :

```bash
google-authenticator -t -d -f -r 3 -R 30 -W
```

Explication des paramètres utilisés ici :

```text
-t : Utilise le mode TOTP (basé sur le temps) [RFC 6238].
-d : Active l'option --disallow-reuse (interdit la réutilisation d'un code).
-f : Force l'écriture du fichier de configuration sans vous demander confirmation.
-r 3 -R 30 : Limite le taux de tentatives (rate-limiting) à maximum 3 essais toutes les 30 secondes pour bloquer les attaques de force brute.
-W : Conserve la fenêtre de validation standard à 30 secondes au lieu de l'élargir.
```

Vous pouvez également ajouter l'argument **-e valeur** à la commande pour définir le nombre exact de codes de secours à générer (par exemple, `-e 10` pour obtenir 10 codes).<br />
Si vous utilisez la commande sans argument, vous devrez répondre **y** (yes / oui) à toutes les questions :
Après avoir lancé la commande `google-authenticator`, le terminal va vous poser une série de questions. Voici les réponses recommandées pour assurer une sécurité maximale :

```text
* '''Do you want authentication tokens to be time-based?''' ➔ Tapez '''y''' (Active le mode basé sur le temps, indispensable pour Aegis).
* '''Do you want me to update your "~/.google_authenticator" file?''' ➔ Tapez '''y''' (Enregistre la configuration pour votre utilisateur).
* '''Do you want to disallow multiple uses of the same token?''' ➔ Tapez '''y''' (Active l'option anti-rejeu pour bloquer les pirates).
* '''By default, a token is valid for 4 minutes... Do you want to increase this?''' ➔ Tapez '''n''' (Refuse d'élargir le temps de validité pour garder une sécurité stricte de 30 secondes).
* '''Do you want to enable rate-limiting?''' ➔ Tapez '''y''' (Active la limitation à 3 tentatives maximum toutes les 30 secondes pour bloquer les attaques de force brute).
```

![Topt](/images-wiki/Topt.png)

Ouvrez votre téléphone puis votre application qui gère l'authentification 2FA et scanner le QR code puis saisissez le code demandé dans la fenêtre.

Après avoir validé votre code :

```text
Code confirmed
Your emergency scratch codes are:
  12345678
  24896531
  31469752
  13649784
  55997788
```

Sauvegarder les codes de secours qui ont générés sur votre PC, sur un papier mais ne les conservez pas sur la machine.<br />

Si vous perdez votre téléphone ou que votre application qui gère l'authentification est effacée, vous perdrez l'accès à votre serveur. C'est ici que vos codes de secours à 8 chiffres vous seront utiles.<br />
Les codes de secours sont à utilisation unique donc après l'avoir utilisé et validé, il faudra le supprimer de l'endroit où vous l'avez sauvegardé !

Rassurez-vous, les codes listés dans le tutoriel ne sont pas mes codes de sauvegarde.

**Activation du module TOTP dans PAM** :

```bash
sudo nano /etc/pam.d/sshd
```

Après **# PAM configuration**, ajoutez :

```bash
auth required pam_google_authenticator.so nullok
```

Si OpenSSH antérieure à la version 8.8 :
Mettez en commentaire la ligne : **@include common-auth** -> **#@include common-auth**

Sauvegarder et fermer.

:::caution[Avertissement]

L'argument nullok en fin de ligne est une sécurité temporaire indispensable pour la mise en production. Il permet aux utilisateurs n'ayant pas encore généré leur clé TOTP de continuer à se connecter avec leur seule clé SSH. Une fois que vous avez validé que votre propre 2FA fonctionne, supprimez impérativement ce mot **nullok** pour rendre le facteur strictement obligatoire pour tout le monde. Il n'est pas possible de désactiver pour un utilisateur spécifique, soit vous laissez nullok que nous ne recommandons pas, soit vous supprimez le paquet et retour au début.

:::

'''Forcer l'enchaînement Clé SSH + TOTP''' :

Ajoutez ou modifiez les directives suivantes (si elles existent déjà, décommentez-les et ajustez leurs valeurs) :

```bash
# Autoriser les invites interactives (nécessaire pour demander le code)
KbdInteractiveAuthentication yes # Si OpenSSH supérieur ou égale à la version 8.8

# Exiger obligatoirement la clé publique PUIS le code TOTP
# Si OpenSSH antérieure à la version 8.8
AuthenticationMethods publickey,keyboard-interactive:pam
# Si OpenSSH >= 8.8
AuthenticationMethods publickey,keyboard-interactive
```

Vérifiez également que ses valeurs soient définis de la sorte ou ajoutez les :

```bash
PubkeyAuthentication yes
PasswordAuthentication no
ChallengeResponseAuthentication yes   # Si OpenSSH antérieure à la version 8.8
UsePAM yes
PubkeyAcceptedKeyTypes +rsa-sha2-256,rsa-sha2-512 # Si OpenSSH antérieure à la version 8.8 et si votre clé ne correspond à la norme de 2026 (Ed25519)
```

:::note[Note]

Si votre serveur utilise une version d'OpenSSH antérieure à la version 8.8, la directive KbdInteractiveAuthentication peut ne pas être reconnue. Utilisez à la place : ChallengeResponseAuthentication yes.

:::

:::caution[Avertissement]

Si vous avez gardé votre session active, passez au redémarrage, sinon ouvrez une session immédiatement. Si vous avez fait une erreur de syntaxe dans la configuration, vous risquez de perdre définitivement l'accès au serveur, ce qui impliquera un passage obligatoire en mode rescue pour réparer.

:::

Redémarrer le serveur SSH :

```bash
sudo systemctl restart sshd
```

## F.A.Q

Q : J'obtiens l'erreur **no supported authenficiation method available server sent: keyboard-interactive**

R : Vous avez loupez une étape du tutoriel, veuillez reprendre calmement et doucement !

Q : Lors de la saisis du code, j'ai le message : permission denied

R : Votre machine ou téléphone ne sont pas sur le même fuseau horaire, veuillez vérifier la date/heure des deux et si besoin, synchronisez les.

Q : Peux t'ont regénérer les codes de secours ?

R : L'aide officielle ne propose pas de commande pour renouveler uniquement ces codes.<br />
Si vous avez épuisé vos codes de secours, il vous faudra régénérer un nouveau QR code.<br /> Cela effacera votre ancienne configuration et créera une nouvelle liste de codes de secours à 8 chiffres (pensez à mettre à jour votre application Aegis avec le nouveau secret).<br />

Les utilisateurs avancés peuvent toutefois éditer manuellement le fichier caché :

```bash
nano ~/.google_authenticator
```

 pour y ajouter manuellement de nouveaux codes à 8 chiffres (précédés d'un dièse #), à condition de respecter strictement les permissions du fichier.
