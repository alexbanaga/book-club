import {Component, Output, OnChanges} from '@angular/core';
import {Book} from "../models/book";
import {BookClubApiService} from "../services/book-club-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'bc-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnChanges {
  private months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  private publishing: boolean = false;

  @Output() get isPublishing() {
    return this.publishing;
  }

  @Output() get getTime() {
    this.bookClubApiService.listCreatedAt = this.bookClubApiService.listCreatedAt ?
      new Date(this.bookClubApiService.listCreatedAt) : new Date();

    let listTime = this.bookClubApiService.listCreatedAt;
    return this.months[listTime.getMonth()] + " " + listTime.getDay() + ", " + listTime.getFullYear();
  }

  constructor(public bookClubApiService: BookClubApiService, private router: Router) {
  }

  removeBook(book: Book) {
    let index: number = this.bookClubApiService.books.indexOf(book, 0);
    if (index > -1) {
      this.bookClubApiService.books.splice(index, 1);
    }
  }

  addBook(name, link, author, personalReview, description) {
    this.bookClubApiService.books.push(new Book(name.value, link.value, author.value, personalReview.value, description.value));
    name.value = link.value = author.value = personalReview.value = description.value = null;
  }

  publishList() {
    this.publishing = true;
    console.log(this.bookClubApiService);
    this.bookClubApiService.createOrUpdateList()
      .subscribe((result) => {
        if (!this.bookClubApiService.listId) {
          this.bookClubApiService.listId = result.listId;
        }
        this.publishing = false;
      });

  }

  ngOnChanges() {
    if (!this.bookClubApiService.isLoggedIn && this.bookClubApiService.loaded) {
      this.router.navigate(['/']);
    }
  }

}
