import { Tag } from '../../tag/tag';

export class TableDataModel{
	date: Date;
	amount: number;
	from: string;
	to: string;
	merchant: string;
	comments: string;
	tags: Tag[];
	constructor(date?: Date, merchant?: string, amount?: number, from?: string, to?: string, comments?: string, tags?: Tag[]) {
		this.date = date || new Date(); 
		this.merchant = merchant || '';
		this.amount = amount || 0;
		this.from = from || '';
		this.to = to || '';
		this.comments = comments || '';
		this.tags = tags || [];
	}
}
