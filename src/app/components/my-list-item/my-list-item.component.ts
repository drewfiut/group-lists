import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import '@angular/common'

@Component({
  selector: 'app-my-list-item',
  templateUrl: './my-list-item.component.html',
  styleUrls: ['./my-list-item.component.css']
})
export class MyListItemComponent implements OnInit {

  @Input() item;
  @Input() user;
  @Output() deleteItem:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(item){
    this.deleteItem.emit(item);
  }
  

}