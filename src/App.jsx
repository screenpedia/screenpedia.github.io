import StyledContainer from './Styled/Container'

import Menu from './Components/Menu';
import MainRouter from './Views';

import { HashRouter } from 'react-router-dom'

const App = () => {
  return (
    <HashRouter>
      <StyledContainer>
        <Menu />
        <div style={{display: 'block', overflowX: 'auto', width: "100%"}}>
          <MainRouter />
        </div>
      </StyledContainer>
    </HashRouter>
  );
}

export default App;
