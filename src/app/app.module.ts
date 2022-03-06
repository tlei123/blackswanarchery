import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { splashVideoReducer } from './store/reducers/splash-video.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ splashVideo: splashVideoReducer }),
    StoreDevtoolsModule.instrument({
      name: 'blackswanarchery',
      logOnly: environment.production,
    }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
