// This object is for match winner only

export class MatchWinner {
    constructor(
        public firstPlayer?: {
            name: string,
            phoneNumber: string
        },
        public secondPlayer?: {
            name: string,
            phoneNumber: string
        },
        public winner?: {
            name: String,
            phoneNumber: String
        },
        public level?: number,
        public order?: number
    ) {}
  }