import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {ModalModule} from 'angular2-modal';
import {BootstrapModalModule} from 'angular2-modal/plugins/bootstrap';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MainComponent} from './main/main.component';
import {FooterComponent} from './footer/footer.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavbarComponent,
        MainComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ModalModule.forRoot(),
        BootstrapModalModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}