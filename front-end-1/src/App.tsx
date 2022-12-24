import './App.css'
import {getListAPI}  from './api/goods'
import {postLogin} from "./api/user";

function App() {
  const getGoods = async ()=>{
    getListAPI()
    getListAPI()
    getListAPI()
  }
  const login = async ()=>{
    postLogin({username: '123', password: '456'})
    postLogin({username: '123', password: '456'})

    postLogin({username: '123', password: '456'})

  }

  return (
    <div className="App">
      <button onClick={getGoods}>get goods data</button>
      <button onClick={login}>login</button>
    </div>
  )
}

export default App
