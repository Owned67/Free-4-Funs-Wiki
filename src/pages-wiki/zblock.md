---
title: "Zblock"
---

![logo zblock](/images-wiki/Zblock.png)

## Téléchargement

[Site Officielle](https://zblock.codepunks.net/downloads/zblock473.zip)

## Installation

- Décompressez l'archive **zblock473.zip** pour obtenir le dossier **zblock473** qui se compose des dossiers et fichiers suivants :
 |- zblock473
 |
 |--- zblock473\addons
 |
 |--- zblock473\addons\zb_logs
 |
 |---- zblock473\addons\zbgamedata.txt
 |
 |---- zblock473\addons\zblock.vdf
 |
 |---- zblock4713\addons\zblock.dll
 |
 |---- zblock473\addons\zblock.so
 |
 |---- zblock473\cfg\zblock.cfg
 |
 |---- zblock473\cfg\zb_comp.cfg
 |
 |- zblock473\changelog.txt
 |
 |- zblock473\readme.htm

Pour un serveur **Windows**, uploader sur votre serveur de jeux les fichiers suivants dans le répertoire **cstrike\addons\** :

```text
- zbgamedata.txt
- zblock.dll
- zblock.vdf
```

Pour un serveur **Linux**, uploadez sur votre serveur de jeux les fichiers suivants dans le répertoire **cstrike/addons/** :

```text
- zbgamedata.txt
- zblock.so
- zblock.vdf
```

Valable pour un serveur Windows ou Linux :

- Ouvrez le fichier **server.cfg** du répertoire **/orangebox/cstrike/cfg** et vérifier que ces variables sont mises :

```text
sv_consistency 1
sv_pure 2 //force la verification des fichiers au contenu exclusivement steam ( 0 = désactivé, 2 = complète, 1 = se base sur le fichier pure_server_whitelist.txt )
sv_pure_kick_clients 1 //kicke les clients non conformes ( 0 = Warning, 1 = Kick ) à 0 par défaut !!! 
sv_pure_trace 1		//( 0 = pas de traces/logs de vérification de CRC, 1 = log )
```

- Ouvrez le fichier **zblock.cfg** du répertoire **/orangebox/cstrike/cfg** et modifiez la configuration selon vos besoins :

```text
// zBlock config - Called when the plugin is loaded (server startup).
// Place in the servers "cfg/" folder.
// Please note, these are just the default values and not always the recommended unless noted as "recommended".

// zBlock Configuration
zb_active 			"1" // Enable or Disable zBlock
zb_warmode 			"0" // Enable/Disable zBlock War Mode Configuration
zb_autoupdate 		"1" // Enable/Disable zBlock plugin auto-updating
zb_deadvoice 		"1" // Allow dead teammates to talk to the living

// Misc. War Settings
zb_allowcashcalling "1" // Enable/Disable ability to display team cash situation (0=Disable/1=Enable/2=Allow Automatic Calling)
zb_removals 		"0" // Cleans up maps by removing cosmetic entities (0=Disabled/1=Junk only/2=Remove Oil Drums only/3=Junk and Oil Drums)
zb_illegaldefusefix "0" // Prevents defusal through walls and other static objects
zb_force_dx			"0" // In Warmode - forces clients to play using a particular DirectX level (0=Any / 1=DX9 / 2=DX8)
zb_crouchfix		"0" // Enables/Disables the crouch fix (players can't crouch again until the time it takes to duck/unduck passes)
zb_readyup_max 		"10" // The number of players which must be ready to complete ready-up (Note: All players on both teams must still be ready)
zb_startmoney 		"800" // This is used for overtime cash removal
zb_authhost 		"" // Sets the hostname/url or alias from which zBlock should authenticate players (set to 'none' to remove)
zb_matchconfig 		"" // Set to have a config file ran when zb_lo3 is executed
zb_fadetoblack		"0" // Force fade to black and disable player sound whilst dead

// Server Protection
zb_crashblock 		"1" // Protect the server from crash exploits
zb_dosprotect 		"1" // Protect the server from various forms of network based attacks
zb_ignoreplayerqueries 	"0" // Recommended: Leave this at 0 unless you are sure of what you are doing
zb_antispam_max_cmds_per_sec "5" // Protect the server from lag induced by command spam, this many command strings per player per second
zb_maxnamechanges	"3" // Total number of name changes a player is allowed to make in the time "zb_namechangeperiod" (0=unlimited)
zb_namechangeperiod	"300" // Number of seconds between tracked name changes
zb_kicknamethieves	"0" // Kick players who have very similar/identical names to existing players

// Anti-Cheat
zb_antispeedhack 	"1" // Enable/Disable speed-hack prevention (1=Block/2=Kick)
zb_checkviewangles 	"1" // Check players view angles and ensure they are within normal limits
zb_antiflash 		"1" // Prevents anti-flash cheats/exploits from being effective
zb_antismoke		"0" // Players standing in the middle of a bloomed smoke grenade are not visible using expolits
zb_bancheaters 		"1" // Whether or not zBlock should ban confirmed cheaters (1 = Ban cheaters / 0 = Kick cheaters)
zb_forwardbans		"1" // When enabled zBlock will forward its bans to SourceBans (if you have that plugin loaded)

// Misc
zb_dramaticheadshots "0" // Enable/Disable classic style headshot ragdolls
```

Une nouveauté dans la version 4.66, c'est le fichier **zb_comp.cfg** qui permet une configuration à la zblock avec des variables serveur.

## Les commandes Zblock

**A METTRE A JOUR**<br />

## Les commandes Clientes Zblock
zb_status

- Displays important server settings.

zb_netinfo

- Displays connected players net-settings (rates, interpolation, prediction, lag compensation).

zb_version

- Displays version of zBlock currently installed on the server.

zb_readylist

- Counter-Strike: Source Only & Warmode Only

- Displays ready and not-ready players when using the ready-up system.

zb_players

- Displays a list of players authenticated by a configured auth-host (zb_authhost).

zb_warnings

- Displays information regarding questionable server configuration.

zb_teamcash

- Counter-Strike: Source Only & Warmode Only

- Displays the team money situation (We recommend your caller binds this command to a key).

- i.e. bind "F1" "zb_teamcash"

- Note: Only usable during freeze-time and when "zb_allowcashcalling" is enabled.

## Les commandes Serveur Zblock
zb_lo3

- Counter-Strike: Source Only & Warmode Only

- Executes config defined in "zb_matchconfig"

- Restarts the round 3 times

- Returning startmoney to value set in "zb_startmoney" (Default 800)

zb_ko3

- Counter-Strike: Source Only & Warmode Only

- Restarts the round 3 times, declaring a knife-round.

zb_kickt &lt;REASON>

- Counter-Strike: Source Only

- Kicks all terrorist team players.

zb_kickct &lt;REASON>

- Counter-Strike: Source Only

- Kicks all counter-terrorist team players.

zb_kickspec &lt;REASON>

- Kicks all spectating players.

zb_readyup

- Counter-Strike Source Only & Warmode Only

- Use zb_readyup to start, or stop the readyup sequence

- Accepts "1" or "0" as parameter, "1" enabling readyup, "0" disabling readyup

- Allows all players to set themselves as ready

- When all players are ready, zb_lo3 is triggered

zb_players

- Displays a list of players authenticated by a configured auth-host (zb_authhost).

zb_update

- Manually checks for an update to the plugin.

"zb_record"/"zb_stoprecord"

- Records a SourceTV demo with name "MAPNAME_YYMMDD_HHMM".

- When using "zb_record" zBlock will look for a directory named "zb_demos" or "demos" in the game-server's root
directory, if it exists demos will be saved to that location.

## Les Cvars Serveur Zblock

Ces variables sont automatiquement exéctuées (zblock.cfg) donc inutile de les placer dans le server.cfg.

zb_warmode (Default: 0)

- Counter-Strike Source Only

- Enables/Disable zBlock Warmode

- Public servers should set this to "0" (zb_warmode 0).

- Competitive / Match servers should set this to "1".

- Note: See below for complete warmode based changes.

zb_matchconfig (Default: None)

- Match config to be executed before initiating the live on 3 sequence

- Note: To reset this value using rcon use: rcon zb_matchconfig " "

zb_readyup_max (Default: 10)

- Counter-Strike Source Only

- The minimum number of players required to be ready to initiate live-on-three

zb_startmoney (Default: 800)

- Counter-Strike Source Only

- The amount that the starting money should be returned to after the live on 3 sequence is completed

-  Note:This is to prevent players from regaining full money by using "retry" in the second round of overtime

zb_authhost (Default: NONE)

- Configures the auth-host to use with zBlock.

- Changing this setting will re-authenticate all existing players in the server and continue to authenticate new players who join.
(Please see our article on "Player Authentication" at our website for more details).

- Note: To reset this value using rcon use: rcon zb_authhost " " OR rcon zb_authhost NONE

zb_autoupdate (Default: 1)

- Enable/Disable zBlock plugin auto-updating.

- Note: Updates can be downloaded manually using the server command "zb_update"

- Note: Automatic updates are never downloaded whilst players are connected to the server.

zb_allowcashcalling (Default: 1)

- Counter-Strike: Source Only

- Enable/Disable Team money calling with "zb_teamcash"

- Note: 0 = Disabled / 1 = Enabled / 2 = Allow automatic cash calling

- To use automatic cash calling clients must use the command "setinfo zb_wantautocashcalling 1"

zb_dosprotect (Default: 1)

- Protects the game-server from several network level attacks.

- Note: 0 = Disabled / 1 = Enabled

zb_crashblock (Default: 1)

- Protects the game-server from several known crash exploits.

- Note: 0 = Disabled / 1 = Enabled

zb_deadvoice (Default: 1)

- Counter-Strike: Source Only

- When enabled dead players can chat to living members of their team using the in-game voice system.

- Note: 0 = Disabled / 1 = Enabled

zb_antispeedhack (Default: 1)

- Prevents the use of client cheats which manipulate the games view of time.

- Note: 0 = Disabled / 1 = Enabled / 2 = Enabled and Kick.

zb_checkviewangles (Default: 1)

- Prevents the use of cheats which distort the players view-angles.

- Note: 0 = Disabled / 1 = Enabled.

zb_ignoreplayerqueries (Default: 0)

- When enabled the server will ignore queries which ask for the names of the players connected.

- This is for use in high-profile competitive matches where players do not wish their whereabouts to be known.

- We highly recommend this is kept disabled (default).

- Note: 0 = Disabled / 1 = Enabled.

zb_antispam_max_cmds_per_sec (Default: 5)

- Blocks command spam attempts.

- We are currently tweaking the effects of this feature. A setting of 4-6 appears to be adequate.

zb_removals (Default: 0)

- When set to "1" all junk props are removed from the map.

- When set to "2" it removes all oil drums.

- When set to "3" it removes both oil drums and junk.
Best combined with the client setting "cl_phys_props_enable 0".

zb_illegaldefusefix (Default: 0)

- Counter-Strike: Source Only

- When enabled you are unable to defuse unless you can see the bomb and a message is displayed telling you so.

- Note: 0 = Disabled / 1 = Enabled.

zb_antiflash (Default: 1)

- Counter-Strike: Source Only

- When enabled players who are under the full effect of a flashbang will be unable to see other players by cheating to remove the white screen effect.

- Note: 0 = Disabled / 1 = Enabled.

zb_antismoke (Default: 0)

- Counter-Strike: Source Only

- When enabled players who are stood in the middle of a bloomed smoke grenade are not visible by the use of exploits.

- Note: 0 = Disabled / 1 = Enabled.

zb_force_dx (Default: 0)
Counter-Strike: Source Only / Warmode Only

- When set to "1" players must use a DirectX9 video mode (resolves ambient occlusion issues).

- When set to "2" players must use a DirectX8 video mode (stronger flashbang effect).

- Note: 0 = Disabled.

zb_bancheaters (Default: 1)

- When enabled confirmed cheaters will be banned.

- When disabled they are kicked.

- Note: 0 = Disabled / 1 = Enabled.

zb_forwardbans (Default: 1)

- When enabled bans made by zBlock will be forwarded to SourceBans if that plugin is also running (www.sourcebans.net).

- Note: 0 = Disabled / 1 = Enabled.

zb_crouchfix (Default: 0)

- Counter-Strike: Source Only

- When enabled players must wait until they're standing to crouch again.

- Note: 0 = Disabled / 1 = Enabled.

zb_fadetoblack (Default: 1)

- Counter-Strike: Source Only

- When enabled "mp_fadetoblack 1" is forced and dead players sound is disabled.
