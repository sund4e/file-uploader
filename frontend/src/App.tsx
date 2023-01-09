import styled from 'styled-components';
import { colors, spacing } from './theme';
import { FileUploader } from './components/FileUploader/FileUploader';
import { FileList } from './components/FileList/FileList';
import { useState, useRef } from 'react';
import { FileData, getFiles } from './lib/api';

const Container = styled.div`
  background-color: ${colors.background};
  padding: ${spacing}rem;
`;

function App() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const fetchInProgress = useRef(false);

  const getNextFiles = async () => {
    if (!hasMore || fetchInProgress.current) {
      return;
    }
    fetchInProgress.current = true;
    const lastFile = files[files.length - 1];
    const nextFiles = await getFiles(lastFile?.id);
    if (!nextFiles.length) {
      setHasMore(false);
    } else {
      setFiles([...files, ...nextFiles]);
    }
    fetchInProgress.current = false;
  };

  const addFiles = (newFiles: FileData[]) => {
    setFiles([...newFiles, ...files]);
  };

  return (
    <Container>
      <FileUploader addFiles={addFiles} />
      <FileList files={files} getNextFiles={getNextFiles} />
    </Container>
  );
}

export default App;
