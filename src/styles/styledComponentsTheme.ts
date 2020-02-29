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
    lightest: "#D4D7E7",
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

export const rainbowColors = [
  "#fca09a",
  "#fdccd3",
  "#ffcc9e",
  "#98ddad",
  "#81d7ec",
  "#a0aaed"
];

export const rainbowLightColors = [
  "#fbf1ed",
  "#f9f1e9",
  "#eef3eb",
  "#e4f4f4",
  "#e5f0f8",
  "#e7eaf8"
];

export const rainbowMutedColors = [
  "rgba(252, 160, 154, 0.1)", // red
  "rgba(255, 204, 158, 0.15)", // orange
  "rgba(238, 243, 235, 0.5)", // yellow-ish
  "rgba(228, 244, 244, 0.5)", // green
  "rgba(229, 240, 248, 0.5)", // blue
  "rgba(231, 234, 248, 0.5)" // purple
];

export const rainbow = rainbowColors.join(", ");
export const rainbowLight = rainbowLightColors.join(", ");

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
  rainbowLight,
  rainbowLightColors,
  rainbowMutedColors
};
