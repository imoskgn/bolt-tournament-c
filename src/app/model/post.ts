export class Post {
  constructor(
      public _id?: string,
      public title?: string,
      public text?: string,
      public authorId?: string,
      public authorName?: string,
      public date?: Date
  ) {}
}