import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import URL_SERVICIOS from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _refreshNeeded$ = new Subject<void>();
  
  constructor(
    public http: HttpClient,
    public router: Router,
    private _authenticationService:AuthenticationService
  ) {

  }
  get refreshNeeded$(){
    return this._refreshNeeded$;
  }
  
  getUserBasicInfo(_id:any)
  {
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'JWT '+this._authenticationService.getToken(),
      })
    }
    let url=URL_SERVICIOS.userBasic + _id;
    return this.http.get(url, httpOptions);
  }

}
