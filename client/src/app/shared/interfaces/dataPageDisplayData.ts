export class DataPageDisplayData {
    order_number: string;
    batch_number: string;
    article_number: string;
    start_date: Date;
    end_date: Date;
    batch_time: Date;
    reference_storage:number;
    scrap: number;
    yield: number;
    hmi1_good: number;
    hmi1_bad: number;
    hmi1_total: number;
    hmi2_good: number;
    hmi2_bad: number;
    hmi2_total: number;
    grand_match_total: number;
    rework_date: Date;
    est_pick_replace: number;
    applied_labels: number;
    print_time: Date;
    rework_time: Date;
}