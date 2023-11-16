import type { Config } from 'tailwindcss';

const config = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			exo: ['Exo', 'sans-serif']
		},
		extend: {}
	}
} satisfies Config;

export default config;
