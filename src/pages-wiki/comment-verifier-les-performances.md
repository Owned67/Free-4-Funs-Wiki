---
title: "Comment vérifier les performances ?"
---

## Introduction

Le benchmark permet d’analyser les performances de votre serveur et d’identifier d’éventuels problèmes liés aux différents composants du système.

**UnixBench** n’est pas le seul outil permettant d’effectuer des tests de performances. Il existe de nombreux autres outils, notamment :

- iostat — analyse les performances des disques, l’activité CPU et les entrées/sorties du système ;

- vmstat — fournit des informations détaillées sur la mémoire, le CPU et les processus ;

- mpstat — permet d’analyser précisément l’utilisation des processeurs et de chaque cœur ;

- top ou htop — permettent de surveiller en temps réel les processus et l’utilisation des ressources système ;

- netstat ou tcpdump — permettent d’analyser les connexions et le trafic réseau ;

- iftop — permet de surveiller la bande passante et les flux réseau ;

- sysstat — regroupe plusieurs outils d’analyse et de surveillance des performances du système.

Cette liste n’est évidemment pas exhaustive. Il existe de nombreux autres outils spécialisés permettant d’analyser plus précisément le CPU, la mémoire, les disques, le réseau ou encore les processus.

Avec ces outils, vous disposez déjà de l’essentiel pour effectuer un diagnostic et surveiller efficacement les performances de votre serveur.

## Tester les performances Hardwares

### Requis

- apt install build-essential libx11-dev libgl1-mesa-dev libxext-dev perl perl-modules make gcc unzip -y

### Installation UnixBench

On télécharge l'archive :

```bash
cd /opt && sudo wget -q https://github.com/kdlucas/byte-unixbench/archive/master.zip -O UnixBench.zip
```

On extrait l'archive :

```bash
sudo unzip -q UnixBench.zip && sudo rm -f UnixBench.zip
```

## Lancement du Benchmark

Si votre machine est configuré en Français, modifier le fichier **Run** :
(Ligne 82) Chercher **my $language = "en_EN.utf8";**' puis remplacer par **my $language = "fr_FR.utf8";**.

Sauvegarde le changement avec **CTRL** + **X** et **o**.

### Utilisation UnixBench

```bash
cd byte-unixbench-master/UnixBench && ./Run
```

Vous avez le temps d'allez boire un café si jamais... ^^

Résultat d'un VPS hébergé chez [Hostmyservers.fr](https://www.hostmyservers.fr) :

```ini
========================================================================
   BYTE UNIX Benchmarks (Version 6.0.1)

   System: rusty-familly: GNU/Linux
   OS: GNU/Linux -- 5.10.0-46-cloud-amd64 -- #1 SMP Debian 5.10.262-1 (2026-07-31)
   Machine: x86_64 (unknown)
   Language: fr_FR.utf8 (charmap="UTF-8", collate="UTF-8")
   CPU 0: Intel(R) Xeon(R) CPU E5-2697A v4 @ 2.60GHz (5200.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   CPU 1: Intel(R) Xeon(R) CPU E5-2697A v4 @ 2.60GHz (5200.0 bogomips)
          Hyper-Threading, x86-64, MMX, Physical Address Ext, SYSENTER/SYSEXIT, SYSCALL/SYSRET, Intel virtualization
   19:56:38 up 7 days,  4:44,  1 user,  load average: 0,01, 0,14, 0,28; runlevel 5

------------------------------------------------------------------------
Benchmark Run: dim. sept. 20 2026 19:56:38 - 20:24:39
2 CPUs in system; running 1 parallel copy of tests

Dhrystone 2 using register variables       35867430.9 lps   (10.0 s, 7 samples)
Double-Precision Whetstone                     6476.8 MWIPS (9.9 s, 7 samples)
Execl Throughput                               2791.6 lps   (29.7 s, 2 samples)
File Copy 1024 bufsize 2000 maxblocks        491290.7 KBps  (30.0 s, 2 samples)
File Copy 256 bufsize 500 maxblocks          138269.3 KBps  (30.0 s, 2 samples)
File Copy 4096 bufsize 8000 maxblocks       1230414.9 KBps  (30.0 s, 2 samples)
Pipe Throughput                              749405.3 lps   (10.0 s, 7 samples)
Pipe-based Context Switching                  43111.3 lps   (10.0 s, 7 samples)
Process Creation                               5014.7 lps   (30.0 s, 2 samples)
Shell Scripts (1 concurrent)                   7564.2 lpm   (60.0 s, 2 samples)
Shell Scripts (8 concurrent)                   1640.3 lpm   (60.0 s, 2 samples)
System Call Overhead                         434874.9 lps   (10.0 s, 7 samples)

System Benchmarks Index Values               BASELINE       RESULT    INDEX
Dhrystone 2 using register variables         116700.0   35867430.9   3073.5
Double-Precision Whetstone                       55.0       6476.8   1177.6
Execl Throughput                                 43.0       2791.6    649.2
File Copy 1024 bufsize 2000 maxblocks          3960.0     491290.7   1240.6
File Copy 256 bufsize 500 maxblocks            1655.0     138269.3    835.5
File Copy 4096 bufsize 8000 maxblocks          5800.0    1230414.9   2121.4
Pipe Throughput                               12440.0     749405.3    602.4
Pipe-based Context Switching                   4000.0      43111.3    107.8
Process Creation                                126.0       5014.7    398.0
Shell Scripts (1 concurrent)                     42.4       7564.2   1784.0
Shell Scripts (8 concurrent)                      6.0       1640.3   2733.9
System Call Overhead                          15000.0     434874.9    289.9
                                                                   ========
System Benchmarks Index Score                                         870.3

------------------------------------------------------------------------
Benchmark Run: dim. sept. 20 2026 20:24:39 - 20:52:41
2 CPUs in system; running 2 parallel copies of tests

Dhrystone 2 using register variables       71471511.1 lps   (10.0 s, 7 samples)
Double-Precision Whetstone                    12997.0 MWIPS (10.0 s, 7 samples)
Execl Throughput                               5315.9 lps   (29.8 s, 2 samples)
File Copy 1024 bufsize 2000 maxblocks        922305.4 KBps  (30.0 s, 2 samples)
File Copy 256 bufsize 500 maxblocks          255962.0 KBps  (30.0 s, 2 samples)
File Copy 4096 bufsize 8000 maxblocks       2115933.3 KBps  (30.0 s, 2 samples)
Pipe Throughput                             1515367.7 lps   (10.0 s, 7 samples)
Pipe-based Context Switching                 315905.1 lps   (10.0 s, 7 samples)
Process Creation                              12375.6 lps   (30.0 s, 2 samples)
Shell Scripts (1 concurrent)                  12130.1 lpm   (60.0 s, 2 samples)
Shell Scripts (8 concurrent)                   1689.3 lpm   (60.0 s, 2 samples)
System Call Overhead                         861154.2 lps   (10.0 s, 7 samples)

System Benchmarks Index Values               BASELINE       RESULT    INDEX
Dhrystone 2 using register variables         116700.0   71471511.1   6124.4
Double-Precision Whetstone                       55.0      12997.0   2363.1
Execl Throughput                                 43.0       5315.9   1236.3
File Copy 1024 bufsize 2000 maxblocks          3960.0     922305.4   2329.1
File Copy 256 bufsize 500 maxblocks            1655.0     255962.0   1546.6
File Copy 4096 bufsize 8000 maxblocks          5800.0    2115933.3   3648.2
Pipe Throughput                               12440.0    1515367.7   1218.1
Pipe-based Context Switching                   4000.0     315905.1    789.8
Process Creation                                126.0      12375.6    982.2
Shell Scripts (1 concurrent)                     42.4      12130.1   2860.9
Shell Scripts (8 concurrent)                      6.0       1689.3   2815.4
System Call Overhead                          15000.0     861154.2    574.1
                                                                   ========
System Benchmarks Index Score                                        1782.3
```

Si vous voyez l'erreur **sh: 1: 3dinfo: not found**, c'est que vous n'avez pas d'interface graphique.

## Tester les performances réseaux

### Requis

- Python 2.4 jusqu'à la version 3.4

### Installation SpeedTest

Concernant l'installation, nous allons faire simple et surtout éviter d'installer des paquets inutiles. Sachez que vous pouvez toutefois utiliser **Github** pour avoir en permanence la dernière version ou installer avec **pip_install** ou **easy_install**.

- Pour **GitHub**, il vous faudra installer le paquet **git**.

- Pour **pip_install**, il vous faudra installer les paquets **python-dev python-pip**.

Connectez-vous avec votre utilisateur, ROOT n'est pas obligatoire !

On télécharge l'archive :

```text
 wget -O speedtest-cli https://raw.github.com/sivel/speedtest-cli/master/speedtest_cli.py
```

On applique un [chmod 755](/pages-wiki/utilisation-de-filezilla#comment-attribuer-un-chmod):

```text
 chmod +x speedtest-cli
```

```text
 python speedtest_cli.py
```

### Utilisation SpeedTest

Exécuter la commande **python speedtest.py** ou **./speedtest.py** puis patientez pendant que le test soit terminé :

```text
 Testing from GHOSTnet GmbH (IP_DU_DEDIE_OU_VPS)...
 Selecting best server based on ping...
 Hosted by SinaroHost LTD (Frankfurt) [100.73 km]: 24.637 ms
 Testing download speed........................................
 Download: 9.77 Mbit/s
 Testing upload speed..................................................
 Upload: 9.58 Mbit/s
```

### Les commandes SpeedTest

Pour afficher les différentes commandes de SpeedTest (ou de n'importe quel autre logiciel), le plus souvent, il faut ajouter le paramètre **--help** ou son raccourci **-h**  en y incluant un espace entre.

```text
 python speedtest.py --help
```

```text
 usage: speedtest.py [-h] [--share] [--simple] [--list] [--server SERVER] [--mini MINI] [--source SOURCE] [--version]
 Command line interface for testing internet bandwidth using speedtest.net.
 --------------------------------------------------------------------------
 https://github.com/sivel/speedtest-cli
```

```text
 optional arguments:
 -h, --help       show this help message and exit
 --share          Generate and provide a URL to the speedtest.net share
                  results image
 --simple         Suppress verbose output, only show basic information
 --list           Display a list of speedtest.net servers sorted by distance
 --server SERVER  Specify a server ID to test against
 --mini MINI      URL of the Speedtest Mini server
 --source SOURCE  Source IP address to bind to
 --version        Show the version number and exit
```

Veuillez m'excusez si la traduction n'est pas correct mais utilisant google pour traduire et n'ayant pas fait d'anglais...

- -h, --help ![icon11](/images-wiki/icon11.gif) Affiche ce message d'aide

- --share ![icon11](/images-wiki/icon11.gif) Permet de générer un lien de partage du test réalisé.

- --simple ![icon11](/images-wiki/icon11.gif) Affiche de façon simple les résultats (aucun détails ne sera présent, il retournera uniquement les résultats)

- --list ![icon11](/images-wiki/icon11.gif) Affiche la liste des serveurs de speedtest.net en y incluant la distance.

- --server ![icon11](/images-wiki/icon11.gif) Permet de tester un autre serveur en précisant son ID (L'ID sera donné en exécutant l'option '*-list*. Pour obtenir la liste des serveurs Français, ajouter ceci à la fin ** | grep -i france**.

- --mini ![icon11](/images-wiki/icon11.gif) Permet de définir un lien d'un petit serveur de speedtest.

- --source ![icon11](/images-wiki/icon11.gif) Source IP address to bind to

- --version Affiche la version de SpeedTest-cli

--[Let&#39;s Go](/pages-wiki/utilisateurlet-and#39s-go) ([discussion](/pages-wiki/discussion-utilisateurlet-and#39s-go)) 20 Septembre 2026 à 20:05 (CET)
