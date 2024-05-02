export interface CustomerData {
  customer: {
    personalId: number;
    name: string;
    surname: string;
    email: string;
    birthDate: string;
    phone: string;
    address: string;
  };
  vehicleDetails: {
    brand: string;
    model: string;
    year: number;
    fuel: string;
    emissionStart: number;
    emissionEnd: number;
  };
  financialInfo: {
    monthlyIncome: number;
    monthlyObligations: number;
    maritalStatus: string;
    employmentStatus: string;
    employmentTerm: string;
    dependants: number;
  };
  price: number;
  downPayment: number;
  residualValue: number;
  yearPeriod: number;
  euribor: string;
}
