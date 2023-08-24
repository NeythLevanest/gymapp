import { Component } from '@angular/core';
import { SignupModalserviceService } from './signup-modalservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/userServices/authentication.service';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  public errorMessage:any;
  formRegister :FormGroup;
  
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public _authenticationService: AuthenticationService,
    public _modalSignupService:SignupModalserviceService,
    //private alertService: AlertService
) 
{ 
  this.formRegister = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    passwordAgain: ['', Validators.required],
    conditions:[false, Validators.required]
  }, {validators: this.areSamePassword('password', 'passwordAgain')});

  /*this.formC = this.formBuilder.group({
    codigo: ['', Validators.required]
  });*/
}

  register() {
    // Aquí puedes agregar la lógica de registro.
    // Por ahora, solo imprimirá los valores en la consola.
    console.log('Nombre:', this.name);
    console.log('Correo electrónico:', this.email);
    console.log('Contraseña:', this.password);
  }
  
  closeRegisterModal() {
    this._modalSignupService.ocultarModal();
  }

  areSamePassword(field1: string, field2: string){
    return (group: FormGroup) =>{
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;
      if(pass1===pass2){
        return null
      }
      return{
        areSamePassword: true
      };
    };
  }
 
 
  registrarUsuario() {
    if(this.formRegister.invalid){
      return;
    }
    if(!this.formRegister.value.conditions){
      
      return;
    }
    let user = new User(
      this.formRegister.value.email,
      this.formRegister.value.first_name,
      this.formRegister.value.last_name,
      this.formRegister.value.password,
    );
    
    let registroSatisfactorio = this._authenticationService.crearUsuario(user)
                        .subscribe(
                          resp=>{
                            //console.log(resp);
                            Swal.fire("Estupendo!", "Hemos enviado un mensaje de verificación a tu correo electrónico para activar tu cuenta de manera satisfactoria!", "success");
                            this._modalSignupService.ocultarModal();
                            return true;
                          },
                          (error:any)=>{
                              switch(error.status)
                              {
                                case 400: { 
                                  Swal.fire("Ay caramba!", "Ha ocurrido un error en tu registro. Verifica si tu usuario ya existe!", "error");
                                  break; 
                                } 
                                
                                default: { 
                                  Swal.fire("Ay caramba!", "Ha ocurrido un error en tu registro", "error");
                                  break; 
                                } 
                              }
                           
                          }
                        );
   
    this.router.navigate(['login']);
    
  }
}



function swal(arg0: string, arg1: string, arg2: string) {
  throw new Error('Function not implemented.');
}
