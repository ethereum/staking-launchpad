import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Text } from "../../components/Text";

const getColor = (props: any, defaultColor: string) => {
  if (props.isDragAccept) {
    return props.theme.green.dark;
  }
  if (props.isDragReject) {
    return props.theme.error;
  }
  if (props.isDragActive) {
    return props.theme.blue.dark;
  }
  return defaultColor;
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: ${p => p.theme.borderRadius}
  border-color: ${p => getColor(p, p.theme.gray.medium)};
  border-style: dashed;
  background-color: ${p => p.theme.gray.light};
  color: ${p => getColor(p, p.theme.blue.dark)};
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
`;

interface props {
  fileAccepted: boolean;
  onDrop: (acceptedFiles: any) => void;
}

export const StyledDropzone = ({ fileAccepted, onDrop }: props) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: "application/json" });

  let message = "Drop or click here to upload deposit_data.json";

  if (isDragReject) {
    message = "Please upload a valid JSON file ";
  }

  if (fileAccepted) {
    message = "File successfully uploaded";
  }

  return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <Text>{message}</Text>
      </Container>
    </div>
  );
};
