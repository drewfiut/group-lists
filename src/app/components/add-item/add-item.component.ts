import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  @Output() addItem:EventEmitter<any> = new EventEmitter();

  name:String;
  link:String;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.link){
      this.link = "";
    }
    const item = {
      name: this.name,
      link: this.link,
      completed: false,
      by: ""
    }
    this.addItem.emit(item);
    
    this.name = "";
    this.link = "";

  }

}

