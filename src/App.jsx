import StyledContainer from './Styled/Container'
import { HashRouter } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase/app'
import 'firebase/auth'

import Menu from './Components/Menu';
import MainRouter from './Views';

import Context from './context'
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

  firebase.auth().onAuthStateChanged(u => {
    setUser(u)
  })

  useEffect(() => {
    if(user && !user.loading){
      Api.getListsUser(user.uid, setLists).catch(console.error)
    }
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
            position={window.innerWidth > 991 ? "top-center" : "bottom-center"}
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
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
