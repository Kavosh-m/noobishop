module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        spinbackforth1: "spinbackforth1 2s linear infinite",
        spinbackforth2: "spinbackforth2 2s linear infinite",
        spinbackforth3: "spinbackforth3 2s linear infinite",
        spinbackforth4: "spinbackforth4 2s linear infinite",
        spin_slow: "spin_slow 3s linear infinite",
        leftToRight: "leftToRight 300ms linear forwards",
        fadeInTop2Bottom: "fadeInTop2Bottom 300ms linear",
        fadeInBottom2Top: "fadeInBottom2Top 300ms linear",
      },
      keyframes: {
        spinbackforth1: {
          "0%": {
            transform: "translate(0px,0px)",
          },
          "33%": {
            transform: "translate(20px,20px)",
          },
          "66%": {
            transform: "translate(40px,40px)",
          },
          "100%": {
            transform: "translate(0px,0px)",
          },
        },
        spinbackforth2: {
          "0%": {
            transform: "translate(0px,0px)",
          },
          "33%": {
            transform: "translate(-20px,20px)",
          },
          "66%": {
            transform: "translate(-40px,40px)",
          },
          "100%": {
            transform: "translate(0px,0px)",
          },
        },
        spinbackforth3: {
          "0%": {
            transform: "translate(0px,0px)",
          },
          "33%": {
            transform: "translate(20px,-20px)",
          },
          "66%": {
            transform: "translate(40px,-40px)",
          },
          "100%": {
            transform: "translate(0px,0px)",
          },
        },
        spinbackforth4: {
          "0%": {
            transform: "translate(0px,0px)",
          },
          "33%": {
            transform: "translate(-20px,-20px)",
          },
          "66%": {
            transform: "translate(-40px,-40px)",
          },
          "100%": {
            transform: "translate(0px,0px)",
          },
        },
        spin_slow: {
          "0%": {
            transform: "rotate(360deg)",
          },
        },
        leftToRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(-1.5rem)",
          },
          "100%": {
            visibility: "visible",
            opacity: "1",
            transform: "translateX(0px)",
          },
        },
        fadeInTop2Bottom: {
          "0%": {
            opacity: "0",
            transform: "translateY(-1.5rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
        fadeInBottom2Top: {
          "0%": {
            visibility: "var(--show)",
            opacity: "0",
            transform: "translateY(1.5rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
      },
    },
    fontFamily: {
      oswald: ["Oswald", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
