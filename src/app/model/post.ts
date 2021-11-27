export class Post {
    constructor(
        title: {
            type: String,
            trim: true,
            required: true
          },
          text: {
            type: String,
            trim: true,
            required: true
          },
          date: {
            type: Date,
            default: Date.now
           },
           authorId : {
             type : String,
             required : true
           },
           authorName : {
             type:String,
             required : true
           },
           authorPhone : {
             type : String,
             required : true
          },
         tournamentId : {
           type : String,
           required : false,
         }
    ){}
}