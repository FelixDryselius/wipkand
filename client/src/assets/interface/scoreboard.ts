export interface Scoreboard {
    time_stamp: Date; 
    production_quantity: number;
    staff_quantity: number;
    user_name: string;
    batch: {
        id:Number;
        batch_number:string;
    }; 
    }
