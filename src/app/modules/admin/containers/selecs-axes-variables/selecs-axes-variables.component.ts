import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { axes, variable } from '../../models';
import { AdminService } from '../../services/admin.service';
import { map } from 'rxjs/operators';
import { element } from 'protractor';

@Component({
  selector: 'app-selecs-axes-variables',
  templateUrl: './selecs-axes-variables.component.html',
  styleUrls: ['./selecs-axes-variables.component.scss']
})
export class SelecsAxesVariablesComponent implements OnInit {
  @Output() axes = new EventEmitter<any>();
  @Output() variablesArray = new EventEmitter<any>();
  @Input() arrayAxes : any
  @Input() arrayVariables: Array<any> = []
  
  variables: any
  axe: any
  variablesSelects:Array<any> = []
  listOfAxes: Array<axes> = []
  listOfVariables: Array<variable> = []
  listOfVariablesShow: Array<variable> = []

  constructor(private router: Router, private admin: AdminService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAxes()
    // this.getVariables()
    
  }
  capturarVariables(e: any) {
    this.variables = e;
    this.variablesArray.emit(this.variables)
  }

  capturarEje(e: any) {
    // this.axe = this.arrayAxes
    this.axe = e
    // filter variables per axe
    this.listOfVariablesShow = this.listOfVariables.filter((res:any)=>{
      return res.eje.id == this.axe.id
    })
    // 
    this.axes.emit(this.axe);
  }

  removeVariable(variable: any) {
    this.variablesArray.emit(this.variables)
    this.variables = this.variables.filter((res: any) => res !== variable);
  }

    // this function assigns the variables and the axes and displays on the screen 
  axeAsig() {
    this.variables =[]
    if (this.arrayAxes != null) {
      
      this.axe = this.listOfAxes.find(
        (res: any) => res.id == this.arrayAxes.id
      ); 
      
      this.listOfVariablesShow = this.listOfVariables.filter((res: any) => {
        return res.eje.id == this.axe.id;
      });
      this.variablesSelects = this.arrayVariables.filter((element:any)=>{
        return element.eje.id == this.axe.id
      })
      for(let vari of this.variablesSelects){
        this.variables.push(this.listOfVariablesShow.find(res =>{
          return res.id == vari.id
        }))
      }
    }
  }
  // 
  variableAsig() {
    if (this.arrayVariables) {
      this.variables = this.arrayVariables;
      
    }
  }

  getAxes() {
    this.admin
      .getAxes()
      .subscribe({
        next: (data: axes[]) => {
          this.listOfAxes = data;
          setTimeout(() => this.cdr.detectChanges());
          
          this.getVariables()
          // this.axe = this.arrayAxes
        },
        error: (err) => {
          
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
        complete: () => {
          
        },
      });
  }

  getVariables(){
    this.admin.getVariables().subscribe({ next: (data: variable[]) => {
      this.listOfVariables = data;
      setTimeout(() => this.cdr.detectChanges());
      this.axeAsig()
      
    },
    error: (err) => {
      
      if (err.status === 401) {
        this.router.navigate(['/auth']);
      }
    },
    complete: () => {
      
    },
  });
  }

}
