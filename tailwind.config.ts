import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				// Impact Categories
				prevention: {
					DEFAULT: 'hsl(var(--prevention))',
					light: 'hsl(var(--prevention-light))'
				},
				provide: {
					DEFAULT: 'hsl(var(--provide))',
					light: 'hsl(var(--provide-light))'
				},
				prepare: {
					DEFAULT: 'hsl(var(--prepare))',
					light: 'hsl(var(--prepare-light))'
				},
				// Status Colors
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-hero-animated': 'var(--gradient-hero-animated)',
				'gradient-prevention': 'var(--gradient-prevention)',
				'gradient-provide': 'var(--gradient-provide)',
				'gradient-prepare': 'var(--gradient-prepare)',
				'gradient-glassmorphic': 'var(--gradient-glassmorphic)'
			},
			boxShadow: {
				'card': 'var(--shadow-card)',
				'card-new': 'var(--shadow-card-new)',
				'card-hover': 'var(--shadow-card-hover)',
				'soft': 'var(--shadow-soft)',
				'glow': 'var(--shadow-glow)',
				'live-glow': 'var(--shadow-live-glow)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'recording-pulse': {
					'0%, 100%': {
						transform: 'scale(1)',
						opacity: '1'
					},
					'50%': {
						transform: 'scale(1.1)',
						opacity: '0.8'
					}
				},
				'map-pulse': {
					'0%': {
						transform: 'scale(1)',
						opacity: '1'
					},
					'50%': {
						transform: 'scale(1.2)',
						opacity: '0.7'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'glow': {
					'from': {
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
					},
					'to': {
						boxShadow: '0 0 30px hsl(var(--primary) / 0.6)'
					}
				},
				'counter-up': {
					'from': {
						transform: 'translateY(10px)',
						opacity: '0'
					},
					'to': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'recording-pulse': 'recording-pulse 1.5s ease-in-out infinite',
				'map-pulse': 'map-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'counter-up': 'counter-up 2s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'gradient-shift': 'gradient-shift 8s ease infinite',
				'float': 'float 6s ease-in-out infinite',
				'world-pulse': 'world-pulse 3s ease-in-out infinite',
				'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
				'parallax': 'parallax 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
