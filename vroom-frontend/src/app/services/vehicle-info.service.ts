import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MakesApiResponse } from '../models/makes.model';
import { ModelsApiResponse } from '../models/makes.model';
import { environment } from '../../environment/environment'; 

@Injectable({
  providedIn: 'root'
})
export class MakesDataService {
  apiUrl = environment.apiHost; 
  
  constructor(private http: HttpClient) {}

  getMakes(): Observable<MakesApiResponse> {
    return this.http.get<MakesApiResponse>(`${this.apiUrl}/cars/makes`);
  }

  getModels(makeName: string): Observable<ModelsApiResponse> {
    return this.http.get<ModelsApiResponse>(`${this.apiUrl}/cars/models/${makeName}`);
  }

}