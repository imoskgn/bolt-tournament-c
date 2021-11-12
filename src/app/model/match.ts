export class Match {
  constructor(
    public _id?: number,
    public firstPlayerPhone?: string,
    public secondPlayerPhone?: String,
    public winnerPhone?: string,
    public acive?: boolean,
    public tournamentId?: String,
    public level?: Number
  ) {}
}
