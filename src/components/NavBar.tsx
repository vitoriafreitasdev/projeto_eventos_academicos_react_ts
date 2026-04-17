
import classes from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.container_link}>
        <a className={classes.link} href="/">Home</a>
        <a className={classes.link} href="/">Login</a>
        <a className={classes.link} href="/">Cadastro</a>
        <a className={classes.link} href="/">Emitir Certificado</a>
      </div>
    </nav>
  )
}

export default NavBar