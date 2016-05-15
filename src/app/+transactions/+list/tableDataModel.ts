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
		date = date || new Date(); 
		/*if(typeof date === 'string'){
			this.date = new Date(date).toLocaleDateString('en-US');
		}else{
			this.date = date.toLocaleDateString('en-US');
		}*/
		this.date = date;
		this.merchant = merchant || '';
		this.amount = amount || 0;
		this.from = from || '';
		this.to = to || '';
		this.comments = comments || '';
		this.tags = tags || [];
	}
}
