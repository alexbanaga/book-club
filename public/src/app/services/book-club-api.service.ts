import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptionsArgs} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {BookList} from "../models/book-list";

@Injectable()
export class BookClubApiService {
  private get signinUrl(): string {
    return "";
  }

  private get signupUrl(): string {
    return "";
  }

  private get getMemberLibraryUrl(): string {
    return "";
  }

  private get creaeteListUrl(): string {
    return "";
  }

  private get getListBaseUrl(): string {
    return "";
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

  Signin(username: string, password: string) {
    let body: string = JSON.stringify({username: username, password: password});
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.signinUrl, body, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError)
  }

  Signup(email: string, username: string, facebookId: string, twitterId: string, firstName: string,
         lastName: string, password: string) {
    let body: string = JSON.stringify({
      email: email, username: username, facebookId: facebookId,
      twitterId: twitterId, firstName: firstName, lastName: lastName, password: password
    });

    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.signupUrl, body, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getMemberLibrary() {
    return this.http.get(this.getMemberLibraryUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createList(bookList: BookList) {
    let body: string = JSON.stringify(bookList);
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.creaeteListUrl, body, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  getList(username: string, listName: string) {
    return this.http.get(`${this.getListBaseUrl}/${username}/${listName}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

}
