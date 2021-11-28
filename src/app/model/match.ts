export class Match {
  constructor(
    public firstPlayer: {
      name: string,
      phoneNumber: string
    },
    public secondPlayer: {
      name: string,
      phoneNumber: string
    },
    public winner: {
      name: String,
      phoneNumber: String
    },
    public _id?: string,
    public level?: number,
    public order?: number,
    public acive?: boolean,
    public tournamentId?: String,
  ) {}
}
