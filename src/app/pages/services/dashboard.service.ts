import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  url = "https://demo.opencti.io/graphql";

  constructor(private http: HttpClient) {}
  getTotalEntities(): Observable<any> {
    const body = {
      id: "DashboardStixDomainObjectsNumberQuery",
      query:
        "query DashboardStixDomainObjectsNumberQuery(\n  $types: [String]\n  $endDate: DateTime\n) {\n  stixDomainObjectsNumber(types: $types, endDate: $endDate) {\n    total\n    count\n  }\n}\n",
      variables: {
        types: null,
        endDate: "2022-07-29T13:53:22+01:00",
      },
    };

    return this.http.get<any>(
      `http://localhost:8081/api/reclamation/getTotalEntities`
    );
  }
  getTotalRelationShip(): Observable<any> {
    const body = {
      id: "DashboardStixCoreRelationshipsNumberQuery",
      query:
        "query DashboardStixCoreRelationshipsNumberQuery(\n  $type: String\n  $endDate: DateTime\n) {\n  stixCoreRelationshipsNumber(type: $type, endDate: $endDate) {\n    total\n    count\n  }\n}\n",
      variables: {
        type: "stix-core-relationship",
        endDate: "2022-07-29T13:53:22+01:00",
      },
    };

    return this.http.get<any>(
      `http://localhost:8081/api/reclamation/getTotalRelationShip`
    );
  }
  getTotalReports(): Observable<any> {
    const body = {
      id: "DashboardStixDomainObjectsNumberQuery",
      query:
        "query DashboardStixDomainObjectsNumberQuery(\n  $types: [String]\n  $endDate: DateTime\n) {\n  stixDomainObjectsNumber(types: $types, endDate: $endDate) {\n    total\n    count\n  }\n}\n",
      variables: {
        types: ["report"],
        endDate: "2022-07-29T13:53:22+01:00",
      },
    };

    return this.http.get<any>(
      `http://localhost:8081/api/reclamation/getTotalReports`
    );
  }
  getTotalObservable(): Observable<any> {
 
    
    return this.http.get<any>(
      `http://localhost:8081/api/reclamation/getTotalObservable`
    );
  }
  BarChartData(): Observable<any> {
 
    return this.http.get<any>(
      `http://localhost:8081/api/reclamation/BarChartData`
    );
  }

  radarChartData(): Observable<any> {
 
    return this.http.get<any>(
      `http://localhost:8081/api/reclamation/radarChartData`
    );
  }
  lineChartData(): Observable<any> {
 
    return this.http.get<any>(
      `http://localhost:8081/api/reclamation/lineChartData`
    );
  }
  threadReport(): Observable<any> {
  
    return this.http.get<any>(
      `http://localhost:8081/api/reclamation/threadReport`
    );
  }
}
