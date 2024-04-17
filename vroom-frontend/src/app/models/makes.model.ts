export interface MakesApiResponse {
    Count: number;
    Message: string;
    SearchCriteria: string;
    Results: Make[];
  }

export interface ModelsApiResponse {
    Count: number;
    Message: string;
    SearchCriteria: string;
    Results: Model[];
  }
  
export interface Make {
    MakeId: number;
    MakeName: string;
    VehicleTypeId: number;
    VehicleTypeName: string;
  }

export interface Model {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}