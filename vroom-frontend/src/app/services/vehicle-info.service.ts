import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment'; 

@Injectable({
  providedIn: 'root'
})
export class MakesDataService {
  apiUrl = environment.apiHost; 
  
  constructor(private http: HttpClient) {}

  getMakes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cars/makes`);
  }

  getModels(makeName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cars/${makeName}/models`);
  }

}