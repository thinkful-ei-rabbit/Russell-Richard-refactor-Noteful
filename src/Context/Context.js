import React from 'react'

const Context = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
  addNote: () => {},
  addFolder: () => {},
})

export default Context;