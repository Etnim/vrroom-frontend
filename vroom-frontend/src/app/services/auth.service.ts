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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fireBaseAuth = inject(Auth);
  user$ = user(this.fireBaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  constructor() {}

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

  loginWithGoogle(): Observable<void> {
    const promise = signInWithPopup(this.fireBaseAuth, new GoogleAuthProvider()).then(() => {});

    return from(promise);
  }
}
