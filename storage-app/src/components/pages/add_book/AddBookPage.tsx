import {type FormEvent, useState} from "react";
import type {IBook} from "../../../types/book.ts";
import {useNavigate} from "react-router-dom";

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

const AddBookPage = () => {
  const navigate = useNavigate(); 
  const [newBook, setNewBook] = useState(initialNewBookState);

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
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      setNewBook(initialNewBookState);
      navigate('/')
    } catch (ex: any) {
      console.error(ex);
    }
  };
  
  return (
    <>
      <div>
        Страница добавления новой книги
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
          <button type="submit">Добавить новую книгу</button>
        </form>
      </div>
    </>
  )
}

export default AddBookPage;