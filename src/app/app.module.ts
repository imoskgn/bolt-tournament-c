import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './partials/header/header.component';
import { UpdateComponent } from './tournament/update/update.component';
import { FooterComponent } from './partials/footer/footer.component';
import { BasePageComponent } from './partials/base-page/base-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateComponent } from './tournament/create/create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './tournament/detail/detail.component';
import { DeleteComponent } from './tournament/delete/delete.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthInterceptor } from './auth.interceptor';
import { ForumCreateComponent } from './forum/forum-create/forum-create.component';
import { ForumMainComponent } from './forum/forum-main/forum-main.component';
import { ForumDetailComponent } from './forum/forum-detail/forum-detail.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UpdateComponent,
    FooterComponent,
    BasePageComponent,
    DetailComponent,
    CreateComponent,
    DeleteComponent,
    LoginComponent,
    RegisterComponent,
    ForumMainComponent,
    ForumCreateComponent,
    ForumDetailComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
