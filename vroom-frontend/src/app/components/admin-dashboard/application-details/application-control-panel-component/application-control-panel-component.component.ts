import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {ApplicationService} from "../../../../services/application.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-application-control-panel-component',
  standalone: true,
  imports: [
    MatButton,
    NgIf
  ],
  templateUrl: './application-control-panel-component.component.html',
  styleUrl: './application-control-panel-component.component.scss'
})
export class ApplicationControlPanelComponentComponent {
  @Input() applicationId: string = '';
  fileToUpload: File | null = null;
  fileName: string | null = "No file selected";

  constructor(private applicationService: ApplicationService,
              private router: Router) {
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
      this.fileName = file.name;
    }
  }

  onUpload(): void {
    if (!this.fileToUpload) return;

    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.applicationService.uploadAgreement(this.applicationId, formData).subscribe({
        next: (response) => {
          console.log(response);
          alert("Agreement uploaded successfully");
        },
        error:
          (error) => {
            console.error('Error:', error);
          }
      }
    );

  }
}
