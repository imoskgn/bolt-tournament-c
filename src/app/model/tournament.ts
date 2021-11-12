export class Tournament {
    constructor(
        public name?: string,
        public userId?: string,
        public description?: string,
        public status?: string,
        public playersList?: Array<string>,
        public currentPlayersList?: Array<string>,
        public startDate?: Date,
        public endDate?: Date,
        public level?: Number
    ) {}
  }
  