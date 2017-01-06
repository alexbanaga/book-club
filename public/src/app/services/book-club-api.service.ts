import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptionsArgs} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {BookList} from "../models/book-list";

@Injectable()
export class BookClubApiService {
  private get getUserLibraryUrl(): string {
    return "api/library";
  }

  private get createListUrl(): string {
    return "api/list";
  }

  private get getListBaseUrl(): string {
    return "api/list";
  }

  private get logoutUrl(): string {
    return "api/logout";
  }

  constructor(private http: Http) {
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  logout() {
    return this.http.get(this.logoutUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getUserDetails() {
    return this.http.get(this.getUserLibraryUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createList(bookList: BookList) {
    let body: string = JSON.stringify(bookList);
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.createListUrl, body, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getList(username: string, listName: string) {
    return this.http.get(`${this.getListBaseUrl}/${username}/${listName}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

}
