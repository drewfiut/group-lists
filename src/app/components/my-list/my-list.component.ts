import { Component, Input, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css'],
})
export class MyListComponent implements OnInit {
  @Input() current;
  @Input() user;
  @Input() group;
  member$;
  showModal: boolean;
  currentItem;

  constructor(public groupService: GroupService) {}

  ngOnInit(): void {
    this.member$ = this.groupService.getMember(this.group.id, this.user.uid);
    this.showModal = false;
  }

  addItem(item) {
    this.groupService.addItem(item, this.user, this.group);
  }

  openModal(item) {
    this.currentItem = item;
    this.showModal = true;
    console.log(this.showModal);
  }

  hideModal() {
    this.showModal = false;
  }

  deleteItem() {
    this.groupService.deleteItem(this.currentItem, this.user, this.group);
    this.hideModal();
  }
}
