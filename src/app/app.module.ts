import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { FiguresService } from './services/figures.service';
import { AppComponent } from './app.component';
import { SmartFigureComponent } from './shared/smart-figure/smart-figure.component';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { FiguresEffects } from './store/effects/figures.effects';

@NgModule({
  declarations: [AppComponent, SmartFigureComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'blackswanarchery',
      logOnly: environment.production,
    }),
    NgbModule,
    HttpClientModule,
    EffectsModule.forRoot([FiguresEffects]),
    GoogleTagManagerModule.forRoot({ id: environment.gtmId }),
  ],
  providers: [FiguresService],
  bootstrap: [AppComponent],
})
export class AppModule {}
