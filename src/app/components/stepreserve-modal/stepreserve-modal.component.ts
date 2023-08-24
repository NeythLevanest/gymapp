import { Component, Input } from '@angular/core';
import { StepreserveService } from './stepreserve.service';

@Component({
  selector: 'app-stepreserve-modal',
  templateUrl: './stepreserve-modal.component.html',
  styleUrls: ['./stepreserve-modal.component.scss']
})
export class StepreserveModalComponent {
  @Input() steps: TutorialStep[] = [];
  currentStep = 0;

  constructor(
    public _modalStepService:StepreserveService,
  ){}
  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  closeTutorial() {
    this._modalStepService.ocultarModal();
  }

}