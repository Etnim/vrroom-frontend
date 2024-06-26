import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  user,
  signOut,
  signInWithPopup,
  GoogleAuthProvider
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../types/user-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fireBaseAuth = inject(Auth);
  user$ = user(this.fireBaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  constructor(private router: Router) {}

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.fireBaseAuth, email, password).then(
      (response) => updateProfile(response.user, { displayName: username })
    );

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.fireBaseAuth, email, password).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.fireBaseAuth);

    return from(promise);
  }

  getUserIdToken(): Observable<string> {
    const currentUser = this.fireBaseAuth.currentUser;
    if (currentUser) {
      const promise = currentUser.getIdToken();
      return from(promise);
    } else {
      return from(Promise.resolve(''));
    }
  }

  isSuperAdmin(): Observable<boolean> {
    const currentUser = this.fireBaseAuth.currentUser;
    if (currentUser) {
      const promise = currentUser.getIdTokenResult().then((idTokenResult) => {
        const role = idTokenResult.claims['role'];
        return role === 'superAdmin';
      });
      return from(promise);
    } else {
      return from(Promise.resolve(false));
    }
  }
}
