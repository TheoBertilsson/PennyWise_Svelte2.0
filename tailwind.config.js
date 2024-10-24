/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: '#f8f5ef',
				primary: '#202023',
				secondary: '#1f1f23',
				text: '#a9a9a9'
			}
		}
	},
	plugins: []
};
