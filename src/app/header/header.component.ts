import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { appConfig } from '@app/app.config';
import { AppState } from '@models/app-state.model';
import { BrowserState } from '@app/models/browser-state.model';
import { getCurrentBreakpoint } from '@utils/get-current-breakpoint';
import { topNavConfig } from './top-nav.config';
import { isMobile } from '@utils/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  appName = appConfig.name;
  appImagesDir = appConfig.dirs.images;
  appGifsDir = appConfig.dirs.gifs;
  browserState$: Observable<object>;
  browserStateSub: Subscription;
  currentBreakpoint: string;
  currentNavigationId: number;
  currentUrl: string;
  currentRouteParams: object;
  currentQueryParams: object;
  routerState$: Observable<object>;
  routerStateSub: Subscription;
  navConfig = topNavConfig;
  navbarCollapsed = true;
  navActiveId: string;

  constructor(private store: Store<AppState>) {
    this.currentBreakpoint = getCurrentBreakpoint();
    this.browserState$ = store.select('browser');
    this.routerState$ = store.select('router');
  }

  browserStateObserver = {
    next: (x: BrowserState) => {
      if (x.currentBreakpoint !== this.currentBreakpoint) {
        this.currentBreakpoint = x.currentBreakpoint;
      }
    },
    error: (err: Error) => {
      console.error('[Header.browserStateObserver] Got an error:', err);
    },
  };

  routerStateObserver = {
    next: (x: any) => {
      console.log('[Header.routerStateObserver] Got a next value:', x);
      if (x) {
        this.currentUrl = x.state.url;
        this.currentNavigationId = x.navigationId;
        this.currentRouteParams = x.state.root.params;
        this.currentQueryParams = x.state.root.queryParams;
        this.navActiveId = x.state.root.firstChild.routeConfig.path;
      }
    },
    error: (err: Error) => {
      console.error('[Header.routerStateObserver] Got an error:', err);
    },
  };

  ngOnInit(): void {
    this.browserState$.subscribe(this.browserStateObserver);
    this.routerState$.subscribe(this.routerStateObserver);
  }

  onNavTogglerClick($event): void {
    this.navbarCollapsed = !this.navbarCollapsed;
    $event.currentTarget.setAttribute('aria-expanded', !this.navbarCollapsed);
  }

  onNavLinkClick($event): void {
    if (isMobile(this.currentBreakpoint)) {
      // Collapse navbar after mobile-tap
      this.navbarCollapsed = false;
    }
  }
}
