// This object is for create Tournament obly

export class forum_msg {
    constructor(
        public tournament_id?: string,
        public msg_id?: string,
        public authorPhone?: string,
        public parentMsgID?: String,
        public createDate?: Date,
        public subject?: String,
        public msg?: String
    ) {}
  }
  