import style from './Navbar.module.css';
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={style.nav_container}>
      <Link to="/">Главная</Link>
      <Link to="/books">Книги</Link>
      <Link to="/helfs">Шкафчики</Link>
      <Link to="/user">Пользовательская информация</Link>
    </nav>
  )
}

export default Navbar;