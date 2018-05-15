export interface Scoreboard {
    time_stamp: Date; 
    production_quantity: Number;
    staff_quantity: Number;
    user_name: String;
    batch: {
        id:Number;
        batch_number:string;
    }; 
    }
