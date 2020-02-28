import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { keyFile } from "../../store/actions";

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
  updateKeyFiles(keyFile: keyFile[]): void;
  fileAccepted: boolean;
  setFileAccepted(value: boolean): void;
  keyFiles: keyFile[];
}

export const StyledDropzone = ({
  updateKeyFiles,
  fileAccepted,
  setFileAccepted,
  keyFiles
}: props) => {
  const alreadyUploaded = keyFiles.length > 0;
  const onDrop = useCallback(
    acceptedFiles => {
      if (acceptedFiles.length === 1) {
        setFileAccepted(true);
        const reader = new FileReader();
        reader.onload = event => {
          if (event.target) {
            const jsonData = event.target.result as string;
            updateKeyFiles(JSON.parse(jsonData));
          }
        };
        reader.readAsText(acceptedFiles[0]);
      }
    },
    [setFileAccepted, updateKeyFiles]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: "application/json" });

  let message = "Drop or click here to upload deposit_data.json";

  if (isDragReject && !alreadyUploaded) {
    message = "Please upload a valid JSON file ";
  }

  if (fileAccepted || alreadyUploaded) {
    message = "File successfully uploaded";
  }

  return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>{message}</p>
      </Container>
    </div>
  );
};
