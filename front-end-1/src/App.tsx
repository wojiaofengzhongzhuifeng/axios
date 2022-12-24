import './App.css'
import {getListAPI}  from './api/goods'
import {postLogin} from "./api/user";

function App() {
  const getGoods = async ()=>{
    const data = await getListAPI()
    console.log('data', data);
  }
  const login = async ()=>{
    const res = await postLogin({username: '123', password: '456'})
    console.log(res);
  }

  return (
    <div className="App">
      <button onClick={getGoods}>get goods data</button>
      <button onClick={login}>login</button>
    </div>
  )
}

export default App
