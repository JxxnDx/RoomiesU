export default {
    mode: 'jit',
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    purge: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
              },
        },
    },
    variants: {
        extend: {
            display:["focus-group"]
        },
    },
    plugins: [],
}