export interface IBook {
  id: string,
  name: string,
  author: string,
  isbn: string,
  ydk: string,
  bbk: string,
  description: string,
  yearPublication: number,
  bookShelfId: string | null,
}