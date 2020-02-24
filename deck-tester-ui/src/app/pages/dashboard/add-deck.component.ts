import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Deck } from 'src/app/models/Deck';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.scss']
})
export class AddDeckComponent {
  constructor(public dialogRef: MatDialogRef<AddDeckComponent>, @Inject(MAT_DIALOG_DATA) public data: Deck) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
