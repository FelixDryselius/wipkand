export interface Comment {
    comment_id: Number; 
    user_name: string;
    post_date: Date;
    text_comment: string;
    batch: {
        id:Number;
        batch_number:string;
    }; 
    }