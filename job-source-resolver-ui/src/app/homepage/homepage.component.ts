import { Component, OnInit } from '@angular/core';
import { jobBoards } from '../models/jobBoards.model';
import { JobOpportunitiesService } from '../services/job-opportunities.service';
import * as Excel from 'exceljs/dist/exceljs.js'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  boards : jobBoards[];

  constructor(private jobService: JobOpportunitiesService) { }

  ngOnInit(): void {
    this.jobService.getJobBoards().subscribe(x => this.boards = x)
  }



}
