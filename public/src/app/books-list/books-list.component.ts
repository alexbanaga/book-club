import {Component, OnInit, Output} from '@angular/core';
import {Book} from "../models/book";

@Component({
  selector: 'bc-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  private months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  private books: Book[] = [];

  @Output() get getTime() {
    let now = new Date();
    return this.months[now.getMonth()] + " " + now.getDay() + ", " + now.getFullYear();
  }

  constructor() {
  }

  removeBook(book: Book) {
    let index: number = this.books.indexOf(book, 0);
    if (index > -1) {
      this.books.splice(index, 1);
    }
  }

  addBook(name, link, author, personalReview, description) {
    this.books.push(new Book(name.value, link.value, author.value, personalReview.value, description.value));
    name.value = link.value = author.value = personalReview.value = description.value = null;
  }

  ngOnInit() {
  }

}
