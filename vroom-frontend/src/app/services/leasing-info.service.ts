import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeasingInfoService {
  private apiUrl = environment.apiHost + '/euribor';
  
  constructor(private http: HttpClient) {}

  getEuriborRate(term: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${term}`);
  }
}
