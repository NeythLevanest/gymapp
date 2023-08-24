import { Component, OnInit } from '@angular/core';
import { SignupModalserviceService } from '../signup-page/signup-modalservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/userServices/authentication.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent {
  username: string = '';
  password: string = '';
  recuerdame: boolean = false;
  public formSignIn:FormGroup;
  loading = false;
  submitted = false;
  private user:any;
    
  isLoading: boolean = false;

  //private profileUser!:ProfileUsers
  
  public errorMessage:any;
  
  constructor(
    public _modalSignupService:SignupModalserviceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _authenticationService: AuthenticationService,
    //private alertService: AlertService,
    //private _profileUserService: ProfileusersService
  ) { 
    this.username = '',
    this.formSignIn = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login() {
   
  }

  openRegisterModal() {
    this._modalSignupService.mostrarModal();
  }

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    if(this.username.length>1){
      this.recuerdame=true;
    }
    this.user = {
      email: ' ',
      password: ' '
    };
  }

  async onSubmit() {
    this.user.email =  this.formSignIn.value.username;
    this.user.password = this.formSignIn.value.password;
    
    let userId;
    this.isLoading = true;

    // Simula una operación de inicio de sesión
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Cambia esto a la duración real de tu operación
    
    this._authenticationService.loginUser(this.user)
      .subscribe(
        resp => {
          userId = resp;
          console.log(userId)
          this._authenticationService.validateTypeUser(resp)
            .subscribe(
              (resp2:any) => {
                console.log(resp2)
               
                this.router.navigate(['/app/dashboard']); 
            },
          );
          return true;
        },
        (error:any)=>
            {
              //console.log("error en login")
              alert('Error encontrado');
              //console.log(error.status)
            }
      );
   
      /*Esperamos obtener el tipo de permiso del usuario*/
  }
}
