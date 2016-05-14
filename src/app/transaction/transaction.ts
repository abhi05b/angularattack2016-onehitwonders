import { Account } from '../account/account';
import { Tag } from '../tag/tag';

export class Transaction{
	date: Date;
	amount: number;
	from: Account;
	to: Account;
	merchant: string;
	comments: string;
	tags: Tag[];
	constructor( date?: Date,  merchant?: string,  amount?: number,  from?: Account,  to?: Account,  comments?: string,  tags?: Tag[]){
		this.date = date || new Date(); 
		this.merchant = merchant || '';
		this.amount = amount || 0;
		this.from = from || new Account();
		this.to = to || new Account();
		this.comments = comments || '';
		this.tags = tags || [];

	}
}