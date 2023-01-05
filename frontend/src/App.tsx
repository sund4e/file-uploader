import styled from 'styled-components';
import { colors, spacing } from './theme';
import { FileUploader } from './components/FileUploader/FileUploader';

const Container = styled.div`
  background-color: ${colors.background};
  padding: ${spacing}rem;
`;

function App() {
  return (
    <Container>
      <FileUploader />
    </Container>
  );
}

export default App;
