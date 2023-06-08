/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-poppins)", "sans-serif"],
				mono: ["var(--font-mono)"],
			},
			container: {
				center: true,
				padding: {
					DEFAULT: "1rem",
					sm: "1rem",
					lg: "1rem",
					xl: "5rem",
					"2xl": "6rem",
				},
			},
			backgroundImage: {
				"card-bg": "linear-gradient(180deg, #F0F5FF 0%, #E0EAFF 100%);",
			},
			borderRadius: {
				"card-radius": "12px",
			},
			colors: {
				"light-color": "#F2F4F7",
				"text-color": "#101828",
				"canvas-color": "#F2F4F7",
				"border-color": "#D0D5DD",
			},
			fontSize: {
				"4xl": ["2rem", "120%"],
				"5xl": ["2.625rem", "114%"],
			},
		},
	},
	plugins: [],
};