import classes from './App.module.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {

  return (
    <main className={classes.main}>
      <NavBar/>
      <Outlet/>
    </main>
  )
}

export default App
