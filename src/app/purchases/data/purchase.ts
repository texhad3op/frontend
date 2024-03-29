import { PurchaseLine } from './purchaseline';

export class Purchase {
    id: number;
    date: Date;
    lines: PurchaseLine[];

    constructor(id: number, date: Date, lines: PurchaseLine[]) {
        this.id = id;
        this.date = date;
        this.lines = lines;
    }
}
