---
title: "Compiler OpenSSH"
---

## Introduction

:::caution[Avertissement]

Free 4 Funs ne pourra pas être tenu responsable en cas de dégradation de votre serveur.

:::

Soyez scrupuleusement attentif à chaque étape, nous ne pouvons pas vous garantir que la méthode est générique selon l'âge et la distribution utilisée.
Pour compiler et installer la dernière version d'OpenSSH depuis les sources tout en remplaçant proprement la version d'apt sous Debian 11 (Bullseye).

## Prérequis

:::caution[Avertissement]

Ne fermez jamais votre session SSH actuelle pendant la manipulation.
Gardez toujours un terminal connecté actif en cas d'erreur pour éviter de vous retrouver à la porte.

:::

## Installation des dépendances

:::caution[Avertissement]

Debian 11 a atteint sa fin de vie (LTS) le 31 août 2026. Il faudra retirer et/ou commenter la ligne ci-dessous :

:::

```bash
deb http://security.debian.org/debian-security bullseye-security main
```

ou la remplacer par un instantané daté de snapshot.debian.org :

```bash
nano /etc/apt/sources.list
```

```bash
deb http://archive.debian.org/debian/ bullseye main contrib non-free
deb [check-valid-until=no] http://snapshot.debian.org/archive/debian-security/<TIMESTAMP>/ bullseye-security main contrib non-free
```

Remplacez **&lt;TIMESTAMP>** par un horodatage proche de la date de fin de vie (format YYYYMMDDTHHMMSSZ), trouvable sur https://snapshot.debian.org/archive/debian-security/?year=2026&month=08.

Installer les dépendances et outils de compilation :

```bash
apt update && apt install -y build-essential zlib1g-dev libssl-dev libpam0g-dev
```

Sous Ubuntu, il vous faudra certainement passer par le repo **universe**.

```bash
apt install -y software-properties-common && add-apt-repository universe && apt update
```

On met à jour les paquets après modification du sources.list :

```bash
apt update
```

Support pour les clés de type fido2/yubikey et autres :

```bash
apt install libfido2-1 libfido2-dev libfido2-doc fido2-tools libcbor-dev
```

## Compilation et installation OpenSSH

Sauvegarde de la configuration existante.
Conservez vos fichiers de configuration actuels ainsi que vos clés d'hôte pour éviter de casser vos accès futurs :

```bash
mkdir -p /etc/ssh/backup && cp -r /etc/ssh/* /etc/ssh/backup/
```

:::caution[Avertissement]

Ci-dessous est uniquement valable sous Debian 11 qui est la machine où j'ai compilé OpenSSH donc selon votre distribution, il faudra adapter les paquets !

:::

```bash
cd /opt && wget \
https://debian.sipwise.com/debian-security/pool/main/g/glibc/libc-dev-bin_2.31-13+deb11u13_amd64.deb \
https://debian.sipwise.com/debian-security/pool/main/g/glibc/libc6-dev_2.31-13+deb11u13_amd64.deb \
https://aptly.lf.net/stable/debian-11-official-security/pool/main/o/openssl/libssl-dev_1.1.1w-0+deb11u5_amd64.deb \
https://ftp.riken.jp/Linux/debian/debian-security/pool/updates/main/p/pam/libpam0g-dev_1.4.0-9+deb11u2_amd64.deb
```

```bash
apt install -y ./libc-dev-bin_2.31-13+deb11u13_amd64.deb ./libc6-dev_2.31-13+deb11u13_amd64.deb ./libssl-dev_1.1.1w-0+deb11u5_amd64.deb ./libpam0g-dev_1.4.0-9+deb11u2_amd64.deb
```

Télécharger et extraire les sources d'OpenSSH

Récupérez la dernière version portable (reconnaissable au suffixe p1) depuis les miroirs officiels OpenBSD :

```bash
cd /usr/src && wget https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-10.5p1.tar.gz
```

```bash
tar -xzf openssh-10.5p1.tar.gz && cd openssh-10.5p1
```

Vérifiez le chemin de sshd :

```bash
strings /usr/sbin/sshd | grep -E '^/(run|var)/.*(sshd|empty)' | grep -v 'pid$'
```

Si le résultat correspond à **/run/sshd**, vous n'avez pas à modifier la commande ci-dessous, autrement adaptez la selon votre résultat.

```bash
./configure --prefix=/usr \
                 --sysconfdir=/etc/ssh \
                 --libexecdir=/usr/lib/openssh \
                 --with-pam \
                 --with-privsep-path=/run/sshd \
                 --with-security-key-builtin
```

```bash
make -j$(nproc)
```

Vérification que le make est passé :

```bash
ls -l sshd sshd-session sshd-auth ssh sftp-server ssh-keygen
```

```text
-rwxr-xr-x 1 root root  712144 28 sept. 12:50 sftp-server
-rwxr-xr-x 1 root root 5073528 28 sept. 12:50 ssh
-rwxr-xr-x 1 root root 3624728 28 sept. 12:50 sshd
-rwxr-xr-x 1 root root 5396208 28 sept. 12:50 sshd-auth
-rwxr-xr-x 1 root root 5537104 28 sept. 12:50 sshd-session
-rwxr-xr-x 1 root root 3515696 28 sept. 12:50 ssh-keygen
```

Vérifier la version :

```bash
./ssh -V
```

doit retourner :

```bash
OpenSSH_10.5p1, OpenSSL 1.1.1w  11 Sep 2023
```

## Remplacer la version apt

Désinstallez la version de votre gestionnaire de paquets pour éviter les conflits de binaires.<br />
Ne PURGEZ pas le dossier **/etc/ssh** !

Le service systemd est supprimé avec le paquet, copiez-le avant :

```bash
cp /lib/systemd/system/ssh.service /etc/systemd/system/ssh.service && systemctl daemon-reload
```

```bash
apt remove -y openssh-server openssh-client
```

Puis installez votre version :

```bash
make install
```

## Vérification

Validez la configuration, puis redémarrez (gardez votre session actuelle ouverte) :

```bash
sshd -t && systemctl restart ssh
```

```bash
systemctl status ssh --no-pager
```

```bash
systemctl is-enabled ssh
```

 doit retourner : **enabled**

Avant de fermer votre terminal actuel, ouvrez une nouvelle fenêtre de terminal séparée et tentez de vous connecter en SSH :

```bash
ssh -v votre_utilisateur@ip_serveur 2>&1 | grep "remote software"
```

Si tout fonctionne, bloquez les paquets :

```bash
apt-mark hold openssh-server openssh-client openssh-sftp-server
```

Félicitations, vous avez réussi la compilation de OpenSSH.

## Configuration Fail2Ban

Avec une version récente d'OpenSSH (9.8 et plus), l'enregistrement dans le fichier **auth.log** pour les connexions réussies et/ou échouées peut voir sa syntaxe légèrement modifiée : au lieu de **sshd**, le suffixe **-session** peut s'ajouter (*sshd-session*).

Vérifiez d'abord si c'est le cas chez vous :

```bash
grep -c 'sshd-session\[' /var/log/auth.log
```

Si le résultat est supérieur à 0 et que vous avez Fail2ban, créez le fichier :

```bash
nano /etc/fail2ban/filter.d/sshd.local
```

et copier/coller :

```bash
[DEFAULT]
_daemon = (?:sshd(?:-session)?)
```

Vérifiez avec la regex :

```bash
fail2ban-regex /var/log/auth.log sshd
```

**Failregex : N total** doit être supérieur à 0.

```bash
systemctl restart fail2ban
```
