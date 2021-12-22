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


const appRoutes: Routes = [
  { path: 'homepage', component: HomepageComponent},
  {path: 'job-upload',component: JobUploadComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    JobUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    FileUploadModule,
    ProgressSpinnerModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
