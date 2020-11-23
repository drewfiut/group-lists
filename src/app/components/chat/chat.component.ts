import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @Input() user;
  @Input() group;
  messages$;
  message;

  constructor(
    public db: AngularFireDatabase,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.messages$ = this.db
      .list(`groups/${this.group}/messages`, (ref) =>
        ref.orderByChild('time').limitToLast(30)
      )
      .valueChanges();
  }

  onSubmit() {
    var newMess = {
      message: this.message,
      from: this.user.displayName,
      time: firebase.database.ServerValue.TIMESTAMP,
    };

    this.db
      .list(`groups/${this.group}/messages`)
      .push(newMess)
      .then((doc) => {
        this.message = '';
        document.getElementById('newMessage').scrollIntoView();
      });
  }
}
