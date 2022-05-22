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
import { AssetsService } from './services/assets.service';
import { AppComponent } from './app.component';
import { SmartFigureComponent } from './shared/smart-figure/smart-figure.component';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AssetsEffects } from './store/effects/assets.effects';
import { ViewBaseComponent } from './shared/view-base/view-base.component';
import { ZoomComponent } from './zoom/zoom.component';
import { SmartGifComponent } from './shared/smart-gif/smart-gif.component';

@NgModule({
  declarations: [
    AppComponent,
    SmartFigureComponent,
    SmartGifComponent,
    ViewBaseComponent,
    ZoomComponent,
  ],
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
    EffectsModule.forRoot([AssetsEffects]),
    GoogleTagManagerModule.forRoot({ id: environment.gtmId }),
  ],
  providers: [AssetsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
