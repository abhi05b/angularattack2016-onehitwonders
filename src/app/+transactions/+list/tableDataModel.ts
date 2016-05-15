import { Tag } from '../../tag/tag';
export class TableDataModel{
	date: Date;
	amount: number;
	from: string;
	to: string;
	merchant: string;
	comments: string;
	tags: Tag[];
	constructor(date?: any, merchant?: string, amount?: number, from?: string, to?: string, comments?: string, tags?: any[]) {
		date = date || new Date(); 
		if(typeof date === 'string'){
			date = new Date(date);
		}	
		this.date = date.toLocaleDateString('en-US');
		
		this.merchant = merchant || '';
		this.amount = amount || 0;
		this.from = from || '';
		this.to = to || '';
		this.comments = comments || '';
		tags = tags || [];
		if(tags.length>0 && typeof tags[0] !== 'string'){
			tags = tags.map(tag => {
				return tag.name;
			});
		}
		this.tags = tags;
	}
}
