import fs from 'node:fs';
let s = fs.readFileSync('mass-convert.mjs', 'utf8');
const rep = (a, b) => { if (!s.includes(a)) console.warn('INTROUVABLE :', a.slice(0, 60)); s = s.replace(a, () => b); };

// 1. sortie + base des liens
rep("const OUTPUT_DIR = process.argv[3] ?? './src/content/docs/pages-wiki';", "const OUTPUT_DIR = process.argv[3] ?? './src/content/docs';");
rep("const BASE_URL = '/pages-wiki/';   // URL des pages converties", "const BASE_URL = '/';");
rep("const IMAGE_URL = '/images-wiki/';", "const IMAGE_URL = '/Free-4-Funs-Wiki/images-wiki/';");

// 2. rangement slug -> dossier, pages supprimées
const map = `
const DEFAULT_DIR = 'divers';
const SKIP_TITLES = new Set(['Metamod CSS', 'Steambans']);
const DIRS = {
    'jeux/counter-strike-source': ['counter-strike-source'],
    'jeux/counter-strike-source/serveur': ['comment-creer-un-serveur-de-jeu-counter-strike-source','servercfg','cvar','les-vars','sourcetv','ajouter-des-bots'],
    'jeux/counter-strike-source/plugins': ['metamod','sourcemod','sourcebans-1411-fr','cssmatch','zblock'],
    'jeux/counter-strike-source/joueurs': ['afficher-sa-console','desactiver-la-video-dintroduction','modifier-le-viseur','modifier-le-fond-decran-du-jeu','graffiti-spray','muter-un-joueur','obtenir-id-groupe','se-connecter-a-son-server','verifier-le-cache-des-fichiers','startupvidstxt','les-armes','succes','succes-2'],
    'jeux/left-4-dead-2': ['left4dead2'],
    'jeux/left-4-dead-2/serveur': ['comment-creer-un-serveur-de-jeu-l4d2-linux'],
    'jeux/left-4-dead-2/plugins': ['metamod-l4d2','sourcemod-l4d2','custom-player-stats-v14b121','anti-ping-mask','anti-rate-hack','crown-statistic','gear-transfer','kickloadstuckers','knife-unlock','motdgd-advertisements','save-chat','very-basic-high-ping-kicker','vote-blocker','take-over-bot','release-infecteds-victim','tank-damage-announce-by-griffin','black-and-white-notifier','player-switch-menu-and-team-panel-v121','thirdpersonshoulder-block'],
    'jeux/left-4-dead-2/joueurs': ['alias-rate-interp','avoir-la-console','modifier-la-video','succes-l4d2'],
    'jeux/rust': ['rust'],
    'jeux/outils-et-services': ['outils-and-services','utilisation-de-filezilla','hlx','steamid','gcfscape','streamer-une-partie','monitoring-serveur-jeu','logiciels-utile','server'],
    'administration/systeme': ['comment-mettre-a-jour-son-serveur','comment-se-connecter-en-root','comment-verifier-les-performances','sudo','windows','comment-chrooter-les-utilisateurs','sauvegarder-votre-vps-avec-clonezilla','comment-configurer-exim4-en-smarthost','surveillance-analyse-serveur'],
    'administration/web-et-ftp': ['comment-creer-un-serveur-web-apache2','comment-creer-un-serveur-web-nginx-version-complete','comment-creer-un-serveur-ftp-proftpd','installer-configurer-goaccess','obtenir-certificat-letsencrypt','pma'],
    'administration/securite': ['securiser-serveur-dedie','comment-creer-une-authentification-ssh-par-cle-publique'],
    'divers': ['hlsw','mbl','comment-creer-un-serveur-mumble','comment-creer-un-serveur-teamspeak-3'],
    'cms': ['fluxbb','phpbb','nuked-klan'],
};
const SLUG_DIR = new Map();
for (const [dir, slugs] of Object.entries(DIRS)) for (const sl of slugs) SLUG_DIR.set(sl, dir);
const dirOf = slug => slug === 'accueil' ? '' : (SLUG_DIR.get(slug) ?? DEFAULT_DIR);
const SITE_BASE = '/Free-4-Funs-Wiki';
const urlOf = slug => slug === 'accueil' ? SITE_BASE + '/' : SITE_BASE + '/' + dirOf(slug) + '/' + slug + '/';
const fileOf = slug => slug === 'accueil' ? 'index' : slug;
`;
rep("const warnings = [];", map + "\nconst warnings = [];");


// 3. liens internes vers le bon dossier
rep("return `[${label}](${BASE_URL}${slug}${anchor ? `#${cleanSlug(anchor)}` : ''})`;",
    "return `[${label}](${urlOf(slug)}${anchor ? `#${cleanSlug(anchor)}` : ''})`;");

// 4. pages ignorées + liens vers pages inexistantes / supprimées
rep('|User|Utilisateur):/i.test(title)', '|User|Utilisateur|Discussion utilisateur|Free 4 Funs):/i.test(title)');
rep("}).filter(p => p.title);", "}).filter(p => p.title && !SKIP_TITLES.has(p.title));");
rep("if (/^(?:Media|Special|Spécial):/i.test(target)) return label;",
`if (/^(?:Media|Special|Spécial):/i.test(target)) return label;
        {
            const [pg, an] = target.split('#', 2);
            const nm = pg.replace(/_/g, ' ').trim();
            if (!nm) return an ? \`[\${label}](#\${cleanSlug(an)})\` : label;
            if (/^(?:MediaWiki|Template|Modèle|Help|Aide|Talk|Discussion|User|Utilisateur|Discussion utilisateur|Free 4 Funs):/i.test(nm)) return label;
            if (!titleToSlug.has(nm)) return label;
        }`);

// 5. écriture dans le bon dossier
rep("path.join(OUTPUT_DIR, `${slug}.md`),",
    "(() => { const d = path.join(OUTPUT_DIR, dirOf(slug)); fs.mkdirSync(d, { recursive: true }); return path.join(d, `${fileOf(slug)}.md`); })(),");

// 6. correctif page Zblock (arborescence)
rep("const SOURCE_FIXES = {", `const SOURCE_FIXES = {
    'Zblock': t => t.replace(/^ \\|- zblock473\\n[\\s\\S]*?readme\\.htm\\n/m, [
        '<pre>',
        'zblock473',
        '├── addons',
        '│   ├── zb_logs',
        '│   ├── zbgamedata.txt',
        '│   ├── zblock.vdf',
        '│   ├── zblock.dll',
        '│   └── zblock.so',
        '├── cfg',
        '│   ├── zblock.cfg',
        '│   └── zb_comp.cfg',
        '├── changelog.txt',
        '└── readme.htm',
        '</pre>',
        ''].join('\\n')),`);


// 7. page d'accueil : index.mdx avec composants Starlight (au lieu des modèles MediaWiki)
const homeCode = `
const HOME_SECTIONS = [
    { t: 'Jeux', d: 'Serveurs de jeux et ressources associées', items: [
        ['Counter-Strike : Source', 'Configuration et administration du serveur.', 'Counter-Strike Source'],
        ['Left 4 Dead 2', 'Ressources dédiées au serveur L4D2.', 'Left4Dead2'],
        ['Outils & Services', 'Tutoriels et ressources pour les services et outils associés aux serveurs de jeux.', 'Outils & Services'],
        ['Rust', 'Documentation et administration du serveur.', 'Rust'],
    ] },
    { t: 'Administration', d: 'Serveurs dédiés, Linux, réseau et services', items: [
        ['Vérifier les performances', 'Contrôler les ressources et performances d’un ordinateur.', 'Comment vérifier les performances ?'],
        ['Se connecter en ROOT', 'Accès administrateur à votre serveur.', 'Comment se connecter en root'],
        ['Mettre à jour son serveur', 'Maintenir un serveur Debian à jour.', 'Comment mettre à jour son serveur'],
        ['Configurer Sudo', 'Gestion des privilèges utilisateurs.', 'Sudo'],
        ['Chroot SFTP', 'Isoler les utilisateurs dans leur répertoire.', 'Comment chrooter les utilisateurs'],
        ['Serveur Web Apache2', 'Installation et configuration d’Apache.', 'Comment créer un serveur web'],
        ['Serveur Web Nginx', 'Installation et configuration de Nginx.', 'Comment créer un serveur web Nginx'],
        ['Certificat Let’s Encrypt', 'Comment créer un certificat Let’s Encrypt.', 'Obtenir Certificat LetsEncrypt'],
        ['Analyse des logs Nginx avec GoAccess', 'Analyse des logs Nginx avec GoAccess.', 'Installer Configurer GoAccess'],
        ['Serveur FTP (Proftpd)', 'Mettre en place un service FTP.', 'Comment créer un serveur ftp Proftpd'],
        ['Authentification SSH par clé', 'Sécuriser les connexions SSH.', 'Comment créer une authentification ssh par clé publique'],
        ['Exim4 en SmartHost', 'Configurer l’envoi des e-mails système.', 'Comment configurer Exim4 en SmartHost'],
        ['Mettre Debian à l’heure', 'Synchronisation de l heure système.', 'Comment mettre à l’heure votre Debian'],
        ['Surveillance et analyse d’un serveur', 'Surveiller une machine et ses ressources.', 'Surveillance Analyse Serveur'],
        ['Sécuriser son serveur dédié', 'Renforcer la sécurité du système.', 'Securiser serveur dedie'],
        ['Sauvegarde Clonezilla', 'Sauvegarde complète du disque d’un VPS.', 'Sauvegarde Clonezilla'],
        ['Compiler OpenSSH (Source)', 'Compiler la dernière version de OpenSSH depuis les sources.', 'Compiler OpenSSH'],
    ] },
    { t: 'CMS et plateformes', d: 'Installer et administrer des solutions Web', items: [
        ['Installer phpBB', 'Installer phpBB.', 'phpBB'],
        ['Installer FluxBB', 'Installer FluxBB.', 'FluxBB'],
        ['Installer Nuked-Klan', 'Installer Nuked-Klan.', 'Nuked-Klan'],
    ] },
    { t: 'Divers et utilitaires', d: 'Astuces, outils et ressources pratiques', items: [
        ['Gérer Filezilla', '', 'Filezilla'],
    ] },
];

function buildHome(titleToSlug, wiki) {
    const out = [];
    out.push('---', 'title: "Free 4 Funs"', 'description: "La documentation de la communauté Free 4 Funs."', 'tableOfContents: false', '---', '');
    out.push("import { Aside, CardGrid, LinkCard } from '@astrojs/starlight/components';", '');
    out.push('Guides, tutoriels et ressources pour administrer vos serveurs, déployer des services et retrouver les procédures techniques utilisées par la communauté Free 4 Funs.', '');

    const w = wiki.match(/<div class="f4f-warning-text">([\\s\\S]*?)<\\/div>/);
    if (w) {
        const txt = w[1].trim()
            .replace(/<strong>([\\s\\S]*?)<\\/strong>/gi, '**$1**')
            .replace(/<br\\s*\\/?>\\s*/gi, '\\n\\n')
            .replace(/\\n{3,}/g, '\\n\\n');
        out.push('<Aside type="caution" title="À propos">', '', txt, '', '</Aside>', '');
    }

    out.push('## Que recherchez-vous ?', '', 'Sélectionnez une catégorie pour accéder aux procédures et tutoriels correspondants.', '');

    for (const sec of HOME_SECTIONS) {
        out.push('## ' + sec.t, '', sec.d, '', '<CardGrid>');
        for (const [title, desc, target] of sec.items) {
            const slug = titleToSlug.get(target) ?? [...titleToSlug].find(([k]) => k.toLowerCase() === target.toLowerCase())?.[1];
            if (!slug) { warnings.push('Accueil: lien ignoré (page absente) : ' + target); continue; }
            out.push('  <LinkCard title="' + title + '"' + (desc ? ' description="' + desc + '"' : '') + ' href="' + urlOf(slug) + '" />');
        }
        out.push('</CardGrid>', '');
    }

    const n = wiki.match(/\\{\\{Actualités\\|\\s*([\\s\\S]*?)\\n\\}\\}/);
    if (n) {
        out.push('<Aside type="note" title="📰 Actualités serveur">', '', n[1].replace(/'''/g, '**').trim(), '', '</Aside>', '');
    }
    const pp = wiki.match(/\\{\\{Paypal\\|id=([^}|]+)/i);
    if (pp) out.push('[Faire un don via PayPal](https://www.paypal.com/donate/?hosted_button_id=' + pp[1].trim() + ')', '');
    return out.join('\\n');
}
`;
rep("const warnings = [];", homeCode + "\nconst warnings = [];");
rep("        const body = convertWikitext(text, titleToSlug, title);",
`        if (slug === 'accueil') {
            fs.rmSync(path.join(OUTPUT_DIR, 'index.md'), { force: true });
            fs.writeFileSync(path.join(OUTPUT_DIR, 'index.mdx'), buildHome(titleToSlug, text), 'utf8');
            count++;
            continue;
        }
        const body = convertWikitext(text, titleToSlug, title);`);

fs.writeFileSync('convert-wiki.mjs', s);
console.log('convert-wiki.mjs créé');
