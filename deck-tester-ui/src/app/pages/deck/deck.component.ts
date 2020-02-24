import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Deck } from 'src/app/models/Deck';
import { Matchup } from 'src/app/models/Matchup';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {
  deckId: number;
  deck: Deck;
  newMatchup = '';
  deckSub: Subscription;
  matchupFilter: '';
  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
    this.route.paramMap.subscribe(params => {
      this.deckId = parseInt(params.get("id"), 10);
    });
  }

  ngOnInit() {
    this.deckSub = this.appService.deckStore.subscribe((decks) => {
      if (decks && decks.length > 0) {
        this.deck = this.appService.getDeckById(this.deckId);
      }
    });
  }

  iconChange(value: string, index: number) {
    this.deck.icons[index] = value;
    this.appService.updateDeck(this.deck);
    console.log(this.deck.icons[index]);
  }

  updateProperty(event: any, prop: string) {
    this.deck[prop] = event.target.value;

    this.appService.updateDeck(this.deck);
  }

  updateMatchup(event: any, key: string, prop: string, type: string) {
    if (type === 'number') {
      this.deck.matchups[key][prop] = parseInt(event.target.value, 10);
    } else {
      this.deck.matchups[key][prop] = event.target.value;
    }

    this.appService.updateDeck(this.deck);
  }

  removeMatchup(key) {
    delete this.deck.matchups[key];
    this.appService.updateDeck(this.deck);
  }

  addIcon() {
    this.deck.icons.push('001');
    this.appService.updateDeck(this.deck);
  }

  addMatchup() {
    if (!this.deck.matchups) {
      this.deck.matchups = {};
    }

    this.deck.matchups[this.newMatchup] = new Matchup(0, 0, 0, '');
    this.appService.updateDeck(this.deck);
    this.newMatchup = '';
  }

  deleteDeck() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: `Are you sure you want to delete ${this.deck.name}?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appService.deleteDeck(this.deckId).then(() => {
          this.router.navigate(['/']);
        });
      }
    });
  }
}
