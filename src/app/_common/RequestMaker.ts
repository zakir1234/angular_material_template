import { Injectable } from '@angular/core';
import { ServerInfo } from './server.info';
import { contentHeaders } from './headers';
import { UserAuthService } from '../_services/user-auth.service';

@Injectable({ providedIn: 'root' })
export class RequestMaker {
  constructor(
    private serverInfo: ServerInfo,
    private userAuthService: UserAuthService
  ) {}

  public getAuthRequest(uri: string, data: any, headers: any) {
    var request = {
      url: this.serverInfo.BASE_FULL_URL + uri,
      method: 'POST',
      headers: headers,
      data: data,
    };

    return request;
  }

  public postRequest(uri: string, data: any) {
    var request = {
      url: this.serverInfo.BASE_FULL_URL + uri,
      method: 'POST',
      headers: contentHeaders,
      data: data,
    };

    return request;
  }

  public getRequest(uri: string) {
    const full_url = this.serverInfo.BASE_FULL_URL + uri;

    var request = {
      url: full_url,
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    return request;
  }
}
