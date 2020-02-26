export const colors = {
  transparent: "transparent",
  white: "#ffffff",
  gray: {
    lightest: "#fdfcfe",
    light: "#F0F4F8",
    medium: "#B6B6B6",
    dark: "#4A4A4A"
  },
  black: "#333333",
  blue: {
    light: "#b0e2f5",
    medium: "#007FB0",
    dark: "#0F2A43"
  },
  green: {
    light: "#F8FAF9",
    medium: "#D0E1D5",
    dark: "#26AB83"
  },
  red: {
    light: "#FF9B9A",
    medium: "#912d2c"
  },
  orange: "#FFF9F2",
  purple: {
    light: "#F0F2FB",
    medium: "#E3E5F2"
  }
};

export const details = {
  borderRadius: "3px"
};

export const rainbow = `
  #fca09a,
  #fdccd3,
  #ffcc9e,
  #98ddad,
  #81d7ec,
  #a0aaed
`;

export const rainbowLight = `
  #fbf1ed,
  #f9f1e9,
  #eef3eb,
  #e4f4f4,
  #e5f0f8,
  #e7eaf8
`;

export const screenSizes = {
  smaller: "420px",
  small: "576px",
  medium: "760px",
  large: "992px",
  larger: "1200px",
  largest: "1440px",
  huge: "1820px"
};

export const styledComponentsTheme = {
  ...colors,
  screenSizes,
  ...details,
  rainbow,
  rainbowLight
};
