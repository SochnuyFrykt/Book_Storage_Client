import style from '../BookCardStyle.module.css';
import {Link} from "react-router-dom";

const AddBookButton = () => {
  
  
  return (
    <Link to="/addbook">
      <div className={style.card_container}>
          <button type="submit">Добавить новую книгу</button>
      </div>
    </Link>
  )
}

export default AddBookButton;