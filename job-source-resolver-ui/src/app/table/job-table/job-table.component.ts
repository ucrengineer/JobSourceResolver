import { Component, Input, OnInit } from '@angular/core';
import { JobOpportunity } from 'src/app/models/JobOpportunity';
import { JobOpportunitiesService } from 'src/app/services/job-opportunities/job-opportunities.service';
import { TableModule } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { sourceDict } from 'src/app/models/sourceDict.model';
import { getJobs } from 'src/app/methods/jobSourceResolution.compent';
@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls:['./job-table.component.scss']

})
export class JobTableComponent implements OnInit {

  constructor(private jobOppService : JobOpportunitiesService, private route:ActivatedRoute, private router: Router) { }
  loading: boolean = true;
  board:string = ''
  jobOpportunities : JobOpportunity[] = [];
  siteDomain : sourceDict = new sourceDict();

  ngOnInit(): void {

    if(history.state['jobOpps']== undefined)
    {
        const domain = this.route.snapshot.params['id'].split(' ').join('_').split('?').join('')
        this.jobOppService.get().subscribe((opportunities) =>
        {
          this.jobOpportunities = []
          this.jobOpportunities = getJobs(opportunities,domain)
        })
     }
     this.jobOpportunities =history.state['jobOpps']


     this.loading = false;


    }
  }
