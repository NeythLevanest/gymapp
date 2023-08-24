import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupModalserviceService {

  public hiddenModalSignup:string='hiddenModalSignup';

  constructor() { }

  ocultarModal() {
    this.hiddenModalSignup = 'hiddenModalSignup'; }
  //value is empty
  mostrarModal() {
    this.hiddenModalSignup = ''; }
}
