/**
 * Created by Tal on 06/01/2017.
 */
import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {BookClubApiService} from "../services/book-club-api.service";

@Injectable()
export class CanActivateViaBookClubApiGuard implements CanActivate {

  constructor(private bookClubApiService: BookClubApiService, private router: Router) {}

  canActivate() {
    if (this.bookClubApiService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['unavailable']);
      return false;
    }
  }
}
