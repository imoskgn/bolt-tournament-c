// This object is for create Tournament obly

export class TournamentCreate {
    constructor(
        public name?: string,
        public description?: string,
        public startDate?: Date,
        public endDate?: Date,
        public players?: Array<any>,
    ) {}
  }
  