
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
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Avalanche Network Colors
        avax: {
          primary: "hsl(var(--avax-primary))",
          secondary: "hsl(var(--avax-secondary))",
          accent: "hsl(var(--avax-accent))",
          blue: "hsl(var(--avax-blue))",
        },
        // Indonesian Warung Colors
        warung: {
          wooden: "hsl(var(--warung-wooden))",
          warm: "hsl(var(--warung-warm))",
          accent: "hsl(var(--warung-accent))",
          dark: "hsl(var(--warung-dark))",
          muted: "hsl(var(--warung-muted))",
          pattern: "hsl(var(--warung-pattern))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.97)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "avalanche-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(232, 100, 171, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(232, 100, 171, 0.6)" },
        },
        "warung-warmth": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(139, 69, 19, 0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(139, 69, 19, 0.4)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "fade-out": "fade-out 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
        float: "float 5s ease-in-out infinite",
        pulse: "pulse 3s infinite",
        "avalanche-glow": "avalanche-glow 3s ease-in-out infinite",
        "warung-warmth": "warung-warmth 4s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
        "avalanche": "0 10px 40px rgba(232, 100, 171, 0.2)",
        "warung": "0 8px 32px rgba(139, 69, 19, 0.15)",
      },
      backgroundImage: {
        "avalanche-gradient": "linear-gradient(135deg, hsl(var(--avax-primary)), hsl(var(--avax-secondary)))",
        "warung-gradient": "linear-gradient(135deg, hsl(var(--warung-wooden)), hsl(var(--warung-warm)))",
        "fusion-gradient": "linear-gradient(135deg, hsl(var(--avax-primary)), hsl(var(--warung-accent)), hsl(var(--avax-secondary)))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
