interface IBookProps {
  image: string;
  name: string;
  author: string;
  yearPublication: number;
}

const BookCard = (props: IBookProps) => {
  return (
    <div>
      <div className="cover">
        {/*todo: Добавить изображение обложки книги*/}
        Изображение
      </div>
      <h3 className="name">
        {props.name}
      </h3>
      <h4 className="author">
        {props.author} {props.yearPublication}
      </h4>
      <button>Подробнее</button>
    </div>
  )
}

export default BookCard;