// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://Owned67.github.io/Free-4-Funs-Wiki',
    integrations: [
		starlight({
              editLink: {
                //baseUrl: 'vscode://file/L:/mwiki/super-star/',
                baseUrl: 'npp:///L:/mwiki/super-star/',
              },
              head: [
              {
                tag: 'script',
                content: `
                  document.addEventListener('DOMContentLoaded', () => {
                    document.querySelectorAll('.recent-changes').forEach(ul => {
                      const days = Number(ul.dataset.days);
                      const limit = days ? Date.now() - days * 86400000 : 0;
                      let visible = 0;
                      ul.querySelectorAll('li[data-date]').forEach(li => {
                        const old = new Date(li.dataset.date).getTime() < limit;
                        li.hidden = old;
                        if (!old) visible++;
                      });
                      if (!visible) {
                        ul.hidden = true;
                        const msg = ul.nextElementSibling;
                        if (msg) msg.hidden = false;
                      }
                    });
                  });
                `,
              },
            ],
            title: 'Free 4 Funs',
			defaultLocale: 'root',
            lastUpdated: true,
            locales: {
              root: { label: 'Français', lang: 'fr' },
            },
            customCss: ['./src/styles/custom.css'],
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			components: {
                Footer: './src/components/Footer.astro',
                PageTitle: './src/components/PageTitle.astro',
            },
            sidebar: [
				{ label: 'Accueil', link: '/' },
				{
					collapsed: false,
                    label: 'Jeux',
					items: [
						{ label: 'Counter-Strike : Source', items: [{ autogenerate: { directory: 'jeux/counter-strike-source' } }] },
						{ label: 'Left 4 Dead 2', items: [{ autogenerate: { directory: 'jeux/left-4-dead-2' } }] },
						{ label: 'Rust', items: [{ autogenerate: { directory: 'jeux/rust' } }] },
						{ label: 'Outils & Services', items: [{ autogenerate: { directory: 'jeux/outils-et-services' } }] },
					],
				},
				{
					collapsed: false,
                    label: 'Administration',
					items: [
						{ label: 'Système', items: [{ autogenerate: { directory: 'administration/systeme' } }] },
						{ label: 'Web & FTP', items: [{ autogenerate: { directory: 'administration/web-et-ftp' } }] },
						{ label: 'Sécurité', items: [{ autogenerate: { directory: 'administration/securite' } }] },
					],
				},
				{ collapsed: false, label: 'CMS & plateformes', items: [{ autogenerate: { directory: 'cms' } }] },
			],
		}),
	],
});