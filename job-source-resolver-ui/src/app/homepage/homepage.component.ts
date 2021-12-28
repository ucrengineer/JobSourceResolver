import { Component, OnInit } from '@angular/core';
import { jobBoards } from '../models/jobBoards.model';
import { JobBoardsService } from '../services/job-boards/job-boards';
import * as Excel from 'exceljs/dist/exceljs.js'
import { JobOpportunitiesService } from '../services/job-opportunities/job-opportunities.service';
import { sourceDict } from '../models/sourceDict.model';
import { JobOpportunity } from '../models/JobOpportunity';
import { ActivatedRoute } from '@angular/router';
import { getJobs,getNumber } from '../methods/jobSourceResolution.compent';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  boards : jobBoards[];
  siteDomain : sourceDict = new sourceDict();
  jobOpportunities : JobOpportunity[] = [];
  constructor(private jobBoardService: JobBoardsService, private jobOppService: JobOpportunitiesService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    // get job boards from json
    this.jobBoardService.get().subscribe((x) => {this.boards = x},
      err => console.log('HTTP ERROR', err),
      () => console.log('HTTP request completed')
      )
      // get job opportunities
    this.jobOppService.get().subscribe((opportunities) =>
    {
        this.jobOpportunities = opportunities;
      },
      err => console.log('HTTP ERROR', err),
      () => console.log('HTTP request completed')
      )

  }

  // determine the color of the rating string
  determineColor(rating){


    switch(rating){

      case 'Great':
        return 'text-success'

      case 'Good':
        return 'text-warning'

      default :
        return 'text-danger'
    }
  }

  //return number of opportunties
  numberOfOpp(company_url){

   return getNumber(this.jobOpportunities,company_url)
  }

  // return job opportunties that relate to job source
 getJobOpps(company_url){

   return getJobs(this.jobOpportunities,company_url)

 }

}
