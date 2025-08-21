import style from '../BookCardStyle.module.css';

const AddBookButton = () => {
  return(
    <div className={style.card_container}>
      <button>
         Добавить новую книгу
      </button>
    </div>
  )
}

export default AddBookButton;