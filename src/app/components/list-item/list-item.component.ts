import { Component, Input, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit {
  @Input() item;
  @Input() user;
  @Input() current;
  @Input() group;

  constructor(public groupService: GroupService) {}

  ngOnInit(): void {}

  setClasses() {
    let byMe = false;
    if (this.item.value.by == this.current.uid) {
      byMe = true;
    }

    let classes = {
      'is-complete': this.item.value.completed,
      'by-me': byMe,
    };
    return classes;
  }

  onToggle(item) {
    if (item.value.by == '' || item.value.by === this.current.uid) {
      if (item.value.completed) {
        item.value.completed = false;
        item.value.by = '';
      } else {
        const audio = new Audio('assets/Merry-Chirstmas.mp3');
        audio.play();
        item.value.completed = true;
        item.value.by = this.current.uid;
      }
      this.groupService.toggleCompleted(item, this.user, this.group);
    }
  }
}
