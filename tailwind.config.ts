import type { Config } from 'tailwindcss';

const config = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Outfit', 'sans-serif']
		},
		colors: {
			transparent: 'background-color: transparent',
			raisinblack: {
				100: '#131416',
				200: '#161719',
				300: '#1a1a1d',
				400: '#1d1e20',
				base: '#202124',
				600: '#36373a',
				700: '#4d4d50',
				800: '#636466',
				900: '#797a7c'
			},
			crayola: {
				100: '#173794',
				200: '#1b40ac',
				300: '#1e49c5',
				400: '#2252dd',
				base: '#265BF6',
				600: '#3c6bf7',
				700: '#517cf8',
				800: '#678cf9',
				900: '#7d9dfa'
			},
			milk: {
				100: '#989793',
				200: '#b1b0ac',
				300: '#cacac4',
				400: '#e4e3dd',
				base: '#FDFCF5',
				600: '#fdfcf6',
				700: '#fdfdf7',
				800: '#fefdf8',
				900: '#fefdf9'
			},
			ivory: {
				100: '#999990',
				200: '#b3b3a8',
				300: '#ccccc0',
				400: '#e6e6d8',
				base: '#FFFFF0',
				600: '#fffff2',
				700: '#fffff3',
				800: '#fffff5',
				900: '#fffff6'
			}
		},
		extend: {}
	}
} satisfies Config;

export default config;
