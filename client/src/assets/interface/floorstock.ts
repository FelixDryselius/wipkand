export interface Floorstock {
    ID: number,
    time_stamp: Date; 
    quantity: Number;
    floorstock_item: String;
    batch:{
        id:Number,
        batch:string
        } 
    }
