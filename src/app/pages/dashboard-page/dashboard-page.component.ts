import { Component } from '@angular/core';
import { StepreserveService } from 'src/app/components/stepreserve-modal/stepreserve.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  constructor(private stepModalService: StepreserveService) {}

  openTutorial() {
    const tutorialSteps: TutorialStep[] = [
      { title: 'Paso 1', content: 'Este es el primer paso del tutorial.' },
      { title: 'Paso 2', content: 'Este es el segundo paso del tutorial.' },
      // Agrega más pasos según sea necesario
    ];

    const modalRef = this.stepModalService. .open(StepByStepTutorialComponent, { centered: true });
    modalRef.componentInstance.steps = tutorialSteps;
  }
}
