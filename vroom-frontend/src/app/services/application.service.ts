import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import type { CustomerData } from '../types/requests';
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

  constructor(private http: HttpClient) {}

  fetchApplications(
    page: number,
    size: number,
    sortField: string,
    customerId?: string,
    managerFullName?: string,
    sortDir?: string,
    status?: string,
    startDate?: string,
    endDate?: string
  ): Observable<ApiResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField);

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

    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }

  getApplicationDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  submitData(data: CustomerData): Observable<any> {
    return this.http.post(`${this.apiUrl}/application`, data, { responseType: 'text' });
}
}
