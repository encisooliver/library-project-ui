import { Component, OnInit } from '@angular/core';
import { BookComponent } from '../book/book.component';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(
   // private bookComponent: BookComponent
  ) { }

  // public onClickBook(): void {
  //   setTimeout(()=>{
  //     this.bookComponent.listBook();
  //   }, 100);
    
  // }

  ngOnInit() {
  }

}
