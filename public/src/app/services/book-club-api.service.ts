import {Injectable, Output} from '@angular/core';
import {Http, Headers, Response, RequestOptionsArgs} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {BookList} from "../models/book-list";

@Injectable()
export class BookClubApiService {
  private get getUserLibraryUrl(): string {
    return "/api/library";
  }

  private get createOrUpdateListUrl(): string {
    return "/api/list";
  }

  private get getListBaseUrl(): string {
    return "/api/list";
  }

  private get logoutUrl(): string {
    return "/api/logout";
  }

  @Output() get loaded() {
    return this.isLoaded;
  }
  isLoaded: Observable<boolean>;

  isLoggedIn: boolean = false;
  books: any;
  listCreatedAt: Date;
  listUpdatedAt: Date;
  listTitle: string;
  listId: string;
  name: string = "";
  twitterName: string;
  facebookName: string;

  constructor(private http: Http) {
  }

  private extractData(res: Response) {
    this.isLoaded = true;

    let body = res.json();
    return body || {};
  }

  logout() {
    return this.http.get(this.logoutUrl)
      .map(this.extractData);
  }

  getUserDetails() {
    this.isLoaded = false;
    return this.http.get(this.getUserLibraryUrl)
      .map(this.extractData);
  }

  createOrUpdateList() {
    let list = {
      listId: this.listId,
      title: this.listTitle,
      books: this.books
    };
    let body: string = JSON.stringify(list);
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.createOrUpdateListUrl, body, {headers: headers})
      .map(this.extractData);
  }

  getList(username: string, listName: string) {
    return this.http.get(`${this.getListBaseUrl}/${username}/${listName}`)
      .map(this.extractData);
  }

  clearSession() {
    this.isLoggedIn = false;
    this.books = [];
    this.listCreatedAt = null;
    this.listUpdatedAt = null;
    this.listTitle = null;
    this.listId = null;
    this.name = "";
    this.twitterName = null;
    this.facebookName = null;
  }

}
