export interface Comment {
    comment_id: Number; 
    user_name: any;
    post_date: Date;
    text_comment: any;
    batch: {
        id:Number;
        batch_number:string;
    }; 
    }