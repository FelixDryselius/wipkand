export interface Scoreboard {
    time_stamp: Date; 
    production_quantity: Number;
    staff_quantity: Number;
    batch: {
        id:Number;
        batch_number:string;
    }; 
    }
