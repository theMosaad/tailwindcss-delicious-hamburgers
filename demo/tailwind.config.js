const defaultTheme = require(`tailwindcss/defaultTheme`)

let tailwindcssDeliciousHamburgers
try {
  tailwindcssDeliciousHamburgers = require(`../src/index.js`)
} catch (e) {
  if (e instanceof Error && e.code === `MODULE_NOT_FOUND`) {
    tailwindcssDeliciousHamburgers = require(`tailwindcss-delicious-hamburgers`)
  } else throw e
}

module.exports = {
  purge: {
    enabled: true,
    content: [`./**/*.js`],
    options: {
      safelist: [],
    },
  },
  theme: {
    fontFamily: {
      sans: [`Inter var`, ...defaultTheme.fontFamily.sans],
      source: [`Source Sans Pro`, ...defaultTheme.fontFamily.sans],
      'ubuntu-mono': [`Ubuntu Mono`, ...defaultTheme.fontFamily.mono],
      system: defaultTheme.fontFamily.sans,
    },
    deliciousHamburgers: {
      size: `30px`,
      color: `#586061`,
      colorLight: `#fff8f4`,
      padding: `0px`, // must be in px. if 0 will be false and treates as not set replace with my default
      animationSpeed: 1,
    },
  },
  variants: {},
  plugins: [tailwindcssDeliciousHamburgers],
}
