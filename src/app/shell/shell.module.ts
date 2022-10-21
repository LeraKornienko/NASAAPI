import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ChartComponent } from './chart/chart.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    ChartComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class ShellModule { }
