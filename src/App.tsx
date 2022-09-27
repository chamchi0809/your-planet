import React, { useCallback, useEffect, useRef, useState } from 'react'
import './App.scss'
import './Components/UI/UIComponents.scss'

import GradientEditor from './Components/GradientEditor';
import PlanetEditor from './Components/PlanetEditor';



function App() {

  return (
    <div className="App">
        <PlanetEditor/>
      
    </div>
  )
}

export default App