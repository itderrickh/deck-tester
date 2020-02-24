import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeckComponent } from './deck/deck.component';
import { MaterialModule } from '../material.module';
import { ContainsNamePipe } from '../pipes/ContainsNamePipe';
import { SpritePickerComponent } from '../components/sprite-picker/sprite-picker.component';
import { AddDeckComponent } from './dashboard/add-deck.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { KeyContainsPipe } from '../pipes/KeyContainsPipe';

const components = [DashboardComponent, DeckComponent, ContainsNamePipe, KeyContainsPipe, SpritePickerComponent, AddDeckComponent, ConfirmDialogComponent];

@NgModule({
  imports: [MaterialModule, CommonModule, RouterModule, FormsModule],
  declarations: components,
  exports: components,
  entryComponents: [AddDeckComponent, ConfirmDialogComponent]
})
export class PagesModule { }
