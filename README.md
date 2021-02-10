# tailwindcss-delicious-hamburgers

A Tailwind CSS component for creating animated hamburger menus. This is a port of [Delicious Hamburgers](https://github.com/kapoko/delicious-hamburgers).

## Installation

```sh
# Using npm
npm install tailwindcss-delicious-hamburgers

# Using yarn
yarn add tailwindcss-delicious-hamburgers
```

## Example configuration

```js
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    // ...
    deliciousHamburgers: {
      size: '30px', // must be in px.
      color: '#586061',
      colorLight: '#fff8f4',
      padding: '0px', // must be in px.
      animationSpeed: 1,
    },
  },
  variants: {},
  plugins: [require('tailwindcss-delicious-hamburgers')],
}
```

## Example markup

replace 'c-hamburger--magnetic' with any other animation from [this list](https://kapoko.github.io/delicious-hamburgers/)

```html
<div class="c-hamburger c-hamburger--magnetic">
  <div class="c-hamburger-inner">
    <span class="c-hamburger-bar"></span>
    <span class="c-hamburger-bar"></span>
    <span class="c-hamburger-bar"></span>
  </div>
</div>
```
