import { useEffect, useCallback } from 'react';
import { FileData } from '../../lib/api';
import { File } from '../File/File';
import { HorizontalBox } from '../Spacing/Box';

export const FileList = ({
  files,
  getNextFiles,
}: {
  files: FileData[];
  getNextFiles: () => void;
}) => {
  const getNextImagesIfInView = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const threshold = 300;
    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      getNextFiles();
    }
  }, [getNextFiles]);

  useEffect(() => {
    window.addEventListener('scroll', getNextImagesIfInView);
    return () => window.removeEventListener('scroll', getNextImagesIfInView);
  }, [getNextImagesIfInView]);

  useEffect(() => {
    getNextImagesIfInView();
  }, [files, getNextImagesIfInView]);

  return (
    <>
      <HorizontalBox onScroll={getNextImagesIfInView}>
        {files.map((file) => (
          <File fileData={file} key={file.id} />
        ))}
      </HorizontalBox>
    </>
  );
};
