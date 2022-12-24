import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {getListAPI}  from './api/goods'

function App() {
  const getGoods = async ()=>{
    const data = await getListAPI()
    console.log('data', data);
  }

  return (
    <div className="App">
      <button onClick={getGoods}>get goods data</button>
    </div>
  )
}

export default App
