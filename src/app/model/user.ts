export class User {
    constructor(
        public _id: string,
        public phoneNumber: {
            type: string,
            trim: true,
            require: "phone number is required",
            unique: true
        },
        public registered: boolean,
        public email: string,
        public createdAt: {
            type: Date
        },
        public updatedAt: {
            type: Date
        },
        public registerAt: Date,
        public password: string
    ) {}
  }
  