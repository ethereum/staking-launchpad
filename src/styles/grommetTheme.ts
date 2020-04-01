import { styledComponentsTheme } from './styledComponentsTheme';

const { blue, transparent, gray, red, green, yellow } = styledComponentsTheme;

export const grommetTheme = {
  global: {
    focus: {
      border: {
        color: transparent,
      },
      outline: 'none',
    },
    colors: {
      brand: blue.dark, // needed to override default grommet component styling
      border: gray.light,

      blueLight: blue.light,
      blueMedium: blue.medium,
      blueDark: blue.dark,

      greenLight: green.light,
      greenMedium: green.medium,
      greenDark: green.dark,

      redLight: red.light,
      redMedium: red.medium,

      yellowDark: yellow.dark,
    },
    font: {
      family: 'Roboto',
    },
  },
  button: {
    border: {
      radius: '2px',
      color: blue.medium,
    },
    padding: {
      vertical: '12px',
      horizontal: '24px',
    },
    primary: {
      color: blue.medium,
    },
    extend: `
      font-size: 12px;
      font-weight: bold;
     `,
  },
};
