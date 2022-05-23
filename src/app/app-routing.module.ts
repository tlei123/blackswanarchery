import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewBaseComponent } from './shared/view-base/view-base.component';
import { ViewInstanceComponent } from './views/view-instance/view-instance.component';

const routes: Routes = [
  {
    path: 'view-base',
    component: ViewBaseComponent,
  },
  {
    path: 'view-instance',
    component: ViewInstanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
