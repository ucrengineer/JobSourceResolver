import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jobBoards } from '../../models/jobBoards.model';
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class JobBoardsService {
  constructor(private http: HttpClient) { }

  // return job boards from json file
  get(): Observable<jobBoards[]>{
    return this.http.get<jobBoards[]>('assets/jobBoards.json')
  }


}
