import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, map } from 'rxjs';
import URL_SERVICIOS from 'src/app/config/api';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _refreshNeeded$ = new Subject<void>();
  private httpOptions:any;

  public token: String;
  public user: String;
  public token_expires: Date;
  public username:String;
  public errors:any=[];
  isLoading: boolean = false;
 
  
  activeRolTypeLender:string = "";
  activeRolTypeInvester:string = "";

  constructor(
    public http: HttpClient,
    public router: Router
  ) 
  {
    this.token = "";
    this.user = "";
    this.token_expires = new Date();
    this.username = "";
    this.errors = [];
    this.loadStorage();
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    
  }

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }
  
  public loginUser(user: any, recordar: boolean=false){
    console.log(user + " iniciar");
    if(recordar){
      localStorage.setItem('username', user['email']);
    } else{
      localStorage.removeItem('username');
    }
    let url = URL_SERVICIOS.sign_in;
    return this.http.post(url, JSON.stringify(user), this.httpOptions)
                    
                    .pipe(map((resp: any) =>{
                      //this.token = JSON.stringify(resp['token']);
                      this.updateData(resp['token'])
                      localStorage.setItem('token', this.token as any);
                      localStorage.setItem('id', JSON.stringify(this.tokenGestion(resp['token']).user_id));
                      localStorage.setItem('user', JSON.stringify(this.tokenGestion(resp['token'])));
                      return JSON.stringify(this.tokenGestion(resp['token']).user_id)
                    }));
  }

  islogIn(){
    return((this.token.length > 5))? true: false;
  }
  loadStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token') as any;
      this.user = JSON.parse(localStorage.getItem('user') as any);
    } else{
      this.token='';
      this.user=""; // era null
    }
  }
  
  tokenGestion(token:String){
    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    return token_decoded;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  public refreshToken(){
    const data = ['token']
    let url = URL_SERVICIOS.refreshlogin;
    this.http.post(url, JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      (data:any) => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public logoutUser(){
    this.isLoading = true;
     setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Cambia esto a la duración real de tu operación

    this.token='';
    this.token_expires= new Date(); //aqui iba null
    this.username=''; //aqui iba null
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
     // Simula una operación de inicio de sesión
    
    
    this.router.navigate(['/signin'])
  }

  private updateData(token:String){
    this.token = token;
    this.errors = [];

    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp*1000);
    this.username = token_decoded.username;
  }

  
  /*getInti(id){
    let url = URL_SERVICIOS.registrar+id
    return this.http.get(url);
  }*/
  // crearUsuario (user:User){
  //   let url = URL_SERVICIOS.sign_up;
  //   return this.http.post(url, user);
  // }

  requestResetPassword (email:any){
    let url = URL_SERVICIOS.requestResetPassword;
    return this.http.post(url, email);
  }

  resetPassword (parameters:any){
    let url = URL_SERVICIOS.resetPassword;
    return this.http.patch(url, parameters);
   
  }

  //CHECKINPUTS

  changeRolUserToLender()
  {
    this.activeRolTypeLender = "active";
    this.activeRolTypeInvester = "";  
    console.log("change active lender");
  }
  changeRolUserToInvester()
  {
    this.activeRolTypeLender = "";
    this.activeRolTypeInvester = "active";   
    console.log("change active invester");
  }


  validateTypeUser(userId:any)
  {
    let url = URL_SERVICIOS.userTypeLogin + userId;
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'JWT '+this.getToken(),
      })
    }
    return this.http.get(url,httpOptions);
  }

  getUserUpLogin()
  {
    return localStorage.getItem('id');
  }


  getUsers(staff:any, pageNum: number)
  {
    
    let url = URL_SERVICIOS.usersStaff + staff + '&page=' + pageNum.toString();;
    //console.log(url);
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'JWT '+this.getToken(),
      })
    }
    return this.http.get(url,httpOptions);
  }

  getUserConfigDetail(userConfigId:any)
  {
    let url = URL_SERVICIOS.usersConfigDetail + userConfigId;
    //console.log(url);
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'JWT '+this.getToken(),
      })
    }
    return this.http.get(url,httpOptions);
  }

  postUserConfigAdmin(userConfig:any)
  {
    let url = URL_SERVICIOS.usersConfigDetail;
    console.log(url);
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'JWT '+this.getToken(),
      })
    }
    return this.http.post(url, userConfig, httpOptions).pipe(
      map(() =>{
        this._refreshNeeded$.next();
      })
    );
  }

  updateUserConfigAdmin(id:any, _userConfig:any)
  {
    let url = URL_SERVICIOS.usersConfigDetail + id + "/"
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'JWT '+this.getToken(),
      })
    }
    return this.http.put(url, _userConfig, httpOptions)
    .pipe(
      map(() =>{
        this._refreshNeeded$.next();
      })
    );
  }

  crearUsuario (user:User){
    let url = URL_SERVICIOS.sign_up;
    return this.http.post(url, user);
  }
}
