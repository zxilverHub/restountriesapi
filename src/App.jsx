import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Nav from './component/Nav'
import RouteApp from './Route'
import ThemeContext from './ThemCotext'

function App() {
  const [theme, setTheme] = useState(false)

  const getTheme=()=>{
    console.log('click')
    setTheme(!theme)
  }

  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <Nav getTheme={getTheme} />
        <Router basename="/restountriesapi" >
          <RouteApp />
        </Router>
      </ThemeContext.Provider>
    </div>
  )
}

export default App