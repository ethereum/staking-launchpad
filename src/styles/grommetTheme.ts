import { styledComponentsTheme } from './styledComponentsTheme';

const { blue, transparent, gray, red, green, yellow } = styledComponentsTheme;

export const grommetTheme = {
  global: {
    focus: {
      border: {
        color: transparent,
      },
      outline: { color: 'transparent', size: '0px' },
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

      redLightest: red.lightest,
      redLight: red.light,
      redMedium: red.medium,

      grayLight: gray.light,
      grayMedium: gray.medium,
      grayDark: gray.dark,

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
  checkBox: {
    border: {
      color: 'gray',
      radius: '2px',
    },
    check: {
      extend: (props: Record<string, any>) =>
        `background-color: white; border: 2px solid ${
          props.checked ? 'black' : 'gray'
        }`,
    },
    color: {
      light: 'neutral-3',
      dark: 'neutral-3',
    },
    gap: 'xsmall',
    hover: {
      border: {
        color: 'black',
      },
    },
    icon: {
      size: '18px',
      extend: 'stroke: black;',
    },
    size: '18px',
    // label color
    extend: `
      color: #9C9C9C;
    `,
  },
};
