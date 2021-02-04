import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'morpion';
  player1Title;
  player2Title;
  ngOnInit():void{
    this.player1Title=document.querySelector('.player1');
    this.player2Title=document.querySelector('.player2');
  }
  test(val){
    if(val.checked){

    }else{

    }
    console.log(val.checked);
  }
  childToParent(value){
    const borderStyle="greenyellow 3px solid";
    const borderDefaultStyle= "1px white solid";
   if(value==1){
     this.player1Title.style.borderBottom =borderStyle;
     this.player2Title.style.borderBottom =borderDefaultStyle;
   }
   else if(value==-1){
    this.player2Title.style.borderBottom =borderStyle;
    this.player1Title.style.borderBottom =borderDefaultStyle;
   }
   
  }
}
