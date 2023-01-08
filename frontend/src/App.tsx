import styled from 'styled-components';
import { colors, spacing } from './theme';
import { FileUploader } from './components/FileUploader/FileUploader';
import { FileList } from './components/FileList/FileList';

const Container = styled.div`
  background-color: ${colors.background};
  padding: ${spacing}rem;
`;

function App() {
  return (
    <Container>
      <FileUploader />
      <FileList />
    </Container>
  );
}

export default App;
