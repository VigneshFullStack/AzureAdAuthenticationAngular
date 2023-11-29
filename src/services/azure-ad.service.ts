import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Profile } from 'src/models/Profile';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINT_PIC = 'https://graph.microsoft.com/v1.0/me/photo/$value';
const REPORTS_API_BASE_URI = 'https://localhost:7216/api/';

@Injectable({
  providedIn: 'root'
})
export class AzureAdService {
  isUserLoggedIn: Subject<boolean> = new Subject<boolean>();
  constructor(private httpClient: HttpClient) { }

  getUserProfile() {
    return this.httpClient.get<Profile>(GRAPH_ENDPOINT);
  }

  getProfilePic() {
    return this.httpClient.get(GRAPH_ENDPOINT_PIC, { responseType: 'blob' });
  }

  getReport() {
    return this.httpClient.get(REPORTS_API_BASE_URI + 'Reports/GetReport', { responseType: 'blob' })
  }

  getReportStatus(){
    return this.httpClient.get<any>(REPORTS_API_BASE_URI + 'Reports/GetReportStatus');
  }
}
