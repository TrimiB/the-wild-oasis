import styled from 'styled-components';
import GlobalStyles from './styles/globalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: #c2d076;
`;

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
        <H1>The Wild Oasis</H1>
        <Button onClick={() => alert('Checked in!')}>Check in</Button>
        <Button onClick={() => alert('Checked out!')}>Check out</Button>
        <Input type='text' placeholder='Search...' />
      </StyledApp>
    </>
  );
}

export default App;
