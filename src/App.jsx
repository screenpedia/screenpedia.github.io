import StyledContainer from './Styled/Container'
import { HashRouter } from 'react-router-dom'
import { useEffect, useState } from 'react';

import Menu from './Components/Menu';
import MainRouter from './Views';

import Context from './context'
import firebase from 'firebase'
import Api from './service';

const themes = {
  dark:{
    background: 'black',
    color: 'white',
  },
  light: {
    background: 'white',
    color: 'black',
  }
}

const App = () => {
  const [user, setUser] = useState({loading: true}),
    [lists, setLists] = useState([]),
    [theme, setTheme] = useState(themes.light),
    context = {
      user,
      setUser,
      theme,
      setTheme,
      lists
    }

  firebase.auth().onAuthStateChanged(setUser)

  useEffect(() => {
    if(user && !user.loading){
      Api.getListsUser(user.uid, setLists)
    }
  }, [user])

  return (
    <Context.Provider value={context}>
      <HashRouter>
        <StyledContainer>
          <Menu />
          <div style={{display: 'block', overflowX: 'auto', width: "100%"}}>
            <MainRouter user={user} />
          </div>
        </StyledContainer>
      </HashRouter>
    </Context.Provider>
  );
}

export default App;
