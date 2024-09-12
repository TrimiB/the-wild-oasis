import styled from 'styled-components';
import GlobalStyles from './styles/globalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

const StyledApp = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type='vertical'>
          <Row type='horizontal'>
            <Heading as='h1'>The Wild Oasis</Heading>

            <div>
              <Heading as='h2'>Check in and out</Heading>
              <Button onClick={() => alert('Checked in!')}>Check in</Button>
              <Button variation='secondary' size='small' onClick={() => alert('Checked out!')}>
                Check out
              </Button>
            </div>
          </Row>

          <Row type='vertical'>
            <form>
              <Heading as='h3'>Form</Heading>
              <Input type='text' placeholder='Search...' />
              <Input type='text' placeholder='Search...' />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
