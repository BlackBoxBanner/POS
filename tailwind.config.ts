import type { Config } from 'tailwindcss';

const config = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Outfit', 'sans-serif']
		},
		colors: {
			transparent: 'transparent',
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
				400: '#F3F3E5',
				base: '#FFFFF0',
				600: '#fffff2',
				700: '#fffff3',
				800: '#fffff5',
				900: '#fffff6'
			},
			'philippine-gray': {
				100: '#b8b9b7',
				200: '#acaeab',
				300: '#a1a29f',
				400: '#959793',
				base: '#898B87',
				600: '#7b7d7a',
				700: '#6e6f6c',
				800: '#60615f',
				900: '#525351'
			},
			timberwolf: {
				100: '#84847d',
				200: '#9a9a92',
				300: '#b0b0a7',
				400: '#c6c6bc',
				base: '#dcdcd1',
				600: '#e0e0d6',
				700: '#e3e3da',
				800: '#e7e7df',
				900: '#eaeae3'
			},
			'eerie-black': {
				100: '#727479',
				200: '#5b5d62',
				300: '#43464c',
				400: '#2c2f35',
				base: '#14181F',
				600: '#12161c',
				700: '#101319',
				800: '#0e1116',
				900: '#0c0e13'
			},
			'blue-sapphire': {
				100: '#759eb3',
				200: '#5e8ea6',
				300: '#477d99',
				400: '#306d8d',
				base: '#195d80',
				600: '#175473',
				700: '#144a66',
				800: '#12415a',
				900: '#0f384d'
			},
			error: '#DC241F',
			success: '#38B13D',
			'yellow-gold': '#FFAF00'
		},
		extend: {}
	}
} satisfies Config;

export default config;
