import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';

import { environment } from '@environments/environment';
import { AppRoutingModule } from '@app/app-routing.module';
import { AssetsService } from '@app/services/assets.service';
import { AppComponent } from '@app/app.component';
import { SmartFigureComponent } from '@shared/smart-figure/smart-figure.component';
import { reducers } from '@store/reducers';
import { AssetsEffects } from '@store/effects/assets.effects';
import { ViewBaseComponent } from '@shared/view-base/view-base.component';
import { ZoomComponent } from '@app/zoom/zoom.component';
import { SmartGifComponent } from '@shared/smart-gif/smart-gif.component';
import { ViewInstanceComponent } from '@views/view-instance/view-instance.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SmartFigureComponent,
    SmartGifComponent,
    ViewBaseComponent,
    ZoomComponent,
    ViewInstanceComponent,
    HomeComponent,
    HeaderComponent,
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
