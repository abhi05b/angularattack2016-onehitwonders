import { Tag } from '../../tag/tag';
export class TableDataModel{
	date: Date;
	amount: string;
	from: string;
	to: string;
	merchant: string;
	comments: string;

	constructor(date?: any, merchant?: string, amount?: string, from?: string, to?: string, comments?: string) {

	
		date = date || new Date(); 
		if(typeof date === 'string'){
			date = new Date(date);
		}	
		this.date = date.toLocaleDateString('en-US');
		
		this.merchant = merchant || '';
		this.amount = amount || '';
		this.from = from || '';
		this.to = to || '';
		this.comments = comments || '';

		/*tags = tags || [];
		if(tags.length>0 && typeof tags[0] !== 'string'){
			tags = tags.map(tag => {
				return tag.name;
			});
		}
		this.tags = tags;*/

	}
}
