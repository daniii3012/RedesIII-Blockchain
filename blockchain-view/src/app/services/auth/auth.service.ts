import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  user: any;

  userDoc: any;

  constructor(
    public afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private db: AngularFirestore
  ) {

    this.afAuth.authState.subscribe(
      data => this.authState = data
    );

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', '');
      }
    })

  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.loginRedirectTo();
      }).catch(err => console.log(err.message));
  }

  logout() {
    this.afAuth.signOut().then(
      res => this.router.navigate(['/home'])
    ).catch(err => console.log(err.message));
    localStorage.removeItem('user');
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserID(): string {
    return this.authenticated ? this.authState.uid : null
  }

  getUserRole(userId: string) {
    return this.afStore.doc<UserRole>(`users/${userId}`).valueChanges();
  }

  updateUserVote(user: any) {
    this.userDoc = this.db.doc(`users/${user.id}`);
    this.userDoc.update(user);
  }

  loginRedirectTo(): void {
    this.router.navigate(['/vote']);
  }

}

export interface UserRole {
  id?: string;
  email?: string;
  role?: string;
  vote?: boolean;
}
