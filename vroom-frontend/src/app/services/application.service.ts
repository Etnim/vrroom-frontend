import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import type { CustomerData } from '../types/requests';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = environment.apiHost;

  constructor(private http: HttpClient) {}

  submitData(data: CustomerData): Observable<any> {
    return this.http.post(`${this.apiUrl}/applications/application`, data);
  }
}
