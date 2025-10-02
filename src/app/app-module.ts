import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { CoreModule } from './core/core-module';
import { HttpErrorInterceptor } from './core/interceptors/http-error-interceptor';
import { environment } from '../environments/environment';
import { VehicleEffects } from './features/vehicles/store/effects/vehicle.effects';
import { vehicleReducers } from './features/vehicles/store/reducers';


@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    
    // NgRx Store Configuration
    StoreModule.forRoot({
      router: routerReducer
    }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: false,
        strictActionTypeUniqueness: true
      }
    }),
    StoreModule.forFeature('vehicleModule', vehicleReducers),
    EffectsModule.forFeature([VehicleEffects]),
    EffectsModule.forRoot([]),
    
    StoreRouterConnectingModule.forRoot(),
    
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
      features: {
        pause: true,
        lock: true,
        persist: true
      }
    })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
