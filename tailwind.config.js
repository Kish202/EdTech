// tailwind.config.js
module.exports = {
    darkMode: ["class"],
    content: [
		
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'glass-white': 'rgba(255, 255, 255, 0.1)',
  			'glass-blue': 'rgba(59, 130, 246, 0.5)',
  			'glass-green': 'rgba(16, 185, 129, 0.5)',
  			neugray: {
  				bg: '#e0e5ec',
  				text: '#2d3748',
  				accent: '#4299e1'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			neumorph: '8px 8px 16px #a3b1c6, -8px -8px 16px #ffffff',
  			'neumorph-sm': '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff',
  			'neumorph-pressed': 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff'
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
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}


// tailwind.config.js
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         neugray: {
//           bg: '#0f172a',        // Dark blue/black background
//           text: '#e2e8f0',      // Light text color
//           accent: '#3b82f6',    // Bright blue accent color
//         },
//       },
//       boxShadow: {
//         'neumorph': '8px 8px 16px #080d19, -8px -8px 16px #16213b',
//         'neumorph-sm': '5px 5px 10px #080d19, -5px -5px 10px #16213b',
//         'neumorph-pressed': 'inset 4px 4px 8px #080d19, inset -4px -4px 8px #16213b',
//       },
//       backgroundImage: {
//         'neugray-gradient': 'linear-gradient(145deg, #121d33, #0a1122)',
//         'neugray-gradient-light': 'linear-gradient(145deg, #162040, #0d1729)',
//         'neugray-gradient-dark': 'linear-gradient(145deg, #090f1c, #14213d)',
//         'neugray-gradient-blue': 'linear-gradient(145deg, #1e3a8a, #1e40af)',
//       }
//     },
//   },
//   plugins: [],
// }


// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         neugray: {
//           bg: '#0f172a',        // Dark blue/black background
//           text: '#e2e8f0',      // Light text color
//           accent: '#3b82f6',    // Bright blue accent color
//         },
//         neubright: {
//           purple: '#8b5cf6',    // Vibrant purple
//           pink: '#ec4899',      // Bright pink
//           teal: '#06b6d4',      // Electric teal
//           green: '#10b981',     // Vivid green
//           orange: '#f97316',    // Bright orange
//           yellow: '#facc15',    // Sunny yellow
//         }
//       },
//       boxShadow: {
//         'neumorph': '8px 8px 16px #080d19, -8px -8px 16px #16213b',
//         'neumorph-sm': '5px 5px 10px #080d19, -5px -5px 10px #16213b',
//         'neumorph-pressed': 'inset 4px 4px 8px #080d19, inset -4px -4px 8px #16213b',
//         'neumorph-glow': '0 0 15px rgba(139, 92, 246, 0.5)', // Purple glow shadow
//         'neumorph-glow-teal': '0 0 15px rgba(6, 182, 212, 0.5)', // Teal glow shadow
//       },
//       backgroundImage: {
//         'neugray-gradient': 'linear-gradient(145deg, #121d33, #0a1122)',
//         'neugray-gradient-light': 'linear-gradient(145deg, #162040, #0d1729)',
//         'neugray-gradient-dark': 'linear-gradient(145deg, #090f1c, #14213d)',
//         'neugray-gradient-blue': 'linear-gradient(145deg, #1e3a8a, #1e40af)',
//         // Bright gradient options
//         'neon-purple-pink': 'linear-gradient(145deg, #8b5cf6, #ec4899)',
//         'neon-teal-green': 'linear-gradient(145deg, #06b6d4, #10b981)',
//         'neon-orange-yellow': 'linear-gradient(145deg, #f97316, #facc15)',
//         // New glowing purple to black gradient
//         'glowing-purple-dark': 'linear-gradient(to left, #9015F5, #09010e)',
//       }
//     },
//   },
//   plugins: [],
// }


// #020003
// #050008
// #09010e
// #9015F5
// #6909F6
// #140CF3