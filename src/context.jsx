import React from 'react'

const Context = React.createContext({
    user: null,
    setUser: () => {},
    themes: null,
    theme: null,
    setTheme: () => {},
    lists: []
})

export default Context;