import {Component, OnInit} from '@angular/core';
import {BookClubApiService} from "./services/book-club-api.service";
import {BookList} from "./models/book-list";


@Component({
  selector: 'bc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loaded: boolean = false;

  constructor(private bookClubApiService: BookClubApiService) {
  }

  ngOnInit() {
    this.bookClubApiService.getUserDetails().subscribe((result) => {
      if (result.success) {
        console.log(result);

        this.bookClubApiService.isLoggedIn = true;
        this.bookClubApiService.name = result.data.name;
        this.bookClubApiService.twitterName = result.data.twitterName;
        this.bookClubApiService.facebookName = result.data.facebookName;

        let list = result.data.library;
        if (list) {
          this.bookClubApiService.books = list.books;
          this.bookClubApiService.listTitle = list.title;
          this.bookClubApiService.listId = list.listId;
          this.bookClubApiService.listCreatedAt = list.createdAt;
          this.bookClubApiService.listUpdatedAt = list.updatedAt;
        } else {
          this.bookClubApiService.books = [];
          this.bookClubApiService.listTitle = "";
        }

        this.loaded = false;
      }
    });
  }
}
