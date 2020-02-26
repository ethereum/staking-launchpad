import { styledComponentsTheme } from "./styledComponentsTheme";

const {
  blue,
  transparent,
  gray,
  error,
  success,
  successLight,
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
      blueDark: blue.dark,
      blueMedium: blue.medium,
      border: gray.light,
      error,
      errorLight,
      success,
      successLight
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
