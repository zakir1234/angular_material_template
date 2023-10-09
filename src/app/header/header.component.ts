import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { RequestMaker } from '../_common/RequestMaker';
import { URI } from '../_common/uri';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private userAuthService: UserAuthService,
    private requestMaker: RequestMaker,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    const logoutRequest = this.requestMaker.getRequest(URI.LOGOUT_URI);
    const _authUser = this.userAuthService;
    const _router = this.router;

    $.ajax(logoutRequest)
      .catch((err) => {
        console.log(err.responseText);
      })
      .done(function (res: any) {
        _authUser.clear();
        _router.navigate(['/home']);
      });
  }

  public isMatched(allowedRoles: any): Boolean {
    return this.userAuthService.isMatched(allowedRoles);
  }
}
