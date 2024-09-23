import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CarsComponent } from './pages/cars/cars.component';
import { CreateCarComponent } from './pages/create-car/create-car.component';
import { EditCarComponent } from './pages/edit-car/edit-car.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'cars',
    component: CarsComponent
  },
  {
    path: 'create',
    component: CreateCarComponent
  },
  {
    path: 'edit/:id',
    component: EditCarComponent
  }
];
