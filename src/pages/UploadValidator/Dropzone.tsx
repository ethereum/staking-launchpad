import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { Text } from '../../components/Text';

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
  border-radius: ${p => p.theme.borderRadius};
  border-color: ${p => getColor(p, p.theme.gray.medium)};
  border-style: dashed;
  background-color: ${p => p.theme.gray.light};
  color: ${p => getColor(p, p.theme.blue.dark)};
  outline: none;
  transition: border 0.24s ease-in-out;
  cursor: pointer;
`;

interface Props {
  isFileStaged: boolean;
  onDrop: (acceptedFiles: any) => void;
}

export const StyledDropzone = ({ isFileStaged, onDrop }: Props) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: 'application/json' });
  const { formatMessage } = useIntl();

  let message = formatMessage(
    {
      defaultMessage: 'Upload {depositJSON}',
      description:
        'Tells user to upload specific JSON file created during previous step',
    },
    { depositJSON: 'deposit_data.json' }
  );

  if (isDragReject) {
    message = formatMessage(
      {
        defaultMessage: "This isn't a valid {JSON} file",
        description: '{JSON} is filetype extension',
      },
      { JSON: 'JSON' }
    );
  }

  if (isFileStaged) {
    message = formatMessage({ defaultMessage: 'File uploaded' });
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
