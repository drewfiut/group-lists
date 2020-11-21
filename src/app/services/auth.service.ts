import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.router.navigate(['home']);
    return this.updateUserData(credential.user);
  }

  async emailSignin(email, password) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async emailSignup(name, email, password) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    return this.updateUserData(credential.user, name);
  }

  async signout() {
    await this.afAuth.signOut();
    return this.router.navigate(['home']);
  }

  private updateUserData(user, name?) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const displayName = name ? name : user.displayName;

    const data = {
      uid: user.uid,
      displayName: displayName,
      photoURL: user.photoURL,
      email: user.email,
    };

    return userRef.set(data, { merge: true });
  }
}
