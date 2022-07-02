import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '@views/home/home.component';
import { HandlesComponent } from './views/handles/handles.component';
import { ViewBaseComponent } from '@shared/view-base/view-base.component';
import { ViewInstanceComponent } from '@views/view-instance/view-instance.component';
import { LimbsComponent } from './views/limbs/limbs.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'handles',
    component: HandlesComponent,
  },
  {
    path: 'limbs',
    component: LimbsComponent,
  },
  {
    path: 'view-base',
    component: ViewBaseComponent,
  },
  {
    path: 'view-instance',
    component: ViewInstanceComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
