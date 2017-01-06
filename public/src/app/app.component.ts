import {Component, OnInit} from '@angular/core';
import {BookClubApiService} from "./services/book-club-api.service";


@Component({
  selector: 'bc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BookClubApiService]
})
export class AppComponent implements OnInit {
  constructor(private bookClubApiService: BookClubApiService) {
  }

  ngOnInit() {
    this.bookClubApiService.getUserDetails().subscribe((data) => {
      console.log(data);
    });
  }
}
