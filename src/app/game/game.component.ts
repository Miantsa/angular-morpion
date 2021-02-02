import { Component, OnInit } from '@angular/core';
import { table } from 'console';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  // table: HTMLTableElement = document.querySelector('#tableID');
 matrice; 
  // get all rows in the first table body
   //rows = table
  constructor() { }

  ngOnInit(): void {
    this.matrice=document.querySelectorAll('.case');
    for (let val of this.matrice) {
      val.addEventListener('click',(e)=>{
        console.log('click'+val.cellIndex);
        val.innerHTML="";
val.innerHTML += "O";
      });
      //console.log(val); // prints values: 10, 20, 30, 40
    }
  }
  addToken(value){
    const nb=this.matrice.length;
    console.log("hey"+nb);
   
  }
}
