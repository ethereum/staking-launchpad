import React from "react";
import EthDiamondSvg from "../static/eth-diamond.svg";
import EthDiamondRoundSvg from "../static/eth-diamond-round.svg";
import { Heading } from "grommet";
import { Link } from "./Link";
import { routesEnum } from "../Routes";

interface EthLogoProps {
  height?: number;
  width?: number;
}

export const EthLogoStandard = ({
  height = 40,
  width = 40
}: EthLogoProps): JSX.Element => {
  return (
    <img style={{ height, width }} src={EthDiamondSvg} alt="eth-diamond" />
  );
};

export const EthLogoRound = ({
  height = 40,
  width = 40
}: EthLogoProps): JSX.Element => {
  return (
    <img
      style={{ height, width }}
      src={EthDiamondRoundSvg}
      alt="eth-diamond-round"
    />
  );
};

export const BrandWithTitle = (): JSX.Element => {
  return (
    <div className="ml50 flex">
      <Link to={routesEnum.LandingPage}>
        <EthLogoStandard />
        <Heading level={4} margin="none" className="py8">
          eth 2 deposit ceremony
        </Heading>
      </Link>
    </div>
  );
};
