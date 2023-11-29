import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AzureAdService } from 'src/services/azure-ad.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  loading: boolean = false;
  pdfUrl?: SafeResourceUrl;
  reportStatus?: string;

  constructor(private azureAdService: AzureAdService,
             private domSanitizer: DomSanitizer,
             private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
  }

  getReport(){
    this.loading = true;
    this.azureAdService.getReport().subscribe(
      response => {
        var urlCreator = window.URL || window.webkitURL
        this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(urlCreator.createObjectURL(response));
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        if(error.status == 401 || error.status == 403){
          this.snackBar.open("You are UnAuthorized!")
        }
      }
    )
  }

  getReportStatus(){
    this.azureAdService.getReportStatus().subscribe(
      response => {
        this.reportStatus = response.status
        console.log('reportStatus ', this.reportStatus);
      }
    )
  }

}
