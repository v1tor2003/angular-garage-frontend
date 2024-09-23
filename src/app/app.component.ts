import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CarsComponent } from './pages/cars/cars.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    LandingPageComponent, 
    MatListModule, 
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular Garage';
  showCreateButton: boolean = false
  
  constructor(public router: Router){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      (event: NavigationEnd) => this.showCreateButton = event.url === '/cars'
    )
  }

  canCreate(): boolean{
    return this.router.url === '/cars'
  }

  handleCreateEvent(): void {
    const carsComponentElement = document.querySelector('app-cars')
    if(carsComponentElement){
      const customEvent = new CustomEvent('create')
      carsComponentElement.dispatchEvent(customEvent)
    }
  }
}
