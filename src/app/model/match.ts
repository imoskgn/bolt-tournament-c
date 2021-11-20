export class Match {
  constructor(
    public firstPlayer: {
      name: string,
      phone: string
    },
    public secondPlayer: {
      name: string,
      phone: string
    },
    public winner: {
      name: String,
      phoneNumber: String
    },
    public _id?: string,
    public level?: Number,
    public order?: Number,
    public acive?: boolean,
    public tournamentId?: String,
  ) {}
}
