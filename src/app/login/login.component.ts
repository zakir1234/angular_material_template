import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../_services/user-auth.service';
import { RequestMaker } from '../_common/RequestMaker';
import { authHeaders } from '../_common/auth.headers';
import { URI } from '../_common/uri';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private requestMaker: RequestMaker,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  login(loginForm: NgForm) {
    var data = {
      client_id: 'spring-boot-rest-read-write-client',
      grant_type: 'password',
      username: loginForm.value.userName,
      password: loginForm.value.password,
    };

    var request = this.requestMaker.getAuthRequest(
      URI.TOKEN_URI,
      data,
      authHeaders
    );

    const _requestMaker = this.requestMaker;
    const _authUser = this.userAuthService;
    const _router = this.router;

    $.ajax(request)
      .catch((error) => {
        console.log(error.responseText);
        this.userAuthService.clear();
      })
      .done(function (rs: any) {
        _authUser.setToken('Bearer ' + rs.access_token);
        var userRequest = _requestMaker.getRequest(URI.USER_URI);

        $.ajax(userRequest)
          .catch((err) => {
            console.log(err.responseText);
            _authUser.clear();
          })
          .done(function (res: any) {
            _authUser.setRoles(res.roles);

            if (res.roles.includes('ROLE_ADMIN')) {
              _router.navigate(['/admin']);
            } else {
              _router.navigate(['/user']);
            }
          });
      });
  }
}
