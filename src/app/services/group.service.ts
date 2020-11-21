import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(public afs: AngularFirestore) {}

  newId(): string {
    // Alphanumeric characters
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return autoId;
  }

  getGroups(uid) {
    return this.afs
      .collection('groups', (ref) =>
        ref.where('members', 'array-contains', uid)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Object;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getGroup(id) {
    return this.afs.doc('groups/' + id).valueChanges();
  }

  getMember(groupID, memberID) {
    return this.afs
      .doc('groups/' + groupID + '/members/' + memberID)
      .valueChanges();
  }

  toggleCompleted(item, user, group) {
    const itemID = `list.${item.key}`;
    const val = item.value;
    var update = {};
    update[itemID] = val;
    this.afs.doc('groups/' + group.id + '/members/' + user.id).update(update);
  }

  addItem(item, user, group) {
    const itemID = `list.${this.newId()}`;
    var update = {};
    update[itemID] = item;
    this.afs.doc('groups/' + group.id + '/members/' + user.uid).update(update);
  }

  deleteItem(item, user, group) {
    const itemID = `list.${item.key}`;
    var update = {};
    update[itemID] = firebase.firestore.FieldValue.delete();
    this.afs.doc('groups/' + group.id + '/members/' + user.uid).update(update);
  }

  joinGroup(code, user) {
    var groupRef = this.afs.doc(`groups/${code}`);

    groupRef
      .collection(`/members`)
      .doc(user.uid)
      .set({ id: user.uid, name: user.displayName });

    return groupRef.update({
      members: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
  }

  createGroup(name, desc, user) {
    const id = this.newId();
    var docData = {
      id: id,
      createdby: user.uid,
      name: name,
      desc: desc,
    };
    return this.afs
      .doc(`groups/${id}`)
      .set(docData)
      .then((val) => {
        this.joinGroup(id, user);
      });
  }

  leaveGroup(user, group) {
    this.afs.doc(`groups/${group.id}/members/${user.uid}`).delete();
    this.afs
      .doc(`groups/${group.id}`)
      .update({ members: firebase.firestore.FieldValue.arrayRemove(user.uid) });
  }

  deleteGroup(group) {
    this.afs.doc(`/groups/${group.id}`).delete();
  }
}
