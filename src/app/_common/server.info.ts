import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServerInfo {
  constructor() {}
  BASE_URL = 'http://localhost';
  PORT = 9090;
  BASE_FULL_URL = this.BASE_URL + ':' + this.PORT;
}
