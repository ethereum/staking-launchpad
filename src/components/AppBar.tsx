import React from "react";
import { Box } from "grommet";
import { BrandWithTitle } from "./Brand";

export const AppBar = () => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: 1 }}
  >
    <BrandWithTitle />
  </Box>
);
