import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jobBoards } from '../models/jobBoards.model';
@Injectable({
  providedIn: 'root'
})
export class JobOpportunitiesService {
  private local_api = "http://localhost:3000/"
  constructor(private http: HttpClient) { }

  getJobBoards(): Observable<jobBoards[]>{
    return this.http.get<jobBoards[]>(this.local_api+"job_boards")
  }
}
