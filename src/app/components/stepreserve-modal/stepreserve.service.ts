import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepreserveService {
  public hiddenModal:string='hiddenModalStepReserve';

  constructor() { }

  ocultarModal() {
    this.hiddenModal = 'hiddenModalStepReserve'; }
  //value is empty
  mostrarModal() {
    this.hiddenModal = ''; }
}
