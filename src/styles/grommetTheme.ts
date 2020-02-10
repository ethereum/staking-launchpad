import {styledComponentsTheme} from "./styledComponentsTheme";

const {
  brand,
  transparent,
  gray20,
  error,
  secondary,
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
      brand,
      border: gray20,
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
      color: secondary
    },
    padding: {
      vertical: "12px",
      horizontal: "24px"
    },
    primary: {
      color: secondary
    },
    extend: `
      font-size: 12px;
      font-weight: bold;
     `
  }
};
