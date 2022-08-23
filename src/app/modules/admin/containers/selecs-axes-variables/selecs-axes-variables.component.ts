import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { axes, variable } from '../../models';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-selecs-axes-variables',
  templateUrl: './selecs-axes-variables.component.html',
  styleUrls: ['./selecs-axes-variables.component.scss']
})
export class SelecsAxesVariablesComponent implements OnInit {
  @Output() axes = new EventEmitter<any>();
  @Output() variablesArray = new EventEmitter<any>();
  
  variables: any
  axe: any

  listOfAxes: Array<axes> = []
  listOfVariables: Array<variable> = []

  constructor(private router: Router, private admin: AdminService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAxes()
    this.getVariables()
    
  }
  capturarVariables(e: any) {
    this.variables = e;
    this.variablesArray.emit(this.variables)
  }

  capturarEje(e: any) {
    this.axe = e
    this.axes.emit(this.axe);
  }

  removeVariable(variable: any) {
    this.variablesArray.emit(this.variables)
    this.variables = this.variables.filter((res: any) => res !== variable);
  }

  getAxes() {
    this.admin
      .getAxes()
      .subscribe({
        next: (data: axes[]) => {
          this.listOfAxes = data;
          setTimeout(() => this.cdr.detectChanges());
          console.log(this.listOfAxes);
        },
        error: (err) => {
          console.log(err);
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
        complete: () => {
          console.log('Request get axes complete');
        },
      });
  }

  getVariables(){
    this.admin.getVariablesQuantityPerAxe().subscribe({ next: (data: variable[]) => {
      this.listOfVariables = data;
      setTimeout(() => this.cdr.detectChanges());
      console.log(this.listOfVariables);
    },
    error: (err) => {
      console.log(err);
      if (err.status === 401) {
        this.router.navigate(['/auth']);
      }
    },
    complete: () => {
      console.log('Request get axes complete');
    },
  });
  }

}
