import { useState } from 'react'
import './App.css'
import TestComponent from './component/TestComponent'

function App() {
 

  return (
    <div className='flex flex-col h-screen bg-black'>

      <div>
       <TestComponent/>
      </div>

    </div>
  )
}

export default App
