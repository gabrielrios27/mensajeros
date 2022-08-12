import { MatSelect } from '@angular/material/select';
import { Component, OnInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-add-mod-report',
  templateUrl: './add-mod-report.component.html',
  styleUrls: ['./add-mod-report.component.scss']
})
export class AddModReportComponent implements OnInit {

  variables: any;
  eje: any
  ejes: Array<any> = ["hola","pepe","jose"]

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit(): void {
    
  }

  createEje() {
    let container = document.getElementById('select');
    const containerEje = document.createElement('div');
    containerEje.style.display = "flex";
    containerEje.style.flexDirection = "row";
    const containerVariable = this.renderer.createElement('div');
    const artvar = this.renderer.setAttribute(containerVariable,'class', 'container-label-variables');
    const containerTitle = document.createElement('div');
    const titleV = document.createElement('lablel');
    const variables = this.renderer.createElement('lablel');
    titleV.insertAdjacentHTML("afterbegin","Variables Seleccionadas") 
    const artvs = this.renderer.setAttribute(variables,'class', 'label-variables');
    variables.insertAdjacentHTML("afterbegin",'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>')
    const select = this.renderer.createElement('select');
    const select2 = this.renderer.createElement('select');
    select2.setAttribute('class', '_ngcontent-xsp-c82');
    const artsele = this.renderer.setAttribute(select2,'selectionChange', 'capturarVariables($event.value)');
    select2.setAttribute('disabled',this.eje);

    for(let i of this.ejes){
      const op = this.renderer.createElement('option');
      const artop = this.renderer.setAttribute(op, 'class', 'mat-option');
      const artop1 = this.renderer.setAttribute(op, 'value', i);
      const text = this.renderer.createText(i);
      op.insertAdjacentHTML('afterbegin', i);
      const fragment = document.createRange().createContextualFragment(i);
      console.log(fragment.children[0]);
      select.appendChild(op);
    }
    
    for(let i of this.ejes){
      const op = this.renderer.createElement('option');
      const artop = this.renderer.setAttribute(op, 'class', 'mat-option');
      const text = this.renderer.createText(i);
      op.insertAdjacentHTML('afterbegin', i);
      op.setAttribute('value', i);
      const fragment = document.createRange().createContextualFragment(i);
      console.log(fragment.children[0]);
      select2.appendChild(op);
    }
    
    const attrSel = this.renderer.setAttribute(select, 'class', 'mat-select-ejes');
    const attrSel2 = this.renderer.setAttribute(select2, 'class', 'mat-select-ejes');
    const art = this.renderer.setAttribute(containerEje,'class', 'container-ejes');
    const artv = this.renderer.setAttribute(containerVariable,'class', 'container-label-variables');
    containerEje?.appendChild(select);
    containerEje?.appendChild(select2)
    containerTitle?.appendChild(titleV)
    containerVariable?.appendChild(containerTitle)
    containerVariable?.appendChild(variables)
    const html = '<select [disabled]="!eje" class="mat-select-ejes" placeholder="Selecciona una o más."multiple="" [(value)]="variables" name="variables"(selectionChange)="capturarVariables($event.value)"> <option>asdsad<option> <option>asdsad<option> <option>asdsad<option> </select>'
    
    container?.appendChild(containerEje)
    // container?.appendChild(containerVariable)

  }

  capturarVariables(e: any) {
    this.variables = e;
  }

  capturarEje(e: any) {
    this.eje = e
  }

  removeVariable(variable: any) {
    this.variables = this.variables.filter((res: any) => res !== variable);
  }
}
