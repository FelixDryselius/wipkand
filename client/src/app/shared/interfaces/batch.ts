export class Batch {
    id: string;
    batch_number: string;
    start_date?: Date;
    end_date?: Date;
    scrap?: number;
    production_yield?: number;
    hmi1_good?: number;
    hmi1_bad?: number;
    hmi2_good?: number;
    hmi2_bad?: number;
    rework_date?: Date;
    applied_labels?: number;
    label_print_time?: Date;
    rework_time?: number;
    shifts?: number;
    order: {
        order_number: string;
        article_number: string;
    }
}