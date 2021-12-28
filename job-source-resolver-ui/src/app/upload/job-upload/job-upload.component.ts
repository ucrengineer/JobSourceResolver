import { HttpClient } from '@angular/common/http';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as Excel from 'exceljs'
import { NgxCsvParser, NgxCSVParserError, NgxCsvParserModule } from 'ngx-csv-parser';
import { JobOpportunity } from 'src/app/models/JobOpportunity';
import { JobOpportunitiesService } from 'src/app/services/job-opportunities/job-opportunities.service';


@Component({
  selector: 'app-job-upload',
  templateUrl: './job-upload.component.html',
  styleUrls: ['./job-upload.component.css']
})
export class JobUploadComponent implements OnInit {
  csvRecords: any[] = [];
  primaryId : any[] = [];
  jobTitle: any[] = [];
  companyName : any[] = [];
  companyURL : any[] = [];
  jobOpps : JobOpportunity[] = [];

  header = false;
  constructor(private ngxCsvParser: NgxCsvParser, private jobOppService: JobOpportunitiesService) { }

  ngOnInit(): void {

  }


  readExcel(event){


    const files = event.files;


    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<JobOpportunity>) => {

      // console.log('Result', result);
        this.csvRecords = result;
        this.csvRecords.shift();

        this.csvRecords.forEach(x => {


          this.jobOpps.push(
            {
            id: +x['0'],
            job_title : x['1'],
            company_name : x['2'],
            job_url : x['3']
            }
          )



        })

        //this.jobOppService(this.jobOpps).
        this.jobOppService.put(this.jobOpps).subscribe()
        console.log(this.jobOpps)

       // console.log(this.primaryId, this.jobTitle,this.companyName,this.companyURL)
      },

      (error: NgxCSVParserError) => {
        console.log('Error', error);
      });











  }

  }
