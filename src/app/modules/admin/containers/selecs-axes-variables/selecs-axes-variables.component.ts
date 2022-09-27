import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { axes, variable } from '../../models';
import { AdminService } from '../../services/admin.service';
import { map } from 'rxjs/operators';
import { element } from 'protractor';
import { Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-selecs-axes-variables',
  templateUrl: './selecs-axes-variables.component.html',
  styleUrls: ['./selecs-axes-variables.component.scss']
})
export class SelecsAxesVariablesComponent implements OnInit {
  @Output() axes = new EventEmitter<any>();
  @Output() variablesArray = new EventEmitter<any>();
  @Output() flagDatos = new EventEmitter<boolean>();
  @Input() arrayAxes : any
  @Input() arrayVariables: Array<any> = []
  
  variables: any
  axe: any
  variablesSelects:Array<any> = []
  listOfAxes: Array<axes> = []
  listOfVariables: Array<variable> = []
  listOfVariablesShow: Array<variable> = []
  flag = false

  constructor(private router: Router, private admin: AdminService, private cdr: ChangeDetectorRef, private data: DataService) { }

  ngOnInit(): void {
    this.getAxes()
    // this.getVariables()
    
  }
  capturarVariables(e: any) {
    
    this.variables = e;
    
    this.variablesArray.emit(this.variables)
  }
  selectAll(){
    if(!this.flag){
      this.variables = this.listOfVariablesShow;
      this.flag = true
    }
    else{
      this.variables = []
      this.flag = false
    }
    this.variablesArray.emit(this.variables)
  }

  // toggleAllSelection(matSelect: MatSelect) {
  //   const isSelected: boolean = matSelect.options
  //     // The "Select All" item has the value 0
  //     .filter((item: MatOption) => item.value === 0)
  //     // Get the selected property (this tells us whether Select All is selected or not)
  //     .map((item: MatOption) => item.selected)[0];
  //   // Get the first element (there should only be 1 option with the value 0 in the select)

  //   if (isSelected) {
  //     matSelect.options.forEach((item: MatOption) => item.select());
  //   } else {
  //     matSelect.options.forEach((item: MatOption) => item.deselect());
  //   }
  //   this.variablesArray.emit(this.variables)
  // }

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
