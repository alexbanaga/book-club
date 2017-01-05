import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Overlay} from 'angular2-modal';
import {Modal} from 'angular2-modal/plugins/bootstrap';

@Component({
    selector: 'bc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
        overlay.defaultViewContainer = vcRef;
    }

    ngOnInit() {
    }

    private getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = name + "=";
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s\+/g, "");
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return "";
    }

    createList() {
        console.log('Create list');
        if (this.getCookie("connect.sid") !== "") {
            //Logged in
        } else {
            //Not logged in
            this.modal.alert()
                .size('lg')
                .showClose(false)
                .title('Book Club')
                .body(`
                    <p class="login-headline">Sign in to BookClub to checkout what other people read.</p>
                    <div class="signin-buttons-wrapper">
                        <a href="/auth/twitter" class="signin-button twitter-login-button">
                            <span class="signin-icon-wrapper">
                                <img class="signin-icon" src="http://i.imgur.com/R8Hw3We.png"/>
                            </span>
                            <div class="login-button-text">
                                <span>Sign in with Twitter</span>
                                <span class="permission-text">We won't post without asking</span>
                            </div>
                        </a>
                        <a href="/auth/facebook" class="signin-button facebook-login-button">
                            <span class="signin-icon-wrapper">
                                <img class="signin-icon" src="http://i.imgur.com/OVFUdiH.png"/>
                            </span>
                            <div class="login-button-text">
                                <span>Sign in with Facebook</span>
                                <span class="permission-text">We won't post without asking</span>
                            </div>
                        </a>
                    </div>
                    <div class="terms-text">
                        <p>By signing up you agree to privacy policy, cookie policy, terms and conditions.</p>
                    </div>`)
                .okBtnClass('hide')
                .open();
        }
    }

}
