import { nextui } from "@nextui-org/theme"
import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|dropdown|input|modal|navbar|ripple|spinner|menu|divider|popover).js"
  ],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "var(--primary)",
                primaryHover: "var(--primary-hover)",
                primaryActive: "var(--primary-active)",
                success: "var(--success)",
                "color-green-500": "var(--color-green-500)",
                "color-green-100": "#D8E9E4",
                "color-input": "#dedede"
            },
            width: {
                384: "384px", // Custom width for normal screens
                343: "343px",
            },
            borderRadius: {
                "l-custom": "36px 0 0 36px",
                "b-custom": "0 0 36px 36px",
            },
        },
    },
    plugins: [nextui()],
} satisfies Config
