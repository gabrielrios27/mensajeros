import { Component, OnInit } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: ProgressBarComponent }]
})
export class ProgressBarComponent extends CdkStepper  implements OnInit {

  
  progress!: number;
  stepss: Array<number> = [1,2,3,4]

  ngOnInit(): void {

    setTimeout(() => {
      this.progress = 100 / this.steps.length;
    }, 100);
  }

  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }

  backStep() {
    this.progress -= 100 / this.steps.length;
    console.log(this.progress);

  }

  nextStep() {

    if (this.selected?.stepControl?.valid) {
      this.progress +=  this.progress <100 ? 100 / this.steps.length: 0;
      this.next();
    } else {
      if(this.selected?.stepControl == undefined) {
        this.progress += this.progress <100 ? 100 / this.steps.length: 0
        this.next();
      }
    }
  }


}


