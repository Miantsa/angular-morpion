import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'morpion';
  player1Title: any;
  player2Title: any;
  player2Option: any;
  modals: any;
  winnerInfo: String = "Win !";
  obj = { '1': 'Player 1', '-1': 'Player 2' };
  matrix2D;
  gameIA = false;
  caseTurn=1;
  ngOnInit(): void {
    this.player1Title = document.querySelector('.player1');
    this.player2Title = document.querySelector('.player2');
    this.player2Option = document.querySelector('.player2Option');
    this.modals = document.querySelector('.modals');
  }
  gameOption(val) {
    if (val.checked) {
      this.gameIA=true
      this.player2Option.innerHTML = "AI : <span>O</span>";
      this.player2Option.querySelector('span').style.color = "#0dcaf0";
      this.player2Option.querySelector('span').style.fontFamily = "cursive";
      this.refreshTable();
    } else {
      this.gameIA=false;
      this.player2Option.innerHTML = "Player 2 : <span>O</span>";
      this.player2Option.querySelector('span').style.color = "#0dcaf0";
      this.player2Option.querySelector('span').style.fontFamily = "cursive";
      this.refreshTable();
    }
    //console.log(val.checked);
  }
  childToParent(value) {
    const borderStyle = "greenyellow 1px solid";
    const borderDefaultStyle = "1px white solid";
    if (value == 1) {
      this.player1Title.style.borderBottom = borderStyle;
      this.player2Title.style.borderBottom = borderDefaultStyle;
    }
    else if (value == -1) {
      this.player2Title.style.borderBottom = borderStyle;
      this.player1Title.style.borderBottom = borderDefaultStyle;
    }
//this.caseTurn=value;
  }
  childToParent2(value) {
    this.modals.style.display = "flex";
    this.winnerInfo = this.obj[value.toString()] + " " + this.winnerInfo;
  }
  childToParent3(value) {
    this.matrix2D = value;
  }
  replay() {
    this.modals.style.display = "none";
   this.refreshTable();
    this.winnerInfo = "Win!";
  }
  refreshTable(){
    for (let i = 0; i < this.matrix2D.length; i++) {
      for (let j = 0; j < this.matrix2D[i].length; j++) {
        this.matrix2D[i][j].innerHTML = "";
      }
    }
    this.caseTurn=1;
  }
}
