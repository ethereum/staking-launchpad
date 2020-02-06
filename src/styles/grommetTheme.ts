import { styledComponentsTheme } from "./styledComponentsTheme";
const { brand, transparent, gray20, white, error } = styledComponentsTheme;

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
      error: error
    },
    font: {
      family: "Roboto"
    }
  },
  button: {
    border: {
      radius: "2px",
      color: brand // cobalt blue
    },
    padding: {
      vertical: "12px",
      horizontal: "24px"
    },
    primary: {
      color: brand // cobalt blue
    },
    extend: `
      min-width: 280px;
      color: ${white};
      font-size: 12px;
      font-weight: bold;
     `
  }
};
