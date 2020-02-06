import React from "react";
import styled from "styled-components";
import { Text } from "grommet";
import { Link } from "../Link";

const WorkflowStatusContainer = styled.div`
  max-width: 100%;
  box-sizing: border-box;
  background-color: white;
  height: 200px;
  display: flex;
  justify-content: space-evenly;
  padding: 0 10%;
  padding-top: 80px; /* REFACTOR ME */
`;

interface Stage {
  text: string;
  to: string;
}

const stages: Stage[] = [
  { text: "Acknowledgements", to: "/overview" },
  { text: "ValidatorSettings", to: "/validator-settings" },
  { text: "Generate Keys", to: "/generate-keys" },
  { text: "UploadValidator", to: "/upload-validator" },
  { text: "Connect Wallet", to: "/connect-wallet" },
  { text: "Summary", to: "/summary" }
];

export const WorkflowStatusBar = () => {
  return (
    <WorkflowStatusContainer>
      {stages.map((stage: Stage) => (
        <Link to={stage.to} key={stage.to}>
          <Text>{stage.text}</Text>
        </Link>
      ))}
    </WorkflowStatusContainer>
  );
};
