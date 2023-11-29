import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Profile } from 'src/models/Profile';
import { AzureAdService } from 'src/services/azure-ad.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  loading: boolean = false;
  profile?: Profile;
  profilePic?: SafeResourceUrl;

  constructor(private azureAdService: AzureAdService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getProfile();
    this.getProfilePic();
  }

  getProfile() {
    this.loading = true;
    this.azureAdService.getUserProfile().subscribe(profileInfo => {
      this.profile = profileInfo;
      console.log('Profile Info : ', this.profile);
      this.loading = false;
    })
  }

  getProfilePic() {
    this.loading = true;
    this.azureAdService.getProfilePic().subscribe(response => {
      var urlCreator = window.URL || window.webkitURL
      this.profilePic = this.domSanitizer.bypassSecurityTrustResourceUrl(urlCreator.createObjectURL(response));
      this.loading = false;
    })
  }

}
