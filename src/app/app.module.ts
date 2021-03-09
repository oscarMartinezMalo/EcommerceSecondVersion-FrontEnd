import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/components/shopping.module';

// import { AdminModule } from './admin/admin.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AuthModule,
    ShoppingModule,
    AppRoutingModule,
    // AdminModule, // This Module is lazy loaded
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
