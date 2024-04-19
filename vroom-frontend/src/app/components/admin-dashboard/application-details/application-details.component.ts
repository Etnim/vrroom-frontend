import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

interface ApplicationDetails {
  applicationId: string;
  status: string;
  dateOfSubmission: string;
  assignedManager: string;
  applicantInfo: {
    fullName: string;
    personalId: string;
    birthDate: string;
    email: string;
    phone: string;
  }
  financialInfo: {
    monthlyIncome: number;
    maritalStatus: string;
    dependants: number;
    obligations: number;
    disposableIncome: number;
  }
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    fuelType: string;
    emissions: string;
  }
  leasingInfo: {
    amount: number;
    downpayment: number;
    period: number;
    residualValue: number;
    interestRate: number;
    creditRating: string;
    euribor: string;
    agreementFee: number;
  }
}
@Component({
  selector: 'app-application-details',
  standalone: true,
  imports: [MatButton, MatTableModule, MatTabsModule],
  templateUrl: './application-details.component.html',
  styleUrl: './application-details.component.scss'
})
export class ApplicationDetailsComponent {
  applicationId!: string;
  application: ApplicationDetails = {
    applicationId: '1',
    status: 'Submitted',
    dateOfSubmission: '2023-04-18',
    assignedManager: 'Unassigned',
    applicantInfo: {
      fullName: 'John Doe',
      personalId: '987654321',
      birthDate: '1990-01-01',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
    },
    financialInfo: {
      monthlyIncome: 5000,
      maritalStatus: 'Married',
      dependants: 2,
      obligations: 300,
      disposableIncome: 4700,
    },
    vehicleInfo: {
      make: 'Tesla',
      model: 'Model 3',
      year: 2022,
      fuelType: 'Electric',
      emissions: 'Zero',
    },
    leasingInfo: {
      amount: 35000,
      downpayment: 5000,
      period: 60,
      residualValue: 10000,
      creditRating: 'B',
      interestRate: 3.5,
      euribor: '3M',
      agreementFee: 300,
    }
  };
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private location: Location) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.applicationId = params.get('applicationId')!;
    });
  }


  viewAdminDashboard() {
    this.router.navigate(['/admin']);
  }

  goBack() {
    this.location.back();
  }
}
