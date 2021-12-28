import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOpportunity } from '../../models/JobOpportunity';
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class JobOpportunitiesService {

  constructor(private http:HttpClient) { }

  get(): Observable<JobOpportunity[]>{
    return this.http.get<JobOpportunity[]>(environment.local_api + "get")

  }

  put(jobOpps: JobOpportunity[]): Observable<JobOpportunity[]>{
    return this.http.put<JobOpportunity[]>(environment.local_api + "put", jobOpps)
  }

}


