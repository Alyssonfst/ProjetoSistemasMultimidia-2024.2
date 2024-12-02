import { Routes } from '@angular/router';
import { AtividadesComponent } from './atividades/atividades.component';
import { AppComponent } from './app.component';
export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'atividades', component: AtividadesComponent },
];