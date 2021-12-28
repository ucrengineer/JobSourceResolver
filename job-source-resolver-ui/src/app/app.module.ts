import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import {FileUploadModule} from 'primeng/fileupload';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { RouterModule, Routes } from '@angular/router';
import { JobUploadComponent } from './upload/job-upload/job-upload.component';

import { NgxCsvParserModule } from 'ngx-csv-parser';
import { JobTableComponent } from './table/job-table/job-table.component';
import {TableModule} from 'primeng/table';
const appRoutes: Routes = [
  { path: 'homepage', component: HomepageComponent},
  {path: 'job-upload',component: JobUploadComponent},
  {path: 'job-table/:id', component: JobTableComponent},
  {path: '**', component: HomepageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    JobUploadComponent,
    JobTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    FileUploadModule,
    ProgressSpinnerModule,
    NgxCsvParserModule,
    TableModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
