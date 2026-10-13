/**
 * Conversion XML MediaWiki -> Markdown pour Astro Starlight.
 *
 * npm i fast-xml-parser
 * node mass-convert.mjs [export.xml] [dossier_sortie]
 */

import fs from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';

const XML_FILE = process.argv[2] ?? 'pages_mediawiki.xml';
const OUTPUT_DIR = process.argv[3] ?? './src/content/docs';
const ONLY = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;
const REPORT_FILE = './_conversion-report.txt';
const BASE_URL = '/';
const IMAGE_URL = '/images-wiki/'; // public/images-wiki/

// Noms de langages MediaWiki -> Shiki (Starlight)
const LANG_MAP = {
    sh: 'bash', shell: 'bash', zsh: 'bash', console: 'bash', ssh: 'bash',
    apacheconf: 'apache', 'apache-conf': 'apache',
    markup: 'html', html5: 'html',
    dos: 'bat', winbatch: 'bat', batch: 'bat', cmd: 'bat',
    conf: 'ini', cfg: 'ini',
    js: 'javascript', ts: 'typescript', py: 'python',
    mysql: 'sql', pgsql: 'sql', mariadb: 'sql',
    'c#': 'csharp', cs: 'csharp', 'c++': 'cpp',
    ps: 'powershell', ps1: 'powershell',
    yml: 'yaml',
};

// Corrections ciblées pour des erreurs présentes dans le wikitexte source
const SOURCE_FIXES = {
    'Zblock': t => t.replace(/^ \|- zblock473\n[\s\S]*?readme\.htm\n/m, [
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
        ''].join('\n')),
    'Comment mettre à jour son serveur': t => t.replace(
        /(non-free-firmware\n)(sudo tee [^\n]*<<EOF\n[\s\S]*?\nEOF)\n/,
        '$1<syntaxhighlight lang="bash" copy>\n$2\n</syntaxhighlight>\n'
    ),
};


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
const urlOf = slug => slug === 'accueil' ? '/' : '/' + dirOf(slug) + '/' + slug + '/';
const fileOf = slug => slug === 'accueil' ? 'index' : slug;

const warnings = [];
const usedLangs = new Set();
const templates = new Map();
const missingTemplates = new Map();
const skippedByNs = new Map();
let currentTitle = '';

// ---------------------------------------------------------------------------
// Utilitaires
// ---------------------------------------------------------------------------

function cleanSlug(title) {
    return String(title)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9_ -]/g, '')
        .trim()
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-') || 'page-sans-titre';
}

function getText(node) {
    if (node == null) return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (typeof node === 'object') {
        if (typeof node['#text'] === 'string') return node['#text'];
        if (typeof node['#cdata'] === 'string') return node['#cdata'];
    }
    return '';
}

const mapLang = l => {
    l = String(l || '').trim().toLowerCase();
    return LANG_MAP[l] ?? l;
};

function fence(content, lang = '', meta = '') {
    const body = content.replace(/^\n+/, '').replace(/\s+$/, '');
    const longest = Math.max(0, ...(body.match(/`{3,}/g) || []).map(s => s.length));
    const ticks = '`'.repeat(Math.max(3, longest + 1));
    return `\n\n${ticks}${lang}${meta ? ' ' + meta : ''}\n${body}\n${ticks}\n\n`;
}

// Encadré Starlight (marqueurs remplacés en fin de conversion, car une ligne
// commençant par ":" serait prise pour une liste de définition)
const aside = (type, title, body) =>
    `\n\n@@ASIDE_OPEN:${type}:${String(title ?? '').replace(/\s+/g, ' ').trim()}@@\n\n${String(body).trim()}\n\n@@ASIDE_CLOSE@@\n\n`;

// Répare les balises <syntaxhighlight>/<source> mal appariées dans le source :
// ouverture jamais fermée (fermée au premier saut de ligne double) et
// fermeture orpheline (supprimée).
function fixCodeTags(text, title) {
    const re = /<(\/?)(syntaxhighlight|source)\b[^>]*>/gi;
    const ops = [];
    let open = null;

    const closeEarly = limit => {
        const seg = text.slice(open.end, limit);
        const b = seg.indexOf('\n\n');
        const pos = open.end + (b >= 0 ? b : seg.length);
        ops.push({ start: pos, end: pos, str: `</${open.tag}>` });
        warnings.push(`${title}: balise <${open.tag}> non fermée, fermée automatiquement`);
        open = null;
    };

    for (const m of text.matchAll(re)) {
        if (m[1] !== '/') {
            // <syntaxhighlight> sans attribut alors qu'un bloc est ouvert :
            // faute de frappe pour la balise fermante
            if (open && /^<(?:syntaxhighlight|source)\s*>$/i.test(m[0])) {
                ops.push({ start: m.index, end: m.index + m[0].length, str: `</${open.tag}>` });
                warnings.push(`${title}: <${open.tag}> pris pour une balise fermante`);
                open = null;
                continue;
            }
            if (open) closeEarly(m.index);
            open = { tag: m[2], end: m.index + m[0].length };
        } else if (open) {
            open = null;
        } else {
            ops.push({ start: m.index, end: m.index + m[0].length, str: '' });
            warnings.push(`${title}: balise </${m[2]}> orpheline supprimée`);
        }
    }
    if (open) closeEarly(text.length);

    ops.sort((a, b) => b.start - a.start);
    for (const o of ops) text = text.slice(0, o.start) + o.str + text.slice(o.end);
    return text;
}

// ---------------------------------------------------------------------------
// Modèles MediaWiki ({{...}})
// ---------------------------------------------------------------------------

const tplKey = n =>
    n.normalize('NFC')
        .replace(/^(?:Template|Modèle):/i, '')
        .replace(/_/g, ' ')
        .trim()
        .toLowerCase();

function loadTemplate(title, text) {
    const body = text
        .replace(/<noinclude>[\s\S]*?<\/noinclude>/gi, '')
        .replace(/<\/?(?:includeonly|onlyinclude)>/gi, '');
    templates.set(tplKey(title), body.trim());
}

function splitArgs(s) {
    const out = [];
    let cur = '', depth = 0;
    for (let i = 0; i < s.length; i++) {
        const two = s.slice(i, i + 2);
        if (two === '[[') { depth++; cur += two; i++; }
        else if (two === ']]') { depth = Math.max(0, depth - 1); cur += two; i++; }
        else if (s[i] === '|' && depth === 0) { out.push(cur); cur = ''; }
        else cur += s[i];
    }
    out.push(cur);
    return out;
}

// Modèles à contenu unique : {{Command|texte}}, {{cfg|texte|lang=ini}}
function single(rawArgs) {
    let lang = '';
    const parts = [];
    for (const a of rawArgs) {
        const lm = a.match(/^\s*lang\s*=\s*([\s\S]*)$/);
        if (lm) { lang = lm[1].trim(); continue; }
        parts.push(a.replace(/^\s*1\s*=/, ''));
    }
    return { content: parts.join('|'), lang };
}

// Modèles à paramètres nommés / positionnels
function stdArgs(rawArgs) {
    const pos = [], named = {};
    for (const a of rawArgs) {
        const m = a.match(/^\s*([\p{L}0-9_-]+)\s*=([\s\S]*)$/u);
        if (m) named[m[1].toLowerCase()] = m[2].trim();
        else pos.push(a.trim());
    }
    return { pos, named, get: (k, i) => named[k] ?? pos[i] ?? '' };
}

const NATIVE = {
    command: (raw, ctx) => {
        const { content } = single(raw);
        return ctx.protect(fence(ctx.unraw(content).trim(), 'bash'));
    },
    cfg: (raw, ctx) => {
        const { content, lang } = single(raw);
        const l = mapLang(lang) || 'text';
        usedLangs.add(l);
        return ctx.protect(fence(ctx.unraw(content).trim(), l));
    },
    warning: raw => aside('caution', 'Avertissement', single(raw).content),
    note: raw => aside('note', 'Note', single(raw).content),
    nano: raw => aside('tip', 'Rappel', single(raw).content),
    todo: raw => aside('note', 'À faire', single(raw).content),
    notes: raw => aside('note', 'Notes', single(raw).content),
    info: raw => {
        const a = stdArgs(raw);
        return a.pos.length >= 2 || a.named['2'] !== undefined
            ? aside('note', a.get('1', 0), a.get('2', 1))
            : aside('note', '', a.get('1', 0));
    },
    fichiers: raw => `\n\n**${stdArgs(raw).get('1', 0) || 'Fichier'}**\n\n`,
    paypal: raw =>
        `[Faire un don via PayPal](https://www.paypal.com/donate/?hosted_button_id=${stdArgs(raw).get('id', 0)})`,
    infobox: () => '',

    // {{!}} et {{=}} : caractères | et = (restaurés en fin de conversion)
    '!': () => '\uE000',
    '=': () => '\uE001',

    'actualités': raw => aside('note', '📰 Actualités serveur', single(raw).content),
    'actualitéswiki': raw => aside('note', '📰 Actualités wiki', single(raw).content),

    'accueil/bienvenue': () =>
        '\n\nLa documentation **Free 4 Funs**\n\nRetrouvez les tutoriels et ressources de la communauté : administration Linux, serveurs de jeux, services Web et outils.\n\n',
    bienvenue: raw => {
        const a = stdArgs(raw);
        return `\n\n## ${a.get('titre', 0) || 'Bienvenue !'}\n\n${a.get('contenu', 1)}\n\n`;
    },
    'accueil/boite': raw => {
        const a = stdArgs(raw);
        return `\n\n### [[${a.get('page', 0)}|${a.get('titre', 1)}]]\n\n${a.get('description', 2)}\n\n`;
    },
    boite: raw => {
        const a = stdArgs(raw);
        return `\n\n### ${a.get('titre', 0)}\n\n${a.get('contenu', 1)}\n\n`;
    },
    lien: raw => {
        const a = stdArgs(raw);
        const d = a.get('description', 2);
        return `\n- [[${a.get('page', 0)}|${a.get('titre', 1)}]]${d ? ` : ${d}` : ''}\n`;
    },
    carte: raw => card(stdArgs(raw)),
    'accueil/carte': raw => card(stdArgs(raw)),
};

function card(a) {
    const num = a.get('numero', 0);
    const desc = a.get('description', 2);
    return `\n\n## ${num ? num + ' · ' : ''}${a.get('titre', 1)}\n\n${desc ? `*${desc}*\n\n` : ''}${a.get('contenu', 3)}\n\n`;
}

function renderTemplate(inner, ctx) {
    const [rawName, ...rawArgs] = splitArgs(inner);
    const name = tplKey(rawName);

    if (!name || name.startsWith('#')) return ''; // fonctions parseur

    if (NATIVE[name]) return NATIVE[name](rawArgs, ctx);

    // Modèle générique, avec suivi des redirections
    let key = name;
    let def = templates.get(key);
    for (let i = 0; i < 5 && def !== undefined; i++) {
        const r = def.match(/^#(?:REDIRECT|REDIRECTION)\s*:?\s*\[\[([^\]|#]+)/i);
        if (!r) break;
        const next = tplKey(r[1]);
        if (next === key) { def = ''; break; }
        key = next;
        def = templates.get(key);
    }

    if (def === undefined) {
        missingTemplates.set(name, (missingTemplates.get(name) ?? 0) + 1);

        // Conserver le modèle non converti au lieu de perdre son contenu.
        warnings.push(`${currentTitle}: modèle non converti {{${name}}}`);

        return `\n\n> **Modèle MediaWiki non converti : ${name}**\n\n`;
    }

    const args = {};
    let pos = 0;
    for (const a of rawArgs) {
        const m = a.match(/^\s*([A-Za-z0-9_-]+)\s*=([\s\S]*)$/);
        if (m) args[m[1]] = m[2].trim();
        else args[String(++pos)] = a;
    }

    return def.replace(
        /\{\{\{([^{}|]+)(?:\|([^{}]*))?\}\}\}/g,
        (_x, k, d) => args[k.trim()] ?? d ?? ''
    );
}

// Analyse des accolades {{ ... }} (imbriquées, accolades simples tolérées)
function expandTemplates(text, ctx) {
    let out = '', i = 0;

    while (i < text.length) {
        const start = text.indexOf('{{', i);
        if (start < 0) { out += text.slice(i); break; }

        out += text.slice(i, start);

        let depth = 0, j = start, end = -1;
        while (j < text.length) {
            if (text.startsWith('{{', j)) { depth++; j += 2; }
            else if (text.startsWith('}}', j)) {
                depth--; j += 2;
                if (depth === 0) { end = j; break; }
            } else j++;
        }

        if (end < 0) {
            // {{Modèle|... jamais fermé : fermé au premier saut de ligne double
            const nl = text.indexOf('\n\n', start);
            const lim = nl >= 0 ? nl : text.length;
            const seg = text.slice(start + 2, lim);
            warnings.push(`${currentTitle}: modèle {{${seg.split('|')[0].trim()}}} non fermé, fermé automatiquement`);
            out += renderTemplate(expandTemplates(seg, ctx), ctx);
            i = lim;
            continue;
        }

        const inner = expandTemplates(text.slice(start + 2, end - 2), ctx);
        out += renderTemplate(inner, ctx);
        i = end;
    }

    return out;
}

// ---------------------------------------------------------------------------
// Liens, listes, tableaux
// ---------------------------------------------------------------------------

function convertLinks(text, titleToSlug) {
    // Images
    text = text.replace(
        /\[\[(?:File|Fichier|Image):([^\]|]+)(?:\|([^\]]*))?\]\]/gi,
        (_m, file, options = '') => {
            const parts = options.split('|').map(s => s.trim());
            const caption = parts.find(s =>
                s && !/^(thumb|thumbnail|frame|frameless|left|right|center|none|upright|\d*x?\d+px|alt=.*|link=.*)$/i.test(s));
            const alt = caption || file.trim().replace(/\.[^.]+$/, '').replace(/_/g, ' ');
            const filename = file.trim().replace(/ /g, '_');
            return `![${alt.replace(/\]/g, '\\]')}](${IMAGE_URL}${filename})`;
        }
    );

    // Liens internes
    text = text.replace(/\[\[([^\]]+)\]\]/g, (_m, inside) => {
        const parts = inside.split('|');
        const target = parts.shift().trim();
        const label = parts.join('|').trim() || target.split('#')[0].replace(/_/g, ' ');

        if (/^(?:Category|Catégorie):/i.test(target)) return '';
        if (/^(?:Media|Special|Spécial):/i.test(target)) return label;
        {
            const [pg, an] = target.split('#', 2);
            const nm = pg.replace(/_/g, ' ').trim();
            if (!nm) return an ? `[${label}](#${cleanSlug(an)})` : label;
            if (/^(?:MediaWiki|Template|Modèle|Help|Aide|Talk|Discussion|User|Utilisateur|Discussion utilisateur|Free 4 Funs):/i.test(nm)) return label;
            if (!titleToSlug.has(nm)) return label;
        }

        const [page, anchor] = target.split('#', 2);
        const normalized = page.replace(/_/g, ' ').trim();
        const slug = titleToSlug.get(normalized) || cleanSlug(normalized);
        return `[${label}](${urlOf(slug)}${anchor ? `#${cleanSlug(anchor)}` : ''})`;
    });

    // Liens externes
    text = text.replace(
        /\[(https?:\/\/[^\s\]]+)(?:\s+([^\]]+))?\]/g,
        (_m, url, label) => `[${label || url}](${url})`
    );

    return text;
}

function convertLists(text) {
    const out = text.split('\n').map(line => {
        const m = line.match(/^([*#;:]+)\s*(.*)$/);
        if (!m) return line;

        const [, markers, content] = m;
        const depth = markers.length - 1;
        const last = markers.at(-1);
        const indent = '    '.repeat(depth);

        if (last === ';') return `${indent}**${content}**`;
        if (last === ':') return `${indent}${content}`;
        return `${indent}${last === '#' ? '1.' : '-'} ${content}`;
    }).join('\n');

    // Ligne vide avant une liste
    return out.replace(/([^\n]*[^\n\s-][^\n]*)\n(\s*(?:- |1\. ))/g,
        (_m, prev, item) =>
            /^\s*(?:- |1\. )/.test(prev) ? `${prev}\n${item}` : `${prev}\n\n${item}`);
}

function convertTables(text) {
    return text.replace(/\{\|([^\n]*)\n([\s\S]*?)\n\|\}/g, (_w, _attrs, body) => {
        const rows = [];
        let current = [];
        let header = false;

        const stripAttrs = c => c.replace(/^\s*[\w-]+\s*=[^|]*\|(?!\|)/, '').trim();
        const flush = () => {
            if (current.length) rows.push({ cells: current, header });
            current = [];
        };

        for (const raw of body.split('\n')) {
            const line = raw.trim();

            if (!line || line.startsWith('|-')) { flush(); header = false; continue; }
            if (line.startsWith('|+')) continue; // légende

            if (line.startsWith('!')) {
                flush();
                header = true;
                current = line.slice(1).split(/!!|\|\|/).map(stripAttrs);
                flush();
                header = false;
                continue;
            }

            if (line.startsWith('|')) {
                current.push(...line.slice(1).split('||').map(stripAttrs));
            } else if (current.length) {
                current[current.length - 1] += ' ' + line; // continuation de cellule
            }
        }
        flush();

        if (!rows.length) return `\n\n${body}\n\n`;

        const width = Math.max(...rows.map(r => r.cells.length));
        const norm = rows.map(r => [...r.cells, ...Array(width - r.cells.length).fill('')]);
        const hi = Math.max(0, rows.findIndex(r => r.header));
        const esc = v => String(v)
            .replace(/\uE000/g, '\\|')
            .replace(/\|/g, '\\|')
            .replace(/\s*\n\s*/g, '<br />');

        return `\n\n| ${norm[hi].map(esc).join(' | ')} |\n| ${norm[hi].map(() => '---').join(' | ')} |\n${norm
            .filter((_r, i) => i !== hi)
            .map(r => `| ${r.map(esc).join(' | ')} |`)
            .join('\n')}\n\n`;
    });
}

// ---------------------------------------------------------------------------
// Conversion d'une page
// ---------------------------------------------------------------------------

function convertWikitext(source, titleToSlug, title) {
    currentTitle = title;
    let text = source.replace(/\r\n?/g, '\n');

    // Sécurité : balises encore échappées par le parseur XML
    if (/&lt;\/?(?:syntaxhighlight|source|pre|nowiki|code)\b/i.test(text)) {
        text = text
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&');
    }

    // Erreurs connues du source, puis balises de code mal appariées
    if (SOURCE_FIXES[title]) text = SOURCE_FIXES[title](text);
    text = fixCodeTags(text, title);

    // '''Mot</code> (balise ouvrante oubliée) -> <code>Mot</code>
    text = text.replace(/'''([^'\n<]+)<\/code>/g, '<code>$1</code>');

    // --- 1. Protéger le code ------------------------------------------------
    const blocks = [];
    const raws = [];
    const protect = (v, raw = v) => {
        blocks.push(v);
        raws.push(raw);
        return `\u0000B${blocks.length - 1}\u0000`;
    };
    const unraw = s => {
        for (let i = 0; i < 10 && /\u0000B\d+\u0000/.test(s); i++) {
            s = s.replace(/\u0000B(\d+)\u0000/g, (_m, n) => raws[Number(n)] ?? '');
        }
        return s;
    };
    const noNowiki = c => c.replace(/<\/?nowiki\s*\/?>/gi, '');

    const protectCode = t => t
        .replace(/<(syntaxhighlight|source)\b([^>]*)>([\s\S]*?)<\/\1\s*>/gi,
            (_m, _tag, attrs, content) => {
                const lm = attrs.match(/lang\s*=\s*["']?([\w+#-]+)/i);
                const lang = lm ? mapLang(lm[1]) : '';
                if (lang) usedLangs.add(lang);
                const meta = /\bline\b/i.test(attrs) ? 'showLineNumbers' : '';
                return protect(fence(noNowiki(content), lang, meta));
            })
        .replace(/<pre\b[^>]*>([\s\S]*?)<\/pre\s*>/gi,
            (_m, c) => protect(fence(noNowiki(c), 'text')))
        // <nowiki/> vide : garde une place pour ne pas casser {{...}} voisins
        .replace(/<nowiki\s*\/>/gi, () => protect('', ''))
        .replace(/<nowiki\b[^>]*>([\s\S]*?)<\/nowiki\s*>/gi,
            (_m, c) => protect(c.replace(/\{/g, '\\{').replace(/</g, '&lt;'), c))
        .replace(/<(?:code|tt)\b[^>]*>([\s\S]*?)<\/(?:code|tt)\s*>/gi, (_m, c) => {
            const inner = c.replace(/\n/g, ' ').trim();
            return protect(inner.includes('`') ? `\`\` ${inner} \`\`` : `\`${inner}\``);
        });

    text = protectCode(text);
    text = text.replace(/<!--[\s\S]*?-->/g, '');

    // --- 2. Modèles ---------------------------------------------------------
    text = expandTemplates(text, { protect, unraw });
    text = protectCode(text);

    // <blockquote> avec retours <br /> : boîte de code/sortie console
    text = text.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote\s*>/gi, (_m, c) =>
        /<br\s*\/?>/i.test(c)
            ? protect(fence(unraw(c).replace(/<br\s*\/?>[ \t]*\n?/gi, '\n'), 'text'))
            : aside('note', '', c));

    // Balises <code> fermantes orphelines
    text = text.replace(/<\/(?:code|tt)\s*>/gi, '');

    // Lignes préformatées (commençant par un espace)
    text = text.replace(/(?:^[ \t]+(?![|!{\s]).*(?:\n|$))+/gm, block => {
        const lines = block.replace(/\n$/, '').split('\n').map(l => l.replace(/^[ \t]/, ''));
        return protect(fence(lines.join('\n'), 'text'));
    });

    // --- 3. Nettoyage MediaWiki ---------------------------------------------
    text = text.replace(/__[A-Z][A-Z0-9_]*__/g, '');
    text = text.replace(/<ref\b[^>]*\/>/gi, '');
    text = text.replace(/<ref\b[^>]*>[\s\S]*?<\/ref\s*>/gi, '');
    text = text.replace(/<references\b[^>]*\/?>/gi, '');

    // --- 4. Conversion (l'ordre compte) -------------------------------------
    text = convertLinks(text, titleToSlug);
    text = convertTables(text);
    text = convertLists(text);

    text = text.replace(/^[ \t]*(={1,6})[ \t]*(.+?)[ \t]*\1[ \t]*$/gm,
        (_m, eq, t) => `${'#'.repeat(Math.max(2, eq.length))} ${t}`);

    // Gras / italique : jamais à cheval sur plusieurs lignes
    text = text
        .replace(/'''''([^'\n]+?)'''''/g, '***$1***')
        .replace(/'''([^'\n]+?)'''/g, '**$1**')
        .replace(/''([^'\n]+?)''/g, '*$1*');

    // --- 5. HTML résiduel ---------------------------------------------------
    text = text
        .replace(/<blockquote\b[^>]*>\s*([\s\S]*?)\s*<\/blockquote>/gi,
            (_m, c) => aside('note', '', c))
        .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi,
            (_m, n, c) => `\n\n${'#'.repeat(Math.max(2, Number(n)))} ${c.trim()}\n\n`)
        .replace(/<\/(?:td|th|tr)\s*>/gi, '\n\n')
        .replace(/<\/?(?:table|tbody|thead|tr|td|th)\b[^>]*>/gi, '')
        .replace(/<(?:b|strong)\b[^>]*>([\s\S]*?)<\/(?:b|strong)>/gi, '**$1**')
        .replace(/<(?:i|em)\b[^>]*>([\s\S]*?)<\/(?:i|em)>/gi, '*$1*')
        .replace(/<(?:s|strike|del)\b[^>]*>([\s\S]*?)<\/(?:s|strike|del)>/gi, '~~$1~~')
        .replace(/<br\s*\/?>/gi, '<br />')
        .replace(/<hr\s*\/?>/gi, '\n\n---\n\n')
        .replace(/<\/?(?:div|span|font|center|small|big|u|p|sup|sub)\b[^>]*>/gi, '');

    text = text
        .replace(/&nbsp;|&#160;/gi, ' ')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    const leftovers = [...new Set(text.match(/<\/?[a-z][^>]*>/gi) || [])]
        .filter(t => !/^<br \/>$/i.test(t));
    if (leftovers.length) {
        warnings.push(`${title}: balises HTML restantes : ${leftovers.slice(0, 8).join(' ')}`);
    }

    // Échappement des caractères sensibles (hors blocs protégés)
    text = text
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/<(?!br \/>)/g, '&lt;');

    // Encadrés Starlight
    text = text
        .replace(/@@ASIDE_OPEN:(\w+):(.*?)@@/g,
            (_m, type, t) => `:::${type}${t ? `[${t}]` : ''}`)
        .replace(/@@ASIDE_CLOSE@@/g, ':::');

    // --- 6. Restaurer le code -----------------------------------------------
    for (let i = 0; i < 10 && /\u0000B\d+\u0000/.test(text); i++) {
        text = text.replace(/\u0000B(\d+)\u0000/g, (_m, n) => blocks[Number(n)] ?? '');
    }

    // {{!}} -> |   et   {{=}} -> =
    text = text.replace(/\uE000/g, '|').replace(/\uE001/g, '=');

    return text.replace(/\n{3,}/g, '\n\n').trim();
}

// ---------------------------------------------------------------------------
// Programme principal
// ---------------------------------------------------------------------------

try {
    if (!fs.existsSync(XML_FILE)) throw new Error(`Fichier XML introuvable : ${XML_FILE}`);
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        textNodeName: '#text',
        cdataPropName: '#cdata',
        parseTagValue: false,
        trimValues: false,
        processEntities: true,
        isArray: name => name === 'page',
    });

    const parsed = parser.parse(fs.readFileSync(XML_FILE, 'utf8'));
    const pages = parsed?.mediawiki?.page ?? [];
    if (!pages.length) throw new Error('Aucune page trouvée : export MediaWiki invalide ?');

    // Dernière révision (par date) de chaque page
    const records = pages.map(p => {
        const rev = Array.isArray(p.revision)
            ? p.revision.reduce((a, b) => (getText(b.timestamp) > getText(a.timestamp) ? b : a))
            : p.revision;
        return { title: getText(p.title).trim(), text: getText(rev?.text) };
    }).filter(p => p.title && !SKIP_TITLES.has(p.title));

    // Redirections (y compris en chaîne) pour que les liens visent la page cible
    const redirects = new Map();
    for (const r of records) {
        const m = r.text.match(/^\s*#(?:REDIRECT|REDIRECTION)\s*:?\s*\[\[([^\]|#]+)/i);
        if (m) redirects.set(r.title, m[1].replace(/_/g, ' ').trim());
    }
    const redirectList = [];
    const resolveRedirect = t => {
        const seen = new Set();
        while (redirects.has(t) && !seen.has(t)) { seen.add(t); t = redirects.get(t); }
        return t;
    };

    const titleToSlug = new Map(
        records.map(p => [p.title, cleanSlug(resolveRedirect(p.title))])
    );

    // Charger les définitions de modèles AVANT la conversion
    for (const r of records) {
        if (/^(?:Template|Modèle):/i.test(r.title)) loadTemplate(r.title, r.text);
    }

    const used = new Map();
    let count = 0, skipped = 0;
    const skip = ns => {
        skipped++;
        skippedByNs.set(ns, (skippedByNs.get(ns) ?? 0) + 1);
    };

    for (const { title, text } of records) {
        if (ONLY && title !== ONLY) continue;
        if (/^(?:MediaWiki|Template|Category|Modèle|Catégorie|File|Fichier|Help|Aide|Special|Spécial|Talk|Discussion|User|Utilisateur|Discussion utilisateur|Free 4 Funs):/i.test(title)) {
            skip(title.split(':')[0]);
            continue;
        }

        if (redirects.has(title)) {
            skip('(redirections)');
            redirectList.push(`${title} -> ${redirects.get(title)}`);
            continue;
        }

        let slug = cleanSlug(title);
        const n = used.get(slug) ?? 0;
        used.set(slug, n + 1);
        if (n) slug = `${slug}-${n + 1}`;

        const body = convertWikitext(text, titleToSlug, title);
        const safeTitle = title.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');

        fs.writeFileSync(
            (() => { const d = path.join(OUTPUT_DIR, dirOf(slug)); fs.mkdirSync(d, { recursive: true }); return path.join(d, `${fileOf(slug)}.md`); })(),
            `---\ntitle: "${safeTitle}"\n---\n\n${body}\n`,
            'utf8'
        );
        count++;
    }

    const report = [
        `Pages converties : ${count}`,
        `Pages ignorées : ${skipped}`,
        ...[...skippedByNs].sort((a, b) => b[1] - a[1]).map(([ns, c]) => `   - ${ns}: ${c}`),
        `Modèles chargés : ${templates.size}`,
        `Noms des modèles : ${[...templates.keys()].sort().join(', ')}`,
        `Langages de code utilisés : ${[...usedLangs].sort().join(', ') || '(aucun)'}`,
        `Avertissements : ${warnings.length}`,
        '',
        'Redirections ignorées :',
        ...redirectList.map(r => `   - ${r}`),
        '',
        'Modèles introuvables (contenu supprimé) :',
        ...[...missingTemplates].sort((a, b) => b[1] - a[1]).map(([n, c]) => `   - {{${n}}} : ${c}`),
        '',
        ...warnings,
        '',
        'À FAIRE :',
        '- copier les images (hors icônes de modèles) dans public/images-wiki/',
    ].join('\n');

    fs.writeFileSync(REPORT_FILE, report, 'utf8');
    console.log(`Terminé : ${count} converties, ${skipped} ignorées, ${templates.size} modèles chargés. Rapport : ${REPORT_FILE}`);
} catch (err) {
    console.error(`Erreur : ${err.message}`);
    process.exitCode = 1;
}