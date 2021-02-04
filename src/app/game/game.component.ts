import { Component, EventEmitter, OnInit, Output } from '@angular/core';
//import { table } from 'console';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  // table: HTMLTableElement = document.querySelector('#tableID');
  matrice;
  matrice2D = [];
  // get all rows in the first table body
  //rows = table
  
  X:number =1;
  O:number =-1;
  turn: number = this.X;
  obj = { '1': 'X', '-1':'O' };
  @Output() childToParent = new EventEmitter<String>();
  constructor() { 
   

  }

  ngOnInit(): void {
    

    this.matrice = document.querySelectorAll('.case');
   
    this.matrice = Array.from(this.matrice);
    console.log(this.matrice)
    while (this.matrice.length) this.matrice2D.push(this.matrice.splice(0, 3));
    console.log(this.matrice2D);

    this.sendToParent(this.turn);
    for (let i = 0; i < this.matrice2D.length; i++) {

      for (let j = 0; j < this.matrice2D[i].length; j++) {
        const val = this.matrice2D[i][j];
        val.addEventListener('click', () => {
         // console.log('click' + val.cellIndex);
          console.log(val.innerHTML.length)
         // val.innerHTML+="X";
          if(val.innerHTML.length==0){
           
            val.innerHTML=this.obj[this.turn+''];
            this.turn=-this.turn;
            this.sendToParent(this.turn);
          }
         
          this.changeCaseColor(val);
        });
      }
    }

  }
  addToken(value) {
    const nb = this.matrice.length;
    console.log("hey" + nb);

  }
  changeCaseColor(value) {
    if (value.innerHTML == "X")
      value.style.color = "#20c997";
    else if (value.innerHTML == "O")
      value.style.color = "#0dcaf0";
  }
  verifyGameStatus(mat) {

  }
  vsPlayer() {

  }
  vsIa() {

  }
  sendToParent(turn){
    this.childToParent.emit(turn);
    }
}
