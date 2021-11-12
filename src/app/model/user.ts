export class User {
    constructor(
        public name: string,
        public phoneNumber: {
            type: string,
            trim: true,
            require: "phone number is require",
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
  