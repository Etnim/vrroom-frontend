export interface MakesApiResponse {
    Count: number;
    Message: string;
    SearchCriteria: string;
    Results: Make[];
  }
  
  export interface Make {
    MakeId: number;
    MakeName: string;
    VehicleTypeId: number;
    VehicleTypeName: string;
  }