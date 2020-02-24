import { Dictionary } from './Dictionary';
import { Matchup } from './Matchup';

export class Deck {
    constructor(
        public id: number = null,
        public name: string = '',
        public icons: string[] = [],
        public description: string = '',
        public notes: string = '',
        public decklist: string = '',
        public matchups: Dictionary<Matchup> = null) {}

    getTotalWins() {
        let wins = 0;
        for (const index in this.matchups) {
            if (this.matchups.hasOwnProperty(index)) {
                const matchup = this.matchups[index];
                wins += matchup.w;
            }
        }

        return wins;
    }

    getTotalTies() {
        let ties = 0;
        for (const index in this.matchups) {
            if (this.matchups.hasOwnProperty(index)) {
                const matchup = this.matchups[index];
                ties += matchup.t;
            }
        }

        return ties;
    }

    getTotalLosses() {
        let losses = 0;
        for (const index in this.matchups) {
            if (this.matchups.hasOwnProperty(index)) {
                const matchup = this.matchups[index];
                losses += matchup.l;
            }
        }

        return losses;
    }
}
