import StyledContainer from './Styled/Container'
import { HashRouter } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    [lists, setLists] = useState(null),
    [theme, setTheme] = useState(themes.light),
    notify = (text, error = false) => error ? toast.warning(text) : toast.success(text),
    context = {
      user,
      theme,
      setTheme,
      lists,
      notify
    }

  firebase.auth().onAuthStateChanged(setUser)

  useEffect(() => {
    if(user && !user.loading){
      Api.getListsUser(user.uid, setLists).catch(console.error)
    }
    return
  }, [user])

  return (
    <Context.Provider value={context}>
      <HashRouter>
        <StyledContainer>
          <Menu />
          <div style={{display: 'block', overflowX: 'auto', width: "100%", boxSizing: 'border-box'}}>
            <MainRouter user={user} />
          </div>
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover={false}
            draggable
            limit={3}
          />
        </StyledContainer>
      </HashRouter>
    </Context.Provider>
  );
}

export default App;
