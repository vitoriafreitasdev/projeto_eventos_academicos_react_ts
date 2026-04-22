
import classes from './NavBar.module.css'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.container_link}>
        <Link className={classes.link} to={"/"}>Home</Link>
        <Link className={classes.link} to={"/login"}>Login</Link>
        <Link className={classes.link} to={"/cadastro"}>Cadastro</Link>
        <Link className={classes.link} to={"/"}>Emitir Certificado</Link>
      </div>
    </nav>
  )
}

export default NavBar