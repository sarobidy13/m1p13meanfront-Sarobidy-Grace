import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NbAuthModule } from '@nebular/auth';
import {
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbSelectModule,
  NbAlertModule,
} from '@nebular/theme';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NbAuthModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSelectModule,
    NbAlertModule,
  ],
})
export class AuthModule {}
