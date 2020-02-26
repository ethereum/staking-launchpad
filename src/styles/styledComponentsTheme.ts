// TODO: This needs to be cleaned up
export const colors = {
  white: "#ffffff",
  gray5: "#fdfcfe",
  gray10: "#F0ECF5",
  gray20: "#E6E6E6",
  gray35: "#B6B6B6",
  gray: "#B6B6B6",
  gray50: "#8E8E8E",
  gray60: "#9B9B9B",
  gray70: "#475166",
  gray85: "#4A4A4A",
  black: "#333333",
  brand: "#0F2A43", // navy dark blue
  secondary: "#007FB0", // ligter, royal blue
  lightBrand: "#b0e2f5", // lightest blue
  transparent: "transparent",
  success: "#26AB83",
  successLight: "#D0E1D5",
  successLightest: "#F8FAF9",
  error: "#912d2c",
  errorLight: "#FF9B9A",
  warning: "#D45C06",
  info: "#FFF9F2",
  lightPurple: "#F0F2FB",
  purple: "#E3E5F2"
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
