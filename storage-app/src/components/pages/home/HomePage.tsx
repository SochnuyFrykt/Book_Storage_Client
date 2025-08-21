import {useEffect, useState, useCallback, type FormEvent} from "react";
import type {IBook} from "../../../types/book.ts";

const initialNewBookState: Omit<IBook, 'id'> = {
  name: "",
  author: "",
  isbn: "",
  ydk: "",
  bbk: "",
  description: "",
  yearPublication: new Date().getFullYear(),
  bookShelfId: null,
};

const HomePage = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [error, setError] = useState(null);
  const [newBook, setNewBook] = useState(initialNewBookState);

  const fetchBooks = useCallback(async () => {
    try {
      setError(null); // Сбрасываем предыдущую ошибку
      const response = await fetch('http://localhost:5192/api/Book', {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
    } catch (ex: any) {
      console.error(ex);
      setError(ex.message);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNewBook(prevBook => ({
      ...prevBook,
      [name]: name === 'yearPublication' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!newBook.name.trim() || !newBook.author.trim()
      || !newBook.isbn.trim() || !newBook.ydk.trim()
      || !newBook.bbk.trim()) {
      /// setFormError("Название книги и имя автора не могут быть пустыми.");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5192/api/Book", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        // Если API возвращает текст ошибки, можно его показать
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      // 4. КЛЮЧЕВОЙ МОМЕНТ: После успешного добавления, снова загружаем список книг
      await fetchBooks();

      // 5. Очищаем форму
      setNewBook(initialNewBookState);

    } catch (ex: any) {
      console.error(ex);
      setError(ex.message);
    }
  };

  if (error) {
    return <div>Ошибка: {error}</div>
  }

  return (
    <>
      <div>Домашняя страница</div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Название книги</label>
          <input id="name" name="name" type="text" value={newBook.name} onChange={handleInputChange}/>
        </div>
        <div>
          <label htmlFor="author">Автор</label>
          <input id="author" name="author" type="text" value={newBook.author} onChange={handleInputChange}/>
        </div>
        <div>
          <label htmlFor="isbn">ISBN</label>
          <input id="isbn" name="isbn"
                 type="text" value={newBook.isbn}
                 onChange={handleInputChange}/>
        </div>
        <div>
          <label htmlFor="ydk">УДК</label>
          <input id="ydk" name="ydk"
                 type="text" value={newBook.ydk}
                 onChange={handleInputChange}/>
        </div>
        <div>
          <label htmlFor="bbk">ББК</label>
          <input id="bbk" name="bbk"
                 type="text" value={newBook.bbk}
                 onChange={handleInputChange}/>
        </div>
        <div>
          <label htmlFor="description">Описание</label>
          <input id="description"
                 name="description"
                 type="text"
                 value={newBook.description}
                 onChange={handleInputChange}/>
        </div>
        <div>
          <label htmlFor="yearPublication">Год публикации</label>
          <input id="yearPublication"
                 name="yearPublication"
                 type="number"
                 value={newBook.yearPublication}
                 onChange={handleInputChange}/>
        </div>
        <button type="submit">Добавить новую книгу
        </button>
      </form>

      <h1>Список книг</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <h2>{book.name}</h2>
            <p>Автор: {book.author}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default HomePage;