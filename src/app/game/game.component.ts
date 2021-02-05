import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { table } from 'console';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  matrix;
  matrix2D = [];
  X: number = 1;
  O: number = -1;
//  turn: number = this.X;
  obj = { '1': 'X', '-1': 'O' };
  //share data to app.component
  @Output() childToParent = new EventEmitter<String>();
  @Output() childToParent2 = new EventEmitter<String>();
  @Output() childToParent3 = new EventEmitter<String>();
  @Input() childMessage: string;
  @Input() turn: number=this.X;
  constructor() {


  }

  ngOnInit(): void {


    this.matrix = document.querySelectorAll('.case');

    this.matrix = Array.from(this.matrix);
    console.log(this.matrix)
    while (this.matrix.length) this.matrix2D.push(this.matrix.splice(0, 3));
    console.log(this.matrix2D);
    this.sendToParent3(this.matrix2D);
    this.sendToParent(this.turn);
    for (let i = 0; i < this.matrix2D.length; i++) {

      for (let j = 0; j < this.matrix2D[i].length; j++) {
        const val = this.matrix2D[i][j];
        val.addEventListener('click', () => {
        //  console.log(val.innerHTML.length)
          if (val.innerHTML.length == 0) {
            val.innerHTML = this.obj[this.turn + ''];
            this.turn = -this.turn;
            this.sendToParent(this.turn);
            const node = new Node(this.stringToNumberMatrix(this.matrix2D), this.turn);
            const result = node.evaluation();
            if (result == 0) {
            } else if (result == 100 * this.X) {
              console.log("X gagne");
              this.turn=this.X;
              this.sendToParent2(this.X);
            } else if (result == 100 * this.O) {
              console.log("O gagne");
              this.turn=this.X;
              this.sendToParent2(this.O);
            }

            this.changeCaseColor(val);
            console.log("IA:" +this.childMessage);
          }
        });
      }
    }
    
  }
  addToken(value) {
    const nb = this.matrix.length;
    console.log("hey" + nb);

  }
  changeCaseColor(value) {
    if (value.innerHTML == "X")
      value.style.color = "#20c997";
    else if (value.innerHTML == "O")
      value.style.color = "#0dcaf0";
  }

  vsPlayer() {

  }
  vsIa() {

  }
  sendToParent(turn) {
    this.childToParent.emit(turn);
  }
  sendToParent2(winner) {
    this.childToParent2.emit(winner);
  }
  sendToParent3(matrix) {
    this.childToParent3.emit(matrix);
  }
  stringToNumberMatrix(mat: any) {
    let result: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (let i = 0; i < mat.length; i++) {
      for (let j = 0; j < mat[i].length; j++) {
        if (mat[i][j].innerHTML == "X") result[i][j] = this.X;
        else if (mat[i][j].innerHTML == "O") result[i][j] = this.O;
        else if (mat[i][j].innerHTML == "" || mat[i][j].innerHTML == undefined) result[i][j] = 0;
      }
    }
    console.log(result)
    return result;
  }
  numberMatrixToGamePlateform(fromNode, toGui) {
    for (let i = 0; i < fromNode.length; i++) {
      for (let j = 0; j < fromNode[i].length; j++) {
        if (fromNode[i][j] == this.X) toGui[i][j].innerHTML = "X";
        else if (fromNode[i][j] == this.O) toGui[i][j].innerHTML = "O";
        else if (fromNode[i][j] == 0) toGui[i][j].innerHTML = "";
      }
    }
  }
}
class Node {
  matrix: number[][] = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  turn: number;
  constructor(mat: any, turn) {
    this.matrix = mat;
    this.turn = turn;
  }

  evaluation() {
    //vertical
    for (let i = 0; i < 3; i++)
      if (this.matrix[i][0] == this.matrix[i][1] && this.matrix[i][1] == this.matrix[i][2]) return 100 * this.matrix[i][0];
    //horizontal
    for (let i = 0; i < 3; i++)
      if (this.matrix[0][i] == this.matrix[1][i] && this.matrix[1][i] == this.matrix[2][i]) return 100 * this.matrix[0][i];
    //diagonal \
    if (this.matrix[0][0] == this.matrix[1][1] && this.matrix[1][1] == this.matrix[2][2]) return 100 * this.matrix[1][1];
    //diagonal /
    if (this.matrix[0][2] == this.matrix[1][1] && this.matrix[1][1] == this.matrix[2][0]) return 100 * this.matrix[1][1];
    return 0;
  }
  isFinished() {
    if (this.evaluation() != 0) return true;
    //getSucc().size()==0; 
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (this.matrix[i][j] == 0) return false; 

    return true;

  }
}