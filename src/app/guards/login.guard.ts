import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/userServices/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardsGuard implements CanActivate {
  
  //userTypePermission!:UserTypesPermission;
  
  constructor(
    public _authenticationService:AuthenticationService,
    public router:Router
  ){}
  
  async canActivate(){
    let acceso:boolean = false;
    let userId = localStorage.getItem('id');
    this._authenticationService.validateTypeUser(userId)
        .subscribe(
          (resp:any) => {
            //this.userTypePermission = resp;
            if (this._authenticationService.islogIn()){
              console.log('PASO GUARD');
              acceso = true;
            }else{
              console.log('BLOQUEADO POR EL GUARD')
              this.router.navigate(['signin']);
              acceso = false;
            }
          });
  
    await delay(500);
    //console.log(acceso)
    
    return acceso;
  }
  
  
  }
  
  function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
  }