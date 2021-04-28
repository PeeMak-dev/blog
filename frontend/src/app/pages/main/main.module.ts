import { HeaderComponent } from './../../shared/components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MainComponent, HeaderComponent],
  imports: [CommonModule, MainRoutingModule, MatButtonModule, MatToolbarModule],
})
export class MainModule {}
