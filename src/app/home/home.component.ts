import { Component, OnInit, OnDestroy } from '@angular/core';
import { AzureAdService } from 'src/services/azure-ad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isUserLoggedIn: boolean = false;
  private subscription!: Subscription;

  constructor(private azureAdService: AzureAdService) { }

  ngOnInit(): void {
    this.subscription = this.azureAdService.isUserLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.isUserLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
