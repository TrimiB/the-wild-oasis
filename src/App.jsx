import styled from 'styled-components';
import GlobalStyles from './styles/globalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';

const StyledApp = styled.div`
  text-align: center;
  margin-top: 50px;
  padding-bottom: 20px;
  background-color: #001514;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as='h1'>The Wild Oasis</Heading>
        <Heading as='h2'>The Wild Oasis</Heading>
        <Button onClick={() => alert('Checked in!')}>Check in</Button>
        <Button onClick={() => alert('Checked out!')}>Check out</Button>
        <Heading as='h3'>The Wild Oasis</Heading>
        <Input type='text' placeholder='Search...' />
      </StyledApp>
    </>
  );
}

export default App;
