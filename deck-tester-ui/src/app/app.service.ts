import { Injectable } from '@angular/core';
import { Deck } from './models/Deck';
import { Matchup } from './models/Matchup';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { fadeInItems } from '@angular/material';
import { environment } from './../environments/environment';

const API_URL = environment.apiUrl;
const defaultHeaders = {
  'Content-Type': 'application/json'
};


@Injectable({
  providedIn: 'root',
})
export class AppService {
  private decks: Deck[] = [];
  public deckStore: BehaviorSubject<Deck[]> = new BehaviorSubject(this.decks);

  constructor() {
    this.deckStore.next(this.decks);
    this.init();
  }

  async init() {
    const response = await fetch(API_URL, { method: 'GET', headers: defaultHeaders });
    const decks = await response.json();
    this.decks = decks.map((e, i) => {
      return new Deck(e.id, e.name, e.icons, e.description, e.notes, e.decklist, e.matchups);
    });

    this.deckStore.next(this.decks);
  }

  getDeckById(id: number): Deck {
    return this.deckStore.getValue().find(x => x.id === id);
  }

  private getDeckIndex(id: number) {
    let index = 0;
    for (let i = 0; i < this.decks.length; i++) {
      if (this.decks[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  async addDeck(deck: Deck) {
    const response = await fetch(API_URL, { method: 'POST', body: JSON.stringify(deck), headers: defaultHeaders });
    const result = await response.json();

    const newDeck = new Deck(result.id, result.name, result.icons, result.description, result.notes, result.decklist, result.matchups);

    this.decks.push(newDeck);
    this.deckStore.next(this.decks);
  }

  async updateDeck(deck: Deck) {
    const index = this.getDeckIndex(deck.id);
    const response = await fetch(API_URL + '/' + deck.id, { method: 'PATCH', body: JSON.stringify(deck), headers: defaultHeaders });
    const result = await response.json();

    const newDeck = new Deck(result.id, result.name, result.icons, result.description, result.notes, result.decklist, result.matchups);

    this.decks[index] = newDeck;
    this.deckStore.next(this.decks);
  }

  async deleteDeck(id: number) {
    const index = this.getDeckIndex(id);
    const response = await fetch(API_URL + '/' + id, { method: 'DELETE', headers: defaultHeaders });

    this.decks.splice(index, 1);
    this.deckStore.next(this.decks);
  }
}
