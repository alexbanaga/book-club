import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';
import {MaterialModule} from '@angular/material';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {BooksListComponent} from './books-list/books-list.component';
import {BookClubApiService} from "./services/book-club-api.service";

const appRoutes: Routes = [
  {path: 'list', component: BooksListComponent},
  {path: '', component: HeaderComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    BooksListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BookClubApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
