---
title: "Server.cfg"
---

Je vais vous joindre un fichier pouvant être servis de base, des explications y sont fournis, il ne vous reste qu'à lire et à appliquer tout simplement...

Ce fichier se situe dans le répertoire **/game/css/cstrike** et se nomme **server.cfg**.

```text
// -------------------------------------------------------------------------------------
// server.cfg by Let's Go! de la communaute L4D2 Free 4 Funs
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// Securite RCON et Password
// -------------------------------------------------------------------------------------
rcon_password "123456"      // Definir le "rcon_password" dans la console
sv_password ""                   // Activer un mot de passe sur le Serveur (si aucun password ne rien mettre entre les guillemets), si votre serveur est prive, ne pas l'enlever !!

sv_rcon_banpenalty 60 	// temps du ban en cas d'echec d'acces au RCON
sv_rcon_maxfailures 2	// le nombre maximum d'echec d'acces au RCON
sv_rcon_minfailures 2	//le nombre minimum d'echec d'acces au RCON
sv_rcon_minfailuretime 36000 // voir sv_rcon_minfailures

// -------------------------------------------------------------------------------------
// Nom du Serveur
// -------------------------------------------------------------------------------------
hostname "[FR] TeamDJ - clandj.fr"

// Localisation geographique du serveur
// U.S. East - sv_region 0
// U.S. West - sv_region 1
// South America - sv_region 2
// Europe - sv_region 3
// Asia - sv_region 4
// Australia - sv_region 5
// Middle East - sv_region 6
// Africa - sv_region 7
// Rest of the World - sv_region 255
sv_region 255
// 0: internet 1:lan
sv_lan 0

// -------------------------------------------------------------------------------------
// Configuration du Serveur
// -------------------------------------------------------------------------------------

mp_allowspectators 1       // Activer (1) le Status Spectateur
mp_autocrosshair 0           // Activer (1) la visee automatique
mp_autokick 0              // Activer (1) Autokick des AFK et TK
mp_autoteambalance 0       // Activer (1) l'Equilibrage Automatique
mp_buytime 0.5              // Temps (en Min) pour Acheter des Armes
mp_c4timer 30              // Temps (en s) avant que le C4 Explose
mp_chattime 8              // Temps à la fin de la map pour parler avant la map suivante
mp_fadetoblack 0          // Desactiver l'Overview (0), l'Ecran du Joueur Mort Devient Noir
mp_flashlight 1          // Activer (1) les Flash
mp_footsteps 1              // Activer (1) les Empreintes
mp_forcecamera 0          // Activer (1) le mode Spectateur
mp_forcerespawn 0           // Activer la renaissance des joueurs apres avoir ete tue
mp_fraglimit 0              // Nb de Frags Limite avant le Changement de Map
mp_freezetime 4          // Temps (en s) où les Joueurs sont bloques au debut d'un Round
mp_friendlyfire 1          // Activer (1) le Friendly Fire
mp_hostagepenalty 0       // Nb d'otages Tues par les Terro avant d'être kickes
mp_limitteams 1          // Nb Max de Differrence de Joueurs entre les 2 Teams
mp_maxrounds 0              // Nb Max de Rounds avant le Changement de Map
mp_playerid 0              // Type d'affichage des scores: (0)Tout, (1) Pseudos de sa Team, (2) pas de Pseudos
mp_roundtime 3              // Temps Max (en Min) d'un Round
mp_spawnprotectiontime 5    // Equivalent au mani_tk_spawn_time
mp_startmoney 800           // Argent Disponible au Debut de la Partie
mp_timelimit 20          // Temps (en Min) Max par Map avant le changement de Map
mp_tkpunish 0              // Activer (1) le TK Punish
mp_weaponstay 1          // Les Armes restent au sol quand le round commence (pour les maps Fy...)
mp_winlimit 0              // Nb Max de Round Gagnes par la même Team avant le Changement de Map
sv_accelerate 5             // Vitesse de deplacement des joueurs (par defaut 5)
sv_cheats 0              // Autoriser (1) les Cheats
sv_consistency 1          // Activer (1) la verification des fichiers indispensables avant la connexion au serveur
sv_gravity 800              // Definir la Gravite (800 par default)
sv_maxspeed 320          // Vitesse Max d'un joueur quand il se deplace (320 par default)
sv_pausable 0              // Activer (1) la fonction Pause du Serveur
sv_timeout 40               // Temps Max (en s) avant d'être kickes par le serveur pour cause d'inactivite à la connexion (65s par default)

sv_voiceenable 1

// -------------------------------------------------------------------------------------
// Logs du Serveur
// -------------------------------------------------------------------------------------

log on                     // Activer (on) ou Desactiver (off) les logs du serveur
sv_logbans 1              // Activer (1) les logs des bannis du serveur
sv_logecho 1              // Activer (1) l'ecriture des logs dans la console
sv_logfile 1              // Activer (1) le log des informations du serveur dans le dossier log
sv_log_onefile 0          // Ecrire les logs dans un seul dossier (1) oui, (0) non
sv_logsdir logs
mp_logdetails 3

// -------------------------------------------------------------------------------------
// Bande Passante du Serveur ne jamais changer ces parametres
// -------------------------------------------------------------------------------------

//sv_downloadurl "http://xxxxxxxxxxxxxxxxxxx"  // Telechargement rapide
sv_allowdownload 1          // Autoriser les telechargements
sv_allowupload 1            // Autoriser les upload (grafitis etc...)

// Configuration optimise pour un tickrate 100
fps_max 500		// FPS illimite cote serveur (demande plus de ressource si 0)

net_queued_packet_thread 0

sv_mincmdrate 66                // Defini la valeur minimale de cl_cmdrate 0 = illimite.
sv_maxcmdrate 67                //  Defini la valeur maximale de cl_cmdrate.
sv_maxrate 0         		    // Bande passante maximale. 0 = Illimitee
sv_minrate 20000                // Min bandwidth rate allowed on server, 0 == unlimited
sv_maxupdaterate 67          	// Defini la valeur maximale de cl_updaterate 0 = illimite.
sv_minupdaterate 66             // Defini la valeur minimale de cl_updaterate

// -------------------------------------------------------------------------------------
// Bans du serveur
// -------------------------------------------------------------------------------------
// Creer ces fichier si il ne sont pas present
exec banned_ip.cfg
exec banned_user.cfg
writeid
writeip

// -------------------------------------------------------------------------------------
// Stats du serveur
// -------------------------------------------------------------------------------------

sv_stats 0
sv_filterban 1

echo ==============================
echo Server.cfg correctement charge
echo ==============================
echo Visitez l4d2-funs.myriapulse.com/wiki
echo ===============================
echo Server.cfg Config By Let's Go!
echo ===============================
```
