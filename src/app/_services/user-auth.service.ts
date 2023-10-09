import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles:[]){
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles() : []{
    var rles = localStorage.getItem('roles');
      return JSON.parse(rles||JSON.stringify([]));      
  }

  public setToken(token :string){
    localStorage.setItem('token', token);
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken() ;
  }

  
  public isMatched(allowedRoles:any) : Boolean{

    let isMatched = false;

    let userRoles = this.getRoles();

    if(userRoles != null && userRoles){

      for(let i= 0; i< userRoles.length; i++){

        for(let j = 0; j <allowedRoles.length; j++){

          if(userRoles[i] === allowedRoles[j]){
            isMatched = true;
           break;
          }

        }

      }

    }
    return isMatched;
  }


}

