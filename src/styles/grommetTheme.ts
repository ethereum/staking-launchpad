import { styledComponentsTheme } from "./styledComponentsTheme";

const {
  blue,
  transparent,
  gray,
  error,
  green,
  errorLight
} = styledComponentsTheme;

export const grommetTheme = {
  global: {
    focus: {
      border: {
        color: transparent
      },
      outline: "none"
    },
    colors: {
      brand: blue.dark, // needed to override default grommet component styling

      blueLight: blue.light,
      blueMedium: blue.medium,
      blueDark: blue.dark,

      greenLight: green.light,
      greenMedium: green.medium,
      greenDark: green.dark,

      border: gray.light,
      error,
      errorLight
    },
    font: {
      family: "Roboto"
    }
  },
  button: {
    border: {
      radius: "2px",
      color: blue.medium
    },
    padding: {
      vertical: "12px",
      horizontal: "24px"
    },
    primary: {
      color: blue.medium
    },
    extend: `
      font-size: 12px;
      font-weight: bold;
     `
  }
};
