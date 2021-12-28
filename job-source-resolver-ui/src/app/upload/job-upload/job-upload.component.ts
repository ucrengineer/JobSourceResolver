import { HttpClient } from '@angular/common/http';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import * as Excel from 'exceljs'
import { NgxCsvParser, NgxCSVParserError, NgxCsvParserModule } from 'ngx-csv-parser';
import { jobBoards } from 'src/app/models/jobBoards.model';
import { JobOpportunity } from 'src/app/models/JobOpportunity';
import { sourceDict } from 'src/app/models/sourceDict.model';
import { JobBoardsService } from 'src/app/services/job-boards/job-boards';
import { JobOpportunitiesService } from 'src/app/services/job-opportunities/job-opportunities.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-job-upload',
  templateUrl: './job-upload.component.html',
  styleUrls: ['./job-upload.component.css']
})
export class JobUploadComponent implements OnInit {
  csvRecords: any[] = [];
  sourceDict: any = {};
  jobOpps : JobOpportunity[] = [];
  source : string;
  boards : jobBoards[] = [];

  header = false;
  constructor(private ngxCsvParser: NgxCsvParser, private jobOppService: JobOpportunitiesService,
    private boardService : JobBoardsService,private toastr: ToastrService) { }

  ngOnInit(): void {

    this.boardService.get().subscribe((x) => {this.boards= x},

    err=> console.log('HTTP error', err),
    () => console.log('HTTP reques completed'))


  }


  readExcel(event){



    const files = event.files;
    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<JobOpportunity>) => {

        // get the columns of the csv file
        this.csvRecords = result;
        this.csvRecords.shift();

        this.csvRecords.forEach(x => {
          var i = 0;
          while (i < this.boards.length){
              if(String(x['3']).includes(this.boards[i].root_domain)){
                this.source = this.boards[i].name;
                break;
              }
              else{
                this.source = 'Unknown';
                i++;
                continue;
              }
            }

              this.jobOpps.push(
                {
                id: +x['0'],
                job_title : x['1'],
                company_name : x['2'],
                job_url : x['3'],
                job_source: this.source
                }
              )

        })


        this.jobOppService.put(this.jobOpps).subscribe(()=>{},
        (err)=> {this.toastr.error(err)},
        ()=> {this.toastr.success('Upload Complete')})

      },

      (error: NgxCSVParserError) => {
        this.toastr.error( error.message);
      });











  }


  }
