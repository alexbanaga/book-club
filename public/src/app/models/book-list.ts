import {Book} from "./book";
export class BookList {
  constructor(public listName: string, public listTime: Date, public books: Book[]) {

  }
}
