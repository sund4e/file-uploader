import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';
import { FileData } from '../../lib/api';
import { colors, spacing } from '../../theme';
import { FiFileText } from 'react-icons/fi';
import { HorizontalBox } from '../Spacing/Box';

const downloadImage = (path: string) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(path);
    img.onerror = () => reject();
    img.src = path;
  });

const getFileUrl = (fileData: FileData) =>
  `${process.env.REACT_APP_BACKEND_URL}files/${fileData.name}.${fileData.extension}`;

const FileBox = styled.div`
  width: ${spacing * 40}rem;
  height: ${spacing * 40}rem;
  margin: ${spacing}rem;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const File = ({ fileData }: { fileData: FileData }) => {
  const fileUrl = getFileUrl(fileData);
  const [fileReady, setFileReady] = useState(false);
  const isImage = fileData.extension !== 'pdf';

  useEffect(() => {
    const fetchFile = async () => {
      if (isImage) {
        await downloadImage(fileUrl);
      }
      setFileReady(true);
    };

    fetchFile();
  }, [isImage, fileUrl]);

  const onClick = () => {
    const alink = document.createElement('a');
    alink.href = fileUrl;
    alink.download = fileData.name;
    alink.click();
  };

  return (
    <FileBox key={fileData.id} onClick={onClick}>
      {fileReady ? (
        isImage ? (
          <StyledImage src={fileUrl} alt={fileData.name} />
        ) : (
          <HorizontalBox
            border
            style={{ height: '100%', width: '100%', margin: 0, padding: 0 }}
          >
            <FiFileText
              style={{
                height: '100%',
                fontSize: '10rem',
                color: colors.primary,
              }}
            />
          </HorizontalBox>
        )
      ) : (
        <Skeleton style={{ height: '100%' }} />
      )}
    </FileBox>
  );
};
