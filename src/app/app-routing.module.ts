import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewBaseComponent } from './shared/view-base/view-base.component';

const routes: Routes = [
  {
    path: 'view-base',
    component: ViewBaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
