import style from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={style.nav_container}>
      <div>Книги</div>
      <div>Разделы</div>
      <div>Пользовательская информация</div>
    </nav>
  )
}

export default Navbar;