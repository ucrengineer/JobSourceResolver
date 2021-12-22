import { Component, OnInit } from '@angular/core';
import * as Excel from 'exceljs/dist/exceljs.min.js'

@Component({
  selector: 'app-job-upload',
  templateUrl: './job-upload.component.html',
  styleUrls: ['./job-upload.component.css']
})
export class JobUploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  RefreshData(){
 //   this.uploadService.Refresh_Data().subscribe();
  }
  readExcel(event,type){
    // declare local variables & functions
    var dataObject = {};
   // let sendDataJCN = (data) => this.uploadService.Update_dfs_jcn_data(data).subscribe()
    //let sendDataRaw = (data) => this.uploadService.Update_dfs_raw_data(data).subscribe()
    //let success = () => this.toastr.success('Data Successfully Uploaded')
   // let error = () => this.toastr.error('Error uploading file')
    const workbook = new Excel.Workbook();
    const arrayBuffer = new Response(event.files[0]).arrayBuffer();
    // read file
    arrayBuffer.then(function(data){
      workbook.xlsx.load(data).then(function (){

        const worksheet = workbook.getWorksheet(1);
        for(let i = 1; i <= worksheet.columnCount; i++)
        {
          var dataColumn =  worksheet.getColumn(i)
          let valueHolder :any[];

          dataColumn.eachCell(x =>
            {
              if(x.value == null){x.value = 'NULL'}
                else{x.value = x.value.toString().slice(0,4000)}
            })
          valueHolder = Object.values(dataColumn.values);

          valueHolder.shift()

        // dataObject[dataColumn.values['1']] = valueHolder;

        }




      }).finally(() => {
        switch(type){

          case 'dfs_jcn_data':
   //         sendDataJCN(dataObject);
   //         success();
           break;
          case 'dfs_raw_data':
   //         sendDataRaw(dataObject);
   //         success();
            break;
        }


      }).catch(() => {//error()})

      })
    })




  }

  }
