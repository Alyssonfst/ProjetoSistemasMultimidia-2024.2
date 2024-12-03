import { Routes } from '@angular/router';
import { AtividadesComponent } from './atividades/atividades.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  { path: 'atividades', component: AtividadesComponent },
];