import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  progress = document.getElementById("progress")
  prev = document.getElementById("prev")
  next = document.getElementById("next")
  circles:any
  flag1 = false
  currentActive:number = 1

  constructor(){
  }

  ngOnInit(): void {
  }

  nextButton(){
    this.circles = document.querySelectorAll('.circle');
    this.currentActive +=1
    console.log(this.circles.length)
    if(this.currentActive > this.circles.length){
      this.flag1 = true
      console.log(this.circles.length)
      this.currentActive = this.circles.length
      
    }
    console.log(this.currentActive)
    this.update()
  }

  prevButton(){
    this.currentActive-=1
    if(this.currentActive<1){
      this.currentActive = 1
      this.flag1 = false
      console.log(this.currentActive)
    }
    this.update()
  }

  update(){
    this.circles.forEach((circle:any,idx:any)=>{
      if(idx< this.currentActive){
        circle.classList.add("active");
      }
      else{
        circle.classList.remove("active");
      }
    })
    const actives = document.querySelectorAll("active")
    console.log(actives.length,this.circles.length)
  }



}


