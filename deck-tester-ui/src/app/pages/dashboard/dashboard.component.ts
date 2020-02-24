import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Deck } from 'src/app/models/Deck';
import { AddDeckComponent } from './add-deck.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  decks: Deck[];
  filterName: string;
  addDeck = new Deck();

  constructor(private appService: AppService, public dialog: MatDialog) {}

  ngOnInit() {
    this.appService.deckStore.subscribe((decks) => {
      this.decks = decks;
    });
  }

  addDeckOpen() {
    const dialogRef = this.dialog.open(AddDeckComponent, {
      width: '400px',
      data: this.addDeck
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const addingDeck = {...result};
        this.appService.addDeck(addingDeck);

        this.addDeck = new Deck();
      }
    });
  }
}
