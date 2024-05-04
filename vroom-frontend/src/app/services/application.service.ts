import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {environment} from '../../environment/environment';
import type {CustomerData} from '../types/requests';
import { AuthService } from './auth.service';

export interface ApiResponse {
  content: Application[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  sort: string[];
}

export interface Application {
  applicationId: string;
  customerName: string;
  customerSurname: string;
  leasingAmount: number;
  applicationCreatedDate: string;
  applicationStatus: string;
  managerId: string | null;
  managerName: string | null;
  managerSurname: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = environment.apiHost + '/applications';

  constructor(private http: HttpClient, private auth: AuthService) {
  }
  
  fetchApplications(
    page: number,
    size: number,
    sortField: string,
    customerId?: string,
    managerId?: number,
    managerFullName?: string,
    sortDir?: string,
    status?: string,
    startDate?: string,
    endDate?: string,
  ): Observable<ApiResponse> {
    return this.auth.isSuperAdmin().pipe(
      switchMap((isAdmin) => {
        let params = new HttpParams()
          .set('page', page.toString())
          .set('size', size.toString())
          .set('sort', sortField)
          .set('isSuperAdmin', isAdmin.toString());

    if (page) {
      params = params.set('page', page);
    }

    if (size) {
      params = params.set('size', size);
    }

    if (sortField) {
      params = params.set('sortField', sortField);
    }

    if (sortDir) {
      params = params.set('sortDir', sortDir);
    }

    if (customerId) {
      params = params.set('customerId', customerId);
    }

    if (managerId) {
      params = params.set('managerId', managerId.toString());
    }

    if (managerFullName) {
      params = params.set('managerFullName', managerFullName);
    }

    if (status) {
      params = params.set('status', status);
    }

    if (startDate) {
      params = params.set('startDate', startDate);
    }

    if (endDate) {
      params = params.set('endDate', endDate);
    }

    return this.http.get<ApiResponse>(this.apiUrl, {params});

  })
);
  }

  getApplicationDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  submitData(data: CustomerData): Observable<any> {
    return this.http.post(`${this.apiUrl}/application`, data, {responseType: 'text'});
  }

  uploadAgreement(id: string | null, file: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/agreement`, file, {responseType: 'text'});
  }

  updateApplicationStatus(id: string, status: string): Observable<any> {
    const params = new HttpParams().set('status', status);
    return this.http.put(`${this.apiUrl}/${id}/updateStatus`, null, { params: params, responseType: 'text' });
  }

  updateAssignToYourself(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/assignAdmin`, null, { responseType: 'text' });
  }

  updateAssignToManager(id: string, managerId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/assignAdmin/${managerId}`, null, { responseType: 'text' });
  }
}
