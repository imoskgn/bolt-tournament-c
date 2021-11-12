export class Match {
  constructor(
    public _id?: string,
    public firstPlayerPhone?: string,
    public secondPlayerPhone?: String,
    public winnerPhone?: string,
    public acive?: boolean,
    public tournamentId?: String,
    public level?: Number
  ) {}
}
