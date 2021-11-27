import * as moment from 'moment';

export class Comment {
    constructor(
       public text: {
            type: String,
            trim: true,
            required: true,
          },
        public  date: {
            type: Date,
            default: moment.Moment,
          },
         public postId: {
            // --- parent post id
            type: String,
            required: true,
          },
        public  authorId: {
            type: String,
            required: false,
          },
        public  authorName: {
            type: String,
            required: true,
          },
         public authorPhone : {
             type : String,
             required : true
          }

    ){}
}