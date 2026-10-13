---
title: "Comment créer un serveur web (Apache2)"
---

## Introduction

![warning](/images-wiki/warning.png) Ce tutoriel n'est pas destiné aux administrateurs ayant installé un serveur lampp !!

Ce Tutoriel a été réalisé afin de vous montrez comment créer un serveur web avec apache2, php, mysql et phpmyadmin sur un serveur dédié.
Au final vous pourrez installer votre site web, cms etc...

![warning](/images-wiki/warning.png) Il faut savoir que ce tutoriel est destiné aux utilisateurs ayant quelques bases sur l'utilisation de Linux et ses dérivés.

**Note** : Ce tutoriel est réalisé à partir d'une machine virtuelle créé sur mon PC donc ne vous attardez pas sur l'adresse IP affichée et les diverses informations.

## Installation Apache2

Une fois connecté sous puTTY, nous mettons à jour la machine :

```bash
sudo apt update && sudo apt upgrade -y
```

Nous allons installer les librairies de base.

```bash
sudo apt install build-essential -y
```

Une fois les librairies installées nous allons installer apache2, php5 (avec php5-mysql), mysql-server et phpmyadmin.

Commençons l'installation...

```bash
sudo apt install apache2 -y
```

On active le démarrage au boot de la machine :

```bash
sudo systemctl enable --now apache2
```

Pour vérifier le statut :

```bash
sudo systemctl status apache2
```

Vous devrez voir : 

```text
Active: active (running)
```

## Installation PhpMyAdmin

Pour la configuration de PhpMyAdmin :
![f4f phpmyadmin](/images-wiki/f4f_phpmyadmin.jpg)

Vous sélectionnez **Oui** puis vous validez.
Sur la fenêtre suivante il vous demande votre mot de passe administrateur de la base de donnée, vous allez mettre celui que vous avez mis auparavant sur mysql puis validez.
L'installation de PhpMyadmin est terminé.

![f4f phpmyadmin pw](/images-wiki/f4f_phpmyadmin_pw.jpg)

![f4f phpmyadmin pw confirm](/images-wiki/f4f_phpmyadmin_pw_confirm.jpg)

![f4f phpmyadmin pw confirm ok](/images-wiki/f4f_phpmyadmin_pw_confirm_ok.jpg)

A ce stade vous pouvez déjà accéder a votre base de donnée ou encore a votre page web via http://IP_DU_SERVEUR pour la page web et pour l'accès base de donnée http://IP_DU_SERVEUR/phpmyadmin

## Installation serveur MySQL

Pour la configuration du serveur MySQL :

Il vous faudra attribuer un mot de passe pour le compte administrateur **ROOT** de MySQL.

![f4f mysql](/images-wiki/f4f_mysql.jpg)

![f4f mysql confirm](/images-wiki/f4f_mysql_confirm.jpg)

## Configurer apache2 pour un site

Voyons comment configurer apache2 pour 1 site avec l'utilisateur **serveur**.

Nous allons commencer par créer un dossier www dans home/serveur avec son utilisateur :
Pour se faire vous allez taper ceci :

```bash
su - serveur && mkdir /home/serveur/www
```

Autoriser Apache2 à accéder à **/home/serveur** :

```bash
chmod o+x /home/serveur
```

Maintenant on va créer un fichier **index.html** en procédant comme suit :

```bash
nano /home/serveur/www/index.html
```

une fenêtre noir s'ouvre et vous allez copier/coller ce code :

```ini
<html>
<body>
<p>Mon serveur Web fonctionne. :P</p>
</body>
</html>
```

on referme fichier en faisant le manipulation de touche suivante **ctrl** + **x** ensuite la touche **o** et pour finir la touche Entrée.

Nous allons maintenant dire à apache où se trouve votre fichier, plus techniquement, cela se nomme un **VirtualHost**.

Nous créons une sauvegarde du fichier avant modification :

```bash
sudo cp /etc/apache2/sites-available/000-default.conf{,.bak}
```

Pour se faire :

```bash
sudo nano /etc/apache2/sites-available/000-default.conf'''
```

Nous allons modifier le contenu du fichier comme ceci :

```ini
<VirtualHost *:80>
        ServerAdmin votre_mail@votre_domaine.fr

        DocumentRoot /home/serveur/www
        ServerName VOTRE_ADRESSE_IP_OU_URL
        <Directory />
                Options -Indexes +FollowSymLinks +MultiViews
                AllowOverride None
                Require all granted
        </Directory>
        ErrorLog ${APACHE_LOG_DIR}/error.log

        # Possible values include: debug, info, notice, warn, error, crit,
        # alert, emerg.
        LogLevel warn

        CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Quelques infos :

```text
ServerAdmin = votre adresse mail
    DocumentRoot = le chemin où sera placé votre site
    ServerName = l'url de votre site
```

Une fois les modifications faites vous faite la manipulation clavier ctrl + x ensuite vous appuyez sur "o" et validez par la touche Entrée.

Cette étape sert à donne les droits à l'utilisateur d'apache qui par défaut st **www-data**.

```bash
sudo chown -R www-data:www-data /home/serveur/www
```

Nous allons maintenant relancer apache2, pour se faire vous allez taper la commande suivante

```bash
sudo systemctl restart apache2
```

Votre serveur apache2 se relance. Dirigez vous sur l'adresse que vous avez définié et vous devriez voir :

```text
Mon serveur Web fonctionne. :P
```

c'est que tout est bon sinon reprenez étape par étape.

:::caution[Avertissement]

Si vous possédez un domaine, il faudra changer dans les DNS le champ Type A et mettre l'adresse IP de votre machine. Ce qui permettra a votre domaine de pointer sur votre machine.

:::

Connectez vous sur votre panel et cherchez l'option pour le changer. (le panel de là où vous louez votre domaine)

Nous allons ajoutez l'adresse IP ou le nom de domaine à la configuration de apache2 :

```bash
sudo nano /etc/apache2/apache2.conf
```

puis vous tapez

```text
ServerName VOTRE_ADRESSE_IP_OU_URL
```

Une fois les modifications faites vous faite la manipulation clavier **ctrl** + **x** ensuite vous appuyez sur **o** et validez par la touche Entrée.

Relancez ensuite apache2

```bash
sudo systemctl restart apache2
```

A ce stade tout est prêt, vous pouvez installer votre site web dans **/home/serveur/www**.
