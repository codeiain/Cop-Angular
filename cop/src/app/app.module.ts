import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiModule as CompanyApiModule } from './api/company/api.module';
import { CompanyModule } from './company/company.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CompanyModule,
    HttpClientModule,
    CompanyApiModule.forRoot({rootUrl: 'https://m4vjv.mocklab.io'}),

  ],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: InterceptorService,
     multi: true
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
