import {useEffect, useState, useCallback} from "react";
import type {IBook} from "../../../types/book.ts";
import BookCard from "../../books_components/BookCard.tsx";
import AddBookButton from "../../books_components/add_book/AddBookButton.tsx";

const HomePage = () => {
  const [books, setBooks] = useState<IBook[]>([
    {
      id: "D1AF7691-C57B-40CA-9536-F4235A7D904A",
      name: "Сколько волка не корми",
      bbk: "1",
      author: "Карина Володова",
      ydk: "",
      isbn: "",
      yearPublication: 2025,
      description: "",
      bookShelfId: null,
    },
    {
      id: "D1AF7691-C57B-40CA-9536-F4235A7D904A",
      name: "Сколько волка не корми",
      bbk: "1",
      author: "Карина Володова",
      ydk: "",
      isbn: "",
      yearPublication: 2025,
      description: "",
      bookShelfId: null,
    }
  ]);

  const fetchBooks = useCallback(async () => {
    try {
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
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <>
      <div style={{ display:"flex", }}>
        <AddBookButton />
        {books.map(book => (
          <div key={book.id}>
            <BookCard image={""} 
                      name={book.name} 
                      author={book.author} 
                      yearPublication={book.yearPublication}/>
          </div>
        ))}
      </div>
    </>
  )
}

export default HomePage;