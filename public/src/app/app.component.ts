import {Component, OnInit} from '@angular/core';

import {NavbarComponent} from './navbar/navbar.component';
import {HeaderComponent} from './header/header.component';
import {MainComponent} from './main/main.component';
import {FooterComponent} from './footer/footer.component';


@Component({
    selector: 'bc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}
