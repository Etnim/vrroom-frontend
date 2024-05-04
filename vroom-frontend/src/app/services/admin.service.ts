import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

export interface Admin {
  uid: string;
  name: string;
  surname: string;
  role: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiHost;

  constructor(private http: HttpClient) { }

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl + '/admins');
  }

}
