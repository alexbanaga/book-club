import {BookList} from "./book-list";
export class MemberLibrary {
  constructor(public username: string, public firstName: string,
              public lastName: string, public bookLists: BookList[]) {

  }
}
