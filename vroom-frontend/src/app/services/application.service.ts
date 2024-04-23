import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

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

  private apiUrl = environment.apiHostLocal + '/applications'; // Adjust if you have a different base URL

  constructor(private http: HttpClient) {}

  fetchApplications(
    page: number,
    size: number,
    sortField: string = 'createdAt,DESC',
    managerId?: string,
    status?: string,
    startDate?: string,
    endDate?: string
  ): Observable<ApiResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField);

    if (managerId) {
      params = params.set('managerId', managerId);
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
}